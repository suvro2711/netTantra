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

  
if($_SERVER['REQUEST_METHOD'] == 'GET'){
    // echo "---love---";
    
    // mysqli_query($conn,$query);
    if ($_GET["name"]){
        $name = $_GET["name"];
        $sql= "SELECT profile_picture FROM employees WHERE empName='$name'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        // echo json_encode($_GET);
        echo "http://localhost/netTantra/images/" . $row["profile_picture"];
    }else{
        echo "Give me a name";
    }
    
};

