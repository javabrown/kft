



<?php 
          require('../../../wp-blog-header.php');
		  include('../../../wp-content/themes/hestia/header.php'); ///wp-content/themes/hestia
		  get_header();
?> 
 
 
   
    <head1>

        <meta charset="utf-8" />

        <link rel="stylesheet" href="style/css/fskytree.css">

        <title>Family Tree</title>
        <script data-main="main.js" src="vendor/require.js"></script>

    </head1>

    <body1>

        <div id="fskytree-history">
            <h3 class="title">Family Tree</h3>
            <ul class="history-list"></ul>
        </div>

        <div id="fskytree-wrapper">
            <div class="fskytree-container"></div>
        </div>

    </body1>
    
 
 <?php get_footer(); ?>