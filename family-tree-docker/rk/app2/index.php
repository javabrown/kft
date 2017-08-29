
 <?php 
          require('../../../wp-blog-header.php');
		  include('../../../wp-content/themes/hestia/header.php'); ///wp-content/themes/hestia
		  get_header();
?> 
 
   
<head1>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width">
    <title> Custom colored example </title>
	
	<link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/Treant.css">
    <link rel="stylesheet" href="css/custom-colored.css">
    

    <!-- Bootstrap setup begin -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <!-- Bootstrap setup end -->
	
	<script src="js/new-tree-data.js"></script>  
	
    <script src="js/custom-colored.js"></script>  
	
	<script src="js/raphael.js"></script>
    <script src="js/Treant.js"></script>
  
    <script src="js/main.js"></script>
</head1>

<body1>
    

	<div class="chart" id="custom-colored"> --@-- </div>

    <script> 
	
	    //setTimeout(function(){ new Treant( chart_config );}, 1100);
        //new Treant( chart_config );
        /*var chart_config = readDataFromLocalStore();
        
        if(chart_config){
        	alert('data initiatlized from local store' + chart_config);
			new Treant( chart_config );
        }
        else{
        	//chart_config = initWithDummyJson();
        	loadJSON('js/tree-data.json', function(data){ alert(JSON.stringify(chart_config));
        		chart_config = data;
				new Treant( chart_config );
				
				alert('chart_config set' + chart_config);
        	});
        }		*/
    </script>
	

    <!-- Dialog setup Begin -->
        <!-- button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button -->
        
          <!-- Modal -->
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                       <form>
                            
                            <input type="text" class="form-control" id="cid" disabled>
                            
                            <div class="form-group">
                              <label for="email">Name:</label>
                              <input type="text" class="form-control" id="cname">
                            </div>
                            <div class="form-group">
                              <label for="pwd">Description:</label>
                              <input type="text" class="form-control" id="cdescription">
                            </div>
                            <button type="submit" id="add-new-child" class="btn btn-default">Save</button>
                        </form>
					   
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
              
            </div>
          </div>	
    <!-- Dialog Setup End -->
	
	
</body1>


