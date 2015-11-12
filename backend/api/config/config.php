<?php
/**
*   Database credentials. 
*   Store them in a password protected directory.
*/
define("DB_HOST", "the-host-location");
define("DB_NAME", "database-name");
define("DB_USER", "database-username");
define("DB_PASS", "database-password");

/**
*   Defining the cost factor to the coding algorithm
*/
define("HASH_COST_FACTOR", "10");

/**
*   @secretKey
*   This is the key used to generate the JWT token.
*   To generate a new key, use this function: base64_encode(openssl_random_pseudo_bytes(64));
*   Ideally, you would want to create a file and read from it.
*/

define("SECRET_KEY", 'TSJJrNUkNYq3nXjF+ExcIMy3L75VBGMpvxt686XZYV7qldhzs3xFWod3u/L6ApcL1IshrZJ8Aw1ki4tE6PDo7w==');

/**
* Timeout before token expires
* @deafult 30 minutes.
*/

define("TOKEN_EXPIRATION", 1800);

?>