import google.generativeai as genai

# 1. API Anahtarını tanımla
genai.configure(api_key="AIzaSyBRyYIyMk51wEsWP32ibKus7eGKGkif5iA")

# 2. Modeli yükle
model = genai.GenerativeModel("gemini-2.0-flash")

# 3. Mesaj gönder
response = model.generate_content("Türkiye'nin başkenti neresidir?")

# 4. Cevabı yazdır
print(response.text)
