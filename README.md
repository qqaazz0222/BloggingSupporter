# Bloggin Suppoter(in Develop)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)


## Overview
Extracting keywords from photos and extracting recommended sentences through those keywords to help write blog posts.

- Front-End : React
- Back-End : Flask
- Object Detect Tect : Google Vision
- Generate Recommendation Sentence : OpenAi ChatGPT

## Developer

- Front-End : 이동희
- Back-End : 하정훈
- Back-End & Data Crawling : 김현수

## Front-End

1. ```cd frontend```
2. ```npm istall```
3. ```npm start```

use port 3000

## Back-End
require : google-cloud, google-cloud-vision, openai
- ```pip install google-cloud```
- ```pip install google-cloud-vision```
- ```pip install openai```

create api-key in "backend" folder, input your keys
```
{
    "openai": openai_api_key,
    "papago_id": naver_dev_center_client_id,
    "papago_secret": naver_dev_client_secret
}
```
1. ```cd backend```
2. ```python server.py```

use port 3001
