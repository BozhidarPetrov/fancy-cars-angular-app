This is my Angular project for the Soft Uni project defense and first Angular app in general.

The application is located in the "src" folder and the REST API is in the "REST-API-FOR-FANCY-CARS" folder.
The back-end uses Express JS, Mongoose, Bcrypt for hashing the passwords and JWT for generating tokens. It is started with "node index.js" in the terminal.
The front-end uses Angular and the design is made with Bootstrap, with focusing on reusable HTML and CSS. It is started with "ng s" in the terminal.
'npm install' must be performed in the terminal for both the back and front-end, so the application can work.

The aplication is a basic social network for car enthusiasts, where they can upload their own and like other people's cars.

The owner of the post can edit and delete it, while a user that's logged in, but is not the owner can only like it (no more than once).
Non logged users can only see the details of a current car, but can't perform any actions.

Guests can access Home, All Cars, Car Details (without extra functionality), Search, Login and Register.
Users have access to Home, My Cars, Add Car, Car Details(with Like, Edit and Delete functionality), All Cars, Search and Logout.

The input is validated both on the front and back-end and error handling has been applied, so even if an error occurs - the application will not crash.

The Login, Register and Add New Car forms are HTML ones. The Edit Car form is a Reactive one - for practicing both types. The HTML version of it (.html and .ts files) are kept - for comparison.

IMPORTANT - if you are having back-end connectivity issues - the connectionString in the database.js file needs to be changed from mongodb://localhost:27017/${dbName} to mongodb://127.0.0.1:27017/${dbName} !

