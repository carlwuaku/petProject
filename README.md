# PetProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# App Structure
Within the src/app folder lies the components for this app
- /auth
    > the auth folder contains the components and services related to user authentication and router protection.
    /login - folder
    > contains the logic and html template for user login. It calls the authService login() method
    /auth-guard.service.ts
    > implements the authentication guard logic for redirecting unauthorised users to the login screen
    /auth.service.ts
    > contains the implementation for the login() method, and provides restricted access to the user object containing the details of the current logged in user
    /authData.model.ts
    > an interface to define the structure of the authentication data passed from the login page
    /user.model.ts
    > an interface to define the structure of the currently logged-in user

- /material
    > 
