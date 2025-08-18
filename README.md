# Arithmetic Calculator UI v1.0.0

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A modern, responsive web application for performing arithmetic calculations with user authentication, credit management, and operation history. Built with React, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure login, registration, and session management
- **Operations Management**: Perform arithmetic operations and generate random strings
- **Credit System**: Manage account balance and operation costs
- **Operation History**: View, search, and delete past operations
- **Responsive Design**: Fully responsive UI with mobile-first approach
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Live balance updates and operation results

## Architecture

This project follows a modular architecture with clear separation of concerns:

```
├── src/
│   ├── components/     - Reusable UI components
│   ├── features/       - Feature-specific components and logic
│   ├── layouts/        - Page layouts and navigation
│   ├── sections/       - Page sections and views
│   ├── services/       - API integration and external services
│   ├── hooks/          - Custom React hooks
│   ├── utils/          - Utility functions and helpers
│   └── theme/          - Theme configuration and constants
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/products/docker-desktop) (optional, for containerized development)
- Modern web browser with ES6+ support

## Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/luangrezende/arithmetic-calculator-ui.git
   cd arithmetic-calculator-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file in the root directory
   cp .env.example .env.local
   
   # Edit .env.local with your API configuration
   # For development environment:
   VITE_API_BASE_URL=https://your-api-gateway.execute-api.us-east-1.amazonaws.com/dev
   # For production environment:
   # VITE_API_BASE_URL=https://your-api-gateway.execute-api.us-east-1.amazonaws.com/prod
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will be available at `http://localhost:3040`.

### Production Build

1. **Build the application**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## Running with Docker

### 1. Build the Docker Image

```bash
docker build -t arithmetic-calculator-ui .
```

### 2. Run the Docker Container

```bash
docker run -p 3040:3040 arithmetic-calculator-ui
```

The application will be accessible at `http://localhost:3040`.

## Project Structure

```
arithmetic-calculator-ui/
├── public/             - Static assets
├── src/
│   ├── components/     - Reusable UI components
│   │   ├── modern-button/
│   │   ├── modern-input/
│   │   ├── modern-select/
│   │   └── ...
│   ├── features/       - Feature modules
│   │   ├── auth/       - Authentication features
│   │   └── operation/  - Operation features
│   ├── layouts/        - Layout components
│   │   ├── auth/       - Authentication layout
│   │   └── dashboard/  - Main application layout
│   ├── sections/       - Page sections
│   │   └── operation/  - Operation management
│   ├── services/       - API services
│   │   ├── auth.service.ts
│   │   └── operation.service.ts
│   ├── hooks/          - Custom hooks
│   ├── utils/          - Utilities
│   └── theme/          - Theme configuration
├── .env.example        - Environment variables template
├── .eslintrc.cjs       - ESLint configuration
├── .prettierignore     - Prettier ignore file
├── .gitignore          - Git ignore file
├── index.html          - Main HTML file
├── package.json        - Project dependencies
├── tsconfig.json       - TypeScript configuration
├── tailwind.config.js  - Tailwind CSS configuration
├── vite.config.ts      - Vite configuration
└── README.md           - Project documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Key Features

### Authentication System
- JWT-based authentication with refresh tokens
- Secure session management
- Automatic token renewal
- Protected routes and API calls

### Operation Management
- Support for arithmetic operations (addition, subtraction, multiplication, division, square root)
- Random string generation
- Real-time cost calculation
- Operation history with pagination

### Credit Management
- Account balance tracking
- Operation cost deduction
- Credit addition functionality
- Real-time balance updates

### UI/UX Features
- Responsive design for all screen sizes
- Dark mode support
- Loading states and error handling
- Toast notifications
- Keyboard navigation support
- Accessibility compliant

## API Integration

The application integrates with the Arithmetic Calculator API:

- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Authentication**: Bearer token in Authorization header
- **Endpoints**:
  - `/auth/*` - Authentication endpoints
  - `/operation/*` - Operation management
  - `/account/*` - Account and balance management

## Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Tailwind CSS for styling

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
