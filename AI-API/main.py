from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import os
import json
from langchain_community.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate

from flask_cors import CORS

from groq import Groq
# Initialize Flask app
app = Flask(__name__)
cors = CORS(app) # allow CORS for all domains on all routes.

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
def process_batch_with_groq(batch,prompt):
    try:
        # prompt = "Try to keep things simple, No Code just bullet points, and only give output, dont write things such as'ans in buttlet pts as you asked like that'"
        print("[INFO] Processing batch with Groq API...")
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt + batch if prompt else batch,
                }
            ],
            model="llama-3.2-1b-preview",  # Replace with Groq-supported model
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
        prompt = input_data.get("prompt")
        
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
        # # Save the scraped content to a file
        # file_path = "scraped_content.txt"
        # with open(file_path, "w", encoding="utf-8") as file:
        #     file.write(scraped_text)

        # # Load the scraped content from the file
        # with open(file_path, "r", encoding="utf-8") as file:
        #     content = file.read()

        print("[INFO] Content loaded. Splitting into batches for processing...")
        # Split the content into batches (e.g., max 4000 characters per batch)
        max_batch_length = 4000  # Adjust based on the model's token limit
        batches = split_into_batches(scraped_text, max_batch_length)

        print("[INFO] Starting batch processing...")
        # Unified result to store combined outputs
        unified_result = ""

        for i, batch in enumerate(batches):
            print(f"[INFO] Processing batch {i + 1} of {len(batches)}...")
            groq_response = process_batch_with_groq(batch, prompt)
            # Combine the result into a unified string (or other format if required)
            unified_result += f"\n{groq_response}\n"

            print(f"[INFO] Batch {i + 1} processed.")

        # Save the unified result to a file
        # print("[INFO] Saving result to results.json...")
        # results_file = "results.json"
        # with open(results_file, "w", encoding="utf-8") as file:
        #     json.dump({"final_result": unified_result}, file, indent=4)

        print("[INFO] Processing complete. Sending response.")
        # Return the unified processed data in JSON format
        return jsonify({"final_result": unified_result})

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500


# Run the app
if __name__ == '__main__':
    print("[INFO] Starting the Flask app...")
    app.run(debug=True)
