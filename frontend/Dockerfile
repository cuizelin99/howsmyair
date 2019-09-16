## Source: https://dev.to/peterj/run-a-react-app-in-a-docker-container-kjn

FROM mhart/alpine-node:11 AS builder

WORKDIR /app
COPY . .

FROM mhart/alpine-node

RUN yarn global add serve

WORKDIR /app

COPY --from=builder /app/build .

EXPOSE 5000

CMD ["serve", "-p", "5000", "-s", "."]