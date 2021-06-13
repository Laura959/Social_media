<?php
include_once ('connect.php');
 
// get the HTTP method, path and body of the request, trim — Strip whitespace (or other characters) from the beginning and end of a string
// $method = $_SERVER['REQUEST_METHOD']; issaiskina koki metoda naudoja request pvz GET
$path = $_SERVER['PATH_INFO'];

// $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true); //grazina array

// connect to the mysql database
$con = mysqli_connect($host, $user, $pass, $dbName);

header("Access-Control-Allow-Origin"); //remove in production

switch ($path) {
  case '/getContentList':
    // $sql = "SELECT news.ID, news.TITLE, news.CONTENT, news.CREATION, users.NAME, users.SURNAME, users.EMAIL, COUNT(likes.PERSON) as LIKES FROM news INNER JOIN users ON news.AUTHOR = users.ID INNER JOIN likes ON news.ID = likes.NEWS_ID";
    $sql = "SELECT news.ID, news.TITLE, news.CONTENT, news.CREATION, users.NAME, users.SURNAME, users.EMAIL FROM news INNER JOIN users ON news.AUTHOR = users.ID";  
    // SELECT news.ID, news.TITLE, news.CONTENT, news.CREATION, users.NAME, users.SURNAME, users.EMAIL, (SELECT COUNT(likes.PERSON) as LIKES FROM news INNER JOIN users ON news.AUTHOR = users.ID INNER JOIN likes ON news.ID = likes.NEWS_ID WHERE (COUNT(DISTINCT news.ID) = 1)) as COUNT FROM news INNER JOIN users ON news.AUTHOR = users.ID GROUP BY news.ID
    $statement = mysqli_query($con,$sql);
    if (!$statement) {
      http_response_code(404);
      die("error");
      }
    else {
      header("Content-type:application/json");
      http_response_code(200);
      echo '[';
      $i=0;
      $number = mysqli_num_rows ( $statement );
      while($row = mysqli_fetch_assoc($statement)){
        if($i == $number-1) {
          $row['LIKES'] = countLikes($row['ID']);
          $row['COMMENTS'] = countComments($row['ID']);
          echo json_encode($row);
        } else {
          $row['LIKES'] = countLikes($row['ID']);
          $row['COMMENTS'] = countComments($row['ID']);
          echo json_encode($row);
          echo ',';
        }
        $i++;
      }
      echo ']'; 
    }
    break;
  case '/login':
    $sql = "SELECT * FROM users WHERE EMAIL = '".$input['username']."'";
    // excecute SQL statement
    $statement = mysqli_query($con,$sql);

    // die if SQL statement failed
    $i=0;
    if (!$statement) {
      http_response_code(404);
      die("error");
    }
    else {
      header("Content-type:application/json");
        while ($row = mysqli_fetch_assoc($statement)){
          if ($row['PASS'] == $input['pass']) {
            http_response_code(200);
            echo $row['NAME'];
          } else {
            http_response_code(403);
            echo "Access denied";
          }
        } 
    }
    break;
case '/newEntry':
    $sql = "INSERT INTO news (CONTENT, AUTHOR) VALUES ('".$input['content']."', (SELECT ID FROM users WHERE NAME = '".$input['username']."'))";
    // $sql2 = "SELECT ID from news WHERE AUTHOR = (SELECT ID FROM users WHERE NAME = '".$input['username']."') ORDER BY ID DESC LIMIT 1 ";
    $statement = mysqli_query($con,$sql);
    
    if (!$statement) {
      http_response_code(404);
      die("error");
    }
    else {
      // $statement2 = mysqli_query($con,$sql2);
      // $result = mysqli_fetch_assoc($statement2);
      header("Content-type:application/json");
      // likePost($result['ID'], $input['username']);
      
            http_response_code(200);        
    }
    break;
case '/editEntry':
    $sql = "UPDATE news SET CONTENT = '".$input['content']."' 
    WHERE ID = '".$input['id']."' 
    AND AUTHOR = (SELECT users.ID FROM users 
    WHERE users.NAME = '".$input['activeUser']."')";
    $statement = mysqli_query($con,$sql); 
    if (!$statement) {
      http_response_code(403);
      die("error");
    }
    else {
      header("Content-type:application/json");
            http_response_code(200);        
    }
    break; 
case '/deleteEntry':
  $sql = "DELETE FROM news WHERE ID = '".$input['id']."'";
  $statement = mysqli_query($con,$sql); 
  if (!$statement) {
    http_response_code(403);
    die("error");
  }
  else {
    header("Content-type:application/json");
          http_response_code(200);        
  }
  break; 
case '/likeEntry':
    $sql = "INSERT IGNORE into likes(NEWS_ID, PERSON) VALUES('".$input['id']."', (SELECT ID
    FROM users
    WHERE users.NAME = '".$input['activeUser']."'))";
    $statement = mysqli_query($con,$sql); 
    $affectedRows = mysqli_affected_rows($con);
    if ($affectedRows == 0) {
      http_response_code(403);
      die("error");
    }
    else {
      header("Content-type:application/json");
      http_response_code(200);

    }
  break; 
case '/showComments':
    $sql = "SELECT comments.CONTENT, comments.CREATION, users.NAME, users.SURNAME, users.EMAIL FROM comments INNER JOIN users ON comments.AUTHOR = users.ID WHERE comments.NEWS_ID = ".$input['id']."";
    $statement = mysqli_query($con,$sql);
    if (!$statement) {
      http_response_code(404);
      die("error");
      }
    else {
      header("Content-type:application/json");
      http_response_code(200);
      echo '[';
      $i=0;
      $number = mysqli_num_rows ( $statement );
      while($row = mysqli_fetch_assoc($statement)){
        if($i == $number-1) {
          echo json_encode($row);
        } else {
          echo json_encode($row);
          echo ',';
        }
        $i++;
      }
      echo ']'; 
    }
    break;
case '/newComment':
    $sql = "INSERT INTO comments (CONTENT, NEWS_ID, AUTHOR) VALUES ('".$input['content']."', '".$input['id']."', (SELECT ID FROM users WHERE NAME = '".$input['username']."'))";
    $statement = mysqli_query($con,$sql);
  
    if (!$statement) {
      http_response_code(404);
      die("error");
    }
    else {
      header("Content-type:application/json");    
          http_response_code(200);        
  }
  break;
case '/searchNews':
  $sql = "SELECT news.ID, news.TITLE, news.CONTENT, news.CREATION, users.NAME, users.SURNAME, users.EMAIL FROM news INNER JOIN users ON news.AUTHOR = users.ID WHERE users.NAME LIKE '%".$input['content']."%' OR news.CONTENT LIKE '%".$input['content']."%' 
  ORDER BY news.ID DESC"; 
  // $sql = "SELECT news.ID, news.TITLE, news.CONTENT, news.CREATION, users.NAME, users.SURNAME, users.EMAIL FROM news INNER JOIN users ON news.AUTHOR = users.ID";   
      $statement = mysqli_query($con,$sql);
  if (!$statement) {
    http_response_code(404);
    die("error");
    }
  else {
    header("Content-type:application/json");
    http_response_code(200);
    echo '[';
    $i=0;
    $number = mysqli_num_rows ( $statement );
    while($row = mysqli_fetch_assoc($statement)){
      if($i == $number-1) {
        $row['LIKES'] = countLikes($row['ID']);
        $row['COMMENTS'] = countComments($row['ID']);
        echo json_encode($row);
      } else {
        $row['LIKES'] = countLikes($row['ID']);
        $row['COMMENTS'] = countComments($row['ID']);
        echo json_encode($row);
        echo ',';
      }
      $i++;
    }
    echo ']'; 
  }
  break;
}


function countLikes($id) {
    $sql = "SELECT COUNT(likes.PERSON) as LIKES FROM news INNER JOIN users ON news.AUTHOR = users.ID INNER JOIN likes ON news.ID = likes.NEWS_ID WHERE news.ID = $id";
  global $con;
  $statement = mysqli_query($con,$sql); 
  if (!$statement) {
    die("error");
  }
  else {
    while($row = mysqli_fetch_assoc($statement)){
        return $row['LIKES'];
    }
  }
}

function countComments($id) {
  $sql = "SELECT COUNT(AUTHOR) as comm FROM comments WHERE NEWS_ID = $id";
  global $con;
  $statement = mysqli_query($con,$sql); 
  if (!$statement) {
    die("error");
  }
  else {
  while($row = mysqli_fetch_assoc($statement)){
      return $row['comm'];
  }
}
}
// close mysql connection
mysqli_close($con);
?>
