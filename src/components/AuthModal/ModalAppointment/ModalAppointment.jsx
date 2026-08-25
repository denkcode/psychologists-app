import { useEffect, useState } from "react";
import css from "./ModalAppointment.module.css";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ModalAppointment = ({ psychologist, setIsOpenMake }) => {
  const [isTime, setIsTime] = useState("00:00");
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpenMake(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [setIsOpenMake]);

  const arrayTime = Array.from({ length: 48 }, (_, index) => {
    const hours = String(Math.floor(index / 2)).padStart(2, "0");
    const minutes = index % 2 === 0 ? "00" : "30";

    return `${hours}:${minutes}`;
  });

  const ModalPsychologistsSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .max(128, "Email must be at most 128 characters")
      .required("Email is required"),

    displayName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(128, "Name must be at most 128 characters")
      .required("Name is required"),

    tel: Yup.string()
      .required("Phone number is required")
      .matches(/^\+380\d{9}$/, "Phone number must be in format +380XXXXXXXXX"),

    time: Yup.string()
      .required("Choose a meeting time")
      .notOneOf(["00:00"], "Choose a meeting time"),

    comment: Yup.string()
      .required("Comment is required")
      .min(5, "Comment must contain at least 5 characters")
      .max(500, "Comment must be at most 500 characters"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ModalPsychologistsSchema),

    defaultValues: {
      displayName: "",
      tel: "",
      email: "",
      time: "00:00",
      comment: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Appointment data:", data);
  };

  const handleTimeChange = (time) => {
    setIsTime(time);

    setValue("time", time, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    setIsTimeOpen(false);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpenMake(false);
        }
      }}
      className={css.backdrop}
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={() => setIsOpenMake(false)}
          aria-label="Close modal"
        >
          <svg width={20} height={20} className={css.closeIcon}>
            <use href="/public/sprite.svg#icon-close" />
          </svg>
        </button>

        <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={css.wrapperTitle}>
            <h2 className={css.title}>
              Make an appointment with a psychologists
            </h2>

            <p className={css.text}>
              You are on the verge of changing your life for the better. Fill
              out the short form below to book your personal appointment with a
              professional psychologist. We guarantee confidentiality and
              respect for your privacy.
            </p>
          </div>

          <div className={css.wrapperYourPsychologists}>
            {psychologist && (
              <>
                <img
                  className={css.imgProfile}
                  width={44}
                  height={44}
                  src={psychologist.avatar_url}
                  alt={psychologist.name}
                />

                <div className={css.psychologistsInfo}>
                  <p className={css.textPsychologists}>Your Psychologist</p>

                  <h2 className={css.titleInfo}>{psychologist.name}</h2>
                </div>
              </>
            )}
          </div>

          <div className={css.wrapperInput}>
            {/* NAME */}

            <div className={css.field}>
              <input
                className={css.input}
                type="text"
                placeholder="Name"
                {...register("displayName")}
              />

              {errors.displayName && (
                <p className={css.errors}>{errors.displayName.message}</p>
              )}
            </div>

            <div className={css.wrapperInputTelTime}>
              {/* PHONE */}

              <div className={css.phoneWrapper}>
                <input
                  className={css.input}
                  type="tel"
                  placeholder="+380"
                  {...register("tel")}
                />

                {errors.tel && (
                  <p className={css.errors}>{errors.tel.message}</p>
                )}
              </div>

              <div className={css.timeWrapper}>
                <button
                  type="button"
                  className={css.buttonDropBox}
                  onClick={() => setIsTimeOpen((prev) => !prev)}
                >
                  <span>{isTime}</span>

                  <svg width="19" height="19">
                    <use href="/sprite.svg#icon-clock-time" />
                  </svg>
                </button>

                {isTimeOpen && (
                  <div className={css.timeList}>
                    <p className={css.timeListTitle}>Meeting Time</p>

                    {arrayTime.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={
                          time === isTime ? css.timeItemActive : css.timeItem
                        }
                        onClick={() => handleTimeChange(time)}
                      >
                        <span>{time.slice(0, 2)}</span>

                        <span>:</span>

                        <span>{time.slice(3)}</span>
                      </button>
                    ))}
                  </div>
                )}

                {errors.time && (
                  <p className={css.errors}>{errors.time.message}</p>
                )}
              </div>
            </div>

            <div className={css.field}>
              <input
                className={css.input}
                type="email"
                placeholder="Email"
                {...register("email")}
              />

              {errors.email && (
                <p className={css.errors}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.field}>
              <textarea
                className={css.textarea}
                placeholder="Comment"
                {...register("comment")}
              />

              {errors.comment && (
                <p className={css.errors}>{errors.comment.message}</p>
              )}
            </div>
          </div>

          <button className={css.button} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalAppointment;
