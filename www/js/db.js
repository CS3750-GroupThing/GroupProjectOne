function syncDB()
{
	var url = "http://icarus.cs.weber.edu/~al53910/db.php";
	var userName = "TestOwner";
	var passWord = "7faa7303f769ce1d1f9c88bb669fbad62320c09eb131a47d78119842918853235f862caf9d9b2d6191cb03dad28609605c3f9298a8b81ab68674253e9e71d076";
	var doAction = "GET";
        var data = {
            username: userName,
            password: passWord,
            action: doAction
        }
	var headers = {
            'Accept': "application/json; encoding='utf-8'",
            'Content-Type': "application/json; encoding='utf-8'"
        };

        $.ajax({
		url: url,
		type: "POST",
		headers: headers,
		crossdomain: true,
		dataType: 'json',
		cache: false,
		data: data,
		success: function (response) {
			console.log("Sync Ajax success: " + JSON.stringify(response));                  
		},
		error: function(response) {
			console.log("Sync Ajax error: " + JSON.stringify(response)); 
		}
        });

	var simulatedJSONfromWebsite = { "todo_Items" : [
		{ "hash":"sdgsdgdsghsdhhdshdsast3t34tgdsg" , "description":"Todo #1" },
		{ "hash":"dfh54hhdfhdh54ujjffdhj45dhjf4fg" , "description":"Todo #2" },
		{ "hash":"433grgfdgb45yyhdrh54hfdh56u5yu4" , "description":"Todo #3" }]
	}
	for(i = 0;i<simulatedJSONfromWebsite.todo_Items.length;i++)
	{
		console.log("Hash: " + simulatedJSONfromWebsite.todo_Items[i].hash + " Description: " + simulatedJSONfromWebsite.todo_Items[i].description);
	}

	/*var test = "Test";
	var strJSON = '{"result":true,"reason":\"'+ test +'\"}'
	var jsonResults = eval("(function(){return " + strJSON + ";})()");
	alert(jsonResults.result);
	alert(jsonResults.reason);
	*/
}
