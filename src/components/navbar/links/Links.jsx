import { useState, useEffect } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // This effect will trigger whenever the session prop changes
    // You can use it to handle any side effects related to session changes
    // For example, if you need to perform some action when the user logs in or logs out
  }, [session]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const links = [
    {
      title: "Homepage",
      path: "/",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <NavLink item={{ title: "Admin", path: "/admin" }} />
            )}
            <form onSubmit={handleLogout}>
              {" "}
              {/* Changed action to onSubmit */}
              <button type="submit" className={styles.logout}>
                Logout
              </button>{" "}
              {/* Added type="submit" */}
            </form>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
