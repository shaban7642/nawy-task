<!-- # nawy-task

# to run the project with docket compose

## change the db credentials in the docker-compose.yaml

## then run the build command

docker-compose up --build

## then run migrations

docker-compose exec backend npm run db:migrate

# run fronend localy

npm i
cd frontend
npm run dev

# run backend locally

npm i
change the .env db values
cd backend
npm run watch

# run db migrations

cd backend
npm run db:migrate -->

You're absolutely right! I apologize for the oversight. I've updated the instructions to include the step you mentioned:

**# nawy-task**

**## Running the Project with Docker Compose**

1. **Environment Variables:**

    - Create a `.env` file in the project root directory (outside of version control).
    - Add your database credentials (username, password, database name, host, port) to this file in the following format:

        ```
        DB_USERNAME=your_username
        DB_PASSWORD=your_password
        DB_DATABASE=your_database_name
        DB_HOST=your_database_host (optional, defaults to "localhost")
        DB_PORT=your_database_port (optional, defaults to "5432" for PostgreSQL)
        ```

2. **Build and Start the Application:**

    ```bash
    docker-compose up --build
    ```

    This command will:

    - Build Docker images for the frontend and backend services (assuming separate services in `docker-compose.yml`).

    **## Running Migrations **

    ```bash
    docker-compose exec backend npm run db:migrate
    ```

**## Development Environment(optional)**

**Frontend:**

1. **Install dependencies:**

    ```bash
    npm i
    ```

2. **Start development server:**

    ```bash
    cd frontend
    npm run dev
    ```

    This will run the Next.js development server, accessible at `http://localhost:3000` by default.

**Backend:**

1.  **Install dependencies:**

    ```bash
    npm i
    ```

2.  **Start backend development server (optional):**

    ````bash
        cd backend
        npm run watch
        ```

    ````

3.  **Run db migrations (optional):**

        ```bash
        cd backend
        npm run db:migrate
        ```
