# Dashboard (client)

## Summary
This Angular application serves as the interactive dashboard for our system, providing a user-friendly interface for viewing and managing the data processed by the server.

## Prerequisites
- Node.js

## Installation
```bash
cd dashboard
npm install
```

## Running the Project
To start the Angular frontend:
```bash
npx ng serve --open
```
The dashboad starts at `http://localhost:4200/`

## Tests
No tests written for this project

## Improvements
- **Exception Handling:** Implement robust error handling to provide feedback and maintain usability when backend services are unavailable.
- **Testing Scenarios:** Expand testing to include end-to-end tests using tools like Protractor.
- **Vulnerability Detection:** Use Angular-specific security practices to prevent XSS and CSRF attacks.
- **Error Monitoring:** Integrate frontend monitoring solutions to track user errors and performance issues.
- **Code Quality:** Use TSLint and Prettier to enforce coding standards and improve code readability.
- **CI/CD:** Set up continuous integration and delivery to automate testing and deployment processes.