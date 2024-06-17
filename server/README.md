# Server

## Summary
This server component is designed to handle backend operations for our application, including data management and API services. It interfaces with both MongoDB and Redis to provide persistent storage and caching capabilities, respectively.

## Prerequisites
- Docker
- Node.js 20+

## Installation
```bash
git clone <repository-url>
cd server
npm install
```

## Running the Project
First, ensure you have the necessary Docker images for MongoDB and Redis by pulling them from Docker Hub:
```bash
# Run MongoDB server
docker pull mongo:4.4
# If needed, remove previous mongodb (optional)
docker rm mongodb
docker run --name mongodb -p 27017:27017 mongo:4.4

# Pull Redis image
docker pull redis
# If needed, remove previous my-redis (optional)
docker rm my-redis
docker run --name my-redis -p 6379:6379 redis

# Start the server
npm run start
```

## Running the Tests
```bash
npm run test
```

## Improvements
- **Exception Handling:** Implement comprehensive try-catch blocks around API calls.
- **Testing Scenarios:** Expand unit tests and integrate end-to-end testing.
- **Vulnerability Detection:** Integrate tools like Snyk to detect and address security vulnerabilities.
- **Error Monitoring:** Use tools like Sentry for real-time error tracking and monitoring.
- **Code Quality:** Incorporate Prettier and ESLint to maintain code quality.
- **CI/CD:** Set up continuous integration and deployment pipelines.
