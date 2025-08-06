from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import google.generativeai as genai
import mysql.connector

# Google Gemini ayarları
genai.configure(api_key="AIzaSyCcm0bzPfLtSvO1Al18HGaNElBU0oiFeww")
model = genai.GenerativeModel("gemini-1.5-flash")

app = Flask(__name__)
CORS(app)

# MySQL bağlantı ayarları
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',  # kendi şifrenle değiştir
    'database': 'hackhaton',
    'auth_plugin': 'mysql_native_password'
}

@app.route('/get_spam_info', methods=['POST'])
def get_spam_info():
    try:
        metin = request.json["metin"]
        response = model.generate_content("Aşağıdaki metnin spam olma ihtimali yüzde kaçtır? Sadece yüzdelik olarak değer ver:\n\n" + metin)
        return jsonify(response.text), 200
    except:
        return jsonify({'error': 'unknown error'}), 400


@app.route('/save_phishing_score', methods=['POST'])
def save_phishing_score():
    try:
        data = request.json
        isim = data["isim"]
        yas = int(data["yas"])
        okul = data["okul"]
        bolum = data["bolum"]
        score = int(data["score"])

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Kullanıcıyı kontrol et
        cursor.execute("SELECT scor FROM users WHERE isim = %s AND yas = %s AND okul = %s AND bolum = %s",
                       (isim, yas, okul, bolum))
        result = cursor.fetchone()

        if result:
            mevcut_skor = result[0]
            if score > mevcut_skor:
                cursor.execute("UPDATE users SET scor = %s WHERE isim = %s AND yas = %s AND okul = %s AND bolum = %s",
                               (score, isim, yas, okul, bolum))
                conn.commit()
                mesaj = "Skor güncellendi."
            else:
                mesaj = "Veritabanındaki skor daha yüksek. Güncellenmedi."
        else:
            cursor.execute("INSERT INTO users (isim, yas, okul, bolum, scor) VALUES (%s, %s, %s, %s, %s)",
                           (isim, yas, okul, bolum, score))
            conn.commit()
            mesaj = "Yeni kullanıcı eklendi."

        cursor.close()
        conn.close()

        return jsonify({'message': mesaj}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


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
