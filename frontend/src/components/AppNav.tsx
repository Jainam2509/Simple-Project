"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLoggedInUser, logoutUser } from "../lib/api";

export default function AppNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("");
  const isLoggedIn = userRole !== "";

  useEffect(() => {
    const syncUserRole = () => {
      const currentUser = getLoggedInUser();
      setUserRole(currentUser?.role || "");
    };

    syncUserRole();

    window.addEventListener("auth-change", syncUserRole);

    return () => {
      window.removeEventListener("auth-change", syncUserRole);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <nav>
      {!isLoggedIn && pathname === "/login" ? <Link href="/signup">Signup</Link> : null}
      {!isLoggedIn && pathname !== "/login" ? <Link href="/login">Login</Link> : null}

      {isLoggedIn ? <Link href="/">Home</Link> : null}
      {isLoggedIn ? <Link href="/contact">Contact Us</Link> : null}
      {userRole === "admin" ? <Link href="/admin">Admin Dashboard</Link> : null}
      {isLoggedIn ? (
        <button type="button" className="nav-button" onClick={handleLogout}>
          Logout
        </button>
      ) : null}
    </nav>
  );
}
