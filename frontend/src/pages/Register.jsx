import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {success ? <p className="success">Successfully Registered!</p> : (
        <>
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <p>Already have an account? <a href="/login">Login</a></p>
        </>
      )}
    </div>
  );
}
