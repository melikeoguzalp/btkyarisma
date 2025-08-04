import google.generativeai as genai

# 1. API Anahtarını tanımla
genai.configure(api_key="AIzaSyA1Uq5Tqe_qM4fr0Mvux5Fa6WLfqwgLpck")

# 2. Modeli yükle
model = genai.GenerativeModel("gemini-2.0-flash")

# 3. Mesaj gönder
response = model.generate_content("Türkiye'nin başkenti neresidir?")

# 4. Cevabı yazdır
print(response.text)
