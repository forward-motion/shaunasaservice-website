#!/usr/bin/env bash
docker exec -it shaunasaservice-website /bin/bash
docker run --rm -it --env-file .env.development -v $(pwd):/usr/src/app -p 8000:8000 commentbox-component /bin/bash