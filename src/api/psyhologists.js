import {
  ref,
  get,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
  orderByChild,
  endBefore,
  limitToLast,
} from "firebase/database";
import { database } from "../firebase/config.js";

export const fetchPsychologists = (
  limit,
  lastKey,
  field,
  direction,
  lastValue,
) => {
  let limitConstraint;
  if (direction === "desc") {
    limitConstraint = limitToLast(limit);
  } else {
    limitConstraint = limitToFirst(limit);
  }
  let positionConstraint;
  let orderConstraint;
  if (field) {
    orderConstraint = orderByChild(field);
  } else {
    orderConstraint = orderByKey();
  }
  let psychologistsRef;

  if (lastKey) {
    if (field) {
      if (direction === "desc") {
        positionConstraint = endBefore(lastValue, lastKey);
      } else {
        positionConstraint = startAfter(lastValue, lastKey);
      }
    } else {
      if (direction === "desc") {
        positionConstraint = endBefore(lastKey);
      } else {
        positionConstraint = startAfter(lastKey);
      }
    }
    psychologistsRef = query(
      ref(database, "psychologists"),
      orderConstraint,
      positionConstraint,
      limitConstraint,
    );
  } else {
    psychologistsRef = query(
      ref(database, "psychologists"),
      orderConstraint,
      limitConstraint,
    );
  }
  return get(psychologistsRef);
};

export const fetchAllPsychologists = () => {
  const psychologistsRef = ref(database, "psychologists");
  return get(psychologistsRef);
};
