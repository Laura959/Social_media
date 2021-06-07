function getUsername() {
    var main = new Object();
    main.username = localStorage.getItem("storageName");

    var name = document.getElementById('username');
    name.innerHTML = main.username;
    getContentList();
}

function getContentList() {
    var http = new XMLHttpRequest();
    var url = "http://localhost:8888/getContentList";

    http.open("GET", url, false);
    http.send();
    var response = http.responseText;

    if (http.status == 200) {
        const list = JSON.parse(response);
        console.log(list[0]);
    } else {
        alert("Connection issues!");
    }
}