# Base 이미지 설정
FROM python:3.7-slim

# 작업 디렉토리 설정
WORKDIR /app

# 호스트 시스템에 있는 파일들을 컨테이너 내 /app 디렉토리로 복사
COPY . /app

# Flask 앱을 실행하기 위한 종속성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 컨테이너 내에서 실행할 명령 설정
CMD ["python", "app.py"]