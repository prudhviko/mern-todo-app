import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      window.location.href = "/";
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Login</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
