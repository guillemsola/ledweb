# FROM node:alpine
FROM node

# don't run as root
RUN useradd --user-group --create-home --shell /bin/false app
ENV HOME=/home/app
USER app

WORKDIR $HOME

ADD . $HOME

EXPOSE 3000

CMD node index.js