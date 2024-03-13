"use client";

import Link from "next/link";
import Links from "./links/Links.jsx";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    setUser(storedUser);
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Logo
      </Link>
      <div>
        <Links session={{ user }} />
      </div>
    </div>
  );
};

export default Navbar;
