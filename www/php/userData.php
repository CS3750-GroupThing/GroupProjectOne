<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

$db_server = mysqli_connect("localhost","scottschollmeyer","Ilovemy3pets!","CS3750");
if(!$db_server) die("Unable to connect to MYSQL:" . mysql_error());

var_dump(isset($_POST['action']));

if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['action'])){
	$userName = $_POST['username'];
	$passWord = $_POST['password'];
	if($_POST['action'] == "add")
	{
		$sql_query = "INSERT INTO users (username, password) VALUES('".$userName."','".$passWord."')";
	    $sql = mysqli_query($db_server, $sql_query);
	}elseif ($_POST['action'] == "get"){
		$sql_query = "SELECT FROM users WHERE username = '".$userName."' AND password ='" .$passWord."' ";
	    $sql = mysqli_query($db_server, $sql_query);
	}
        
echo $_POST['username'];
}





