<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
$servername = "localhost";
$username = "W00353910";
$password = "Aaroncs!";
$dbName = "W00353910";
$db_server = mysqli_connect($servername,$username,$password,$dbName);
if(!$db_server) die("Unable to connect to MYSQL:" . mysql_error());


if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['action'])) {
	$userName = $_POST['username'];
	$passWord = $_POST['password'];
	if($_POST['action'] == "add")
	{
		$sql_query = "INSERT INTO todo_Users (username, password) VALUES('".$userName."','".$passWord."')";
		$sql = mysqli_query($db_server, $sql_query);
		if ($sql){
			//http_response_code(201);
			die("Success");
		} else {
			//http_response_code(401);
			die("Failure");
		}
	} elseif ($_POST['action'] == "get") {
		$sql_query = "SELECT COUNT(*) FROM todo_Users WHERE username = '".$userName."' AND password ='".$passWord."'";
		$sql = mysqli_query($db_server, $sql_query);
		$count = mysqli_fetch_row($sql);
		if ($count[0] == 1) {
			//http_response_code(201);
			die("Success");
		} else {
			//http_response_code(401);
			die("Failure");
		}
	}        
}
//		$sql_query = "SELECT COUNT(*) FROM todo_Users WHERE 1";




