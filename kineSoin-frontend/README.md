# KineSoin Frontend

The frontend application of KineSoin is built with React and focuses on providing a structured, maintainable, and scalable user interface.

The application follows a component-based architecture and uses modern React patterns to manage UI state, server data, routing, and reusable logic.

## 🛠️ Tech Stack

- React
- JavaScript
- React Router
- TanStack Query
- Context API
- CSS
- Vite

## 🏗️ Project architecture

The frontend follows a component-based architecture designed to keep responsibilities separated and make the application easier to maintain and scale.

The main responsibilities are divided between:

- **Pages**: Route-level components responsible for displaying complete views.
- **Components**: Reusable UI elements shared across different parts of the application.
- **Contexts**: Global application and UI state management.
- **Hooks**: Reusable logic extracted from components.
- **API layer**: Centralized communication with the backend services.
- **Routes**: Application navigation and route protection.

## 📂 Folder structure

The frontend source code is organized by responsibility:

```text
src
│
├── @types
│   └── Type definitions and shared interfaces
│
├── components
│   └── Reusable UI components
│
├── contexts
│   └── Global application and UI state management
│
├── data
│   └── Static data and application constants
│
├── layouts
│   └── Shared page layouts and structural components
│
├── pages
│   └── Application views organized by routes
│
├── styles
│   └── Global styles and styling resources
│
└── utils
    ├── api
    │   └── Functions responsible for backend communication
    │
    ├── config
    │   └── Application configuration and constants
    │
    ├── functions
    │   └── Shared reusable functions
    │
    ├── hooks
    │   └── Custom reusable React hooks
    │
    └── localStorage
        └── Local storage management helpers
```

## 🧠 State management

The application separates client-side state management from server-side data management.

### Context API

React Context is used for global application and UI-related state.

It is mainly used for:

- Managing shared state between components
- Handling application-level states
- Avoiding unnecessary prop drilling
- Managing UI states such as editing modes and interface behavior

### TanStack Query

TanStack Query is used for server state management and API interactions.

It handles:

- Fetching data from the backend
- Caching responses
- Synchronizing data between the client and server
- Managing loading and error states
- Updating data after mutations

This separation keeps components simpler by avoiding manual state management for API data and provides a more predictable data flow throughout the application.

## 🌐 API communication

The frontend communicates with the backend through a centralized API layer located in `utils/api`.

This approach keeps API requests separated from UI components and avoids duplicating request logic throughout the application.

The API layer is responsible for:

- Organizing backend requests by feature
- Handling communication with the server
- Preparing request parameters and payloads
- Managing authentication-related requests

Components and hooks consume this API layer instead of directly making HTTP requests, improving maintainability and keeping the application logic separated.

## 🧭 Routing and layouts

The application uses React Router to manage navigation between different views.

Routes are organized around application pages and layouts:

- **Pages** represent complete views accessible through routes.
- **Layouts** provide shared structures and UI elements across multiple pages.
- **Protected routes** help restrict access to sections depending on authentication and user permissions.

This structure allows the application to keep navigation logic separate from page content while maintaining reusable layouts.

## 🌱 Development choices

The frontend architecture was designed with maintainability, readability, and scalability in mind.

### Component reusability

Reusable components are created to avoid duplication and keep the interface consistent across the application.

### Separation of concerns

Responsibilities are separated between:

- UI components
- Application state management
- API communication
- Reusable logic

This keeps components focused and easier to maintain.

### Custom hooks

Reusable logic is extracted into custom hooks to avoid repeating behavior across components and improve code organization.

### Code quality principles

The project follows principles such as:

- DRY (Don't Repeat Yourself)
- Separation of concerns
- Clear component responsibilities
- Consistent naming conventions

## ⚙️ Installation and setup

### Requirements

Make sure you have installed:

- Node.js
- npm

### Install dependencies

From the frontend folder:

```bash
npm install
```

### Environment variables

Create a `.env` file in the frontend folder and add the required environment variables.

Example:

```env
VITE_API_URL=
```

### Run the development server

Start the application with:

```bash
npm run dev
```

The application will be available through the URL provided by Vite.

## 📜 Available scripts

The following commands are available from the frontend folder:

### Start development server

```bash
npm run dev
```

Runs the application in development mode using Vite.

### Build for production

```bash
npm run build
```

Creates an optimized production build of the application.

### Preview production build

```bash
npm run preview
```

Locally previews the production build.

### Linting

```bash
npm run lint
```

Checks the codebase for potential issues and enforces code quality rules.

## 🔮 Future improvements

Possible improvements for future versions of the frontend:

- Add automated frontend testing
- Improve accessibility across the application
- Further optimize application performance
- Improve loading and error handling experiences
- Continue improving component organization as the application grows
