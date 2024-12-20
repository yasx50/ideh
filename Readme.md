[![wakatime](https://wakatime.com/badge/github/Pallav2905-py/ideh.svg)](https://wakatime.com/badge/github/Pallav2905-py/ideh)
Here’s the `README.md` file based on your requirements:

---

# **Flask Web Application with Google OAuth, LangChain, and Web Scraping**

## **Setup and Installation Instructions**

### **1. Prerequisites**
- Python 3.7 or higher
- PostgreSQL installed and running
- Required Python packages (listed in `requirements.txt`)

---

### **2. Installation Steps**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the PostgreSQL database:
   - Create a new database (`project_db`).
   - Configure the `DATABASE_URI` in your `.env` file.

5. Configure API keys:
   - Add your **Hugging Face API Key** and **Groq API Key** in the `.env` file.

6. Run the Flask app:
   ```bash
   python app.py
   ```

7. Open the app:
   - Navigate to `http://127.0.0.1:5000`.

---

## **Usage Guide**

### **1. Authentication**
- The application uses Google OAuth for user authentication.
- After logging in with Google, user details are stored in the database.

### **2. Web Scraping**
- The `/process-url` endpoint accepts a URL and performs the following:
  - Scrapes content and metadata from the website.
  - Splits the content into manageable batches.
  - Processes batches using:
    - **Hugging Face LLM** for extracting meaningful insights.
    - **Groq API** for additional processing.

### **3. Prompt-Based Interaction**
- LangChain handles prompt-based AI interactions.
- Users can submit prompts and retrieve generated responses.

---

## **API Documentation**

### **1. `/process-url`**
**Method**: `POST`  
**Description**: Scrapes the content from the given URL, processes it using Hugging Face and Groq, and returns insights.  

#### **Request Body**
```json
{
  "url": "https://example.com"
}
```

#### **Response**
```json
{
  "processed_data": [
    {
      "huggingface": "Meaningful insights from Hugging Face...",
      "groq": "Insights from Groq API..."
    }
  ]
}
```

#### **Errors**
- `400`: Missing or invalid URL.
- `500`: Internal server error.

---

## **File Outputs**
- **`scraped_content.txt`**: Contains raw text scraped from the given URL.
- **`results.json`**: Contains processed insights from Hugging Face and Groq APIs.

---

## **Environment Variables**
Create a `.env` file in the project root with the following:
```
DATABASE_URI=
HUGGINGFACE_API_TOKEN=
GROQ_API_KEY=
```
