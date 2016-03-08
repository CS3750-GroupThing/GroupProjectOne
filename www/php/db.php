<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	/*
		This form is looking for the $_POST['username'], $_POST['password'], $_POST['action'](GET,DELETE, ADD) and $_POST['data']
		The actions below perform the following functions
		- ADD - Inserts an entry in to todo_Items using the $_POST['data'] as the description
		- DELETE - Deletes 1 entry from todo_Items where id=$_POST['data']
		- GET - Returns all of the current entries belonging to $owner_ID in a JSON format
	*/

	/* For testing these values are in the Icarus database
		Username: JoeBiden
		Password: AnotherPassword encrypted into 8b5379d82d16e4c1fbe6aeb16b494da8bc11077571c994b47aafb8150abb4beeaa7ed43023edaebdfada54d003d402a1765a25e07f5b4009abbce83eb8acb19a

		Username: TestOwner
		Password: MyPassword encrypted into 7faa7303f769ce1d1f9c88bb669fbad62320c09eb131a47d78119842918853235f862caf9d9b2d6191cb03dad28609605c3f9298a8b81ab68674253e9e71d076
	*/


	/*
		Examples of database inserts for MysQL
		ID 1: INSERT INTO `W00353910`.`todo_Users`(`username`, `password`) VALUES ("TestOwner","7faa7303f769ce1d1f9c88bb669fbad62320c09eb131a47d78119842918853235f862caf9d9b2d6191cb03dad28609605c3f9298a8b81ab68674253e9e71d076")
		ID 2: INSERT INTO `W00353910`.`todo_Users`(`username`, `password`) VALUES ("JoeBiden","8b5379d82d16e4c1fbe6aeb16b494da8bc11077571c994b47aafb8150abb4beeaa7ed43023edaebdfada54d003d402a1765a25e07f5b4009abbce83eb8acb19a")

		INSERT INTO `todo_Items` (`owner`, `completed`, `description`) VALUES ('1', '0', 'Joe Biden Todo #1');
		INSERT INTO `todo_Items` (`owner`, `completed`, `description`) VALUES ('2', '0', 'NewOwner Todo #1');
	*/

	/* VERIFY A USERNAME, PASSWORD AND ACTION WERE SUPPLIED VIA POST submission */
	if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['action']))
	{


		/* INITIALIZE ICARUS DB LOGIN INFORMATION */
		$servername = "localhost";
		$username = "W00353910";
		$password = "Aaroncs!";

		$post_Username = $_POST['username'];
		$post_Password = $_POST['password'];
		$post_Action = $_POST['action'];
		$post_Data = $_POST['data'];

		// Create connection
		$conn = new mysqli($servername, $username, $password);

		// Check connection
		if ($conn->connect_error) {
			die(json_encode('{"response":"failure","reason":"' . $conn->connect_error . '"}'));
		}
		
		/*echo "Connected successfully";*/
		$sql = "SELECT id, username, password FROM `todo_Users` WHERE username='$post_Username' LIMIT 1";
		
		/*$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));*/
		$result = mysqli_query($connection, $sql) or die(json_encode('{"response":"failure","reason":"' . mysqli_error($connection) . '"}'));
		$row = mysqli_fetch_assoc($result);
		$owner_ID = $row['id'];

		/* VERIFY $_POST USERNAME AND PASSWORD AGAINST DATABASE USERNAME AND PASSWORD */
		if (($row['username'] == $post_Username) && ($row['password'] == $post_Password))
		{
			if ($post_Action == "GET") 
			{
				// Fetch table rows from mysql db
				$sql = "SELECT * FROM `todo_Items` WHERE OWNER='$owner_ID'";
				$result = mysqli_query($connection, $sql) or die("Error: " . mysqli_error($connection));
				$emparray = array();
				while($row=mysqli_fetch_assoc($result))
				{
					$emparray[] = $row;
				}
				/* Return values in a JSON format */
				die(json_encode($emparray));
			} else if ($post_Action == "DELETE") {
				$sql = "DELETE * FROM `todo_Items` WHERE id='$post_Data' AND owner='$owner_ID'";
				/*$result = mysqli_query($connection, $sql) or die("Error: " . mysqli_error($connection));*/
				if (mysqli_query($connection, $sql))
				{
					die(json_encode('{"response":"success","reason":"none"}'));
				} else {
					die(json_encode('{"response":"failure","reason":"' . mysqli_error($connection) . '"}'));
				}
			} else if ($post_Action == "ADD") {
				$sql = "INSERT INTO `todo_Items` (`owner`, `completed`, `description`) VALUES ('$owner_ID', '0', '$post_Data');";
				//$result = mysqli_query($connection, $sql) or die("Error: " . mysqli_error($connection));
				if (mysqli_query($connection, $sql))
				{
					die(json_encode('{"response":"success","reason":"none"}'));
				} else {
					die(json_encode('{"response":"failure","reason":"' . mysqli_error($connection) . '"}'));
				}
			} else {
				die(json_encode('{"response":"failure","reason":"invalid action"}'));
			}

		} else {
			die(json_encode('{"response":"failure","reason":"invalid username/password"}'));
		}
	} else {
		die(json_encode('{"response":"failure","reason":"invalid post data"}'));
	}
?>
