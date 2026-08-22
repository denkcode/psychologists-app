import Login from "./Login";
import Registration from "./Registration";
import css from "./AuthModal.module.css";
const AuthModal = ({ isOpen, authMode, setIsOpen }) => {
  let content;
  if (!isOpen) {
    return null;
  }
  if (authMode === "login") {
    content = <Login setIsOpen={setIsOpen} />;
  }

  if (authMode === "registration") {
    content = <Registration setIsOpen={setIsOpen} />;
  }
  return (
    <div role="dialog" aria-modal="true" className={css.backdrop}>
      <div
        className={`${css.modal} ${authMode === "login" ? css.modal : css.modalRegistration}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className={css.closeBtn}
          aria-label="Close modal"
        >
          <svg width={20} height={20} className={css.closeIcon}>
            <use href="/public/sprite.svg#icon-close" />
          </svg>
        </button>
        {content}
      </div>
    </div>
  );
};

export default AuthModal;
