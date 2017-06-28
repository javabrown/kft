1) Build Docker Image (Image name: hello-world)

   $docker build -t getrk/family-tree .
   
2) Run Docker Image: family-tree
    
   $docker run -p 90:80 -v src/:/var/www/html/ family-tree
   
   (Windows volume mapping has some issue. Working on it)
   
3) C:/test/docker-projects/php@docker/src"# family-tree-docker" 
