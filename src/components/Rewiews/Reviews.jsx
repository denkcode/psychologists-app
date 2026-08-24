import { useState } from "react";
import css from "./Reviews.module.css";
import ModalAppointment from "../AuthModal/ModalAppointment/ModalAppointment";

const Reviews = ({ reviews, psychologist }) => {
  const [isOpenMake, setIsOpenMake] = useState(false);
  return (
    <div className={css.wrapperReviews}>
      <ul className={css.reviewsList}>
        {reviews.slice(0, 2).map((review, index) => (
          <li className={css.reviewsItem} key={index}>
            <div className={css.reviewHeader}>
              <div className={css.wrapperReviewsIcon}>
                <p className={css.textUsersIcon}>{review.reviewer.charAt(0)}</p>
              </div>

              <div className={css.reviewInfo}>
                <p className={css.reviewer}>{review.reviewer}</p>

                <div className={css.wrapperRating}>
                  <svg width="15" height="14">
                    <use href="/sprite.svg#icon-star" />
                  </svg>

                  <p className={css.rating}>{review.rating}</p>
                </div>
              </div>
            </div>

            <p className={css.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsOpenMake(true)}
        className={css.buttonReviewsOpen}
        type="button"
      >
        Make an appointment
      </button>
      {isOpenMake && <ModalAppointment psychologist={psychologist} />}
    </div>
  );
};

export default Reviews;
