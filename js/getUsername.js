    var activeUser;

    function getUsername() {
        var main = new Object();
        main.username = localStorage.getItem("storageName");
        activeUser = localStorage.getItem("storageName");
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
                p.setAttribute('id', 'id-' + list[i].ID);
                textDiv.appendChild(p);
                p.innerHTML = list[i].CONTENT;

                //buttons and comment field
                var buttons = document.createElement('div');
                card.appendChild(buttons);
                buttons.setAttribute('class', 'buttons');
                var like = document.createElement('button');
                buttons.appendChild(like);
                like.setAttribute('class', 'like');
                like.setAttribute('onclick', 'likeNews(this.id);'); // for FF
                like.onclick = function() { likeNews(this.id); }; // for IE
                like.setAttribute('id', 'like-' + list[i].ID);
                like.innerHTML = 'Like';
                var edit = document.createElement('button');
                buttons.appendChild(edit);
                edit.setAttribute('class', 'edit');
                edit.setAttribute('onclick', 'editNews(this.id);'); // for FF
                edit.onclick = function() { editNews(this.id); }; // for IE
                edit.setAttribute('id', list[i].ID);
                edit.innerHTML = 'Edit';
                var deleted = document.createElement('button');
                buttons.appendChild(deleted);
                deleted.setAttribute('class', 'delete');
                deleted.setAttribute('onclick', 'deleteNews(this.id);'); // for FF
                deleted.onclick = function() { deleteNews(this.id); }; // for IE
                deleted.setAttribute('id', 'delete-' + list[i].ID);
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
        var newsDescription = new Object();
        newsDescription.content = document.getElementById('news-entry').value;
        newsDescription.username = activeUser;
        console.log(newsDescription);

        var jsonString = JSON.stringify(newsDescription);

        var http = new XMLHttpRequest();
        var url = "http://localhost:8888/newEntry";

        http.open("POST", url, false);
        http.send(jsonString);
        var response = http.responseText;

        if (http.status == 200) {
            alert("Success!");
        } else {
            alert("Entry was not posted");
        }
    }

    function editNews(id) {
        var id = id;
        var content = document.getElementById('id-' + id).innerHTML;
        var textarea = document.getElementById('news-entry');
        textarea.innerHTML = content;
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        var button = document.getElementById('create-news');
        button.onclick = function() {
            var alteredDescription = new Object();
            alteredDescription.activeUser = activeUser;
            alteredDescription.content = document.getElementById('news-entry').value;
            alteredDescription.id = id;
            console.log(alteredDescription.activeUser);

            var jsonString = JSON.stringify(alteredDescription);

            var http = new XMLHttpRequest();
            var url = "http://localhost:8888/editEntry";

            http.open("POST", url, false);
            http.send(jsonString);

            if (http.status == 200) {
                alert("Success!");
            } else {
                alert("Only news author can edit news!");
            }
        }
    }

    function deleteNews(id) {
        var newId = id.substring(7);
        var modal = document.getElementById("myModal-delete");
        var span = document.getElementsByClassName("closed")[0];
        modal.style.display = "block";

        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        var button = document.getElementById('delete-news');
        button.onclick = function() {
            var deleteDescription = new Object();
            deleteDescription.id = newId;

            var jsonString = JSON.stringify(deleteDescription);

            var http = new XMLHttpRequest();
            var url = "http://localhost:8888/deleteEntry";

            http.open("POST", url, false);
            http.send(jsonString);

            if (http.status == 200) {
                alert("Success!");
                modal.style.display = "none";
            } else {
                alert("Error");
                modal.style.display = "none";
            }

        }
    }

    function likeNews(id) {
        var like = new Object();
        like.id = id;
        like.username = activeUser;

        var jsonString = JSON.stringify(like);

        var http = new XMLHttpRequest();
        var url = "http://localhost:8888/likeEntry";

        http.open("POST", url, false);
        http.send(jsonString);
        var response = http.responseText;

        if (http.status == 200) {
            alert("Success!");
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