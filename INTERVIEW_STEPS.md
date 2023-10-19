Create a new File:

```sh
curl --location 'http://localhost:3000/files/create' \
--header 'Content-Type: application/json' \
--data '{
    "fileName": "mock-file-name.pdf",
    "contentType": "application/pdf",
    "size": 10000
}'
```

Send MQTT into the returned topic using the format:

```json
{
  "data": {
    "data": {
      "type": "Buffer",
      "data": [116,101,115,116]
    },
    "chunk": 0
  }
}
```

Get the download metadata using:

```sh
curl --location 'http://localhost:3000/files/:objectId'
```

Listen to the returned MQTT topic
Start the stream!

```sh
curl --location --request POST 'http://localhost:3000/storage/:objectId/start-stream'
```
