import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    if (email === "user@example.com" && password === "1Password") {
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/home");
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        });
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <h2>Login</h2>
        <label>
          <span>UserName:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            // required
          />
        </label>

        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            // required
          />
        </label>

        <button className="btn">Login</button>
      </form>
    </>
  );
};

export default Login;
