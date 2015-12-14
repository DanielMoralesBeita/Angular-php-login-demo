# Angular-php-login-sample
This is a sample application that uses token authentication for an AngularJS project.
The application allows you to add, delete, edit job posts. 

The following stack is used in order to create the backend:
- Slim Framework for creating the API
- [PHP-JWT](https://github.com/firebase/php-jwt) for processing and creating the tokens.
- [Php-Login-Advanced](https://github.com/panique/php-login-advanced).

View [demo in progress..](http://www.nead23.com/demo/jobs-board/index.html)

## Backend
The files of importance here are:
* index.php // this file contains the routes to login, register, and the job handling as well as my account.
* models/trucking.php // helper class.

Index.php contains the route that handles the requests sent by the client application.
The trucking model handles addition, deletion, and updating of a job post. It also handles
the returns of jobs.

## Front End

To see how the authentication is done, you can see the following files:
* /services/authfact.js handles the authentication process.
* /account/dashboard shows one way to pass the token for the server to validate.