# KineSoin Backend

The backend application of KineSoin is built with Node.js and Express and provides the API layer responsible for handling business logic, authentication, database interactions, and communication with the frontend application.

The backend follows a structured architecture focused on separation of concerns, maintainability, and scalability.

The application separates HTTP request handling from business logic through a handler/service architecture, allowing each layer to have a clear responsibility.

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- JavaScript
- Sequelize ORM
- PostgreSQL
- JWT authentication
- Multer for file uploads

### Development tools

- Git / GitHub
- npm
- Environment-based configuration
- ESLint and code formatting tools

## 🏗️ Backend architecture

The backend follows a layered architecture designed to separate responsibilities and keep the codebase easier to maintain and evolve.

The main responsibilities are divided between:

- **Routes**: Define API endpoints and connect requests to the appropriate handlers.
- **Handlers**: Manage HTTP request handling, input validation, and response formatting.
- **Services**: Contain business logic and database operations.
- **Models**: Define database entities and relationships using Sequelize.
- **Middlewares**: Handle reusable request processing such as authentication and validation.
- **Utils**: Contain shared helper functions and reusable logic.

This separation prevents controllers/handlers from becoming overloaded and keeps business logic independent from HTTP-specific concerns.

## 📂 Folder structure

The backend source code is organized by responsibility:

```text
src
│
├── authentication
│   └── Authentication logic and user authorization handling
│
├── cloudinary
│   └── File upload and image management configuration
│
├── middlewares
│   └── Reusable request processing middleware
│
├── models
│   └── Sequelize models and database relationships
│
├── routing
│   ├── controllers
│   │   └── HTTP request handling and response formatting
│   │
│   └── routers
│       └── API endpoint definitions
│
├── services
│   └── Business logic and database operations
│
├── utils
│   └── Shared utility functions
│
└── validations
    └── Input validation rules and schemas
```

## 🔄 Request flow

Requests follow a structured flow through the different backend layers:

```text
Client request
      │
      ▼
Router
      │
      ▼
Middleware
      │
      ▼
Controller
      │
      ▼
Service
      │
      ▼
Model / Database
      │
      ▼
Response
```

Each layer has a specific responsibility:

- **Routers** define available API endpoints.
- **Middlewares** handle reusable operations such as authentication checks.
- **Controllers** handle HTTP-specific concerns, validate requests, and format responses.
- **Services** contain business logic and interact with the database.
- **Models** manage database entities and relationships through Sequelize.

This separation keeps the backend easier to understand, maintain, and extend.

## 🗄️ Database and ORM

The backend uses PostgreSQL as its relational database and Sequelize as the ORM for managing database interactions.

Sequelize is used for:

- Defining database models
- Managing relationships between entities
- Performing database queries
- Structuring data access through a consistent interface

The database layer is separated from business logic through services, allowing controllers to remain focused on handling HTTP requests and responses.

This approach improves maintainability and makes future changes to the data layer easier to manage.

## 🔐 Authentication and authorization

The backend implements authentication mechanisms to secure access to protected resources.

Authentication is responsible for:

- Identifying users
- Validating credentials
- Managing authenticated sessions
- Protecting restricted API endpoints

Authorization rules are applied to ensure that users can only access resources according to their permissions and roles.

Authentication-related logic is separated from business logic to keep security concerns isolated and easier to maintain.

## ✅ Validation and error handling

The backend uses dedicated validation logic to ensure that incoming data respects application rules before being processed.

Validation is used for:

- Checking required fields
- Validating user input
- Preventing invalid data from reaching the database
- Ensuring consistent API behavior

Error handling is organized to provide predictable responses and keep error management separate from business logic.

This approach improves reliability and makes debugging easier during development.

## ☁️ File management

The backend uses Cloudinary for managing uploaded files, such as profile images.

The file management layer is responsible for:

- Uploading files to external storage
- Managing image URLs
- Keeping file-related logic separated from the rest of the application

This allows the application to handle user-uploaded content without coupling storage logic directly to business logic.

## 🌱 Development choices

The backend architecture was designed with maintainability, readability, and separation of responsibilities in mind.

### Separation of concerns

Each layer has a specific responsibility:

- Routers handle endpoint definitions.
- Controllers handle HTTP requests and responses.
- Services contain business logic and database operations.
- Models manage data representation and relationships.

This prevents individual files from becoming too complex and makes the application easier to evolve.

### Service-oriented business logic

Business logic is centralized in services instead of being handled directly inside controllers.

This approach improves:

- Code readability
- Reusability
- Maintainability
- Testability

### Code quality principles

The project follows principles such as:

- DRY (Don't Repeat Yourself)
- Separation of concerns
- Reusable logic
- Clear naming conventions
- Consistent project organization

## ⚙️ Installation and setup

### Requirements

Make sure you have installed:

- Node.js
- npm
- PostgreSQL

### Install dependencies

From the backend folder:

```bash
npm install
```

### Environment variables

Create a `.env` file in the backend folder and add the required environment variables.

Example:

```env
PORT=
DATABASE_URL=
JWT_SECRET=
```

### Run the development server

Start the backend with:

```bash
npm run dev
```

The API will start on the configured server port.

## 📜 Available scripts

The following commands are available from the backend folder:

### Start development server

```bash
npm run dev
```

Runs the backend server in development mode.

### Start production server

```bash
npm start
```

Starts the backend server using the production configuration.

### Linting

```bash
npm run lint
```

Checks the codebase for potential issues and enforces code quality rules.

## 🔮 Future improvements

Possible improvements for future versions of the backend:

- Add automated backend testing
- Improve API documentation
- Add more advanced logging and monitoring
- Improve error tracking and observability
- Further improve scalability and deployment configuration
