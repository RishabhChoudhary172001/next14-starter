"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import styles from "./register.module.css";

const Register = () => {
  const { push } = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [verified, setVerified] = useState(true);
  const [warning, setWarning] = useState(false);

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const handlePassword = (value) => {
    setPassword(value);
    if (confirmPassword) {
      setPasswordMatch(value === confirmPassword);
    }
  };

  const handleRegister = async () => {
    if (!password || !passwordMatch || !email) {
      setVerified(false);
      return;
    } else {
      setVerified(true);
    }
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        setWarning(true);
        throw new Error(`Registration failed with status ${res.status}`);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setWarning(false);
      const data = await res.json();
      console.log("Registration successful!", data);
      push("/login");
    } catch (error) {
      console.error("Failed to Register User!", error);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.leftSide}>
        <Image
          src="/register.jpg"
          alt=""
          width={200}
          height={200}
          className={styles.img}
        />
      </div>
      <div className={styles.rightSide}>
        <h2 className={styles.register}>Register</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="username"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.inputField}
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.inputField}
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className={styles.inputField}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => handleConfirmPassword(e.target.value)}
          />
          {!passwordMatch && (
            <p className={styles.errorText}>Passwords do not match.</p>
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        {!verified && (
          <p className={styles.errorText}>Each field should be complete.</p>
        )}
        {warning && <p className={styles.errorText}>User already Registered</p>}
      </div>
    </div>
  );
};

export default Register;
