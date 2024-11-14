import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

function Home() {

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeWrapper}>
        <div className={styles.welcomeTxt}>Welcome to the book store</div>
        <div className={styles.registerTxt}>Click to register:</div>
        <Link to="/api/auth/register">
        <button className={styles.registerBtn} type="submit">
          Register
        </button>
        </Link>
        
      </div>
    </div>
  );
}

export default Home;
