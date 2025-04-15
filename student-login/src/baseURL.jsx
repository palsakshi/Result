
//automatically pick env based onload

let baseURL = import.meta.env.VITE_API_BASE_URL;

if(!baseURL){
    console.log(import.meta.env.MODE);
    baseURL = import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://result-3.onrender.com';
}
console.log("Current base url:", baseURL )
export default  baseURL;