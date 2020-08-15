# React course project is uploaded on https://react-store-book.herokuapp.com/.

## Book store is SPA for advertising books.

It was generated with create-react-app and used:
  react and react-dom - 16.13.1
  react-router-dom - 5.2.0
  axios - 0.19.2
  moment - 2.27.0
  external API's: Cloudinary, Google.Maps

The input forms are with validation of the entered information, accomplished via author's implementation.The user interface is in English and Bulgarian language accomplished via author's implementation.

## Project setup
```
npm install
cd client
npm install
```

### Loads for development
```
npm run server - start expressjs server - which serve data to react application and react application
npm run client - start react application
npm run dev - start expressjs server and react application /used concurrently package/

to start the application is necessary to add .env file with following structure:

# .env
NODE_ENV=development
PORT=port which You prefer
MONGO_USER=Your username for mongo
MONGO_PASSWORD=Your password for mongo
MONGO_DEFAULT_DATABASE=name which You prefer
JWT_SECRET=string which You prefer
COOKIE_SECRET=string which You prefer
SALT_ROUNDS=number between 1 and 12
SENDGRID_API_KEY=Your APIKey for Sendgrid
```

## Application structure.

The application have public part and private part.

### Public part

The public part is visible without authetntication and consists: 

#### home page:  
![Home page for quest users](/images/homePageQuestUsers.png)
- guest users can see basic information for each books, but can not access details page and its functionality.

#### register form:  
![Register form](/images/userRegister.png)
- guest users can register by submitting this form. The email address must be unique and user will be notified if try to used registered email. All fields are with validation and register button is disabled if vaidation did not pass. There is validation on the server too, and if the client mannipulate the client site validation, the server will return warning message and registration will not be done. Password is not visible, till client press eye icon. If the registration is success, user will automatically log in.

#### login form:
![Login form](/images/userLogin.png)
- registered users can login by typing email and password , and submitting this form. They will be notified if email or password is not correct.

#### contact form:
![Login form](/images/contactUsNotLoggedUser.png)
- submitting this form, quest users can send message to the owner of the site.

### Private part

The private part is visible for all successfully login users.

It holds managment functionality for the users's profiles:

#### user profile
![User profile](/images/userProfile.png)

- user can change his information: email, phone, occupation, profile picture;
- user getting information for all his books, count of likes, unlikes, comments can navigate to each his book, can navigate to edit the book, can navigate to details infomation for the book, or delete the book.

The rest of the private part consists:
#### all books listing.
![Home page for authenticated users](/images/homePageLoggedInUsers.png)

- page showing all books in application - if You are on the route /books/all.

In this page each user can delete the book /if he is its owner/, can navigate to edit the book /if he is its owner/, can navigate to details information for each book. 

#### details information for book if user is owner of the book.
![book details if user is owner of the book](/images/bookDetails%20if%20user%20is%20owner%20book.png)

#### details information for book if user is not owner of the book.
![book details if user is not owner of the book](/images/bookDetails%20if%20user%20is%20not%20owner%20book.png)

Here user can comment books or delete his comments, can navigate to edit the book /if is owner of the book/, can delete book /if is owner of the book/, can rate /like or unlike/ books of other users, but not rate owned by him books, can see contact information for owner of each book - email and phone number. The part for comment of the books looks different if there are comments or not.

#### comments for the book.
![comments](/images/bookComments.png)

#### create a new book
![create a new book](/images/bookCreate.png)

- page for creating a new book. Here user can add a new book.

#### edit an existing book
![edit the book](/images/bookEdit.png)

- page for editing an existing book.

Pages for creating and editing a book used the same component, but depending the route is loading different context.

How works the validation of entered by users information is shown on next photo:

#### errors
![errors in create a new book](/images/Errors.png)

The user will be notified if something is wrong or incorrect.

#### notification
![notification in login page](/images/Notification.png)

#### contact form:
![Login form](/images/contactUsLoggedUser.png)
The username, email and phone are automatically loaded in the form, and user have to write only his message.
