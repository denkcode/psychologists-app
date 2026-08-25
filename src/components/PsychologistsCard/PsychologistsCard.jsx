import { useAuth } from "../../context/AuthContext";
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
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    if (!user) {
      setIsFavorite(false);
      handleOpenLogin();
      return;
    }
    setIsFavorite((prev) => !prev);
    let items;
    let newItems;
    const savedItems = localStorage.getItem("favoriteItems");
    if (savedItems) {
      items = JSON.parse(savedItems);
    } else {
      items = [];
    }

    if (items.includes(psychologist.id)) {
      newItems = items.filter((id) => id !== psychologist.id);
      onRemoveFavorite?.(psychologist.id);
    } else {
      newItems = [...items, psychologist.id];
    }
    localStorage.setItem("favoriteItems", JSON.stringify(newItems));
  };

  useEffect(() => {
    if (!user) {
      setIsFavorite(false);
      return;
    }

    const result = localStorage.getItem("favoriteItems");

    if (result) {
      const items = JSON.parse(result);
      setIsFavorite(items.includes(psychologist.id));
    } else {
      setIsFavorite(false);
    }
  }, [psychologist.id, user]);

  return (
    <article
      className={`${css.wrapperCard} ${isOpenReadMore ? css.wrapperCardOpen : ""}`}
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
          {isOpenReadMore === false && (
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
