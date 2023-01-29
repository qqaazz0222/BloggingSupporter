import requests
from bs4 import BeautifulSoup

url = "https://m.blog.naver.com/alens82/220719833209"

response = requests.get(url)

if response.status_code == 200:  # 정상 연결시
    soup = BeautifulSoup(response.text, 'html.parser')  # 수프 text 형태로 만들기
    text = str(soup.find(id='postViewArea'))  # 본문 내용만 담긴 css 코드 뽑아내기
    print(text)
else:
    print(response.status_code)
