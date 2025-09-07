# Full-Stack Resource Finder Application

A modern serverless full-stack application for finding community resources. Built with **React** frontend and **AWS Lambda** backend, designed for scalability and ease of deployment.

## ✨ Highlights

- 🚀 **Serverless Architecture**: AWS Lambda + API Gateway backend
- ⚛️ **Modern React Frontend**: TypeScript, sleek UI with glassmorphism design
- 🏗️ **Infrastructure as Code**: AWS CDK for reproducible deployments
- 🧪 **Comprehensive Testing**: Vitest for backend, Jest for frontend
- 🔄 **CI/CD Ready**: GitHub Actions workflow with environment management
- 🛠️ **Local Development**: AWS SAM for local Lambda execution
- 📱 **Responsive Design**: Works on desktop and mobile
- 🌐 **Global CDN**: CloudFront distribution for fast worldwide access

## 🎯 Features

- **Resource Search**: Find community resources by location and category
- **Multiple Categories**: Domestic violence, mental health, legal aid, housing support  
- **Real-time Filtering**: Dynamic search with query parameters
- **Health Monitoring**: Built-in health check endpoint
- **Environment Management**: Separate staging and production deployments

## 📁 Project Structure

```
├── 🎨 frontend/              # React TypeScript application
│   ├── src/                  # Source code with components, tests
│   ├── build/               # Production build (generated)
│   └── package.json         # Frontend dependencies
├── ⚡ backend/               # AWS Lambda API
│   ├── src/                 # TypeScript Lambda handlers
│   ├── dist/               # Compiled JavaScript (generated)
│   ├── template.yaml       # SAM template for local development
│   └── package.json        # Backend dependencies
├── 🏗️ cdk/                  # AWS Infrastructure as Code
│   └── cdk/                # CDK TypeScript application
├── 🔄 .github/              # CI/CD workflows
│   └── workflows/          # GitHub Actions
├── 📜 deploy.sh             # One-click deployment script
└── 📋 package.json          # Root workspace configuration
```

## 🔌 API Endpoints

- **GET /health** - Service health check with timestamp
- **GET /api/resources** - Search community resources
  - Query params: `location` (city), `category` (resource type)

## 🚀 Quick Start

### Prerequisites
- **Node.js** 22+ 
- **Docker Desktop** (for local backend)
- **AWS SAM CLI** ([install guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### ⚡ One-Command Setup

```bash
# Clone and setup everything
git clone <repository-url>
cd assignment
npm run install:all  # Installs all dependencies
npm start            # Starts both frontend and backend
```

**That's it!** 🎉 
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 📦 Manual Installation

```bash
# Install dependencies for all services
npm run install:all

# Or install individually:
npm run install:client  # Frontend only
npm run install:server  # Backend only  
npm run install:cdk     # Infrastructure only
```

## 🛠️ Development Commands

### 🏃‍♂️ Running Locally

```bash
npm start              # 🚀 Full-stack (frontend + backend)
npm run dev            # 🔥 Development mode (with hot reload)
npm run client         # 🎨 Frontend only
npm run server:local   # ⚡ Backend only
```

### 🔨 Building

```bash
npm run build:all      # 📦 Build everything
npm run build:frontend # 🎨 Build React app  
npm run build:backend  # ⚡ Build Lambda function
```

### 🧪 Testing

```bash
cd backend && npm test        # 🧪 Backend tests (Vitest)
cd frontend && npm test       # 🧪 Frontend tests (Jest)
```

### 🔍 Testing the API

```bash
# Local development (http://localhost:5000)
curl http://localhost:5000/health
curl "http://localhost:5000/api/resources?location=NYC&category=domestic-violence"

# Production (after deployment)
curl https://your-api-url/health  
curl "https://your-api-url/api/resources?location=NYC&category=domestic-violence"
```

## 🚀 AWS Deployment

### 🎯 One-Click Deployment

```bash
./deploy.sh staging     # 🧪 Deploy to staging
./deploy.sh production  # 🌐 Deploy to production
```

### 🏗️ Architecture

**Frontend**: S3 + CloudFront (global CDN)  
**Backend**: Lambda + API Gateway (serverless)  
**Infrastructure**: AWS CDK (TypeScript)

### ⚙️ CI/CD with GitHub Actions

1. **Add AWS secrets** to your GitHub repository
2. **Go to Actions** → **Deploy Full-Stack Application** 
3. **Run workflow** → Choose environment (staging/production)

## 📚 Documentation

| Component | Link | Description |
|-----------|------|-------------|
| 🏗️ **Infrastructure** | [cdk/README.md](cdk/README.md) | AWS CDK setup, architecture, costs |
| 🔄 **CI/CD** | [.github/README.md](.github/README.md) | GitHub Actions, secrets setup |
| ⚡ **Backend** | [backend/README.md](backend/README.md) | Lambda development, SAM setup |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## AI Usage

Most of the code was generated using Claude Code. I started with the backend server then moved on to the frontend then finished with the cdk infrastructure. LLMs are very bad at making decisions so I had to guide Claude with which technologies to use and how to setup the infrastructure correctly as well as local development enviornment. A lot of this code is not production ready but its a good POC to address the requirements of the assignment. 