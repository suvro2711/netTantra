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
    
if($_POST["newPassword"]){
    if($_POST["privilege"] === "admin"){
        $userEmail = $_POST["email"];
        $adminEmail = $_POST["adminEmail"];
        $adminPassword= $_POST["oldOrAdminPassword"];
        $newPassword = $_POST["newPassword"];


        $sqlAdmin = "SELECT * FROM employees WHERE email='$adminEmail'";
        $resultAdmin = $conn->query($sqlAdmin);
        $admin = $resultAdmin->fetch_assoc();

        $sqlUser = "SELECT * FROM employees WHERE email='$userEmail'";
        $resultUser = $conn->query($sqlUser);
        $user = $resultUser->fetch_assoc();

        if($adminPassword === $admin["PASSWORD"] ){
            $newpasswordSQL = "UPDATE employees SET PASSWORD='$newPassword' WHERE email='$userEmail'";
            $conn->query($newpasswordSQL);
            echo "Password Changed using admin priviledges";
        }else echo false;  

    }else if($_POST["privilege"] === "normal"){
        $userEmail = $_POST["email"];
        $oldPassword= $_POST["oldOrAdminPassword"];
        $newPassword = $_POST["newPassword"];


        $sqlUser = "SELECT * FROM employees WHERE email='$userEmail'";
        $resultUser = $conn->query($sqlUser);
        $user = $resultUser->fetch_assoc();

        if($oldPassword === $user["PASSWORD"] ){
            $newpasswordSQL = "UPDATE employees SET PASSWORD='$newPassword' WHERE email='$userEmail'";
            $conn->query($newpasswordSQL);
            echo "Password Changed";
        }else echo false;  
    }
    
};



