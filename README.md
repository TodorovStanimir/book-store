# React course project

## Book store is SPA for advertising books.

It was generated with create-react-app, and used react and react-dom - version 16.13.1, and react-router-doma - version 5.2.0. All input forms are with validation of the entered information, accomplished via author's implementation. The user interface is in English and Bulgarian language accomplished via author's implementation.

## Application structure.

The application have public part and private part.

### Public part

The public part is visible without authetntication and consists: 

#### home page:  
![Home page for quest users](/images/homePageQuestUsers.png)

#### register form:  
![Register form](/images/userRegister.png)

#### login form:
![Login form](/images/userLogin.png)

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

The user will be notified if something is wrong or incorrect. For example if he wrong his email or password

#### notification
![notification in login page](/images/Notification.png)

## Project setup
```
npm install
cd client
npm install
```

### Compiles and hot-reloads for development
```
npm run dev - start expressjs server - which serve data to react application and react application.
npm run server - start expressjs server.
npm run client - start react application
```
