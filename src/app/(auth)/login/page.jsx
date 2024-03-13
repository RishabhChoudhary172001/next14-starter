"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import styles from "./login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(true);
  const [warning, setWarning] = useState(false);
  const router = useRouter();
  const [eor, setEor] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setVerified(false);
      return;
    } else {
      setVerified(true);
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data1) => {
          if (data1.error) {
            setEor(data1.error);
          } else {
            setEor(null);
            const temp = JSON.stringify(data1.token);
            localStorage.setItem("token", temp);
            setEmail("");
            setPassword("");
            setWarning(false);
            router.push("/");
          }
        });
    } catch (error) {
      console.error("Failed to login user!", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
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
        <h2 className={styles.login}>Login</h2>
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.button} type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        {!verified && (
          <p className={styles.errorText}>Each field should be complete.</p>
        )}
        {eor !== null && <p className={styles.errorText}>{eor}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
