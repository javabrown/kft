<?php 
          require('../../../wp-blog-header.php');
		  include('../../../wp-content/themes/hestia/header.php'); ///wp-content/themes/hestia
		  get_header();
?> 
 
 
    <head1>
        <title>Family Tree</title>
		<script type="text/javascript" src="http://d3js.org/d3.v3.js"></script>
		<!-- script src="js/d3.js"></script -->
		
        <!-- script src="js/main.js"></script -->
     
		 <link rel="stylesheet" type="text/css" href="css/style.css">
         <script src="js/main.js"></script>
		 
		<script type="text/javascript">     
		   // window.addEventListener('load', init, false );

            /*function init(){
                 loadJs("js/main.js");
                 return false;
            }*/
			
            /*function loadJs(fileName){
                setTimeout(function(){
                     var script = document.createElement("script");
                     script.type = "text/javascript";
                     script.src = fileName; 
                     document.getElementsByTagName("head")[0].appendChild(script);
			 	 }, 10);
            }*/
        </script>
        
    </head1>
    
 
 <?php get_footer(); ?>