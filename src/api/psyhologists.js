import {
  ref,
  get,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
} from "firebase/database";
import { database } from "../firebase/config.js";

export const fetchPsychologists = (limit, lastKey) => {
  let psychologistsRef;
  if (lastKey) {
    psychologistsRef = query(
      ref(database, "psychologists"),
      orderByKey(),
      startAfter(lastKey),
      limitToFirst(limit)
    );
  } else {
    psychologistsRef = query(
      ref(database, "psychologists"),
      orderByKey(),
      limitToFirst(limit)
    );
  }
  return get(psychologistsRef);
};
