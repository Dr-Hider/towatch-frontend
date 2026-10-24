FROM nginx:alpine

COPY nginx.conf.template /etc/nginx/templates/default.conf.template

ENV NGINX_ENVSUBST_FILTER="^(BACKEND_HOST|BACKEND_PORT|FRONTEND_HOST|FRONTEND_PORT)$"
