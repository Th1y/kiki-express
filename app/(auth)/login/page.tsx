// app/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link"

export default function LoginPage(){
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
   e.preventDefault() 

   const formData = new FormData(e.currentTarget);
   const email = formData.get("email");
   const password = formData.get("password");
  
   const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json"},
   });

   if (res.ok) {
    setErrorMessage("Login realizado com sucesso!")
   } else {
    setErrorMessage("Email ou senha inválidos!");
   }
  }

  return (
  <div id="login-container" className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-10">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Email" 
          required 
        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          required 
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <p className="text-red-600 text-sm font-medium">{errorMessage}</p>

        <div id="options" className="flex items-center text-sm justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="remember" id="remember"/>
            Remember me
          </label>
          <Link href={"/forgot"} className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <div id="register-link" className="text-center mt-6 text-sm">
        <p>
          Don't have an account?
          <Link href="/register" className="text-blue-600 hover:underline ml-1">
          Register
          </Link>
        </p>
      </div>
    </div>
  </div>
  ) 
}
