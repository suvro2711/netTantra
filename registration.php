<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
error_reporting(E_ERROR | E_PARSE);

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "nettantraemployee";
$conn = mysqli_connect($serverName,$dBUsername, $dBPassword, $dBName );

if(!$conn){
    die("Connection failed: " .  mysqli_connect_error());
};
    
if($_POST["name"]){

    $name = $_REQUEST["name"];
    $email = $_REQUEST["email"];
    $password = $_REQUEST["password"];
    $privilege = $_REQUEST["privilege"];
    $profilePicName = basename($_FILES["image"]["name"]);
    $profilePic = "images/" .basename($_FILES["image"]["name"]);
    $OAuthToken = bin2hex(random_bytes(16));
   
    $query = "INSERT INTO employees (empName,email,PASSWORD, profile_picture,privilege, OAuthToken) 
             VALUES('$name','$email','$password','$profilePicName', '$privilege','$OAuthToken')";

    move_uploaded_file($_FILES["image"]["tmp_name"], $profilePic);
    //if all goes well sending back the employee details
    if(mysqli_query($conn,$query)){
        $sqlEmpolyee = "SELECT * FROM employees WHERE email='$email'";
        $result = $conn->query($sqlEmpolyee);
        $employee = $result->fetch_assoc();
        if($employee["profile_picture"]){
            $employee["imageLink"] = "http://localhost/netTantra/images/" .$employee["profile_picture"];
        }else $employee["imageLink"] = null;
        echo json_encode($employee);
    }else echo false;
};



