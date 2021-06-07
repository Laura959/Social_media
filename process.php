<?php
include_once ('connect.php');

$connect = new PDO("mysql:host=$host; dbname=$dbName", $user, $pass);
$connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

     $query = "SELECT * FROM users WHERE Email = 'Petris@gmail.com' AND PASS = 'Slap1234'";
     $statement = $connect->prepare($query);
     $statement->execute();
     while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        echo $row;

     }
    //  $count = $statement->rowCount();
    //  if ($count > 0) {
    //       $statement->setFetchMode(2);
    //       $result = $statement->fetchAll();
    //       $_SESSION["username"] = $result[0]['Vardas'];
    //       $_SESSION["userId"] = $result[0]['Vartotojo_id'];
    //       header("location:main.php");
    //  }

?>