import { useEffect, useState } from "react";
import { fetchPsychologists } from "../api/psyhologists";
const usePsychologists = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);

    const response = await fetchPsychologists(3, lastKey);
    const data = response.val();
    const entries = Object.entries(data);

    if (entries.length > 0) {
      const newPsychologists = entries.map(([key, psychologist]) => ({
        ...psychologist,
        id: key,
      }));

      setPsychologists((prev) => [...prev, ...newPsychologists]);
      setLastKey(entries[entries.length - 1][0]);
      setHasMore(entries.length >= 3);
      console.log(newPsychologists);
    } else {
      setHasMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      loadMore();
    }, 0);

    return () => clearTimeout(id);
  }, []);

  return { psychologists, isLoading, hasMore, loadMore };
};

export default usePsychologists;
