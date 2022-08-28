# PetProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# App Structure
Within the src/app folder lies the components for this app
- /auth
    > the auth folder contains the components and services related to user authentication and router protection.
    - /login - folder
        > contains the logic and html template for user login. It calls the authService login() method
    - /auth-guard.service.ts
        > implements the authentication guard logic for redirecting unauthorised users to the login screen
    - /auth.service.ts
        > contains the implementation for the login() method, and provides restricted access to the user object containing the details of the current logged in user
    - /authData.model.ts
        > an interface to define the structure of the authentication data passed from the login page
    - /user.model.ts
        > an interface to define the structure of the currently logged-in user

- /material
    > a simple module that exports all the angular material modules used across the app
- /navigation
    > this component implements the navbar
- /page-not-found
    > this is a fallback component for when a user enters an invalid route
- /petStore
    > this folder contains the components which implement the logic associated with the pet management
    - /add-pet
        > this component implements the logic, validations and display for a user to add a new pet to the 
        database
    - /list-pets
        > this component implements the logic, and display to filter the list of pets by status
    - /view-pet-details
        > this component diplays the details of a selected pet from the list-pets components
    - pet-store.service.ts
        > provides the available status options for filtering and adding of pets
    - pet.model.ts
        > the interface defining the structure of a Pet Object.
- /shared
    > a module exporting commonly used components
    - /loading
        > a loading indicator implementation
- /testHelpers
    contains a single file spec-helpers.ts which defines some common functions used in tests
- app-routing.module.ts
    > contains the routes for the app
- app.component.css
    > css styling for the app component
- app.component.html
    > html template for the app component
- app.component.spec.ts
    > testing for app component
- app.component.ts
- app.module.ts
- constants.ts
    > specifies some strings for use across the app
- database.services.ts
    > implements http call definitions
