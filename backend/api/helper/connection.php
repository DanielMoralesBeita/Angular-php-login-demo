<?php
/**
* @name DbConnection
* @description
* Simple class to connect to the database. 
*/

class DbConnection{
    public $connection = null;
    public $isConnected = false;

    public function __construct(){
        try {
    
            $this->connection = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME . ';charset=utf8', DB_USER, DB_PASS);

            $this->isConnected = true;
        }   
        catch(PDOException $e) {

            $this->isConnected = false;
        }
    }

    function setErrors(){
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    function getConnection(){
        return $this->connection;
    }
    function isConnected(){
        return $this->isConnected;
    }
}

?>