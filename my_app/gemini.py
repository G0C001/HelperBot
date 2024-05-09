import os
import markdown
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
generation_config = {
    "temperature": 0.3,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 8192,
}
safety_settings = {
    "HARM_CATEGORY_HARASSMENT": "BLOCK_NONE",
    "HARM_CATEGORY_HATE_SPEECH": "BLOCK_NONE",
    "HARM_CATEGORY_SEXUALLY_EXPLICIT": "BLOCK_NONE",
    "HARM_CATEGORY_DANGEROUS_CONTENT": "BLOCK_NONE",
}
google_api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=google_api_key)
model = genai.GenerativeModel('gemini-pro', generation_config=generation_config, safety_settings=safety_settings)
chat = model.start_chat(history=[])

def generate_content(query):
    try:
        response = chat.send_message(query)
        generated_text = response.text
        markdown_text = markdown.markdown(generated_text)
        markdown_text = markdown_text.replace("\n","<br>").replace("\'","")
        return markdown_text
    except:
        return "Please Explain detaily to understand"