import styles from "./Options.module.scss";
import { NavLink } from "react-router-dom";
import AuthContextProvider,{ AuthContext } from "../Context/Context";
import { useContext } from "react";

export default function Options() {
  const { authState, setAuthState } = useContext(AuthContext);
  return (
    <>
    <AuthContextProvider>
    <div className={styles.homeContainer}>
      <div className={styles.homeWrapper}>
        <div className={styles.welcomeTxt}>Welcome to the book store</div>
        <div className={styles.registerTxt}>Click to:</div>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
          to="/api/books"
        >
          Book list
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
          to="/api/books/{id}"
        >
          Add Book
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "font-bold text-black" : "text-gray-500"
          }
          to="/api/auth/me"
        >
          Profile
        </NavLink>

        <li
          className={styles.logOut}
          onClick={() => {
            setAuthState({ token: "" });
            localStorage.removeItem("token");
          }}
        >
          <NavLink to='/'> Log Out
          </NavLink>
        </li>
      </div>
    </div>
    </AuthContextProvider>
    
    </>

  );
}
