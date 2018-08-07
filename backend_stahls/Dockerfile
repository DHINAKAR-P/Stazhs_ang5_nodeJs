FROM node:latest
COPY ./ /app
WORKDIR /app
RUN chmod +x /app/wait-for-it.sh
CMD ["./wait-for-it.sh","mydb:3306","--timeout=300","--strict","--", "npm", "start"]