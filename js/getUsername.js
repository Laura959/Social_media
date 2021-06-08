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
        console.log(response);
        const list = JSON.parse(response);
        console.log(list);
        var i = 0;
        while (i < list.length) {
            var content = document.getElementById('content');
            var div = document.createElement('div');
            content.appendChild(div);
            var h1 = document.createElement('h1');
            div.appendChild(h1);
            h1.innerHTML = list[i].TITLE;
            i++;
        }
    } else {
        alert("Connection issues!");
    }
}