import { ref, get } from "firebase/database";
import { database } from "../firebase/config.js";

export const fetchPsychologists = () => {
  const psychologistsRef = ref(database, "psychologists");
  return get(psychologistsRef);
};
