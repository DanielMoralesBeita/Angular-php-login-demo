<?php

class Trucking {

    // object container for the PDO
    private $db;
    private $errors;

    public function __construct($db){
        $this->db = $db;
        $this->errors = array();
    }

    /**
    *   returns json encoded array
    */
    public function getJobs(){
        
        $pdo = $this->db->getConnection();
        $query = $pdo->prepare("SELECT * FROM trucking_jobs");
        $query->execute();
            
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        if($result){                
            return json_encode($result);
        }        
    }

    /**
    *   save new record
    *   Returns an array with errors.
    */
    public function saveNewJob($json, $owner_id){       
       
    $this->errors["status"] = "failure";
    $this->errors["message"] = array();

       if(strlen($json->title) > 100 || strlen($json->title) < 2){
           $this->errors["message"][] = "Title message cannot exceed more than 250 characters or be less than 15 characters";
       }
       if(strlen($json->description) > 500){
           $this->errors["message"][] = "Job description cannot be greater than 500 characters long";
       }
       if(strlen($json->requirements) > 500){
           $this->errors["message"][] = "Job Requirements cannot be more than 500 characters long";
       }
       if(strlen($json->location) > 50){
           $this->errors["message"][] = "Job Location cannot be more than 100 characters long";
       }
       if(strlen($json->compensation) > 200){
           $this->errors["message"][] = "Job Requirements cannot be more than 500 characters long";
       }
       if(strlen($json->benefits) > 200){
           $this->errors["message"][] = "Job Benefits cannot be more than 500 characters long";
       }
       if(strlen($json->howToApply) > 200){
           $this->errors["message"][] = "Job Requirements cannot be more than 500 characters long";
       }
       //var_dump($this->errors["message"]);
       if(count($this->errors["message"]) > 0){           
           return false;
       } else {         

           try {
               $pdo = $this->db->getConnection();
                // we are good to go: for Now.
               $job_title = trim($json->title);
               $job_description = trim($json->description);
               $job_requirements = trim($json->requirements);
               $job_location = trim($json->location);
               $job_compensation = trim($json->compensation);
               $job_benefits = trim($json->benefits);
               $job_howtoapply = trim($json->howToApply);

               $sql = "INSERT 
                      INTO 
                        trucking_jobs (owner_id, title, description, requirements, location, compensation, benefits, howToApply, datePosted) 
                       VALUES 
                       (:owner_id, :title, :description, :requirements, :location, :compensation, :benefits, :howToApply, :date)";
                $query = $pdo->prepare($sql);
                $query->bindValue(':owner_id', $owner_id, PDO::PARAM_INT);
                $query->bindValue(':title', $job_title, PDO::PARAM_STR);
                $query->bindValue(':description', $job_description, PDO::PARAM_STR);
                $query->bindValue(':requirements', $job_requirements, PDO::PARAM_STR);
                $query->bindValue(':location', $job_location, PDO::PARAM_STR);
                $query->bindValue(':compensation', $job_compensation, PDO::PARAM_STR);
                $query->bindValue(':benefits', $job_benefits, PDO::PARAM_STR);
                $query->bindValue(':howToApply', $job_howtoapply, PDO::PARAM_STR);
                $query->bindValue(':date', date("Y-m-d H:i:s"), PDO::PARAM_STR);

                $query->execute();
                $id = $pdo->lastInsertId();

                if($query){
                    // we have a result                    
                    return true;
                } else {
                    // let's return an error  
                    $this->errors["message"][] = "Unable to post ad. Please make sure to correct your data";                  
                    return false;
                }
           }
           catch(PDOException $ex){
               header("HTTP/1.0 500 Internal Server Error");
               // remove this when you are in production mode.
               // only use for debuggin purposes.
               echo $ex->getMessage();
           }
       }
    }

    public function getErrors(){
        return $this->errors;
    }

    /**
    * @description
    * Returns the job details based on the id of the job posting. It also includes the company profile as well
    */
    public function getJobDetails($id, $owner_id){
        
        $sql = 'SELECT a.owner_id, a.title, a.description, a.requirements, a.location, a.compensation, a.benefits, a.howToApply, a.datePosted, b.companyName, b.about, b.serviceDescription
            FROM trucking_jobs a, company_profile b
            WHERE a.id = :job_id && b.ownerId = :owner_id
            LIMIT 1';

        $pdo = $this->db->getConnection();
        $query = $pdo->prepare($sql);
        $query->bindValue(':job_id', $id, PDO::PARAM_INT);
        $query->bindValue(':owner_id', $owner_id, PDO::PARAM_INT);
        $query->execute();
            
        $result = $query->fetchAll(PDO::FETCH_OBJ);

        if($result && count($result > 0)){                
            return json_encode($result[0]);
        } else {
            return '{"status":"fail", "message":"Could not retrieve job listing."}';
        }
    }

    /**
    * @description
    * Returns the list of jobs posted by a user.
    */
    public function getUserListings($id){
        $sql = "SELECT id, owner_id, title, description, requirements, location, compensation, benefits, howToApply, datePosted
                FROM trucking_jobs WHERE owner_id = :id";

        $pdo = $this->db->getConnection();
        $query = $pdo->prepare($sql);
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->execute();
            
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        if($result){                
            return $result;
        } else {
            return NULL;
        }
    }

    /**
    * @description 
    * Deletes this particular job post from user's profile
    * @returns true on success or false on failure.
    */
    public function deleteJobPost($id, $owner_id){
        $pdo = $this->db->getConnection();
        $query = $pdo->prepare("DELETE FROM trucking_jobs WHERE id = :id && owner_id = :owner_id LIMIT 1");
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->bindValue(':owner_id', $owner_id, PDO::PARAM_INT);
        
        $query->execute();

        if($query){                
            return true;
        } else {
            return false;
        }
    }

    /**
    * @name editJobPost
    * @description
    * Allows to edit the job by ID
    */
    public function editJobPost($jodId) {
        $sql = "UPDATE SET ";
    }

    /**
    * @description
    * Returns the user profile.
    */
    public function getProfile($id){
        
    }

    /**
    * @description
    * Updates the user proile
    * @returns true on success false on failure
    */
    public function updateProfile($id, $profileObject){
        
    }

    /**
    * @description
    * Adds the new user profile when the company is created. The profileObject is a json array
    * @returns the id of the newly created user profile
    */
    public function addProfile($profileObject){
        
    }

    /**
    * @name findBySearchTerm
    * @description
    * @returns the resul upon success. Null if no match is found.
    */
    public function findBySearchTerm($searchTerm) {
        $sql = "SELECT * FROM trucking_jobs WHERE title LIKE :searchTerm OR description LIKE :searchTerm";
        
        $pdo = $this->db->getConnection();
        $query = $pdo->prepare($sql);
        $query->bindValue(':searchTerm', "%$searchTerm%", PDO::PARAM_STR);
        $query->execute();
            
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

        if($result){                
            return $result;
        } else {
            return NULL;
        }
    }

}

?>