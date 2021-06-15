    var activeUser;

    document.getElementById('search').addEventListener('keyup', function(event) {
        if (event.code === 'Enter') {
            event.preventDefault();
            var searchTerm = new Object();
            searchTerm.content = event.target.value;

            console.log(searchTerm);

            var jsonString = JSON.stringify(searchTerm);

            var http = new XMLHttpRequest();
            var url = "http://localhost:8888/searchNews";

            http.open("POST", url, false);
            http.send(jsonString);
            var response = http.responseText;
            console.log(response);
            if (http.status == 200) {
                const list = JSON.parse(response);
                var i = 0;
                var replace = document.getElementById('get-container');
                replace.parentNode.removeChild(replace);
                var body = document.getElementById('section');
                var getContainer = document.createElement('div');
                body.appendChild(getContainer);
                getContainer.setAttribute('id', 'get-container');
                while (i < list.length) {
                    var content = document.createElement('div');
                    getContainer.appendChild(content);
                    content.setAttribute('class', 'content');
                    var card = document.createElement('div');
                    content.appendChild(card);
                    var image = document.createElement('div');
                    card.appendChild(image);
                    image.setAttribute('class', 'image');
                    var postImage = document.createElement('img');
                    image.appendChild(postImage);
                    postImage.setAttribute('alt', 'img');
                    postImage.setAttribute('class', 'news-image');
                    postImage.setAttribute('src', "data:image/gif;base64," + list[i].NEWS_IMAGE + "");

                    // Text Content
                    var textDiv = document.createElement('div');
                    card.appendChild(textDiv);
                    var newsText = document.createElement('div');
                    textDiv.appendChild(newsText);
                    newsText.setAttribute('class', 'news-text');
                    var portfolioImg = document.createElement('img');
                    newsText.appendChild(portfolioImg);
                    portfolioImg.setAttribute('alt', 'portfolio');
                    portfolioImg.setAttribute('class', 'portfolio-image');
                    portfolioImg.setAttribute('src', "data:image/gif;base64," + list[i].IMAGE + "");
                    var infoDiv = document.createElement('div');
                    newsText.appendChild(infoDiv);
                    infoDiv.setAttribute('class', 'info-div');
                    var h2 = document.createElement('h2');
                    h2.setAttribute('class', 'h2-username');
                    infoDiv.appendChild(h2);
                    h2.setAttribute('id', 'username2');
                    h2.innerHTML = list[i].NAME;
                    var h3 = document.createElement('h3');
                    h3.setAttribute('class', 'upload-time');
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
                    var likeDiv = document.createElement('div');
                    buttons.appendChild(likeDiv);
                    likeDiv.setAttribute('class', 'like-div');
                    var like = document.createElement('button');
                    likeDiv.appendChild(like);
                    like.setAttribute('class', 'like');
                    like.setAttribute('onclick', 'likeNews(this.id);'); // for FF
                    like.onclick = function() { likeNews(this.id); }; // for IE
                    like.setAttribute('id', 'like-' + list[i].ID);
                    like.setAttribute('type', 'submit');
                    var likeIcon = document.createElement('i');
                    like.appendChild(likeIcon);
                    likeIcon.setAttribute('class', 'far fa-thumbs-up');
                    var span = document.createElement('span');
                    like.appendChild(span);
                    span.innerHTML = list[i].LIKES;
                    var myLikes = document.createElement('div');
                    likeDiv.appendChild(myLikes);
                    myLikes.innerHTML = "Like";
                    var editDiv = document.createElement('div');
                    buttons.appendChild(editDiv);
                    editDiv.setAttribute('class', 'edit-div');
                    var edit = document.createElement('button');
                    editDiv.appendChild(edit);
                    edit.setAttribute('class', 'edit');
                    edit.setAttribute('onclick', 'editNews(this.id);'); // for FF
                    edit.onclick = function() { editNews(this.id); }; // for IE
                    edit.setAttribute('id', list[i].ID);
                    var editIcon = document.createElement('i');
                    edit.appendChild(editIcon);
                    editIcon.setAttribute('class', 'far fa-edit');
                    var editTitle = document.createElement('div');
                    editDiv.appendChild(editTitle);
                    editTitle.innerHTML = "Edit";
                    var deleteDiv = document.createElement('div');
                    deleteDiv.setAttribute('class', 'delete-div');
                    buttons.appendChild(deleteDiv);
                    var deleted = document.createElement('button');
                    deleteDiv.appendChild(deleted);
                    deleted.setAttribute('class', 'delete');
                    deleted.setAttribute('onclick', 'deleteNews(this.id);'); // for FF
                    deleted.onclick = function() { deleteNews(this.id); }; // for IE
                    deleted.setAttribute('id', 'delete-' + list[i].ID);
                    var deleteIcon = document.createElement('i');
                    deleted.appendChild(deleteIcon);
                    deleteIcon.setAttribute('class', 'far fa-trash-alt');
                    var deleteTitle = document.createElement('div');
                    deleteDiv.appendChild(deleteTitle);
                    deleteTitle.innerHTML = "Delete";
                    var inputDiv = document.createElement('div');
                    card.appendChild(inputDiv);
                    var spanComment = document.createElement('span');
                    inputDiv.appendChild(spanComment);
                    var link = document.createElement('a');
                    spanComment.appendChild(link);
                    link.setAttribute('class', 'number-of-comments');
                    link.setAttribute('href', '#');
                    link.setAttribute('id', 'comment-' + list[i].ID);
                    link.setAttribute('onclick', 'showComments(this.id);'); // for FF
                    link.onclick = function() { showComments(this.id); }; // for IE
                    link.innerHTML = list[i].COMMENTS + ' comments';
                    var comment = document.createElement('textarea');
                    inputDiv.appendChild(comment);
                    comment.setAttribute('rows', '1');
                    comment.setAttribute('cols', '15');
                    comment.setAttribute('class', 'comment');
                    comment.setAttribute('name', 'comment');
                    comment.setAttribute('placeholder', 'Write your comment');
                    comment.setAttribute('id', 'new-com-' + list[i].ID);
                    var comBtn = document.createElement('button');
                    inputDiv.appendChild(comBtn);
                    comBtn.innerHTML = "Submit";
                    comBtn.setAttribute('class', 'comment-button');
                    comBtn.setAttribute('onclick', 'submitComment(this.id);'); // for FF
                    comBtn.onclick = function() { submitComment(this.id); }; // for IE
                    comBtn.setAttribute('id', 'btn-id-' + list[i].ID);
                    i++;
                }
            } else {
                alert("Connection issues!");
            }
            alert("Success!");
        }
    });

    function getUsername() {
        activeUser = localStorage.getItem("storageName");
        var name = document.getElementById('username');
        name.innerHTML = activeUser;
        getContentList();

        // function searchNews
    }

    function getContentList() {
        var http = new XMLHttpRequest();
        var url = "http://localhost:8888/getContentList";

        http.open("GET", url, false);
        http.send();
        var response = http.responseText;
        if (http.status == 200) {
            const list = JSON.parse(response);
            var i = 0;
            var body = document.getElementById('section');
            var getContainer = document.createElement('div');
            body.appendChild(getContainer);
            getContainer.setAttribute('id', 'get-container');
            while (i < list.length) {
                var content = document.createElement('div');
                getContainer.appendChild(content);
                content.setAttribute('class', 'content');
                var card = document.createElement('div');
                content.appendChild(card);
                var image = document.createElement('div');
                card.appendChild(image);
                image.setAttribute('class', 'image');
                var postImage = document.createElement('img');
                image.appendChild(postImage);
                postImage.setAttribute('alt', 'img');
                postImage.setAttribute('class', 'news-image');
                postImage.setAttribute('src', "data:image/gif;base64," + list[i].NEWS_IMAGE + "");

                // Text Content
                var textDiv = document.createElement('div');
                card.appendChild(textDiv);
                var newsText = document.createElement('div');
                textDiv.appendChild(newsText);
                newsText.setAttribute('class', 'news-text');
                var portfolioImg = document.createElement('img');
                newsText.appendChild(portfolioImg);
                portfolioImg.setAttribute('alt', 'portfolio');
                portfolioImg.setAttribute('class', 'portfolio-image');
                portfolioImg.setAttribute('src', "data:image/gif;base64," + list[i].IMAGE + "");
                var infoDiv = document.createElement('div');
                newsText.appendChild(infoDiv);
                infoDiv.setAttribute('class', 'info-div');
                var h2 = document.createElement('h2');
                infoDiv.appendChild(h2);
                h2.setAttribute('id', 'username2');
                h2.setAttribute('class', 'h2-username');
                h2.innerHTML = list[i].NAME;
                var h3 = document.createElement('h3');
                infoDiv.appendChild(h3);
                h3.setAttribute('class', 'upload-time');
                h3.innerHTML = list[i].CREATION;
                var p = document.createElement('p');
                p.setAttribute('id', 'id-' + list[i].ID);
                textDiv.appendChild(p);
                p.innerHTML = list[i].CONTENT;

                //buttons and comment field
                var buttons = document.createElement('div');
                card.appendChild(buttons);
                buttons.setAttribute('class', 'buttons');
                var likeDiv = document.createElement('div');
                buttons.appendChild(likeDiv);
                likeDiv.setAttribute('class', 'like-div');
                var like = document.createElement('button');
                likeDiv.appendChild(like);
                like.setAttribute('class', 'like');
                like.setAttribute('onclick', 'likeNews(this.id);'); // for FF
                like.onclick = function() { likeNews(this.id); }; // for IE
                like.setAttribute('id', 'like-' + list[i].ID);
                like.setAttribute('type', 'submit');
                var likeIcon = document.createElement('i');
                like.appendChild(likeIcon);
                likeIcon.setAttribute('class', 'far fa-thumbs-up');
                var span = document.createElement('span');
                like.appendChild(span);
                span.innerHTML = list[i].LIKES;
                var myLikes = document.createElement('div');
                likeDiv.appendChild(myLikes);
                myLikes.innerHTML = "Like";
                var editDiv = document.createElement('div');
                buttons.appendChild(editDiv);
                editDiv.setAttribute('class', 'edit-div');
                var edit = document.createElement('button');
                editDiv.appendChild(edit);
                edit.setAttribute('class', 'edit');
                edit.setAttribute('onclick', 'editNews(this.id);'); // for FF
                edit.onclick = function() { editNews(this.id); }; // for IE
                edit.setAttribute('id', list[i].ID);
                var editIcon = document.createElement('i');
                edit.appendChild(editIcon);
                editIcon.setAttribute('class', 'far fa-edit');
                var editTitle = document.createElement('div');
                editDiv.appendChild(editTitle);
                editTitle.innerHTML = "Edit";
                var deleteDiv = document.createElement('div');
                deleteDiv.setAttribute('class', 'delete-div');
                buttons.appendChild(deleteDiv);
                var deleted = document.createElement('button');
                deleteDiv.appendChild(deleted);
                deleted.setAttribute('class', 'delete');
                deleted.setAttribute('onclick', 'deleteNews(this.id);'); // for FF
                deleted.onclick = function() { deleteNews(this.id); }; // for IE
                deleted.setAttribute('id', 'delete-' + list[i].ID);
                var deleteIcon = document.createElement('i');
                deleted.appendChild(deleteIcon);
                deleteIcon.setAttribute('class', 'far fa-trash-alt');
                var deleteTitle = document.createElement('div');
                deleteDiv.appendChild(deleteTitle);
                deleteTitle.innerHTML = "Delete";
                var inputDiv = document.createElement('div');
                card.appendChild(inputDiv);
                var spanComment = document.createElement('span');
                inputDiv.appendChild(spanComment);
                var link = document.createElement('a');
                spanComment.appendChild(link);
                link.setAttribute('class', 'number-of-comments');
                link.setAttribute('href', '#');
                link.setAttribute('id', 'comment-' + list[i].ID);
                link.setAttribute('onclick', 'showComments(this.id);'); // for FF
                link.onclick = function() { showComments(this.id); }; // for IE
                link.innerHTML = list[i].COMMENTS + ' comments';
                var comment = document.createElement('textarea');
                inputDiv.appendChild(comment);
                comment.setAttribute('rows', '1');
                comment.setAttribute('cols', '15');
                comment.setAttribute('class', 'comment');
                comment.setAttribute('name', 'comment');
                comment.setAttribute('placeholder', 'Write your comment');
                comment.setAttribute('id', 'new-com-' + list[i].ID);
                var comBtn = document.createElement('button');
                inputDiv.appendChild(comBtn);
                comBtn.innerHTML = "Submit";
                comBtn.setAttribute('class', 'comment-button');
                comBtn.setAttribute('onclick', 'submitComment(this.id);'); // for FF
                comBtn.onclick = function() { submitComment(this.id); }; // for IE
                comBtn.setAttribute('id', 'btn-id-' + list[i].ID);
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
        console.log(response);
        if (http.status == 200) {
            location.reload();
            document.getElementById('news-entry').value = "";
            modal.style.display = "none";
            return false;
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
                location.reload();
                modal.style.display = "none";
                return false;
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
                location.reload();
                modal.style.display = "none";
                return false;
            } else {
                alert("Error");
                modal.style.display = "none";
            }

        }
    }

    function likeNews(id) {
        var newId = id.substring(5);
        var like = new Object();
        like.id = newId;
        like.activeUser = activeUser;

        var jsonString = JSON.stringify(like);

        var http = new XMLHttpRequest();
        var url = "http://localhost:8888/likeEntry";

        http.open("POST", url, false);
        http.send(jsonString);

        if (http.status == 200) {
            location.reload();
            return false;
        } else {
            alert("You already liked this post");
        }
    }

    var timesClicked;

    function showComments(id) {
        var newId = id.substring(8);
        var comment = new Object();
        comment.id = newId;

        var jsonString = JSON.stringify(comment);

        var http = new XMLHttpRequest();
        var url = "http://localhost:8888/showComments";

        http.open("POST", url, false);
        http.send(jsonString);
        var response = http.responseText;
        console.log(response);
        if (http.status == 200) {
            const list = JSON.parse(response);
            console.log(id);
            var i = 0;
            var body = document.getElementById(id).parentElement.parentElement;
            var container = document.createElement('div');
            body.appendChild(container);
            container.setAttribute('id', 'all-coments' + id);
            while (i < list.length) {
                var content = document.createElement('div');
                container.appendChild(content);
                content.setAttribute('class', 'comment-content');
                var card = document.createElement('div');
                content.appendChild(card);

                // Text Content
                var textDiv = document.createElement('div');
                card.appendChild(textDiv);
                var newsText = document.createElement('div');
                textDiv.appendChild(newsText);
                newsText.setAttribute('class', 'comments-text');
                var portfolioImg = document.createElement('img');
                newsText.appendChild(portfolioImg);
                portfolioImg.setAttribute('alt', 'portfolio');
                portfolioImg.setAttribute('src', '#');
                var infoDiv = document.createElement('div');
                newsText.appendChild(infoDiv);
                var h2 = document.createElement('h2');
                infoDiv.appendChild(h2);
                h2.setAttribute('id', 'username3');
                h2.innerHTML = list[i].NAME;
                h2.style.color = "red";
                var h3 = document.createElement('h3');
                infoDiv.appendChild(h3);
                h3.innerHTML = list[i].CREATION;
                var p = document.createElement('p');
                p.setAttribute('id', 'idc-' + list[i].ID);
                textDiv.appendChild(p);
                p.innerHTML = list[i].CONTENT;
                i++;
            }
            // timesClicked = 1;
            var showless = document.createElement('div');
            body.appendChild(showless);
            showless.setAttribute('id', 'show-less' + id);
            var a = document.createElement('a');
            showless.appendChild(a);
            a.innerHTML = "Hide comments";
            a.setAttribute('href', '#');
            a.setAttribute('onclick', 'hideComments(id);'); // for FF
            a.onclick = function() { hideComments(id); }; // for IE
            // }
        } else {
            alert("Error");
        }
    }

    function hideComments(id) {
        console.log(id);
        var body = document.getElementById('all-coments' + id);
        var showless = document.getElementById('show-less' + id);
        body.parentNode.removeChild(body);
        showless.parentNode.removeChild(showless);

    }

    function submitComment(id) {
        console.log("submit comment" + id);
        var newId = id.substring(7);
        var newComment = new Object();
        newComment.content = document.getElementById('new-com-' + newId).value; //news_id, activeUser, content
        newComment.username = activeUser;
        newComment.id = newId; //news id
        console.log(newComment);

        var jsonString = JSON.stringify(newComment);

        var http = new XMLHttpRequest();
        var url = "http://localhost:8888/newComment";

        http.open("POST", url, false);
        http.send(jsonString);
        var response = http.responseText;

        if (http.status == 200) {
            var textarea = document.getElementById('new-com-' + newId);
            textarea.value = "";
            alert("Success!");
        } else {
            alert("Entry was not posted");
        }
    }

    function logout() {
        window.location = "index.html";
    }

    // };


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
