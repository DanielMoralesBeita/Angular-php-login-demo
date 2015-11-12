<?php
/**
*   include connection
*/
//require_once('config/config.php');

/**
*   @name connet()
*   @return Returns the connection upon succesful login. Null otherwise.
*/
function connect() {
    try {
    
        $pdo = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME . ';charset=utf8', DB_USER, DB_PASS);

        return $pdo;
    }   
    catch(Exception $e) {

        return null;
    }
}

function token($userId, $userName, $userRole) {
    $tokenId = base64_encode(mcrypt_create_iv(32));
    $issueAt = time();
    $notBefore = $issueAt + 10; //Adding 10 seconds
    $expire = $notBefore + TOKEN_EXPIRATION; // adding 60 seconds
    $serverName = $_SERVER['SERVER_NAME']; // get the server name. Not sure if that's the right way to get the server name.

    // create the token
    $data = array(
        'iat' => $issueAt,
        'jti' => $tokenId,
        'iss' => $serverName,
        'nbf' => $notBefore,
        'exp' => $expire,
        'data' => array( 
            'userId' => $userId,      // <- returned from the mysql table user
            'userName' => $userName,  // <- returned from the mysql table user
            'userRole' => $userRole
        )
    );

    return $data;
}



?>
