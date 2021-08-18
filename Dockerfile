FROM node:14-slim as client-base
RUN mkdir /app && chown -R node:node /app
ENV NODE_ENV=production
WORKDIR /app
USER node
COPY --chown=node:node ./client/package*.json ./
RUN npm install --no-optional --silent && npm cache clean --force > "/dev/null" 2>&1

FROM node:14-slim as server-base
RUN apt-get -qq update; apt-get -qq install wget gpg -y
ENV NODE_ENV=production
RUN dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')"; \
  export TINI_VERSION='0.18.0'; \
  wget -O /usr/local/bin/tini "https://github.com/krallin/tini/releases/download/v$TINI_VERSION/tini-$dpkgArch"; \
  wget -O /usr/local/bin/tini.asc "https://github.com/krallin/tini/releases/download/v$TINI_VERSION/tini-$dpkgArch.asc"; \
  export GNUPGHOME="$(mktemp -d)"; \
  gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys 6380DC428747F6C393FEACA59A84159D7001A4E5; \
  gpg --batch --verify /usr/local/bin/tini.asc /usr/local/bin/tini; \
  gpgconf --kill all; \
  rm -r "$GNUPGHOME" /usr/local/bin/tini.asc; \
  chmod +x /usr/local/bin/tini;
RUN apt-get -qq purge wget gpg -y; apt-get -qq autoremove -y; apt-get -qq autoclean; rm -rf /var/lib/{apt,dpkg,cache,log}/
# apt-get is unavailable after this point
EXPOSE 8080
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node ./package*.json ./
RUN  npm install --no-optional --silent && npm cache clean --force > "/dev/null" 2>&1

# Development ENV
FROM server-base as server-dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install --only=development --no-optional --silent && npm cache clean --force > "/dev/null" 2>&1
CMD ["nodemon", "index.js", "--inspect=0.0.0.0:9229"]

# Development ENV
FROM client-base as client-dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm install --only=development --no-optional --silent && npm cache clean --force > "/dev/null" 2>&1
CMD ["npm", "start"]

FROM client-base as client-source
ENV NODE_ENV=production
COPY --chown=node:node ./client .
RUN npm run build

FROM server-base as server-source
COPY --chown=node:node . .

# Production ENV
FROM server-source as prod
COPY --from=client-source /app/build ./client/build
ENTRYPOINT ["/usr/local/bin/tini", "--"]
CMD ["node", "index.js"]