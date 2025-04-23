import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "../../firebase/config";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    signInWithEmailAndPassword(database, email, password)
      .then((userCredential) => {
        console.log("Login successful:", userCredential);
        // alert("Login successful!");
        navigate("/home"); // Redirect to the home page
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Invalid email or password. Please try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button className="btn">Login</button>
      <p>
        Don&apos;t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </form>
  );
};

export default Login;
