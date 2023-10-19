1. thinking about application architecture: it should be split in two cores, files and storage. The reasoning behind that choice is that file should be like a "metadata-only" interface to the final user, the storage instead is the real interface with the files
2. the files module should have only CRUD operations, we can think about cleanup async
3. the storage module should have only commands
4. the flux architecture should be using mqtt (as mentioned on the pdf). I could propose something different like GPRC but currenlty we stick with MQTT. Depends on the use-case.
5. Since we are using MQTT and we want to have something resilient, I propose chunking data, the plan is: create a file upload request, the client chunks the file and uploads it using a topic, the client asks for the file metadata, listens to the download topic, the client asks for the stream to start
