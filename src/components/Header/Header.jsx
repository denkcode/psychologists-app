import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import css from "./Header.module.css";
export const Header = () => {
  const { user } = useAuth();
  return (
    <div className={`${css.header} container`}>
      <div className={css.headerLogo}>
        <span className={css.logoSpan}>psychologists.</span>
        <span className={css.logoSpanTwo}>services</span>
      </div>
      <div className={css.NavLinkWrapper}>
        <Link className={css.NavLink} to="/">
          Home
        </Link>
        <Link className={css.NavLink} to="/psychologists">
          Psychologists
        </Link>
        {user && (
          <Link className={css.NavLink} to="/favorites">
            Favorites
          </Link>
        )}
      </div>
      <div className={css.buttonWrapper}>
        <button className={css.button}>Log In</button>
        <button className={css.buttonTwo}>Registration</button>
      </div>
    </div>
  );
};

// `${css.wrapper} container`;
