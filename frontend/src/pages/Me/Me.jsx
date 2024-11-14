import styles from "./Me.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Me() {
  const param = useParams();
  const [profile, setprofile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const getProfile = async () => {
    try {
      let response = await axios.get("http://localhost:3010/api/auth/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setprofile(response.data);
    } catch (error) {
      navigate("/error", {
        state: { errorMessage: error.message || "Unknown error" },
      });
    }
  };

  useEffect(() => {
    getProfile(param.id);
  }, []);

  const handleProfileClick = () => {
    setShowProfile(true);
  };
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerBtn}>
        <button
          className={styles.btnProf}
          onClick={() => {
            handleProfileClick();
          }}
        >
          Click to see the profile
          {showProfile && profile && (
            <div className={styles.Wrapper}>
              <div className={styles.info}>username : {profile.username}</div>
              <div className={styles.info}>id : {profile._id}</div>
            </div>
          )}
        </button>
        <Link to="/options" className={styles.backPage}>
          previous page
        </Link>
      </div>
    </div>
  );
}
