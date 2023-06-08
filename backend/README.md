# Documentation

### **Technologies Used**

- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT)
- Bcrypt
- Cors

### **Prerequisites**

- Node.js and npm should be installed on the system.
- MySQL database should be set up.

### **Installation and Setup**

1. Clone the repository and navigate to the project directory.
2. Install the dependencies by running the following command:

```jsx
npm install
```

1. Create a **`.env`** file and configure the necessary environment variables, including the database connection details and JWT secret. The **`.env`** file need to have the following variables:
    
    ```jsx
    JWT_SECRET
    DATABASE_HOST
    DATABASE_USER
    DATABASE_PASSWORD
    DATABASE_NAME
    DATABASE_PORT
    ```
    
2. Set up the MySQL database and tables using the provided SQL scripts in the **`/app/models/db.sql`** directory.
3. Start the server by running the following command:
    
    ```
    npm start
    ```
    
4. To start the server in dev mode (i.e. using nodemon), run
    
    ```jsx
    npm run dev
    ```
    
5. The server will run on **`http://localhost:4000`**.

### **Routes and Functionality**

### GET **`/`**

- Description: Returns a simple greeting message.
- Response: A string with the message "Hi There".

### Institute Routes

### **GET `/institute/`**

- Description: Retrieves all institutes.
- Response: An array of institute objects.

### **POST `/institute/`**

- Description: Creates a new institute.
- Request Body: **`{ "name": "Institute Name", "password": "Institute Password" }`**
- Response: The created institute object.

### **POST `/institute/login`**

- Description: Authenticates an institute's login credentials.
- Request Body: **`{ "name": "Institute Name", "password": "Institute Password" }`**
- Response: The authenticated institute object.

### **POST `/institute/getRoles`**

- Description: Retrieves all roles of an institute.
- Request Body: **`{ "name": "Institute Name" }`**
- Response: An array of role objects associated with the institute.

### **GET `/institute/:id`**

- Description: Retrieves an institute by its ID.
- Response: The institute object with the specified ID.

### **PUT `/institute/:id`**

- Description: Updates an institute by its ID.
- Request Body: **`{ "name": "Updated Institute Name" }`**
- Response: The updated institute object.

### **PUT `/addRole/:id`**

- Description: Adds a role to an institute.
- Request Body: **`{ "role": "New Role Name" }`**
- Response: The updated institute object with the added role.

### User Routes

### **POST `/user/`**

- Description: Creates a new user.
- Request Body: **`{ "name": "User Name", "password": "User Password", "instituteId": "Institute ID", "role": "User Role", "parentId": "Parent User ID" }`**
- Response: The created user object.

### **POST `/user/login`**

- Description: Authenticates a user's login credentials.
- Request Body: **`{ "name": "User Name", "password": "User Password" }`**
- Response: The authenticated user object.

### **GET `/user/delete/:id`**

- Description: Deletes a user by its ID.
- Response: A success message.

### **POST `/heirarchy/`**

- Description: Retrieves the hierarchy of an institute.
- Request Body: **`{ "instituteId": "Institute ID" }`**
- Response: An array representing the hierarchy of the institute.

### **GET `/user/:id`**

- Description: Retrieves a user by its ID.
- Response: The user object with the specified ID.

### Task Routes

### **POST `/task/`**

- Description: Creates a new task.
- Request Body: **`{ "name": "Task Name", "deadline": "Task Deadline", "user_id": "User ID", "parent_task_id": "Parent Task ID", "description": "Task Description" }`**
- Response: The created task object.

### **GET `/task/`**

- Description: Retrieves all tasks.
- Response: An array of task objects.

### **GET `/task/byId`**

- Description: Retrieves a task by its ID.
- Request Body: **`{ "taskId": "Task ID" }`**
- Response: The task object with the specified ID.

### **POST `/task/byUserId`**

- Description: Retrieves tasks by the user ID.
- Request Body: **`{ "userId": "User ID" }`**
- Response: An array of task objects associated with the user.

### **POST `/task/getChildren`**

- Description: Retrieves the children tasks of a task.
- Request Body: **`{ "taskId": "Task ID" }`**
- Response: An array of task objects representing the children tasks.

### **POST `/task/submit`**

- Description: Makes a submission in a task.
- Request Body: **`{ "id": "Task ID", "submission": "Task Submission" }`**
- Response: A success message.

### **POST `/task/review`**

- Description: Reviews a submission in a task.
- Request Body: **`{ "id": "Task ID", "reviewed": "Review Status", "comment": "Review Comment" }`**
- Response: A success message.

## Schema

The given schema describes three tables: **`institutes`**, **`users`**, and **`tasks`**. Here is a brief description of each table:

1. Table **`institutes`**:
    - Columns:
        - **`id`**: An auto-incremented integer representing the institute ID (primary key).
        - **`name`**: A non-null varchar(255) column storing the name of the institute.
        - **`password`**: A non-null varchar(255) column storing the password of the institute.
        - **`roles`**: A JSON column storing the roles associated with the institute.
    - Primary Key: **`id`**
    - Unique Constraint: **`name`**
2. Table **`users`**:
    - Columns:
        - **`id`**: An auto-incremented integer representing the user ID (primary key).
        - **`name`**: A non-null varchar(255) column storing the name of the user.
        - **`password`**: A non-null varchar(255) column storing the password of the user.
        - **`instituteId`**: An integer representing the institute ID to which the user belongs (foreign key referencing **`institutes`** table).
        - **`role`**: A non-null varchar(255) column storing the role of the user.
        - **`parentId`**: An integer representing the parent user ID.
        - **`children`**: A JSON column storing the children associated with the user.
        - **`remainingHours`**: An integer storing the remaining hours for the user.
    - Primary Key: **`id`**
    - Foreign Key: **`instituteId`** references **`institutes(id)`**
3. Table **`tasks`**:
    - Columns:
        - **`id`**: An auto-incremented integer representing the task ID (primary key).
        - **`name`**: A varchar(255) column storing the name of the task.
        - **`parent_task_id`**: An integer column representing the parent task ID.
        - **`child_task_ids`**: A JSON column storing the child task IDs associated with the task.
        - **`user_id`**: An integer representing the user ID associated with the task.
        - **`reviewed`**: An integer column indicating whether the task has been reviewed (defaulted to 0).
        - **`comment`**: A varchar(255) column storing the comment for the task (defaulted to an empty string).
        - **`progress`**: An integer column representing the progress of the task (defaulted to 0).
        - **`description`**: A text column storing the description of the task.
        - **`deadline`**: A date column representing the deadline of the task.
        - **`submission`**: A varchar(255) column storing the submission related to the task (defaulted to an empty string).
    - Primary Key: **`id`**

## **Backend File Structure**

The backend file structure consists of several directories and files that organize the code and logic of the server-side application. Here is an overview of the key directories and their contents:

### **1. auth/**

- **`auth.js`**: This file contains the middleware required for JSON Web Token (JWT) authentication. It handles the verification of JWT tokens sent in the requests and ensures the security and authorization of the API endpoints.

### **2. config/**

- **`db.config.js`**: This file sets up the database configuration, including the connection details such as host, port, username, password, and database name. It is responsible for establishing a connection with the database and exporting the necessary objects or functions to interact with it.

### **3. controllers/**

- **`institute.controller.js`**: This file implements the API endpoints related to institutes. It handles the business logic for creating, updating, and retrieving institutes, as well as managing roles and authentication for institutes.
- **`user.controller.js`**: This file implements the API endpoints related to users. It handles user-related operations such as user creation, login, deletion, and retrieving user information.
- **`task.controller.js`**: This file implements the API endpoints related to tasks. It manages the creation, retrieval, submission, review, and other operations related to tasks.

### **4. models/**

- **`institute.model.js`**: This file contains the implementation of database queries and functions specific to institutes. It defines the data model and provides methods to interact with the institute data stored in the database.
- **`user.model.js`**: This file contains the implementation of database queries and functions specific to users. It defines the data model and provides methods to interact with the user data stored in the database.
- **`task.model.js`**: This file contains the implementation of database queries and functions specific to tasks. It defines the data model and provides methods to interact with the task data stored in the database.