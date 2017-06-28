git pull 

docker login

docker build -t getrk/family-tree .

docker push

docker run -p 90:80 getrk/family-tree

start http://localhost:90/app2/