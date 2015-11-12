<?php

class User {

    private $db;
    private $errors;

    public function __construct($db){
        $this->db = $db;
        $this->errors = array();
    }
    
    public function login($username, $password) {
        
        $this->errors["status"] = "failure";
        $this->errors["message"] = array();

        try {
            // query the database
            $sql = "SELECT user_id, username, firstname, salt, pwd, user_role FROM Users WHERE username = :username";
            $pdo = $this->db->getConnection();
            $query = $pdo->prepare($sql);
            $query->bindValue(':username', $username, PDO::PARAM_STR);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_OBJ);
        
            // we have user. I saw that it might not be a good practice to do this check.
            if(count($result) > 0){
                // let's verify the credentials.
                $storedPassword = $result->pwd;
                
                if(password_verify($password, $storedPassword)){
                    // we have an user, let's create the TOKEN
                    $secretKey = base64_decode(SECRET_KEY);

                    // encode the array
                    $jwt = JWT::encode(
                        token($result->user_id, $result->username, $result->user_role), // data returned by the function
                        $secretKey,
                        'HS256'
                    );

                    $this->token = array('jwt' => $jwt);
                    return TRUE;
                }
                else {
                    //header("HTTP/1.0 401 Not Authorized No Match");
                    $this->errors["message"][] = "Please make sure password or username match.";
                    return FALSE;
                }
            }
            else{
                //header("HTTP/1.0 401 Not Authorized");
                $this->errors["message"][] = "Please make sure password or username match.";
                return FALSE;
            }
        }catch(Exception $ex){
            //header("HTTP/1.0 500 Not Authorized");
            $this->errors["message"][] = "Sorry, could not log you in. Please try later.";
            return FALSE;
        }
    }

    public function register(){
        
    }

}

/**
* Class example usage
* $user = new User();
* // return the encoded
* $user->login($user, $password);
* $user->register($user, $password, $confirmPassword, $email);
*/

?>