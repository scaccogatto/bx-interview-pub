## majors

1. when I first run docker compose up, the bx-file-service was not ready to be used
2. I had to install nest cli into the docker in order to make it run
3. we could make a step-build dockerfile to improve build times
4. yarn install is done in the dockerfile, basically assuming that you already have installed the package in your system. infact if you run it from scratch, the node_modules directory is not here (because the volume just overwrites it) in that case I had to run a fresh yarn install inside the container, but it should be done as a post-install in developer mode (or at least documented)
5. no storage system is provided, I choose minio for dev purposes, to be changed with something like s3 or similar in production

## minors
1. removed all the examples files from the root src directory -> for cleaning purposes I will use only modules (way cleaner imho)