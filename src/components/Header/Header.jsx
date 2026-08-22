import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { useLocation } from "react-router-dom";
import { logoutUser } from "../../api/auth";
export const Header = () => {
  const location = useLocation();
  const locationPsychologists = location.pathname === "/psychologists";
  const locationFavorite = location.pathname === "/favorites";
  const locationHome = location.pathname === "/";

  const handleLogout = () => {
    logoutUser();
  };
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
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
          {locationHome && (
            <svg className={css.iconActive} width="8" height="8">
              <use href="/sprite.svg#icon-active-dot" />
            </svg>
          )}
        </Link>

        <Link className={css.NavLink} to="/psychologists">
          Psychologists
          {locationPsychologists && (
            <svg className={css.iconActive} width="8" height="8">
              <use href="/sprite.svg#icon-active-dot" />
            </svg>
          )}
        </Link>
        {user && (
          <Link className={css.NavLink} to="/favorites">
            Favorites
            {locationFavorite && (
              <svg className={css.iconActive} width="8" height="8">
                <use href="/sprite.svg#icon-active-dot" />
              </svg>
            )}
          </Link>
        )}
      </div>
      {user ? (
        <div className={css.wrapperUsers}>
          <div className={css.wrapperFlexIconUsers}>
            <div className={css.wrapperIconUsers}>
              <svg width={24} height={24}>
                <use href="/sprite.svg#icon-user" />
              </svg>
            </div>
            <p className={css.textUsers}>{user.displayName}</p>
          </div>
          <button
            onClick={handleLogout}
            className={css.buttonLogOut}
            type="button"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className={css.buttonWrapper}>
          <button
            onClick={() => {
              setIsOpen(true);
              setAuthMode("login");
            }}
            className={css.button}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setIsOpen(true);
              setAuthMode("registration");
            }}
            className={css.buttonTwo}
          >
            Registration
          </button>
          <AuthModal
            isOpen={isOpen}
            authMode={authMode}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </div>
  );
};
