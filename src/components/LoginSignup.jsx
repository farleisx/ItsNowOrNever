import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e?.preventDefault();
    // NOTE: This is a mock login. Replace with real auth later.
    navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6">Login / Sign Up</h2>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded" required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded" required />
        <button className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Continue</button>
      </form>
    </div>
  );
}
