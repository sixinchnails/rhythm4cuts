# Node.js 이미지를 사용하여 앱 빌드 단계
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY package*.json ./
COPY . .
RUN npm ci --quiet

# 패키지 설치 및 앱 빌드
# RUN npm ci --quiet
RUN npm run build

# Nginx 이미지를 사용하여 앱 실행 단계
FROM nginx:latest

# Nginx 설정 파일 복사
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 빌드된 앱을 Nginx에 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 포트 노출
#EXPOSE 80

# Nginx 서버 시작
CMD ["nginx", "-g", "daemon off;"]
