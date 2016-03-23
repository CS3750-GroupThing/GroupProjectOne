// Test
var url = "http://icarus.cs.weber.edu/~al53910/db.php";
//var userName = "TestOwner";
//var passWord = "7faa7303f769ce1d1f9c88bb669fbad62320c09eb131a47d78119842918853235f862caf9d9b2d6191cb03dad28609605c3f9298a8b81ab68674253e9e71d076";

function getDB()
{
	var jsonTodoItems;
	var headers = {
            'Accept': "application/json; encoding='utf-8'",
            'Content-Type': "application/json; encoding='utf-8'"
        };
	$.post(url,
	{
		username: userName,
		//password: passWord,
		action: "GET"
	},
	function(data,status)
	{
		console.log(data);
		drawTable(data);
	});
}

function completeToDo(id)
{
	var jsonTodoItems;
	var headers = {
            'Accept': "application/json; encoding='utf-8'",
            'Content-Type': "application/json; encoding='utf-8'"
        };
	$.post(url,
	{
		username: userName,
		//password: passWord,
		action: "UPDATE",
		id: id
	},
	function(data,status)
	{
		console.log(data);
		getDB();
	});
}

function addTodo(description)
{
	var todoDesc = prompt("Description?");
	if (todoDesc != null) {
		var jsonTodoItems;
		var headers = {
			'Accept': "application/json; encoding='utf-8'",
			'Content-Type': "application/json; encoding='utf-8'"
		};
		$.post(url,
		{
			username: userName,
			//password: passWord,
			action: "ADD",
			data: todoDesc
		},
		function(data,status)
		{
			console.log(data);
			getDB();
		});
	}
}


function delTodo(id)
{
	var jsonTodoItems;
	var headers = {
            'Accept': "application/json; encoding='utf-8'",
            'Content-Type': "application/json; encoding='utf-8'"
        };
	$.post("http://icarus.cs.weber.edu/~al53910/db.php",
	{
		username: userName,
		//password: passWord,
		action: "DELETE",
		id: id
	},
	function(data,status)
	{
		console.log(data);
		getDB();
	});
}