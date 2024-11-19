from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import os
import json
from langchain_community.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate
from groq import Groq

# Initialize Flask app
app = Flask(__name__)

# Hugging Face LLM setup (free model via Hugging Face Hub)
huggingface_llm = HuggingFaceHub(
    repo_id="gpt2",  # Replace with your preferred Hugging Face model
    model_kwargs={"temperature": 0.7, "max_length": 256},
    huggingfacehub_api_token='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'
)

# Groq client setup
groq_client = Groq(api_key='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')  # Replace with your Groq API key

# Define a helper function to split text into batches
def split_into_batches(text, max_length):
    print("[INFO] Splitting text into batches...")
    words = text.split()
    batches = []
    current_batch = []

    for word in words:
        if len(" ".join(current_batch + [word])) <= max_length:
            current_batch.append(word)
        else:
            batches.append(" ".join(current_batch))
            current_batch = [word]

    if current_batch:
        batches.append(" ".join(current_batch))

    print(f"[INFO] Total batches created: {len(batches)}")
    return batches

# Process a batch using Hugging Face model with LangChain
def process_batch_with_huggingface(batch):
    try:
        print("[INFO] Processing batch with Hugging Face LLM...")
        # Define the LangChain prompt
        prompt = PromptTemplate(
            input_variables=["text"],
            template="Extract meaningful insights from the following text:\n\n{text}",
        )
        formatted_prompt = prompt.format(text=batch)
        # Generate response
        response = huggingface_llm(formatted_prompt)
        return response
    except Exception as e:
        print(f"[ERROR] Error processing batch with Hugging Face: {e}")
        return "Error in processing batch."

# Process a batch using Groq API
def process_batch_with_groq(batch):
    try:
        print("[INFO] Processing batch with Groq API...")
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": batch,
                }
            ],
            model="llama-3.2-90b-text-preview",  # Replace with Groq-supported model
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"[ERROR] Error processing batch with Groq: {e}")
        return "Error in processing batch."

# Define a route for scraping, processing, and returning data
@app.route('/process-url', methods=['POST'])
def process_url():
    try:
        print("[INFO] Received request to process URL.")
        # Parse the input
        input_data = request.json
        url = input_data.get("url")
        
        if not url:
            print("[ERROR] URL is missing in the request.")
            return jsonify({"error": "URL is required"}), 400

        print(f"[INFO] Scraping content from URL: {url}")
        # Scrape the website content
        response = requests.get(url)
        if response.status_code != 200:
            print(f"[ERROR] Failed to scrape the URL. Status code: {response.status_code}")
            return jsonify({"error": "Failed to scrape the URL"}), 400
        
        # Parse the content with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        scraped_text = soup.get_text(separator="\n", strip=True)

        print("[INFO] Scraping complete. Saving content to file...")
        # Save the scraped content to a file
        file_path = "scraped_content.txt"
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(scraped_text)

        # Load the scraped content from the file
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        print("[INFO] Content loaded. Splitting into batches for processing...")
        # Split the content into batches (e.g., max 4000 characters per batch)
        max_batch_length = 4000  # Adjust based on the model's token limit
        batches = split_into_batches(content, max_batch_length)

        print("[INFO] Starting batch processing...")
        # Process each batch with both Hugging Face and Groq
        processed_batches = []
        for i, batch in enumerate(batches):
            print(f"[INFO] Processing batch {i + 1} of {len(batches)}...")
            huggingface_response = process_batch_with_huggingface(batch)
            groq_response = process_batch_with_groq(batch)
            combined_response = {
                "huggingface": huggingface_response,
                "groq": groq_response
            }
            processed_batches.append(combined_response)
            print(f"[INFO] Batch {i + 1} processed.")

        # Merge the processed responses
        print("[INFO] Saving result to results.json...")
        results_file = "results.json"
        with open(results_file, "w", encoding="utf-8") as file:
            json.dump(processed_batches, file, indent=4)

        print("[INFO] Processing complete. Sending response.")
        # Return the processed data in JSON format
        return jsonify({"processed_data": processed_batches})

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    print("[INFO] Starting the Flask app...")
    app.run(debug=True)