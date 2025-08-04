from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import google.generativeai as genai

genai.configure(api_key="AIzaSyBRyYIyMk51wEsWP32ibKus7eGKGkif5iA")
model = genai.GenerativeModel("gemini-2.0-flash")



app = Flask(__name__)
CORS(app)  # CORS middleware'i tüm route'lara uygula

@app.route('/get_spam_info',methods=['POST'])
def get_spam_info():
    try:
        metin=request.json["metin"]
        response = model.generate_content("Aşşağıdaki metni spam olma ihtimali yüzde kaçtır?Sadece yüzdelik olarak değer ver \n\n"+metin)
        return jsonify(response.text), 200
    except:
        return jsonify({'error': 'unknown error'}),400
    




@app.route('/get_news', methods=['GET'])
def get_news():
    try:
        with open('list.json', 'r', encoding='utf-8') as file:
            users = json.load(file)
        return jsonify(users), 200
    except FileNotFoundError:
        return jsonify({'error': 'list.json not found'}), 404
    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format in list.json'}), 500

if __name__ == '__main__':
    app.run(debug=True)
