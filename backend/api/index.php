<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');


/**
 * Step 1: Require the Slim Framework
 *
 * If you are not using Composer, you need to require the
 * Slim Framework and register its PSR-0 autoloader.
 *
 * If you are using Composer, you can skip this step.
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new \Slim\Slim();
$app->response->headers->set('Content-Type', 'application/json');

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
require_once('includes/php-jwt-master/src/JWT.php');
require_once('includes/php-jwt-master/src/SignatureInvalidException.php');
require_once('includes/php-jwt-master/src/BeforeValidException.php');
require_once('includes/php-jwt-master/src/ExpiredException.php');

require_once('config/config.php');
require_once('helper/helperFunc.php');
require_once('helper/connection.php');

// include JWT class
use \Firebase\JWT\JWT;

// models
require_once('models/trucking.php');

// Instation variables
$db = new DbConnection();
$trucking = new Trucking($db);

/**
* @name isTokenValid
* @description
* Helps in decoding the Token that is sent from the client. If it's valid, returns the decoded_array. Otherwise, returns null
*/
function isTokenValid($tokenFromClient){
    try {                    
        // decode the jwt
        $secretKey = base64_decode(SECRET_KEY);

        JWT::$leeway = 60;

        // decode the key
        $token = JWT::decode($tokenFromClient, $secretKey, array('HS256'));

        // if no exception twron here, we are good to go.
        // let's also decode so we can access some info about the user.
        $decoded_array = (array) $token;

        // the returned decode_array contains information about the user--user_id, token expiration.
        return $decoded_array;

    } catch(Exception $e){

        return NULL;
    }
}

/**
* Route for handleling versions. 
*/
$app->group('/v1', function () use ($app, $db, $trucking) {

    /**
     * Trucking related routes.
     */
    $app->group('/trucking', function() use($app, $db, $trucking){
        
        /**
        * Adds a new job to the list
        * @route /v1/trucking/job type POST
        */
        $app->post('/job', function() use($app, $db, $trucking){
            try {

                $data = file_get_contents("php://input");
                
                $request = json_decode($data);

                $decoded_array = isTokenValid($request->token);

                if($decoded_array != null){  

                    $owner_id = $decoded_array['data']->userId;

                    if($trucking->saveNewJob($request, $owner_id)){
                        header("HTTP/1.0 200 Success");
                        echo json_encode(array("status" => "ok", "message" => "New job post created!!"));
                    } else {
                        // we have errors
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo json_encode($trucking->getErrors());
                    }
                } else {
                    header("HTTP/1.0 401 Not Authorized");
                    echo '{"status":"fail","message":"Please login to perform action."}';
                }  
            }
            catch(Exception $e){
                header("HTTP/1.0 400 Bad data submitted");
                echo '{"status":"fail","message":"Data is not in correct format."}';
            }             
        });

        /**
        * @description
        * Get request to get list of available jobs.
        */
        $app->get('/jobs', function() use($app, $db, $trucking){
            if($app->request->isGet()){
                echo $trucking->getJobs();       
            }
        });

        /**
        * @description
        * Route to handle job details. We pass the owner id to get the company profile.
        */
        $app->get('/jobs/:id/:ownerId', function($id, $owner_id) use($app, $db, $trucking){
             echo $trucking->getJobDetails($id, $owner_id);
        });

        /**
        * @API /trucking/searchTerm
        * @description Allows you to search terms
        */
        $app->get('/searchJobs', function() use($app, $trucking){
            
            $searchTerm = $app->request()->get('searchTerm');

            $result = $trucking->findBySearchTerm($searchTerm);

            if($result != null){                
                echo json_encode($result);
            } else {
                echo '{"status":"fail", "message":"No records matched your search."}';
            }
        });

        /**
        * @description
        * This option route is created because Angular $http.delete method
        * sends as such. After testing however, by adding the delete request
        * it started working.
        */
        $app->options('/job/:id', function($id) use($app, $trucking) {
            // make sure user token is valid.
            echo 'The actual OPTIONS call. token: ';            
        });
        // Handles the main request for deleting an item from the user account.
        $app->delete('/job/:id', function($id) use($app, $trucking) {
            
            $tokenFromClient = $app->request()->get('token');

            if(isTokenValid($tokenFromClient) != null){

                $decoded_array = isTokenValid($tokenFromClient);

                $owner_id = $decoded_array['data']->userId;

                // process request
                if($trucking->deleteJobPost($id, $owner_id)){
                    // success deleting the job post
                    echo '{"status":"OK", "message":"Job post removed succesfully"}';
                } else {
                    // failure in deleting the item. The job post might have been removed already.
                    echo '{"status":"fail", "message":"The job post might have been removed already"}';
                }
            } else {
                // return header with a 401 status code.
                header("HTTP/1.0 401 Not Authorized");
                echo '{"status":"fail", "message":"User needs to log in."}';
            }
                
        });

        /**
        * @description
        * Updates a single job object
        * @API /v1/trucking/job      POST
        */        
        $app->post('/job/update', function() use($app, $trucking){
            
            $token = $app->request()->get('token');
            $data = file_get_contents("php://input");
            $request = json_decode($data);
            
            if(isTokenValid($token) != null){

                $decoded_array = isTokenValid($token);
                $owner_id = $decoded_array['data']->userId;

                if($trucking->editJobPost($request)){
                    // success deleting the job post
                    echo '{"status":"OK", "message":"Job updated succesfully LOL"}';
                } else {
                    // failure in deleting the item. The job post might have been removed already.
                    echo '{"status":"fail", "message":"The job update failed"}';
                }
                
            } else {
                // return header with a 401 status code.
                header("HTTP/1.0 401 Not Authorized");
                echo '{"status":"fail", "message":"Your session has experied. Please log in again."}';
            }
        });
    });
    
    // my account api
    $app->group('/account', function() use($app, $db, $trucking){
        
        // login
        $app->post('/login', function() use($app){
            if($app->request->isPost()){
                $json = json_decode(file_get_contents("php://input"));

                $username = (isset($json->username)) ? trim($json->username) : "";
                $password = (isset($json->password)) ? trim($json->password) : "";

                try {
                    
                    // query the database
                    $sql = "SELECT user_id, user_name, user_active, user_password_hash, user_role FROM users WHERE user_name = :username";

                    $pdo = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME . ';charset=utf8', DB_USER, DB_PASS); // <-- marked to be removed.
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // <-- marked to be removed and use the class instead.
                    $query = $pdo->prepare($sql);
                    $query->bindValue(':username', $username, PDO::PARAM_STR);
                    $query->execute();
                    $result = $query->fetch(PDO::FETCH_OBJ);
                        
                    // we have user. I saw that it might not be a good practice to do this check.
                    if(count($result) > 0){
                        // let's verify the credentials.
                        $storedPassword = $result->user_password_hash;
                
                        if(password_verify($password, $storedPassword)){
                            // we have an user, let's create the TOKEN
                            $secretKey = base64_decode(SECRET_KEY);

                            // encode the array
                            $jwt = JWT::encode(
                                token($result->user_id, $result->user_name, $result->user_role), // data returned by the function
                                $secretKey,
                                'HS256'
                            );

                            $enencodedArray = array('jwt' => $jwt);

                            // return the Token to the client.
                            echo json_encode($enencodedArray);
                        }
                        else {
                            header("HTTP/1.0 401 Not Authorized");
                            echo '{"status":"fail", "message":"Unable to log you in. Please try again!"}';
                        }
                    }
                    else{
                        header("HTTP/1.0 401 Not Authorized");
                        echo '{"status":"fail", "message":"Unable to log you in. Please try again!"}';
                    }
                } catch(Exception $ex) {
                    header("HTTP/1.0 401 Not Authorized");
                    echo '{"status":"fail", "message":"Unable to log you in. Please contact your system administrator"}';
                } 
            }
            else {
                // method is not post
                header("HTTP/1.0 405 Method Not Allowed");
            }
        });

        /*
        * @description
        * Route to handle registration for new users.
        * /v1/trucking/account/register
        */
        $app->post('/register', function() use ($app, $db){
            if($app->request->getMethod() == "POST"){       
                // initialize array of errors.
                $errors = array();

                $user_role = "admin"; // <-- no need for this since this was done with user roles in mind.

                $json = json_decode(file_get_contents("php://input"));
        
                if($user_role === "admin") {
                    
                    $username = (isset($json->username)) ? trim($json->username) : "";
                    $password = (isset($json->password)) ? trim($json->password) : "";
                    $pwdConfirm = (isset($json->confirmPassword)) ? trim($json->confirmPassword) : "";
                    $email = (isset($json->email)) ? trim($json->email) : "" ;
                    
                    $userRole = 'basic';

                    // create instance to database
                    $db = new DbConnection();
            
                    if(empty($username)){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail", "message":"Username field cannot be empty"}';
                    }
                    elseif(strlen($username) < 6){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail","message": "Make sure username is at least 6 characters long."}';
                    }
                    elseif(empty($password) || empty($pwdConfirm)){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail", "message":"Password or confirm password fields cannot be empty."}';
                    }
                    elseif(empty($email)){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail", "message":"Email field cannot be empty, or it is not a valid email address"}';               
                    }
                    elseif($password !== $pwdConfirm){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail","message":"Passwords donot match."}';
                    }
                    elseif(strlen($password) < 7){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail", "message":"Passwords should be at least 7 characters long."}';
                    }
                    elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
                        header("HTTP/1.0 401 Invalid submitted data");
                        echo '{"status":"fail", "message":"Please input valid email address!"}';
                    }
                    elseif($db->isConnected()){

                        // let's make sure user doesn't exists
                        $pdo = $db->getConnection();
                        
                        $query = $pdo->prepare("SELECT user_name from users WHERE user_name = :username");
                        $query->bindValue(':username', $username, PDO::PARAM_STR);
                        $query->execute();
                        $result = $query->fetchAll();   

                        if(count($result) > 0 || count($errors) > 0) {
                            header("HTTP/1.0 401 Invalid submitted data");
                            echo '{"status":"fail", "message":"Please make sure your password or username are valids"}';
                        } else {

                            // check to see if we don't have errors
                            try {
                                $options = ['cost' => 12,];
                                $user_password_hash = password_hash($password, PASSWORD_BCRYPT, $options);

                                $new_user = $pdo->prepare("INSERT INTO users (user_name, user_password_hash, user_email, user_registration_datetime) VALUES (:username, :user_password_hash, :email, NOW())");
                                $new_user->bindValue(':username', $username, PDO::PARAM_STR);
                                $new_user->bindValue(':user_password_hash', $user_password_hash, PDO::PARAM_STR);
                                $new_user->bindValue(':email', $email, PDO::PARAM_STR);
                        
                                $new_result = $new_user->execute();
                    
                                if($new_result){
                                    // we have succeded in adding the user.
                                    echo '{"status":"OK", "message":"User created succesfully. Please check your email address for confirmation.", "email":"'.$email.'"}';
                                }
                                else {
                                    // we have failed :(
                                    header("HTTP/1.0 403 Not enough credentials");
                                    echo '{"status":"fail","message":"Registration failed. Not your fault. Please try again!"}';
                                }
                            }
                            catch(PDOException $ex){
                                $ex->getMessage();
                            }
                        }
                    }
                    else {
                        header("HTTP/1.0 401 Not enough credentials");      
                        echo json_encode($errors);
                    }
                }
                else {
                    header("HTTP/1.0 403 Not enough credentials");
                    $errors[] = ["status" => "fail", "message" => "You don't have enough credentials to complete this task"];
                    echo json_encode($errors);
                }
            }
            else {
                // method is not post
                header("HTTP/1.0 405 Method Not Allowed");
            }

        }); // <-- end of Register Route


        /**
        * @description
        * Request to handle loggin outs. Right now, it's not doing anything as the
        * removing of the token happens on the client. Therefore, if a new request is
        * initiated, the application should request a valid Token. Thus, causing the user
        * to log in again.
        */
        $app->post('/logout', function() use ($app, $db){
            if($app->request->getMethod() == "POST"){
                echo '{"status":"OK", "message":"You are now signed out of 343Trucking.com!"}';
            }
        });

        /**
        *   @description
        *   This will get the account information of the user that's logged in.
        *   For now, we will only get the jobs that the user has active and inactive and 
        *   to allow them to add new jobs, update current ones, and delete jobs.
        */
        $app->get('/dashboard', function() use ($app, $trucking){
            
            $tokenFromClient = $app->request()->get('token');

            if($tokenFromClient){
                try {
                    
                    // decode the jwt
                    $secretKey = base64_decode(SECRET_KEY);

                    JWT::$leeway = 60;

                    // decode the key
                    $token = JWT::decode($tokenFromClient, $secretKey, array('HS256'));

                    // if no exception here, we are good to go.
                    // let's also decode so we can access some info about the user.
                    $decoded_array = (array) $token;

                    // return some dummy data for now.         
                    $userListings = $trucking->getUserListings($decoded_array['data']->userId);

                    if($userListings !== null){
                        echo json_encode($userListings);
                    } else {
                        echo '{"status":"fail", "message":"No data :("}';
                    }

                } catch(Exception $e){
                    header("HTTP/1.0 401 Authorization Exception");
                    echo '{"status":"fail", "message":"Your session has ended!! '.$e->getMessage().'"}';
                }
            } else {

                header("HTTP/1.0 401 Authorization Token Not Present");
                echo '{"status":"fail", "message":"Authorization Token not present."}';
            }
        });

    });
    // end of my account
});


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
?>