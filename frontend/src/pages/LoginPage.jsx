import React, { useState } from 'react';
import { Eye, EyeOff, Home, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from "react-hot-toast"
import { useAuthStore } from '../store/useAuthStore';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const {login, isLoggingIn} = useAuthStore();
  const [formData, setFormData]= useState({
    email:"",
    password:"",
  })

 const validateForm= ()=>{
  
  if(!formData.email.trim()) return toast.error("Email is required");
  if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
  if(!formData.password.trim())return toast.error("Password is required");
  if(formData.password.length<6) return toast.error("Password shold be 6 characters long");
  return true;
 }

  const handleSubmit= (e)=>{
    e.preventDefault();

    const success = validateForm();
    if(success===true){
      login(formData)
    }

  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-700 to-teal-100 relative overflow-hidden px-4">
      {/* Background abstract shapes */}
      <div className="absolute w-[380px] h-[380px] bg-teal-500 rounded-full opacity-15 blur-[90px] top-[12%] left-[6%] z-0" />
      <div className="absolute w-[460px] h-[460px] bg-teal-200 rounded-full opacity-15 blur-[90px] bottom-[16%] right-[8%] z-0" />

      {/* Fixed header ribbon */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center select-none">
          <div className="text-xl font-bold text-teal-700">Showkase</div>
          <Link to="/" aria-label="Go to Home Page" className="text-teal-700 hover:text-teal-900 transition">
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[64px]" />

      {/* Login container */}
      <main className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-sm z-10">
        <h1 className="text-xl sm:text-3xl font-semibold text-center text-teal-700 mb-8 tracking-tight select-none">
        Welcome Back!
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
          <label htmlFor="email" className="text-sm font-medium text-teal-700 mb-2 select-none">
            Email address
          </label>
          <div className="relative mb-6">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value = {formData.email}
              onChange={(e)=>setFormData({...formData, email:e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm text-md placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-teal-700 transition duration-300 ease-in-out"
              autoComplete="email"
            />
          </div>

          <label htmlFor="password" className="text-sm font-medium text-teal-700 mb-2 select-none">
            Password
          </label>
          <div className="relative mb-8">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={(e)=> setFormData({...formData, password:e.target.value})}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm text-md placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-teal-700 transition duration-300 ease-in-out"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-teal-600 transition duration-300 ease-in-out"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-teal-600 text-white py-2 text-lg font-semibold rounded-xl shadow-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 active:scale-95 transition-transform duration-200 select-none"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6 select-none">
          New here?{' '}
          <Link to="/signup" className="text-teal-600 font-medium hover:underline transition-colors duration-200">
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
