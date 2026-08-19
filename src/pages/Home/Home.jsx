import css from "./Home.module.css";
export const Home = () => {
  return (
    <div className={`${css.wrapperHero} container`}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          The road to the <span className={css.titleSpan}>depths</span> of the
          human soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <div className={css.wrapperButton}>
          <button className={css.button}>
            Get started
            <svg width={14} height={16} className={css.icons}>
              <use href="/public/sprite.svg#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
      <div className={css.wrapperImage}>
        <img
          width={464}
          height={526}
          className={css.image}
          src="/public/hero/hero.webp"
          alt="Hero Image"
        />
        <div className={css.wrapperQuestion}>
          <svg width={10} height={17} className={css.icons}>
            <use href="/public/sprite.svg#icon-question" />
          </svg>
        </div>
        <div className={css.wrapperUsers}>
          <svg width={25} height={25} className={css.icons}>
            <use href="/public/sprite.svg#icon-users" />
          </svg>
        </div>
        <div className={css.wrapperCard}>
          <div className={css.wrapperIconsCheck}>
            <svg width={30} height={30} className={css.icons}>
              <use
                className={css.iconsCheck}
                href="/public/sprite.svg#icon-check"
              />
            </svg>
          </div>
          <div className={css.wrapperText}>
            <p className={css.cardText}>Experienced psychologists</p>
            <p className={css.cardTextSumme}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
