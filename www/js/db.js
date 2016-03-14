function syncDBTX(tx)
{
	tx.executeSql("SELECT * FROM todo_Items WHERE owner=" + owner_ID + " ORDER BY id DESC", [], syncDB, errorCB);

}

function syncDB(tx, results)
{
	var jsonTodoItems;
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
		action: GET
	},
	function(data,status){
		if (status == "success")
		{
			/*console.log("Data: " + data + "\nStatus: " + status);*/
		    /* ##############################################################################################################
				Adding any remote todo items to the local database which are missing
                       ############################################################################################################## */
			var jsonItems = JSON.parse(data);
			var found = false;

			//console.log("Trying to parse JSON: " + jsonTodoItems + " with a length of " + jsonItems.length);
			for(var i = 0;i<jsonItems.length;i++)
			{
				console.log("Searching retrieved JSON values for a hash matching: " + jsonItems[i].hash);
				//console.log("JSON Item: " + i + " - hash: " + jsonItems[i].hash + " - timedate: " + jsonItems[i].timedate + " - completed: " + jsonItems[i].completed + " - description: " + jsonItems[i].description);

				for(var j = 0;j<results.rows.length;j++)
				{
					if (jsonItems[i].hash == results.rows.item(j).hash)
					{
						console.log("Match found for : " + jsonItems[i].hash + ". Checking for updates.");
						if (jsonItems[i].completed != results.rows.item(j).completed)
						{
							completeToDo(results.rows.item(j).id, jsonItems[i].completed)
						}
						found = true;
					}
				}
				if (found == false)
				{
					console.log("No match found for : " + jsonItems[i].hash + ".  Inserting into local database.");
					addTodoFromRemote(jsonItems[i].hash, jsonItems[i].timedate, jsonItems[i].completed, jsonItems[i].description);
					//tx.executeSql("INSERT INTO todo_Items (hash, owner, completed, description) VALUES ('" + jsonItems[i].hash + "', "+ owner_ID + ", " + jsonItems[i].completed + ", '" + jsonItems[i].description + "')");
				}
				found = false;
			}

		    /* ##############################################################################################################
				Adding any local todo items to the remote database which are missing
                       ############################################################################################################## */
			/*var jsonItems = JSON.parse(data);
			var found = false;

			//console.log("Trying to parse JSON: " + jsonTodoItems + " with a length of " + jsonItems.length);
			for(var i = 0;i<results.rows.length;i++)
			{
				console.log("Searching through retrieved JSON values for a hash matching: " + results.rows.item(i).hash);

				for(var j = 0;j<jsonItems.length;j++)
				{
					if (jsonItems[j].hash == results.rows.item(i).hash)
					{
						console.log("Match found for : " + jsonItems[j].hash + ". Checking for updates.");
						if (jsonItems[j].completed != results.rows.item(i).completed)
						{
							completeToDo(results.rows.item(i).id, jsonItems[j].completed)
						}
						found = true;
					}
				}
				if (found == false)
				{
					console.log("No match found for : " + results.rows.item(j).hash + ".  Inserting into remote database.");
					$.post("http://icarus.cs.weber.edu/~al53910/db.php",
					{
						username: userName,
						password: passWord,
						action: ADD,
						hash: results.rows.item(j).hash,
						completed: results.rows.item(j).completed,
						timedate: hash: results.rows.item(j).timedate
						
					},
					function(data,status){
						// Do nothing as it will correct itself on the next sync.	
					}
				found = false;
			}*/
			db.transaction(queryDB, errorCB);

		} else {
			console.log("Status: " + status);
		}
	});

}