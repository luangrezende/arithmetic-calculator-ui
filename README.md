# Arithmetic Calculator UI

This project is the frontend component of the Arithmetic Calculator platform, developed using React and Vite.

## Prerequisites

Ensure the following software is installed on your machine:

1. **Node.js** (version 16 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js) or **Yarn** - [Yarn Installation](https://classic.yarnpkg.com/en/docs/install)
3. **Docker** - [Install Docker](https://www.docker.com/products/docker-desktop)

---

## Running Locally

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/luangrezende/arithmetic-calculator-ui.git
cd arithmetic-calculator-ui
```

### 2. Install Dependencies

Install the required packages using npm or Yarn:

```bash
# Using npm
npm install

# Using Yarn
yarn install
```

### 3. Start the Development Server

Start the development server:

```bash
# Using npm
npm run dev

# Using Yarn
yarn dev
```

The application will be accessible at `http://localhost:3000`.

---

## Running with Docker

### 1. Build the Docker Image

Build the Docker image using the following command:

```bash
docker build -t arithmetic-calculator-ui .
```

### 2. Run the Docker Container

Run the Docker container:

```bash
docker run -p 3000:3000 arithmetic-calculator-ui
```

The application will now be available at `http://localhost:3000`.

---

## Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and other assets
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Entry point
├── .eslintrc.cjs           # ESLint configuration
├── .prettierignore         # Prettier ignore file
├── .gitignore              # Git ignore file
├── index.html              # Main HTML file
├── package.json            # NPM package configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

---

## Configuration

The application uses Vite for configuration. Modify `vite.config.ts` to adjust settings as needed.

---

## Testing the Application

Use tools like **Postman** or **curl** to test API endpoints. Example with `curl`:

```bash
curl -X GET http://localhost:3000/api/endpoint
```

---

## Resources

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)
-   [Yarn](https://classic.yarnpkg.com/)
-   [Docker Documentation](https://docs.docker.com/get-started/)
-   [Vite](https://vitejs.dev/)
-   [React](https://reactjs.org/)

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for more information.
