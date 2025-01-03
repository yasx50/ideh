from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import threading
from flask_cors import CORS
from groq import Groq

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes.

# Groq client setup
groq_client = Groq(api_key='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')  # Replace with your Groq API key

# Global lock for sequential API requests
api_lock = threading.Lock()

# Helper function to split text into batches
def split_into_batches(text, max_length):
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

    return batches

# Groq processing function with sequential API calls
def process_batch_with_groq(batch, prompt):
    with api_lock:  # Ensure only one thread accesses the Groq API at a time
        try:
            print("[INFO] Processing batch with Groq API...")
            chat_completion = groq_client.chat.completions.create(
                messages=[
                    {"role": "user", "content": f"{prompt}{batch}"}
                ],
                model="llama-3.2-1b-preview"
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
        input_data = request.json
        url = input_data.get("url")
        prompt = input_data.get("prompt", "")

        if not url:
            return jsonify({"error": "URL is required"}), 400

        # Scrape the content from the URL
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return jsonify({"error": f"Failed to fetch the URL: {response.status_code}"}), 400

        soup = BeautifulSoup(response.content, 'html.parser')
        scraped_text = soup.get_text(separator="\n", strip=True)

        # Split the content into manageable batches
        max_batch_length = 4000
        batches = split_into_batches(scraped_text, max_batch_length)

        unified_result = ""

        print("[INFO] Starting sequential batch processing...")
        # Process each batch sequentially
        for i, batch in enumerate(batches):
            print(f"[INFO] Processing batch {i + 1} of {len(batches)}...")
            groq_response = process_batch_with_groq(batch, prompt)
            unified_result += f"\n{groq_response}\n"
            print(f"[INFO] Batch {i + 1} processed.")

        return jsonify({"final_result": unified_result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return jsonify({"status": "Server is Running"})

# Run the app
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
