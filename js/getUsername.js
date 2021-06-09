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
            var body = document.getElementById('section');
            var content = document.createElement('div');
            body.appendChild(content);
            content.setAttribute('id', 'content');
            var card = document.createElement('div');
            content.appendChild(card);
            var image = document.createElement('div');
            card.appendChild(image);
            image.setAttribute('class', 'image');
            var postImage = document.createElement('img');
            image.appendChild(postImage);
            postImage.setAttribute('alt', 'img');
            postImage.setAttribute('src', '#');

            // Text Content
            var textDiv = document.createElement('div');
            card.appendChild(textDiv);
            var newsText = document.createElement('div');
            textDiv.appendChild(newsText);
            newsText.setAttribute('class', 'news-text');
            var portfolioImg = document.createElement('img');
            newsText.appendChild(portfolioImg);
            portfolioImg.setAttribute('alt', 'portfolio');
            portfolioImg.setAttribute('src', '#');
            var infoDiv = document.createElement('div');
            newsText.appendChild(infoDiv);
            var h2 = document.createElement('h2');
            infoDiv.appendChild(h2);
            h2.setAttribute('id', 'username2');
            h2.innerHTML = list[i].NAME;
            var h3 = document.createElement('h3');
            infoDiv.appendChild(h3);
            h3.innerHTML = list[i].CREATION;
            var p = document.createElement('p');
            textDiv.appendChild(p);
            p.innerHTML = list[i].CONTENT;

            //buttons and comment field
            var buttons = document.createElement('div');
            card.appendChild(buttons);
            buttons.setAttribute('class', 'buttons');
            var like = document.createElement('button');
            buttons.appendChild(like);
            like.setAttribute('class', 'like');
            like.innerHTML = 'Like';
            var edit = document.createElement('button');
            buttons.appendChild(edit);
            edit.setAttribute('class', 'edit');
            edit.innerHTML = 'Edit';
            var deleted = document.createElement('button');
            buttons.appendChild(deleted);
            deleted.setAttribute('class', 'delete');
            deleted.innerHTML = 'Delete';
            var inputDiv = document.createElement('div');
            buttons.appendChild(inputDiv);
            var comment = document.createElement('input');
            inputDiv.appendChild(comment);
            comment.setAttribute('type', 'text');
            comment.setAttribute('class', 'comment');
            comment.setAttribute('name', 'comment');
            comment.setAttribute('placeholder', 'Write your comment');

            i++;
        }
    } else {
        alert("Connection issues!");
    }
}

function newEntry() {
    var http = new XMLHttpRequest();
    var url = "http://localhost:8888/newEntry";

    http.open("POST", url, false);
    http.send(jsonString);
    var response = http.responseText;

    if (http.status == 200) {
        console.log(response);
        const list = JSON.parse(response);
        console.log(list);
    } else {
        alert("Entry was not posted");
    }
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}