import { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../context/useAuth";

import { logoutUser } from "../../api/auth";

import css from "./Header.module.css";

import AuthModal from "../AuthModal/AuthModal";

export const Header = ({
  isOpen,
  setIsOpen,
  authMode,
  setAuthMode,
  onThemeChange,
}) => {
  const location = useLocation();

  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const locationPsychologists = location.pathname === "/psychologists";

  const locationFavorite = location.pathname === "/favorites";

  const locationHome = location.pathname === "/";

  const handleLogout = () => {
    logoutUser();

    setIsMenuOpen(false);
  };

  const handleAuthOpen = (mode) => {
    setAuthMode(mode);

    setIsOpen(true);

    setIsMenuOpen(false);
  };

  const handleMenuLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${css.header} container`}>
      <div className={css.headerLogo}>
        <span className={css.logoSpan}>psychologists.</span>
        <span className={css.logoSpanTwo}>services</span>
      </div>

      <nav className={css.NavLinkWrapper}>
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
      </nav>

      <div className={css.themeSwitcher}>
        <button
          type="button"
          className={css.themeButtonGreen}
          onClick={() => onThemeChange("green")}
          aria-label="Green theme"
        />

        <button
          type="button"
          className={css.themeButtonBlue}
          onClick={() => onThemeChange("blue")}
          aria-label="Blue theme"
        />

        <button
          type="button"
          className={css.themeButtonOrange}
          onClick={() => onThemeChange("orange")}
          aria-label="Orange theme"
        />
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
            onClick={() => handleAuthOpen("login")}
            className={css.button}
            type="button"
          >
            Log In
          </button>

          <button
            onClick={() => handleAuthOpen("registration")}
            className={css.buttonTwo}
            type="button"
          >
            Registration
          </button>
        </div>
      )}

      <button
        className={`${css.burgerButton} ${
          isMenuOpen ? css.burgerButtonOpen : ""
        }`}
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>

      {isMenuOpen && (
        <div className={css.mobileMenu}>
          <nav className={css.mobileNav}>
            <Link
              className={css.mobileNavLink}
              to="/"
              onClick={handleMenuLinkClick}
            >
              Home
              {locationHome && <span className={css.mobileActiveDot} />}
            </Link>

            <Link
              className={css.mobileNavLink}
              to="/psychologists"
              onClick={handleMenuLinkClick}
            >
              Psychologists
              {locationPsychologists && (
                <span className={css.mobileActiveDot} />
              )}
            </Link>

            {user && (
              <Link
                className={css.mobileNavLink}
                to="/favorites"
                onClick={handleMenuLinkClick}
              >
                Favorites
                {locationFavorite && <span className={css.mobileActiveDot} />}
              </Link>
            )}
          </nav>

          <div className={css.mobileThemeSwitcher}>
            <button
              type="button"
              className={css.themeButtonGreen}
              onClick={() => {
                onThemeChange("green");
                setIsMenuOpen(false);
              }}
              aria-label="Green theme"
            />

            <button
              type="button"
              className={css.themeButtonBlue}
              onClick={() => {
                onThemeChange("blue");
                setIsMenuOpen(false);
              }}
              aria-label="Blue theme"
            />

            <button
              type="button"
              className={css.themeButtonOrange}
              onClick={() => {
                onThemeChange("orange");
                setIsMenuOpen(false);
              }}
              aria-label="Orange theme"
            />
          </div>

          {user ? (
            <div className={css.mobileUserSection}>
              <div className={css.mobileUserInfo}>
                <div className={css.wrapperIconUsers}>
                  <svg width={24} height={24}>
                    <use href="/sprite.svg#icon-user" />
                  </svg>
                </div>

                <p className={css.textUsers}>{user.displayName}</p>
              </div>

              <button
                onClick={handleLogout}
                className={css.mobileLogout}
                type="button"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className={css.mobileAuthButtons}>
              <button
                onClick={() => handleAuthOpen("login")}
                className={css.button}
                type="button"
              >
                Log In
              </button>

              <button
                onClick={() => handleAuthOpen("registration")}
                className={css.buttonTwo}
                type="button"
              >
                Registration
              </button>
            </div>
          )}
        </div>
      )}

      {!user && (
        <AuthModal isOpen={isOpen} authMode={authMode} setIsOpen={setIsOpen} />
      )}
    </header>
  );
};
