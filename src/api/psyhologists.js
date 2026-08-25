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
  endAt,
  startAt,
} from "firebase/database";

import { database } from "../firebase/config.js";

export const fetchPsychologists = (
  limit,
  lastKey,
  field,
  direction,
  lastValue,
  priceFilter,
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

  let priceConstraint = null;

  if (priceFilter === "less") {
    priceConstraint = endAt(9.99);
  }

  if (priceFilter === "greater") {
    priceConstraint = startAt(10.01);
  }

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
  }

  const constraints = [orderConstraint];

  if (priceConstraint) {
    constraints.push(priceConstraint);
  }

  if (positionConstraint) {
    constraints.push(positionConstraint);
  }

  constraints.push(limitConstraint);

  const psychologistsRef = query(
    ref(database, "psychologists"),
    ...constraints,
  );

  return get(psychologistsRef);
};

export const fetchAllPsychologists = () => {
  const psychologistsRef = ref(database, "psychologists");

  return get(psychologistsRef);
};
