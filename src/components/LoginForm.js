import React, { useEffect } from "react";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {

    
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            email,
            password
        }
       fetch("https://coreapi.hectorai.live/api/auth/login", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(data)
       })
       .then(res => res.json())
       .then(data => {
           console.log(data);
           if(data.token) {
               localStorage.setItem("token", data.token);
               localStorage.setItem("userName",data.userDetails.fullName);
               navigate("/dashbord");
           }
           else {
               alert("Invalid Credentials");
           }
       })
    }
  return (
    <div className="h-[100vh]">
        <div className="flex flex-col items-center px-6 py-12 lg:px-8 text-5xl">
            <h1>Techsavvy</h1>
        </div>
        <div className="flex flex-col items-center px-6 py-12 lg:px-8">
            <div className="w-full max-w-md space-y-8 border-solid border-2 rounded-lg p-5">
            <div className="text-center"><h2 className="text-2xl font-bold">Welcome Back!</h2></div>
            <form action="#">
                <div className="p-2">
                    <label htmlFor="email-address" className="text-sm">Email</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <MdOutlineMail />
                    </div>
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email-address" className="w-full border-gray-300 border-2 rounded-lg ps-10 p-2.5" placeholder="Email address" required /></div>
                </div>
                <div className="p-2">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <RiLockPasswordLine />
                    </div>
                    <div className="absolute inset-y-3 end-0 flex items-end pe-3.5 pointer-events-none">
                        <a href="#" className="text-md text-red-500">Forgot Password?</a>
                    </div>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="w-full left-4 border-gray-300 border-2 rounded-lg ps-10 p-2.5" placeholder="Password" required /></div>
                </div>
                <div className="w-full flex justify-end p-2">
                    <input type="checkbox" name="remenberme" id="" className="mr-1" />
                    <label htmlFor="remenberme">Remember Me</label>
                </div>
                <div className="w-full flex items-center p-2">
                    <button type="submit" onClick={handleSubmit} className="w-full p-2 bg-blue-500 rounded-lg text-white">SIGN IN</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  );
}

export default LoginForm;
