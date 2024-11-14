import styles from "./Register.module.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { registerApi } from "./api";
import { AuthContext } from "../../components/Context/Context";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please add a username"),
  password: Yup.string().required("Please add a password"),
});

export default function Register() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [registerState, setRegisterState] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    try {
      let response = await registerApi(
        registerState.username,
        registerState.password
      );
      if (response.token) {
        setAuthState((state) => ({ ...state, token: response.token }));
      }
      if (response.status) {
        navigate("/options");
      } else {
        navigate("/error", { state: { errorMessage: response.error } });
      }
    } catch (err) {
      navigate("/error", { state: { errorMessage: err } });
    }
    setRegisterState({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.boxInput}>
          <h1 className={styles.titlePage}> Register </h1>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.formStyle}>
            <label className={styles.lableStyle} htmlFor="username">
              Username:
            </label>
            <input
              className={styles.inputStyle}
              {...register("username")}
              id="username"
              type="text"
              value={registerState.username}
              onChange={(e) =>
                setRegisterState((state) => ({
                  ...state,
                  username: e.target.value,
                }))
              }
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className={styles.errTxt}>{errors.username.message}</p>
            )}

            <label className={styles.lableStyle} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.inputStyle}
              {...register("password")}
              id="password"
              type="password"
              value={registerState.password}
              onChange={(e) =>
                setRegisterState((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className={styles.errTxt}>{errors.password.message}</p>
            )}
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
          <Link to="/api/auth/login" className={styles.moveToLogin}>
            or Login
          </Link>
        </div>
      </div>
    </>
  );
}
