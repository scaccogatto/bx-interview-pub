1. there is no file upload type checking requested from the document, we could add it and check it with the filetype validator or maybe with a more secure magic-number checker
2. we can implement an actual db to store the file's metadata, something like mongo could be ok, then we can enable the reasearch feature using elasticsearch or similar
3. we can implement the other metadata mentioned by the document in a next phase
4. we can implement an extra param to the storage in order to get a specific chunk in case of corruption
5. we can implement a corruption check mechanism, like mathing source filesum with the final one. Minio has also a feature that dinamically merge some files and gives you back a stream, we can use that
6. we can implement authentication, should be easy enough choosing a provider
7. we can implement a streamId each time there is a new stream request, so we can track that
8. we can add more error handling and retry features especually into the streaming part
9. we can add checks, for example the payload size for each chunk
10. we can add more security, making a trigger on minio that checks the maxChunks allowed, also in runtime when a user tries to upload a not allowed chunk
11. might be interesting to explore https://tus.io/ + partials from minio. I like the combo but I decided to avoid it because it felt like cheating for the interview
