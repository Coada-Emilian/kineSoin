# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# kineSoin-backend

Backend API for a medical and therapy management platform supporting patients, therapists, administrators, and medics.

The API provides authentication, appointment management, affliction tracking, messaging, insurance management, and prescription handling.

The backend follows a modular architecture with a strong separation of responsibilities between routing, controllers, services, models, validation, and infrastructure.

---

# 📌 Table of Contents

- [React + TypeScript + Vite](#react--typescript--vite)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
- [kineSoin-backend](#kinesoin-backend)
- [📌 Table of Contents](#-table-of-contents)
- [🩺 Project Overview](#-project-overview)
- [🧱 Architecture Overview](#-architecture-overview)
    - [Controllers](#controllers)
    - [Services](#services)
    - [Models](#models)
    - [Middlewares](#middlewares)
    - [Validation Layer](#validation-layer)
    - [Routing](#routing)
    - [Database](#database)
- [🛠️ Tech Stack](#️-tech-stack)
  - [Backend](#backend)
  - [Validation \& Security](#validation--security)
  - [External Services](#external-services)
  - [Development Tools](#development-tools)
- [📁 Folder Structure](#-folder-structure)
- [🔧 Environment Variables](#-environment-variables)
- [📥 Installation](#-installation)
  - [Requirements](#requirements)
  - [Steps](#steps)
- [🗄️ Database Setup](#️-database-setup)
  - [Create database tables](#create-database-tables)
  - [Populate database](#populate-database)
  - [Sequelize](#sequelize)
- [🚀 Running the Server](#-running-the-server)
  - [Development](#development)
  - [Production](#production)
- [📚 API Documentation](#-api-documentation)
- [🧩 Validation Layer](#-validation-layer)
- [🧰 Services and Utilities](#-services-and-utilities)
  - [Services](#services-1)
  - [Utilities](#utilities)
- [⚠️ Error Handling](#️-error-handling)
- [🔐 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Authors](#-authors)

---

# 🩺 Project Overview

The kineSoin backend powers a multi-role healthcare platform allowing:

* Patient registration, profile management, and messaging
* Therapist dashboards, patient management, and prescription handling
* Administrator management of therapists, medics, and insurance providers
* Secure authentication with role-based access
* Structured medical data management:

  * Afflictions
  * Body regions
  * Prescriptions
  * Appointments
  * Insurance information

The backend is designed with a separation of concerns to keep HTTP handling, business logic, and database access clearly separated.

---

# 🧱 Architecture Overview

The backend follows a modular architecture:

```
Request
   |
   ↓
Router
   |
   ↓
Controller
   |
   ↓
Service
   |
   ↓
Model (Sequelize)
   |
   ↓
Database
```

Responsibilities are separated as follows:

### Controllers

Handle HTTP-related logic:

* Receive requests
* Extract parameters/body data
* Call services
* Return responses

### Services

Contain application/business logic:

* Therapist management
* Patient operations
* Appointment handling
* Authentication workflows

Services keep controllers lightweight and avoid mixing business rules with HTTP concerns.

### Models

Define Sequelize entities and database relationships.

### Middlewares

Handle cross-cutting concerns:

* Authentication
* Authorization
* Request sanitization
* Controller error handling

### Validation Layer

Joi schemas ensure incoming data respects expected formats.

### Routing

Organizes API endpoints by:

* User roles
* Domain entities
* Application features

### Database

SQL scripts manage:

* Table creation
* Database population
* Development initialization

---

# 🛠️ Tech Stack

## Backend

* Node.js — JavaScript runtime
* Express.js — HTTP server framework
* PostgreSQL — relational database
* Sequelize — ORM

## Validation & Security

* Joi — request validation
* Scrypt — password hashing
* Authentication middleware
* Request sanitization

## External Services

* Cloudinary — image/media storage

## Development Tools

* ESLint
* Prettier
* dotenv

---

# 📁 Folder Structure

Simplified overview:

```
src/
├── authentication/
├── cloudinary/
├── middlewares/
├── models/
├── routing/
├── services/
├── utils/
└── validations/

database/
├── create_tables.sql
├── populate_tables.sql
└── database utilities

docs/
```

The complete project tree is available in the repository documentation.

---

# 🔧 Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=
JWT_SECRET=
PORT=
```

---

# 📥 Installation

## Requirements

* Node.js
* PostgreSQL
* Cloudinary account

## Steps

```bash
git clone <repository-url>

cd kineSoin-backend

npm install
```

---

# 🗄️ Database Setup

## Create database tables

```bash
psql -f database/create_tables.sql
```

## Populate database

```bash
psql -f database/populate_tables.sql
```

## Sequelize

Database models and relationships are initialized through:

```
src/models/sequelize_client.js
```

---

# 🚀 Running the Server

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# 📚 API Documentation

Main API domains:

* Authentication
* Patients
* Therapists
* Administrators
* Medics
* Afflictions
* Appointments
* Insurance
* Messaging
* Prescriptions

Routes and controllers are organized under:

```
src/routing/
├── controllers/
└── routers/
```

Possible future documentation:

* Postman collection
* Swagger/OpenAPI specification

---

# 🧩 Validation Layer

Input validation is handled using Joi schemas.

Location:

```
src/validations/
```

Validation categories include:

* Creation schemas
* Update schemas
* Registration schemas
* Authentication schemas

---

# 🧰 Services and Utilities

## Services

Business operations are organized by domain:

Examples:

* Patient management
* Therapist management
* Appointment management
* Insurance management
* Prescription management
* Messaging workflows

## Utilities

Reusable helper functions:

Examples:

* ID validation
* Date formatting
* Database helper functions

---

# ⚠️ Error Handling

The backend centralizes error handling through:

* Controller wrappers
* Error propagation
* Input validation
* Authentication error handling

This avoids duplicating error management logic throughout controllers.

---

# 🔐 Security

Implemented security measures:

* Password hashing with Scrypt
* Authentication middleware
* Role-based access control
* Request body sanitization
* Joi validation schemas
* Protected API routes

---

# 🤝 Contributing

Guidelines:

* Follow ESLint and Prettier rules
* Use feature branches
* Write clear commit messages
* Keep controllers focused on HTTP logic
* Keep business logic separated inside services

---

# 📄 License

Specify license here:

* MIT
* Proprietary
* Other

---

# 👤 Authors

Emilian
