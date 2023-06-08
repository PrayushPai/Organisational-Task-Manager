# Documentation

### **Overview**

This frontend documentation provides an overview of the file **`app.js`**, which serves as the main entry point for the frontend application. The file is responsible for configuring the routing and rendering of different components based on the current user type. It utilizes the React Router library for managing the application's routes.

### **Technologies Used**

- React.js

### **Prerequisites**

- Node.js and npm should be installed on the system.

### **Installation and Setup**

1. Clone the repository and navigate to the project directory.
2. Install the dependencies by running the following command:

```jsx
npm install
```
3. The server will run on **`http://localhost:3000`**.


### **Component Hierarchy**

- Layout: Represents the common layout structure of the application, including the navigation bar.
- Home: Renders the home page component.
- Register: Renders the registration page component.
- Login: Renders the login page component.
- UserProfile: Renders the user profile page component.
- InstituteDashboard: Renders the institute dashboard page component.
- UserTasks: Renders the user tasks page component.
- SubmitTask: Renders the task submission page component.
- ReviewTask: Renders the task review page component.
- BreakdownTask: Renders the task breakdown page component.
- ChildrenTask: Renders the children tasks page component.

### **Routing Configuration**

The routing is configured using the React Router library. Here's a summary of the defined routes:

- For institutes:
    - Home page: Route path: **`/`** (root path)
    - Institute dashboard: Route path: **`/institute/profile`**
- For users:
    - Home page: Route path: **`/`** (root path)
    - User profile: Route path: **`/user/profile`**
    - User tasks: Route path: **`/user/tasks`**
    - Submit task: Route path: **`/user/tasks/submit`**
    - Review task: Route path: **`/user/tasks/review`**
    - Breakdown task: Route path: **`/user/tasks/breakdown`**
    - Children task: Route path: **`/user/tasks/children`**
- For other users (not logged in):
    - Home page: Route path: **`/`** (root path)
    - Registration page: Route path: **`/register`**
    - Login page: Route path: **`/login`**

### **User Type Handling**

The **`App`** component checks the user type stored in the browser's local storage (**`sessionStorage.getItem("usertype")`**) to determine which routes and components to render. The available user types are:

- "I" (Institute): Renders the routes and components specific to the institute.
- "U" (User): Renders the routes and components specific to the user.
- Other: Renders the routes and components for other users (not logged in), such as the home page, registration page, and login page.

### **Usage**

To use this frontend application, ensure that you have the necessary dependencies installed and the components defined as mentioned in the documentation. You can then integrate this **`app.js`** file into your React project. Adjust the routes, components, and user type handling as per your application's requirements.
