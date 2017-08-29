<?php
/*$target_dir = "js/data-uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}*/
?>

<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin", "*");

$json_data = "";
$target_dir = "js/data-uploads/";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$json_data = test_input($_POST["json_data"]);
	echo $json_data;
	$t=time();
	$timestamp = date("Y-m-d.H-i-s",$t);
	
	rename( "js/data.json", "js/data.json-$timestamp" );
	rename( "js/data.json-$timestamp", "data_backup/data.json-$timestamp" );
	
	$jsonFile = fopen("js/data.json", "w") or die("Unable to open file!");
	fwrite($jsonFile, $json_data);
	fclose($jsonFile);
	
	header("HTTP/1.1 200 OK", true, 200);
}
else{
	echo "rk error";
	header('HTTP/1.1 401 Unauthorized', true, 401);
}

function test_input($data) {
  $data = trim($data);
  //$data = stripslashes($data);
  //$data = htmlspecialchars($data);
  return $data;
}
?>