import css from "./Home.module.css";
export const Home = () => {
  return (
    <div>
      <h1 className={css.title}>
        The road to the <span className={css.titleSpan}>depths</span> of the
        human soul
      </h1>
      <p className={css.text}>
        We help you to reveal your potential, overcome challenges and find a
        guide in your own life with the help of our experienced psychologists.
      </p>
      <button>Get started</button>
    </div>
  );
};

export default Home;
