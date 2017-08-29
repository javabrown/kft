<!-- ?php 
          require('../../../wp-blog-header.php');
		  include('../../../wp-content/themes/hestia/header.php'); ///wp-content/themes/hestia
		  //get_header();
? --> 
 
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 
 <br/>
  
    <rktree class="panel-body tree-view">
		 
        <title>Family Tree</title>
		<script type="text/javascript" src="//d3js.org/d3.v3.js"></script>
		<!-- script src="js/d3.js"></script -->
		
        <!-- script src="js/main.js"></script -->
     
		 <link rel="stylesheet" type="text/css" href="css/style.css">
         <script src="js/main.js"></script>
		 
		<script type="text/javascript">     
 
        </script>
        
    </rktree>
		
	 <div class="container">
	  
	  <!-- Modal -->
	  <div class="modal fade" id="myModal" role="dialog">
		<div class="modal-dialog">
		
		  <!-- Modal content-->
		  <div class="modal-content">
			<div class="modal-header">
			  <button type="button" class="close" data-dismiss="modal">&times;</button>
			  <h4 class="modal-title">Edit Member | Add New Child Member</h4>
			</div>
			<div class="modal-body">
			  
			  <!-- *********MODEL-BODY-BEGIN ******* -->
				<div class="container">
					  <h2>Form control: input</h2>
		
					  <div class="col-md-6">
					  <form>
						<div class="form-group">
						  <label for="usr">Name:</label>
						  <input type="text" class="form-control" id="name">
						</div>
						<div class="form-group">
						  <label for="usr">Spause Name:</label>
						  <input type="text" class="form-control" id="spause_name">
						</div>
						

						<div class="form-group">
							<label>Upload Image</label>
							<div class="input-group">
								<span class="input-group-btn">
									<span class="btn btn-default btn-file">
										Browse… <input type="file" id="imgInp">
									</span>
								</span>
								<input type="text" class="form-control" readonly>
								<img id='img-upload' width="200" height="200"/>
							</div>
						</div>


					  </form>
					  </div>
					  
				</div>			  
			  <!-- *********MODEL-BODY-END   ******* -->
			  
			</div>
			<div class="modal-footer">
			
			  <button type="button" class="btn btn-primary" onClick="doEditSelectedMember()"  id="edit_selected_member">Edit This Member</button>
			  <button type="button" class="btn btn-warning" onClick="doAddNewMember()"  id="add_new_child_member">Add New Child Member</button>
			  <button type="button" class="btn btn-danger"  onClick="saveData()" id="save_btn">Save</button>
			  <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
			</div>
		  </div>
		  
		</div>
	  </div>
	  
	</div>
 
 <script>
	$(document).ready( function() {
			$(document).on('change', '.btn-file :file', function() {
			var input = $(this),
				label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [label]);
			});

			$('.btn-file :file').on('fileselect', function(event, label) {
				
				var input = $(this).parents('.input-group').find(':text'),
					log = label;
				
				if( input.length ) {
					input.val(log);
				} else {
					if( log ) alert(log);
				}
			
			});
			function readURL(input) {
				if (input.files && input.files[0]) {
					var reader = new FileReader();
					
					reader.onload = function (e) {
						$('#img-upload').attr('src', e.target.result);
					}
					
					reader.readAsDataURL(input.files[0]);
				}
			}

			$("#imgInp").change(function(){
				readURL(this);
			}); 	
		});
 </script>
 
    
 
 <!-- ?php get_footer(); ? -->
