<!-- Steps for making build -->

1. Build the React project


     npm run build

- This will create a new build/ folder inside student-login/
- It contains the production-ready static files (HTML, JS, CSS)

2. Move to backend folder

cd ../node-mysql-express

3. add dist/  folder in backend

4. In your node-mysql-express/index.js, add the following:
<!-- add static path in index.js -->
 <!-- Serve React static files -->
  app.use(express.static(path.join(__dirname, 'dist')));

 5. Required Packages

   <!-- Make sure you have installed the following in your backend: -->

   npm install express path
