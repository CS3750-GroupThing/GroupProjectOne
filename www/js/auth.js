
function authenticate()
{
	if (userName == null)
	{
		console.log("No users are logged in.  Redirecting to login.html");
		window.location="login.html";
	} else {
		console.log("Accessing website using the username: '" + userName + "'.");
		document.getElementById("name").innerHTML = userName;
	}

}

function auth(tx)
{
	tx.executeSql("SELECT id, username, password FROM todo_Users WHERE loggedin=" + 1 + " LIMIT 1", [], authenticate, errorCB);
}