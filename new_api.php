<?php
include_once ('connect.php');
 
// get the HTTP method, path and body of the request, trim — Strip whitespace (or other characters) from the beginning and end of a string
$method = $_SERVER['REQUEST_METHOD']; // issaiskina koki metoda naudoja request pvz GET
$path = $_SERVER['PATH_INFO'];

// $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true); //grazina array

// connect to the mysql database
$con = mysqli_connect($host, $user, $pass, $dbName);

// switch ($method) {
//   case 'GET':
//     $sql = "SELECT * FROM news"; 
//     $statement = mysqli_query($con,$sql);
//     if (!$statement) {
//       http_response_code(404);
//       die("error");
//       }
//     else {
//       header("Content-type:application/json");
//           http_response_code(200);
//           $row = mysqli_fetch_assoc($statement);
//           echo $row;
//     }
//     break;
//   case 'POST':
//     $sql = "SELECT * FROM users WHERE EMAIL = '".$input['username']."'"; break;
// }

switch ($path) {
  case '/getContentList':
    $sql = "SELECT news.ID, news.TITLE, news.CONTENT, news.CREATION, users.NAME, users.SURNAME, users.EMAIL
    FROM news
    INNER JOIN users
    ON news.AUTHOR = users.ID"; 
    $statement = mysqli_query($con,$sql);
    if (!$statement) {
      http_response_code(404);
      die("error");
      }
    else {
      header("Content-type:application/json");
      http_response_code(200);
      // $i=0;
      // $arrayToSend = [];
      // while($row = mysqli_fetch_assoc($statement)){
      //     $item = '{ "title" = "'.$row['TITLE'].'", "description" = "'.$row['CONTENT'].'", "creation" = "'.$row['CREATION'].'", "author" = "'.$row['AUTHOR'].'"}';
      //     array_push($arrayToSend, $item);
      //      $i++; 
      //     }
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
    $statement = mysqli_query($con,$sql);

    if (!$statement) {
      http_response_code(404);
      die("error");
    }
    else {
      header("Content-type:application/json");
            http_response_code(200);        
    }

}
 
// print results, insert id or affected row count
// if ($method == 'GET') {
//   if (!$key) echo '[';
//   for ($i=0;$i<mysqli_num_rows($statement);$i++) {
//     echo ($i>0?',':'').json_encode(mysqli_fetch_object($statement));
//   }
//   if (!$key) echo ']';
// } elseif ($method == 'POST') {
//   echo mysqli_insert_id($con);
// } else {
//   echo mysqli_affected_rows($con);
// }
 
// close mysql connection
mysqli_close($con);
?>