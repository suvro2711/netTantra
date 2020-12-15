<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
error_reporting(E_ERROR | E_PARSE);

$serverName = "localhost";
$dBUsername = "root";
$dBPassword = "";
$dBName = "nettantraemployee";
$conn = new mysqli($serverName,$dBUsername, $dBPassword, $dBName );

if($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
};
    
if($_POST["email"]){
    if($_POST["password"]){
        $email = $_POST["email"];
        $password = $_POST["password"];
        $sql = "SELECT * FROM employees WHERE email='$email'";
        $result = $conn->query($sql);
        $employee = $result->fetch_assoc();
        if ($password === $employee["PASSWORD"]){
          //Makeing and storeing a new auth token
            $OAuthToken = bin2hex(random_bytes(16));
            $tokenSQL = "UPDATE employees SET OAuthTokeN='$OAuthToken' WHERE email='$email'";
            $conn->query($tokenSQL);
          //Making Employee Profile picture ready to use
            if($employee["profile_picture"]){
              $employee["imageLink"] = "http://localhost/netTantra/images/" .$employee["profile_picture"];
            }
            $employee["OAuthToken"] = $OAuthToken;
            echo json_encode($employee);
        }else echo false;  
    } ;
    //if authorization through token
    if($_POST["token"]){
        $email = $_POST["email"];
        $token = $_POST["token"];
        $sql = "SELECT * FROM employees WHERE OAuthToken='$token'";
        $result = $conn->query($sql);
        $employee = $result->fetch_assoc();
        if ($token === $employee["OAuthToken"]){
          //Making Employee Profile picture ready to use
            if($employee["profile_picture"]){
              $employee["imageLink"] = "http://localhost/netTantra/images/" .$employee["profile_picture"];
            }
            
            echo json_encode($employee);         
        }else echo false;  
    } ;
};



