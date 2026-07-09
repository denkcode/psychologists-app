import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";
const registerUser = (email, displayName, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, { displayName }).then(() => user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      throw { errorCode, errorMessage };
    });
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential.user)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw { errorCode, errorMessage };
    });
}

const logoutUser = () => {
  return signOut(auth)
    .then(() => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw { errorCode, errorMessage };
    });
};

export { registerUser, loginUser, logoutUser };

