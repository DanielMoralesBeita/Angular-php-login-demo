# Angular-php-login-sample
This is a sample application that uses token authentication for an AngularJS project.
The application allows you to add, delete, edit(work in progress..) job posts. It also allows
you to login and register.

The following stack is used in order to create the backend:
- Slim Framework for creating the API
- [PHP-JWT](https://github.com/firebase/php-jwt) for processing and creating the tokens.
- [Php-Login-Advanced](https://github.com/panique/php-login-advanced) I used it for reference on how to do authentication using the new PHP function BCRYPT. At the moment, it seems
that it's no longer supported, but some of the principles on how to do authentication sill apply.

View [demo in progress..](http://www.nead23.com/demo/jobs-board/index.html)

## The following is a list of changes:
- The ability to recover passwords.
- The ability to send emails when a user registers for the first time and confirmation.
- Front end test cases for the login and registration as well as the other features.