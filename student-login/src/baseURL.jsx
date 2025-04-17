
//automatically pick env based onload

let baseURL = import.meta.env.VITE_API_BASE_URL;

if(!baseURL){
    console.log(import.meta.env.MODE);
    baseURL = import.meta.env.MODE === 'development'
    ? 'http://localhost:5000'
    : 'https://resultproject-yqxq.onrender.com';
}
console.log("Current base url:", baseURL )
export default  baseURL;