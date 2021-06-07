<?php
include_once ('connect.php');
$con = new PDO("mysql:host=$host; dbname=$dbName", $user, $pass);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$response = array();
if($con) {
    $query = "SELECT * FROM users";
    $statement = $con->prepare($query);
    $statement->execute();
    // $count = $statement->rowCount();
    if($statement) {
        header("Content-Type: JSON");
        $i = 0;
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $response[$i]['ID'] = $row['ID'];
            $response[$i]['NAME'] = $row['NAME'];
            $response[$i]['SURNAME'] = $row['SURNAME'];
            $response[$i]['EMAIL'] = $row['EMAIL'];
            $response[$i]['PASS'] = $row['PASS'];

            $i++;
         }
         echo json_encode($response, JSON_PRETTY_PRINT);
         
    }
}
else {
    echo "DataBase connection failed";
}
?>