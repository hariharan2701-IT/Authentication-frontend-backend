import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true });
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {success ? <p className="success">Successfully Logged In!</p> : (
        <>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>Don't have an account? <a href="/register">Register</a></p>
        </>
      )}
    </div>
  );
}