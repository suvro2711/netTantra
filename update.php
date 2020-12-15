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

    //getting stuff from post
    $empName = $_POST["empName"];
    $email = $_POST["email"];
    $token = $_POST["token"];
    $edInstitute = $_POST["edInstitute"];
    $edYear = $_POST["edYear"];
    $edDegree = $_POST["edDegree"];
    $edStream = $_POST["edStream"];
    $gender = $_POST["gender"];
    $findingEmail = $_POST["findingEmail"];
    //checking authentication
    $sql = "SELECT * FROM employees WHERE OAuthToken='$token'";
    $result = $conn->query($sql);
    $employee = $result->fetch_assoc();

    if($findingEmail){
        $sqlCurrentUser = "SELECT * FROM employees WHERE email='$findingEmail'";
        $resultCU = $conn->query($sqlCurrentUser);
        $employeeCU = $resultCU->fetch_assoc();
        $empId = $employeeCU["empId"];
    };
    
   
    
    if($token === $employee["OAuthToken"]){
        // Storing text data if token matches
        if($findingEmail){//because when updating other's profile we cant search with our token
            $sqlUpdate = "UPDATE employees SET empName='$empName', email='$email',edInstitute='$edInstitute',
                        edYear='$edYear',edDegree='$edDegree',edStream='$edStream' WHERE email='$findingEmail'";
        }else {
            $sqlUpdate = "UPDATE employees SET empName='$empName', email='$email',edInstitute='$edInstitute',
                        edYear='$edYear',edDegree='$edDegree',edStream='$edStream', gender='$gender' WHERE OAuthToken='$token'";
        };

        

        $conn->query($sqlUpdate);

        //Checking new profile picture has been sent
        //if so then storing it
        if($_FILES["image"]){
            $profilePicName = basename($_FILES["image"]["name"]);
            $profilePic = "images/" .basename($_FILES["image"]["name"]);
            if($findingEmail){//because when updating other's profile we cant search with our token
                $queryImage = "UPDATE employees SET profile_picture = '$profilePicName' WHERE email='$findingEmail'";
            }else {
                $queryImage = "UPDATE employees SET profile_picture = '$profilePicName' WHERE OAuthToken='$token'";
            };
            
            mysqli_query($conn,$queryImage);
            if(move_uploaded_file($_FILES["image"]["tmp_name"], $profilePic)){
                $fileUploadSuccess = true;
                
            }else {
                $fileUploadSuccess = false;
                // echo "file upload failur"
            };
        };

        //sending back the updated data if all went 

            if($findingEmail){//because when updating other's profile we cant search with our token
                $sqlNew = "SELECT * FROM employees WHERE empId='$empId'";
            }else {
                $sqlNew = "SELECT * FROM employees WHERE OAuthToken='$token'";
            };

            $resultNew = $conn->query($sqlNew);
            $resultArray = $resultNew->fetch_assoc();
            $resultArray["imageLink"] = "http://localhost/netTantra/images/" . $resultArray["profile_picture"];
            echo json_encode($resultArray);
        
         
    }else echo false;

    

    // $profilePicName = basename($_FILES["image"]["name"]);
    // $profilePic = "images/" .basename($_FILES["image"]["name"]);
    
   
    // $query = "INSERT INTO employees (empName,email,PASSWORD, profile_picture) 
    //          VALUES('$name','$email','$password','$profilePicName')";
    // mysqli_query($conn,$query);
    // if(move_uploaded_file($_FILES["image"]["tmp_name"], $profilePic)){
    //     echo "Upload Successful";
    // }else{
    //     echo "Upload Failed";
    // }
    // echo $query;
    // echo $_FILES["image"]["tmp_name"];
    // echo json_encode($_POST);
    // echo json_encode($_FILES["imageFile"]);
};



