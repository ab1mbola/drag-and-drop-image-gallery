import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { database } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Signup.module.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    createUserWithEmailAndPassword(database, email, password)
      .then((data) => {
        console.log(data, "userCreated");
        alert("Account created successfully!");
        navigate("/login"); // Redirect to the login page
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          alert(
            "This email is already registered. Please use a different email or log in."
          );
        } else {
          console.error("Signup error:", error);
          alert("Failed to create account. Please try again.");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles["signup-form"]}>
      <h2>Signup</h2>
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

      <label>
        <span>Confirm Password:</span>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
      </label>

      <button className="btn">Signup</button>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </form>
  );
};

export default Signup;
