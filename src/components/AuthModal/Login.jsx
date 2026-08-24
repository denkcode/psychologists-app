import css from "./Login.module.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../../api/auth";
const Login = ({ setIsOpen }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.documentElement.style.overflow = "";
    };
  }, [setIsOpen]);
  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .max(128, "Email must be at most 128 characters")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be at most 128 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    try {
      const user = await loginUser(data.email, data.password);
      console.log(user);
      setIsOpen(false);
    } catch (error) {
      if (error.errorCode === "auth/invalid-credential") {
        setLoginError("Invalid email or password.");
      } else {
        setLoginError(error.errorMessage);
      }
    }
  };

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.wrapperTitle}>
          <h2 className={css.title}>Log In</h2>
          <p className={css.text}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a psychologist.
          </p>
        </div>
        <div className={css.wrapperInput}>
          <div className={css.groupInputOne}>
            <input
              {...register("email")}
              className={css.input}
              type="email"
              placeholder="Email"
            />

            {errors.email && (
              <p className={css.errors}>{errors.email.message}</p>
            )}
          </div>

          <div className={css.groupInputTwo}>
            <div className={css.wrapperInputPassword}>
              <input
                {...register("password")}
                className={css.input}
                type={isVisiblePassword ? "text" : "password"}
                placeholder="Password"
              />

              <button
                type="button"
                onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                className={css.buttonEye}
              >
                <svg className={css.icon} width={20} height={20}>
                  <use
                    href={
                      isVisiblePassword
                        ? "/sprite.svg#icon-eye-off"
                        : "/sprite.svg#icon-eye"
                    }
                  />
                </svg>
              </button>
            </div>

            {errors.password && (
              <p className={css.errors}>{errors.password.message}</p>
            )}
          </div>
        </div>
        <button className={css.button} type="submit">
          Login In
        </button>
        {loginError && <p className={css.error}>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;
