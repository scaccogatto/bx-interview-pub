<p align="center">
  <a href="https://bonusx.it/" target="blank"><img src="https://bonusx.it/wp-content/uploads/2021/12/cropped-header_2022.png" width=400" alt="Bonusx Logo" /></a>
</p>

# bx-file-transfer-service

## Index

- [Description](#description)
- [Running](#running)
- [Test](#test)

## <a id="description">🔗</a> Description

Repository based on [Nest](https://github.com/nestjs/nest) framework with typescript.

This repository is based on Template for microservices, it communicates with the other services/microservices through a message broker.

## Batteries included

The message broker is included for development purpose, in production it is an external instance.

## <a id="running">🔗</a> Running the containers

```bash
# service run in watch mode
docker-compose up -d

# stop all
docker-compose down
```

## <a id="test">🔗</a> Test

```bash
# unit tests
docker-compose exec -it bx_file_transfer_service yarn test

```

---
