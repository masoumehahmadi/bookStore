import { useLocation, Link } from "react-router-dom";
import styles from "./Erros.module.scss";

export default function Erros() {
  const location = useLocation();
  const errorMessage = location.state?.errorMessage.message;
  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        <div className={styles.Err}>Error:</div>
        <div className={styles.ErrTxt}>{errorMessage}</div>
        <Link to="/api/auth/register">
          <button type="submit" className={styles.submitBtn}>
            back to home
          </button>
        </Link>
      </div>
    </div>
  );
}
