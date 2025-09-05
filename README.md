# Full-Stack Application

A full-stack application with Node.js/Express (TypeScript) backend and React (TypeScript) frontend.

## Project Structure

```
assignment/
├── backend/          # Express.js TypeScript API server
│   ├── src/          # TypeScript source files
│   ├── dist/         # Compiled JavaScript (generated)
│   └── tsconfig.json # TypeScript configuration
├── frontend/         # React TypeScript app
├── package.json      # Root package.json with scripts
└── README.md         # This file
```

## API Endpoints

- **GET /health** - Health check endpoint
- **GET /api/resources?location={city}&category={type}** - Resources endpoint (functionality to be implemented)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install backend dependencies:
```bash
npm run install:server
```

3. Install frontend dependencies:
```bash
npm run install:client
```

Or install all dependencies at once:
```bash
npm run install:all
```

### Running the Application

#### Start both frontend and backend simultaneously:
```bash
npm start
```
- Backend will run on http://localhost:5000
- Frontend will run on http://localhost:3000

#### Start services individually:

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

**Backend in development mode (with nodemon and TypeScript):**
```bash
npm run server:dev
```

**Build backend TypeScript:**
```bash
cd backend && npm run build
```

### Testing the API

Once the backend is running, you can test the endpoints:

```bash
# Health check
curl http://localhost:5000/health

# Resources endpoint
curl "http://localhost:5000/api/resources?location=NYC&category=restaurants"
```