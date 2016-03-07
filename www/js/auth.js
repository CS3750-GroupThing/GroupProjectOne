
function authenticate(tx, results)
{
	var len = results.rows.length;
	if (len == 0)
	{
		console.log("No users are logged in.  Redirecting to login.html");
	} else {
		console.log("Found userid '" + results.rows.item(0).id + "' logged in.");
		owner_ID = results.rows.item(0).id;
		document.getElementById("name").innerHTML = results.rows.item(0).username;
	}

}

function auth(tx)
{
	tx.executeSql("SELECT id, username FROM todo_Users WHERE loggedin=" + 1 + " LIMIT 1", [], authenticate, errorCB);
}