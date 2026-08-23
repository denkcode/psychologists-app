import usePsychologists from "../../hooks/usePsychologists";
import css from "./Psychologists.module.css";
import { useState } from "react";
export const Psychologists = () => {
  const [sortType, setSortType] = useState("ratingAsc");
  const { psychologists, hasMore, loadMore, isLoading } =
    usePsychologists(sortType);
  return (
    <>
      <ul className={`${css.psychologistList} container`}>
        {psychologists.map((psychologist) => (
          <li className={css.psychologistItem} key={psychologist.id}>
            <article className={css.wrapperCard}>
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

                <button type="button">
                  <svg className={css.iconHeart} width="25" height="22">
                    <use href="/sprite.svg#icon-heart-empty" />
                  </svg>
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

                    <p className={css.nummerText}>
                      {psychologist.specialization}
                    </p>
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
                  <button className={css.loadMore} type="button">
                    Read more
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
        {hasMore && (
          <div className={css.wrapperLoadMore}>
            <button
              onClick={loadMore}
              className={css.buttonLoadMore}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </ul>
    </>
  );
};

export default Psychologists;
