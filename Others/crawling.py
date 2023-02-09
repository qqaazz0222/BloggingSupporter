# -*- coding: utf-8 -*-
import io
import os
import json
import pymysql
import urllib.request
from selenium.common.exceptions import NoSuchElementException
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager


with io.open('./api-key.json', 'r') as f:
    keys = json.load(f)

with io.open('./server.json', 'r') as f:
    server = json.load(f)

keywords = ["노트북 구매후기", "노트북 구입리뷰", "노트북 한 달 사용후기", "노트북 리뷰", "노트북 실사용후기", "노트북 실사용리뷰", "노트북 상세리뷰", "노트북 언박싱", "노트북 내돈내산리뷰", "노트북 구입기", "노트북 개봉기", "노트북 리얼리뷰", "노트북 개봉 후기", "노트북 장단점리뷰", "노트북 디테일 후기", "노트북 솔직후기", "블루투스 이어폰 구매후기", "블루투스 이어폰 구입리뷰", "블루투스 이어폰 한 달 사용후기", "블루투스 이어폰 리뷰", "블루투스 이어폰 실사용후기", "블루투스 이어폰 실사용리뷰", "블루투스 이어폰 상세리뷰", "블루투스 이어폰 언박싱", "블루투스 이어폰 내돈내산리뷰", "블루투스 이어폰 구입기", "블루투스 이어폰 개봉기", "블루투스 이어폰 리얼리뷰", "블루투스 이어폰 개봉 후기", "블루투스 이어폰 장단점리뷰", "블루투스 이어폰 디테일 후기", "블루투스 이어폰 솔직후기", "휴대폰 구매후기", "휴대폰 구입리뷰", "휴대폰 한 달 사용후기", "휴대폰 리뷰", "휴대폰 실사용후기", "휴대폰 실사용리뷰", "휴대폰 상세리뷰", "휴대폰 언박싱", "휴대폰 내돈내산리뷰", "휴대폰 구입기", "휴대폰 개봉기", "휴대폰 리얼리뷰", "휴대폰 개봉 후기", "휴대폰 장단점리뷰", "휴대폰 디테일 후기", "휴대폰 솔직후기", "키보드 구매후기", "키보드 구입리뷰", "키보드 한 달 사용후기", "키보드 리뷰", "키보드 실사용후기", "키보드 실사용리뷰", "키보드 상세리뷰", "키보드 언박싱", "키보드 내돈내산리뷰", "키보드 구입기", "키보드 개봉기", "키보드 리얼리뷰", "키보드 개봉 후기", "키보드 장단점 리뷰", "키보드 디테일 후기", "키보드 솔직후기", "의자 구매후기", "의자 구입리뷰", "의자 한 달 사용후기", "의자 리뷰", "의자 실사용후기", "의자 실사용리뷰", "의자 상세리뷰", "의자 언박싱", "의자 내돈내산리뷰", "의자 구입기", "의자 개봉기", "의자 리얼리뷰", "의자 개봉 후기", "의자 장단점리뷰", "의자 디테일 후기", "의자 솔직후기", "카메라 구매후기", "카메라 구입리뷰", "카메라 한 달 사용후기", "카메라 리뷰", "카메라 실사용후기", "카메라 실사용리뷰", "카메라 상세리뷰", "카메라 언박싱", "카메라 내돈내산리뷰", "카메라 구입기", "카메라 개봉기", "카메라 리얼리뷰", "카메라 개봉 후기", "카메라 장단점리뷰", "카메라 디테일 후기", "카메라 솔직후기", "가방 구매후기", "가방 구입리뷰", "가방 한 달 사용후기", "가방 리뷰", "가방 실사용후기", "가방 실사용리뷰", "가방 상세리뷰", "가방 언박싱", "가방 내돈내산리뷰", "가방 구입기", "가방 개봉기", "가방 리얼리뷰", "가방 개봉 후기", "가방 장단점리뷰", "가방 디테일 후기", "가방 실착 리뷰", "가방 솔직후기", "가방 솔직 상세 후기", "가방 디자인 후기", "가방 솔직후기"]

conn = pymysql.connect(host=server["host"], user=server["username"], passwd=server["password"], db=server["database"], port=server["port"], use_unicode=True, charset='utf8')
cursor = conn.cursor()

# 웹드라이버 설정
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

# 정보입력
client_id = keys["papago_id"]
client_secret = keys["papago_secret"]
for keyword in keywords:
    print(keyword)
    quote = keyword
    encText = urllib.parse.quote(quote)
    display_num = "100" #출력할 갯수 입력받기
    url = "https://openapi.naver.com/v1/search/blog?query=" + encText +"&display="+display_num# json 결과
    # url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # xml 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()

    if(rescode==200):
        response_body = response.read()
    else:
        print("Error Code:" + rescode)

    body = json.loads(response_body.decode('utf-8'))
    link = []
    for item in body["items"]:
        query = "INSERT INTO link VALUES (null, %s, %s, %s, %s, %s, %s)" % (item["title"], item["link"], item["description"], item["bloggername"], item["bloggerlink"], item["postdate"])
        cursor.execute(query)
        conn.commit()
conn.close()