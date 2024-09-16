# Stage 1: Compile and Build angular codebase
#FROM node:18.14 as build
FROM docker.io/node:20.12-alpine as build

# Set the working directory
WORKDIR /opt

# Copia todos os arquivos da raiz da nossa aplicação para a pasta deinida no WORKDIR
COPY . .

# Install all the dependencies
RUN npm install 

# Generate the build of the application
RUN npm run build -- --configuration prod --base-href

# Stage 2: Serve app with nginx server
# FROM docker.io/nginx:1.23-alpine
# essa imagem do harbor.intra ja roda com a seguranca default.
FROM harbor.intra.rs.gov.br/library/nginx-alpine:1.23

# define uma variavel
ENV NGINX_DIR "/usr/share/nginx/html"

# o nome procergs-apm-angular esta configurado no package.json
COPY --chown=nginx:101 --from=build /opt/dist/procergs-apm-angular ${NGINX_DIR}

# subsitui app-config.json por app-config-template.json e aplica variaveis do env.list quando executar no PC
ENTRYPOINT sh -c "envsubst < ${NGINX_DIR}/assets/app-config-template.json > ${NGINX_DIR}/assets/app-config.json && nginx -g \"daemon off;\""

# 
# p/ teste local
# 1> docker build -t apm-angular:latest . 
# 2> docker run --name apm-angular -d -p 8080:8080 --env-file env.list apm-angular:latest
# 3> abrir no browser http://localhost:8080/
#
# 4> docker logs apm-angular
# 5> docker stop apm-angular ; docker rm apm-angular
# 