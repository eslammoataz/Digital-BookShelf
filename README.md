# Digital Bookshelf

Digital Bookshelf is an online book library platform developed with Express.js, Firebase, and JWT authentication. It facilitates user interaction, book management, uploading, downloading, and rating functionalities. The platform is designed to provide a seamless experience for users to explore, upload, and engage with digital books.

## **Features**
- **User Interaction**: Users can interact with the platform by uploading books, downloading books, and rating them.
- **Firebase Integration**: Utilizes Firebase APIs for efficient organization, uploading, and retrieval of book PDFs and cover photos, optimizing the handling of digital content.
- **API Versioning**: Implemented API versioning using URIs for better management and scalability.
- **Role-based Functionalities**: Admin actions like approving or denying book submissions are available.
- **Comment and Review System**: Users can interact through comments and reviews for each book.
- **Authenticated Access**: Authenticated users have access to view their uploaded books and associated ratings.

## **Technologies Used**
- **Express.js**: Backend framework for building web applications and APIs in Node.js.
- **Firebase**: Cloud-based platform for building mobile and web applications.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Firebase Storage**: For storing and retrieving book PDFs and cover photos.

## Installation

1. **Clone the repository:**
```bash
  git clone (https://github.com/eslammoataz/Digital-BookShelf)
```
   

2. **Navigate to the project directory:**
  ```bash
  cd digital-bookshelf
  ```

3. **Install dependencies:**
  ```bash
  npm install
  ```

4. **Set up Firebase configuration by creating a Firebase project and configuring the credentials.**
5. **Start the server:**
  ```bash
    npm start
```

## **Usage**
After installation and setup, users can access the platform through the provided URL.
Admins can approve or deny book submissions and manage user interactions.
Authenticated users can upload books, download books, rate books, and engage with other users through comments and reviews.

## Postman Collection
For testing the API endpoints, you can use our Postman collection. Download it [here](https://github.com/eslammoataz/Digital-BookShelf/blob/main/Digital%20BookShelf.postman_collection.json).
