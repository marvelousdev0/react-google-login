import {GoogleOAuthProvider} from "@react-oauth/google";
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="670420733484-q5i5l19ah39llc3prldfiod5ru7a4t7q.apps.googleusercontent.com"><StrictMode>
    <App/>
  </StrictMode></GoogleOAuthProvider>,
)
