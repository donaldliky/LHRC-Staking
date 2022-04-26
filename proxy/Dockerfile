###################
### Build image ###
###################

FROM node:16 as build

# Install build dependencies for underlying OS
RUN apt-get update && apt-get install -y g++ build-essential

# Print Node.js & npm versions
RUN node --version
RUN npm --version

# Install the dependencies
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --no-audit

# Build the project
COPY public ./public
COPY src ./src
RUN npm run build

#####################
### Runtime image ###
#####################

FROM nginx:latest
EXPOSE 80

# Install tools
RUN apt-get update && apt-get install -y curl procps htop

# Overwrite default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY proxy/conf.d/frontend.conf /etc/nginx/conf.d/frontend.conf
COPY proxy/nginx.conf /etc/nginx/nginx.conf

# Copy required frontend files
COPY --from=build /usr/src/app/build /usr/share/nginx/html
