# KineSoin

A full-stack web application designed to connect patients with healthcare professionals and simplify the management of healthcare services.

KineSoin allows patients to create accounts, manage their profiles, and interact with healthcare professionals, while administrators can manage platform users and professional profiles.

This project was developed as a full-stack application with a focus on clean architecture, maintainability, and modern development practices.

## 🚀 Features

### Patient features

- User registration and authentication
- Profile management
- Personal information updates
- Profile picture management

### Healthcare professional features

- Professional profile management
- Access to personal information
- Account management

### Administrator features

- Manage healthcare professionals
- View and update professional information
- Manage platform data securely

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- React Router
- TanStack Query
- Context API
- CSS / custom styling

### Backend

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT authentication
- Multer for file uploads

### Development tools

- Git / GitHub
- ESLint & formatting tools
- Environment-based configuration

## 🏗️ Project Architecture

The project is separated into two main applications:

```text
KineSoin
│
├── frontend
│   └── React application
│
└── backend
    └── Node.js / Express API
```

### Frontend architecture

The frontend follows a component-based architecture:

- Pages handle route-level views
- Components are reusable UI elements
- Contexts manage global UI/application states
- Custom hooks encapsulate reusable logic
- TanStack Query manages server state and API interactions

### Backend architecture

The backend follows a layered architecture:

- Routes define API endpoints
- Handlers/controllers manage HTTP requests and responses
- Services contain business logic and database operations
- Models define database entities using Sequelize
- Middleware handles authentication and request processing

This separation improves readability, scalability, and maintainability.

---

## 📂 Repository Structure

```text
KineSoin
│
├── frontend
│ ├── src
│ │ ├── api
│ │ ├── components
│ │ ├── contexts
│ │ ├── hooks
│ │ ├── pages
│ │ └── routes
│
├── backend
│ ├── src
│ │ ├── controllers
│ │ ├── services
│ │ ├── routes
│ │ ├── models
│ │ ├── middlewares
│ │ └── utils
│
└── README.md
```

For more detailed information:

- Frontend documentation: `frontend/README.md`
- Backend documentation: `backend/README.md`

## ⚙️ Installation

### Requirements

Make sure you have installed:

- Node.js
- PostgreSQL
- npm

## Clone the repository

```bash
git clone <repository-url>

cd kineSoin
```

### Backend setup

```bash
cd backend

npm install
```

Create a `.env` file in the backend folder:

```env
PORT=
DATABASE_URL=
JWT_SECRET=
```

Run the backend:

```bash
npm run dev
```

### Frontend setup

Open another terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend application:

```bash
npm run dev
```

## 🌱 Development choices

During development, particular attention was given to maintainability, scalability, and code quality.

### Maintainable architecture

The project was structured to keep responsibilities separated and avoid unnecessary coupling between different parts of the application.

### Server state management

TanStack Query was used to handle API requests, caching, synchronization, and loading/error states instead of manually managing server state.

This allows the application to have a more predictable data flow and reduces unnecessary complexity in components.

### Backend separation

Business logic was separated from HTTP handling by introducing services.

This separation keeps handlers/controllers focused on request validation and response formatting while services handle business rules and database interactions.

### Code quality

The project follows principles such as:

- DRY (Don't Repeat Yourself)
- Separation of concerns
- Reusable components
- Clear naming conventions

## 📜 Available scripts

The following commands are available from the project root:

### Start full development environment

```bash
pnpm dev
```

Starts both frontend and backend development servers simultaneously.

### Lint the entire project

```bash
pnpm lint
```

Runs Oxlint across the project.

### Fix linting issues automatically

```bash
pnpm lint:fix
```

Attempts to automatically fix linting issues.

### Lint frontend only

```bash
pnpm lint_front
```

Runs linting on the frontend application.

### Lint backend only

```bash
pnpm lint_back
```

Runs linting on the backend application.

### Lint frontend and backend

```bash
pnpm lint_both
```

Runs linting checks for both applications.

### Reset database

```bash
pnpm db:reset
```

Resets the backend database using the configured database reset script.

## 🔮 Future improvements

Possible improvements for future versions:

- Add automated tests (unit, integration, and end-to-end testing)
- Improve accessibility across the application
- Implement more advanced role and permission management
- Improve monitoring and error handling
- Deploy the application in a production environment

👨‍💻 Author

Developed by Emilian
