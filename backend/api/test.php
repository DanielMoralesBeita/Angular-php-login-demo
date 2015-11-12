<?php
require_once('includes/php-jwt-master/src/JWT.php');
use \Firebase\JWT\JWT;

$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0NDE1ODkxNTQsImp0aSI6ImRNOXpITHdGU2w4amJxOGg1amxcL0c5eDRpaWlLR0kzeDk4REtZUkplSHdFPSIsImlzcyI6ImxvY2FsaG9zdCIsIm5iZiI6MTQ0MTU4OTE2NCwiZXhwIjoxNDQxNTkwOTY0LCJkYXRhIjp7InVzZXJJZCI6IjY4IiwidXNlck5hbWUiOiJ1c2VybmFtZTciLCJ1c2VyUm9sZSI6bnVsbH19.0PI5qXVyr7i7WfaEFk__RVU2h8mO5Ac4JIhAvhiKFpw';


$key = "example_key";
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000,
    "data" => array( 
        'userId' => 68,          // <- returned from the mysql table user
        'userName' => 'TheUSername',  // <- returned from the mysql table user
        'userRole' => 'Admin'
    )
);

/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$jwt = JWT::encode($token, $key);
$decoded = JWT::decode($jwt, $key, array('HS256'));

print_r($decoded);

/*
 NOTE: This will now be an object instead of an associative array. To get
 an associative array, you will need to cast it as such:
*/

$decoded_array = (array) $decoded;

echo $decoded_array['data']->userId;
echo $decoded_array['iss'];

?>
<form action="index.php/v1/trucking/job" method="post" >
<p>
			<label for="title">Title (Position)</label>
			<br>
			<input type="text" id="job-title" ng-model="job.title" class="form-control" autofocus="">
			
		</p>
		<p>
			<label>Job position description</label>
			<br/>
			<textarea class="form-control" ng-model="job.description"></textarea>
		</p>

		<p>
			<label>Requirements</label>
			<br/>
			<textarea class="form-control" ng-model="job.requirements"></textarea>
		</p>

		<p>
			<label>Location</label>
			<br/>
			<input type="text" ng-model="job.location" class="form-control">
		</p>

		<p>
			<label>Compensation</label>
			<br/>
			<input type="text" ng-model="job.compensation" class="form-control">
		</p>

		<p>
			<label>Benefits</label>
			<br/>
			<textarea class="form-control" ng-model="job.benefits"></textarea>
		</p>

		<p>
			<label>How to apply</label>
			<br/>
			<textarea class="form-control" ng-model="job.howToApply"></textarea>
		</p>
		
		<p>
			<button class="btn btn-primary" >Crear nuevo post</button>
		</p>
</form>

Register

<form action="http://localhost:62774/Slim-2.6.2/index.php/v1/account/register" method="post" >
    <p>Username: <input type="text" value="username7" name="username" ></p>
    <p>password: <input type="password" value="password" name="password"></p>
    <p>confirmPassword: <input type="password" value="password" name="confirmPassword"></p>
    <p>email: <input type="email" name="email" value="email@mail.com" ></p>
    <p><input type="submit"></p>
</form>