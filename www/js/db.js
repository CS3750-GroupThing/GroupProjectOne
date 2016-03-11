function syncDB()
{
	var url = "http://icarus.cs.weber.edu/~al53910/db.php";
	var userName = "TestOwner";
	var passWord = "7faa7303f769ce1d1f9c88bb669fbad62320c09eb131a47d78119842918853235f862caf9d9b2d6191cb03dad28609605c3f9298a8b81ab68674253e9e71d076";
	var doAction = "GET";
	var headers = {
            'Accept': "application/json; encoding='utf-8'",
            'Content-Type': "application/json; encoding='utf-8'"
        };
	$.post("http://icarus.cs.weber.edu/~al53910/db.php",
	{
		username: userName,
		password: passWord,
		action: doAction
	},
	function(data,status){
		if (status == "success")
		{
			/*console.log("Data: " + data + "\nStatus: " + status);*/
			compareJSON(data);
		} else {
			console.log("Status: " + status);
		}
	});
}
function compareJSON(decodeTodoItems)
{
	var jsonItems = JSON.parse(decodeTodoItems);
	console.log("Trying to parse JSON: " + decodeTodoItems + " with a length of " + jsonItems.length);
	for(i = 0;i<jsonItems.length;i++)
	{
		id = jsonItems[i].id
		hash = jsonItems[i].hash
		timedate = jsonItems[i].timedate
		owner = jsonItems[i].owner
		completed = jsonItems[i].completed
		description = jsonItems[i].description
		console.log("Item: " + i + " - hash: " + hash + " - timedate: " + timedate + " - completed: " + completed + " - description: " + description);
		/*
		#######################################################################################################################
		    Foreach row decoded from server, search the local database
			- If not found, insert.
			- If found, compare and update accordingly.
		#######################################################################################################################
		    Foreach row from local database, search the remote JSON values and add/remove/update remote values accordingly
		#######################################################################################################################
		*/
	}


}
