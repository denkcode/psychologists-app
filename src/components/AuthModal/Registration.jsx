import css from "./Registration.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../api/auth";
const Registration = ({ setIsOpen }) => {
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
  const registrationSchema = yup.object({
    displayName: yup.string().required("Name is requeired"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });
  const onSubmit = async (data) => {
    try {
      const user = await registerUser(
        data.email,
        data.displayName,
        data.password,
      );
      console.log(user);
      setIsOpen(false);
    } catch (error) {
      if (error.errorCode === "auth/email-already-in-use") {
        setRegisterError("Email is already registered.");
      } else {
        setRegisterError(error.errorMessage);
      }
    }
  };
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.wrapperTitle}>
          <h2 className={css.title}>Registration</h2>
          <p className={css.text}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
        </div>
        <div className={css.wrapperInput}>
          <div>
            <input
              {...register("displayName")}
              className={css.input}
              type="text"
              placeholder="Name"
            />
            {errors.displayName && (
              <p className={css.errors}>{errors.displayName.message}</p>
            )}
          </div>
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
          Sign Up
        </button>
        {registerError && <p className={css.error}>{registerError}</p>}
      </form>
    </div>
  );
};

export default Registration;
