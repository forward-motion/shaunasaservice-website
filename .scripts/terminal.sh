#!/usr/bin/env bash
docker exec -it shaunasaservice-website /bin/bash
docker run --rm -it --env-file .env.development -v $(pwd):/usr/src/app -p 8005:8000 shaunasaservice-website /bin/bash