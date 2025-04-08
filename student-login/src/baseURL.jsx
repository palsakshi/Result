
//automatically pick env based onload

let baseURL = import.meta.env.VITE_API_BASE_URL;

if(!baseURL){
    baseURL = import.meta.env.MODE === 'development'
    ? 'http://localhost:3000'
    : 'https://your-live-domain.com';
}
console.log("Current base url:", baseURL )
export default  baseURL;