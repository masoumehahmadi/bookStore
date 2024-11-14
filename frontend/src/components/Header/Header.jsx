import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Context";
export default function Header() {
  const {authState ,setAuthState} = useContext(AuthContext)
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.headerWrapper}>
          <div className={styles.title}>BookStore</div>
          <div className={styles.linkApi}>
            <NavLink className={({isActive})=>isActive ? "font-bold text-black":"text-gray-500"} to="api/auth/register">Home</NavLink>
            <NavLink className={({isActive})=>isActive ? "font-bold text-black":"text-gray-500"} to="/api/auth/login">Login</NavLink>
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
      </div>
    </>
  );
}
