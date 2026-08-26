import { useAuth } from "../../context/useAuth";

import { useEffect, useState } from "react";

import css from "./PsychologistsCard.module.css";

import Reviews from "../Rewiews/Reviews";

export const PsychologistCard = ({
  psychologist,
  onRemoveFavorite,
  handleOpenLogin,
}) => {
  const { user } = useAuth();

  const [isOpenReadMore, setIsOpenReadMore] = useState(false);

  const [isFavorite, setIsFavorite] = useState(() => {
    if (!user) {
      return false;
    }

    const savedItems = localStorage.getItem(`favoriteItems_${user.uid}`);

    if (!savedItems) {
      return false;
    }

    const items = JSON.parse(savedItems);

    return items.includes(psychologist.id);
  });
  useEffect(() => {
    const handleLogout = () => {
      setIsFavorite(false);
    };

    window.addEventListener("auth-logout", handleLogout);

    return () => {
      window.removeEventListener("auth-logout", handleLogout);
    };
  }, []);

  const handleClick = () => {
    if (!user) {
      setIsFavorite(false);
      handleOpenLogin();
      return;
    }

    const storageKey = `favoriteItems_${user.uid}`;

    const savedItems = localStorage.getItem(storageKey);

    const items = savedItems ? JSON.parse(savedItems) : [];

    let newItems;

    if (items.includes(psychologist.id)) {
      newItems = items.filter((id) => id !== psychologist.id);

      setIsFavorite(false);

      onRemoveFavorite?.(psychologist.id);
    } else {
      newItems = [...items, psychologist.id];

      setIsFavorite(true);
    }

    localStorage.setItem(storageKey, JSON.stringify(newItems));
  };

  return (
    <article
      className={`${css.wrapperCard} ${
        isOpenReadMore ? css.wrapperCardOpen : ""
      }`}
    >
      <div className={css.wrapperProfile}>
        <div className={css.wrapperImg}>
          <svg className={css.iconOnline} width="14" height="14">
            <use href="/sprite.svg#icon-online" />
          </svg>

          <img
            className={css.imgProfile}
            width={96}
            height={96}
            src={psychologist.avatar_url}
            alt={psychologist.name}
          />
        </div>

        <div className={css.titlePsychologistsWrapper}>
          <p>Psychologist</p>
          <h2>{psychologist.name}</h2>
        </div>
      </div>

      <div className={css.wrapperRatingInformation}>
        <div className={css.wrapperRating}>
          <svg width="15" height="14">
            <use href="/sprite.svg#icon-star" />
          </svg>

          <p className={css.ratingText}>{psychologist.rating}</p>

          <p className={css.punkt}>|</p>

          <div className={css.wrapperTextPrice}>
            <p className={css.priceText}>Price / 1 hour:</p>

            <span className={css.priceTextColor}>
              {psychologist.price_per_hour}$
            </span>
          </div>
        </div>

        <button onClick={handleClick} type="button">
          {isFavorite ? (
            <svg className={css.iconHeart} width="25" height="22">
              <use href="/sprite.svg#icon-heart-filled" />
            </svg>
          ) : (
            <svg className={css.iconHeart} width="25" height="22">
              <use href="/sprite.svg#icon-heart-empty" />
            </svg>
          )}
        </button>
      </div>

      <div className={css.wrapperDetails}>
        <div className={css.detailsRow}>
          <div className={css.wrapperText}>
            <p className={css.text}>Experience:</p>
            <p className={css.nummerText}>{psychologist.experience}</p>
          </div>

          <div className={css.wrapperText}>
            <p className={css.text}>License:</p>
            <p className={css.nummerText}>{psychologist.license}</p>
          </div>
        </div>

        <div className={css.detailsRow}>
          <div className={css.wrapperText}>
            <p className={css.text}>Specialization:</p>
            <p className={css.nummerText}>{psychologist.specialization}</p>
          </div>

          <div className={css.wrapperText}>
            <p className={css.text}>Initial consultation:</p>
            <p className={css.nummerText}>
              {psychologist.initial_consultation}
            </p>
          </div>
        </div>

        <div className={css.wrapperTextButton}>
          <p className={css.textAbout}>{psychologist.about}</p>

          {!isOpenReadMore && (
            <button
              onClick={() => setIsOpenReadMore(true)}
              className={css.loadMore}
              type="button"
            >
              Read more
            </button>
          )}
        </div>

        {isOpenReadMore && (
          <Reviews reviews={psychologist.reviews} psychologist={psychologist} />
        )}
      </div>
    </article>
  );
};

export default PsychologistCard;
