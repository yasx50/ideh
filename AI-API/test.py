from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import os
from groq import Groq

# Initialize Flask app
app = Flask(__name__)

# Initialize Groq client
groq_client = Groq(api_key='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')

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

        print("[INFO] Starting batch processing with Groq API...")
        # Process each batch through the Groq API
        processed_batches = []
        for i, batch in enumerate(batches):
            print(f"[INFO] Processing batch {i + 1} of {len(batches)}...")
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": batch,
                    }
                ],
                model="llama-3.2-90b-text-preview",
            )
            processed_batches.append(chat_completion.choices[0].message.content)
            print(f"[INFO] Batch {i + 1} processed.")

        # Merge the processed responses
        print("[INFO] Merging processed batches...")
        merged_content = "\n".join(processed_batches)

        print("[INFO] Processing complete. Sending response.")
        # Return the processed data in JSON format
        return jsonify({"processed_data": merged_content})

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    print("[INFO] Starting the Flask app...")
    app.run(debug=True)
