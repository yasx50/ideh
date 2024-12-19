# from flask import Flask, request, jsonify
# import requests
# from bs4 import BeautifulSoup
# import os
# from groq import Groq

# # Initialize Flask app
# app = Flask(__name__)

# # Initialize Groq client
# groq_client = Groq(api_key='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')

# # Define a helper function to split text into batches
# def split_into_batches(text, max_length):
#     print("[INFO] Splitting text into batches...")
#     words = text.split()
#     batches = []
#     current_batch = []

#     for word in words:
#         if len(" ".join(current_batch + [word])) <= max_length:
#             current_batch.append(word)
#         else:
#             batches.append(" ".join(current_batch))
#             current_batch = [word]

#     if current_batch:
#         batches.append(" ".join(current_batch))

#     print(f"[INFO] Total batches created: {len(batches)}")
#     return batches

# # Define a route for scraping, processing, and returning data
# @app.route('/process-url', methods=['POST'])
# def process_url():
#     try:
#         print("[INFO] Received request to process URL.")
#         # Parse the input
#         input_data = request.json
#         url = input_data.get("url")

#         if not url:
#             print("[ERROR] URL is missing in the request.")
#             return jsonify({"error": "URL is required"}), 400

#         print(f"[INFO] Scraping content from URL: {url}")
#         # Scrape the website content
#         response = requests.get(url)
#         if response.status_code != 200:
#             print(f"[ERROR] Failed to scrape the URL. Status code: {response.status_code}")
#             return jsonify({"error": "Failed to scrape the URL"}), 400

#         # Parse the content with BeautifulSoup
#         soup = BeautifulSoup(response.content, 'html.parser')
#         scraped_text = soup.get_text(separator="\n", strip=True)

#         print("[INFO] Scraping complete. Saving content to file...")
#         # Save the scraped content to a file
#         file_path = "scraped_content.txt"
#         with open(file_path, "w", encoding="utf-8") as file:
#             file.write(scraped_text)

#         # Load the scraped content from the file
#         with open(file_path, "r", encoding="utf-8") as file:
#             content = file.read()

#         print("[INFO] Content loaded. Splitting into batches for processing...")
#         # Split the content into batches (e.g., max 4000 characters per batch)
#         max_batch_length = 4000  # Adjust based on the model's token limit
#         batches = split_into_batches(content, max_batch_length)

#         print("[INFO] Starting batch processing with Groq API...")
#         # Process each batch through the Groq API
#         processed_batches = []
#         for i, batch in enumerate(batches):
#             print(f"[INFO] Processing batch {i + 1} of {len(batches)}...")
#             chat_completion = groq_client.chat.completions.create(
#                 messages=[
#                     {
#                         "role": "user",
#                         "content": batch,
#                     }
#                 ],
#                 model="llama-3.2-90b-text-preview",
#             )
#             processed_batches.append(chat_completion.choices[0].message.content)
#             print(f"[INFO] Batch {i + 1} processed.")

#         # Merge the processed responses
#         print("[INFO] Merging processed batches...")
#         merged_content = "\n".join(processed_batches)

#         print("[INFO] Processing complete. Sending response.")
#         # Return the processed data in JSON format
#         return jsonify({"processed_data": merged_content})

#     except Exception as e:
#         print(f"[ERROR] {str(e)}")
#         return jsonify({"error": str(e)}), 500

# # Run the app
# if __name__ == '__main__':
#     print("[INFO] Starting the Flask app...")
#     app.run(debug=True)


res = """
\n* GeeksforGeeks Courses \n* Getting Certified in IBM \n* GATE CS  & IT \n* Data Science (Live) \n* \n* All Courses for Full Stack Development \n* Web Development in Python \n* Django Flask Postman \n* Web Scrapping in Python \n* Data Structures & Algorithms\n\n- face_recognition.py\n- test_image.jpg\n- train_dir/\n    - person_1/\n        - person_1_face-1.jpg\n        - person_1_face-2.jpg\n    - person_2/\n        - person_2_face-1.jpg\n        - person_2_face-2.jpg\n    - person_n/\n        - person_n_face-1.jpg\n        - person_n_face-2.jpg\n- train.txt (content with training faces)\n- train.txt.txt (training file with labels)\n- support_vector_classofier.py\n- test_image.jpg\n- model.pkl (training model) \n- test_image encoded.jpg (predicted encoding for test_image)\n\n- The scripts provided are for face detection and recognition using MediaPipe.\n- The orientation encoding method is used.\n- The test image is used to predict the face in the scene.\n- If no similarities are found, a warning message is printed.\n\n* Yawn Detection using OpenCV and Dlib\n  • Face Landmark Detection\n  • Eye Blink Detection\n  • Expression Recognition\n* Face Recognition with Local Binary Patterns (LBPs) and OpenCV\n* Dataset for Face Recognition\n* Face Detection using Cascade Classifier using OpenCV-Python\n* Face Detection using Python and OpenCV with webcam\n* Face and Hand Landmarks Detection using Python - Mediapipe, OpenCV\n* Determine The Face Tilt Using OpenCV - Python\n\n**Traffic Signs Recognition**\n\n* **Use case**: Recognize traffic signs to improve safety and reduce accidents\n* **Data**:\n + Images of traffic signs with corresponding text and colors\n* **Model**:\n + Convolutional Neural Network (CNN)\n* **Inference**\n + Identify the type of traffic sign and its corresponding text\n* **Training**\n + Use the MNIST dataset as an initial dataset\n + Use augmentations to increase data diversity\n* **Optimization**\n + Regularization: L1 and L2 for improving model generalization\n + Data augmentation using random rotation, flipping and color adjustments\n\n**Sign Language Recognition System**\n\n* **Use case**: Recognize sign language to improve accessibility and communication\n* **Data**:\n + Images of sign language signs with corresponding text and emotions\n* **Model**:\n + Convolutional Neural Network (CNN) and Recurrent Neural Network (RNN)\n* **Inference**\n + Identify the shape and style of the sign language sign\n + Detect emotions and recognize the sender\n* **Training**\n + Use a dataset consisting of images and corresponding text and emotions\n + Train the model using a combination of CNN and RNN\n* **Optimization**\n + Use a technique that blends CNN and RNN to handle spatial and temporal information\n + Regularization: L1 and L2 for improving model generalization\n\n**Face Detection in Flutter**\n\n* **Use case**: Identify faces in photos to enhance social media and photo sharing\n* **Data**:\n + Images of people with their faces included\n* **Model**:\n + Face Detection API provided by Firebase ML Kit\n* **Inference**\n + Detect faces in images and assign a confidence score\n* **Training**\n + Use face detection samples from existing datasets\n* **Optimization**\n + Regularization: L1 and L2 for improving face detection accuracy\n\n**Person and Face Detection using Intel OpenVINO toolkit**\n\n* **Use case**: Detect faces in real-time to enhance personal security and surveillance\n* **Data**:\n + Pre-trained models for face detection and person tracking\n* **Model**:\n + Face Detection API and Person Detection API provided by Intel OpenVINO toolkit\n* **Inference**\n + Detect faces and track people in real-time\n* **Training**\n + Use pre-trained models to fine-tune for specific use cases\n* **Optimization**\n + Regularization: L1 and L2 for improving face and person detection accuracy\n\n**Python - Face detection and sending notification**\n\n* **Use case**: Detect faces in real-time to send notifications and communicate with loved ones\n* **Data**:\n + Images of faces with timestamps and sender information\n* **Model**:\n + Face Detection API provided by Python ML Kit\n* **Inference**\n + Detect faces and send notifications to loved ones\n* **Training**\n + Use face detection samples from existing datasets\n* **Optimization**\n + Regularization: L1 and L2 for improving face detection accuracy\n\n**Face Alignment with OpenCV and Python**\n\n* **Use case**: Align faces for facial recognition and identification applications\n* **Data**:\n + Images of people with their faces aligned\n* **Model**:\n + OpenCV Python for face alignment\n* **Inference**\n + Align faces for facial recognition and identification applications\n* **Training**\n + Use face alignment samples from existing datasets\n\n**Opencv Python program for Face Detection**\n\n* **Use case**: Detect faces in real-time to enhance annotation and object recognition applications\n* **Data**:\n + Images of faces with timestamps and confidences\n* **Model**:\n + Face Detection API provided by OpenCV\n* **Inference**\n + Detect faces and assign a confidence score\n\n**Human Activity Recognition - Using Deep Learning Model**\n\n* **Use case**: Recognize human activities in real-time to improve surveillance and monitoring applications\n* **Data**:\n + Pre-trained models for human activity recognition\n* **Model**:\n + Deep Learning models (e.g. LSTM) for human activity recognition\n* **Inference**\n + Identify human activities in real-time\n* **Training**\n + Use pre-trained models to fine-tune for specific use cases\n\n**Flower Recognition Using Convolutional Neural Network**\n\n* **Use case**: Recognize flower types in images to enhance education and research applications\n* **Data**:\n + Images of flowers with corresponding labels\n* **Model**:\n + Convolutional Neural Network (CNN) for flower recognition\n* **Inference**\n + Identify flower types with confidence scores\n\n**Note:** This is not an exhaustive list of traffic signs recognition tasks, but a good starting point for beginners.\n\n**Convolutional Neural Network (CNN)**\n• A type of neural network architecture that uses convolutional and pooling layers to extract features from images or video\n• Convolutional layers perform convolution of small regions of the image (called filters) and pooling layers downsample the feature map\n• Receptive field can range from 2x2 to 7x7, with stride 2\n• Can be used for image classification, object detection, segmentation, and other tasks\n• Weight sharing is used to reduce computation and increase model capacity\n\n**Image Recognition using TensorFlow In Keras**\n• Train a Keras model using a dataset of images for classification or other tasks\n• Includes functions for data preparation, model creation, and evaluation\n• Includes pre-trained models and modifications for custom tasks\n\n**Optical Character Recognition Using TensorFlow OCR**\n• Load dataset of image-catalogued text\n• Transpose text to grid\n• Replace each pixel with the corresponding character value\n• Train a Keras model to produce character probabilities\n• Use the trained model to predict character probabilities in new, unseen catures\n\n**Project Idea Dynamic Hand Gesture Recognition using Neural Network**\n• Collect dataset of hand gestures and images\n• Train a neural network model to recognize hand gestures\n• Use the trained model to recognize hand gestures in real-time\n• Consider using computer vision library OpenCV for image processing\n\n**Optical Character Recognition (Ocr) using R**\n• Load dataset of text images\n• Transpose text to grid\n• Use Tesseract library for OCR transformation\n• Use Marp for image layout and handling\n• Train a Keras model to recognize characters in the trained dataset\n\n**Automatic Speech Recognition using Whisper**\n• Load dataset of audio files\n• Transcribe audio files to text\n• Use TFLite library for Whisper customizing to your dataset\n• Train a Keras model to recognize speech patterns\n• Use the trained model to transcribe audio files in real-time\n\n**Improve Routes**\n\n*   **Full-Stack Application**: Use more descriptive route names to improve code readability.\n*   **API Design**: Use route parameters and query strings to improve API design.\n*   **Error Handling**: Use `try-except` blocks to handle errors and improve code robustness.\n\n**Improve Method Names**\n\n*   **Use Descriptive Method Names**: Use method names that describe the purpose of the method.\n*   **Remove Single Letter Method Names**: Use multi-letter method names to improve readability.\n\n**Improve Code Documentation**\n\n*   **Add Comments**: Add comments to explain the purpose of the code.\n*   **Use Docstrings**: Use docstrings to provide documentation for modules and functions.\n\n**Improve Testing**\n\n*   **Use Unit Tests**: Use unit tests to test individual methods and functions.\n*   **Use Integration Tests**: Use integration tests to test combined code.\n\n**Improve Code Style**\n\n*   **Use Consistent Indentation**: Use consistent indentation to improve code style.\n*   **Avoid Unnecessary Blank Lines**: Avoid unnecessary blank lines to improve code style.\n\n**Integrate with Other Templates**\n\n*   **Use Template Includes**: Use template includes to reuse code across pages.\n*   **Pass Data from One Page to Another**: Pass data from one page to another using templates.\n\n**Add More Information**\n\n*   **Use Descriptive Headings**: Use descriptive headings to improve navigation.\n*   **Include Screenshot Tutorial**: Include screenshot tutorial to demonstrate code usage.\n\n**Final Suggestions**\n\n*   **Use Code Minifiers**: Use code minifiers to compress code and improve execution speed.\n*   **Use Code Generators**: Use code generators to automate code generation.\n
"""



from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import os
import json
from langchain_community.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate

from flask_cors import CORS

from groq import Groq
groq_client = Groq(api_key='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')  # Replace with your Groq API key

# print(res)

def process_batch_with_groq(batch):
    try:
        prompt = "From the provided text, only give code"
        print("[INFO] Processing batch with Groq API...")
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt+batch,
                }
            ],
            model="llama3-70b-8192",  # Replace with Groq-supported model
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"[ERROR] Error processing batch with Groq: {e}")
        return "Error in pr"
    

# print(process_batch_with_groq(res))


