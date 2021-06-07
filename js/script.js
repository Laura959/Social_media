function login() {
    var email = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var login = new Object();
    login.username = email;
    login.pass = password;
    var jsonString = JSON.stringify(login);

    var http = new XMLHttpRequest();
    var url = "http://localhost:8888/login";

    http.open("POST", url, false);
    http.send(jsonString);
    var response = http.responseText;

    if (http.status == 200) {
        var username = http.responseText;
        localStorage.setItem("storageName", username);
        window.location.href = "main.php";
    } else {
        alert("wrong password!");
    }
}