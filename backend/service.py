from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time
import json


while True:
    options = Options()
    options.add_argument("--headless")  # Başsız (görünmez) mod
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    url = "https://www.usom.gov.tr/bildirim"
    base_url = "https://www.usom.gov.tr"

    driver.get(url)
    time.sleep(5)  # Sayfa tamamen yüklenene kadar bekle

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    driver.quit()

    results = []
    for card in soup.find_all("div", class_="card-header"):
        a_tag = card.find("a")
        if a_tag:
            href = a_tag.get("href", "")
            span = a_tag.find("span")
            h3 = a_tag.find("h3")

            if href and span and h3:
                results.append({
                    "link": base_url + href,
                    "tarih": span.get_text(strip=True),
                    "header": h3.get_text(strip=True)
                })

    with open('list.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=4)
    
    time.sleep(600)