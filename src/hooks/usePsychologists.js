import { useEffect, useState, useRef } from "react";
import { fetchPsychologists } from "../api/psyhologists";
const usePsychologists = (sortType) => {
  const [psychologists, setPsychologists] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastValue, setLastValue] = useState(null);
  const isLoadingRef = useRef(false);
  let field = null;
  let direction = "asc";

  if (sortType === "priceAsc") {
    field = "price_per_hour";
    direction = "asc";
  } else if (sortType === "az") {
    field = null;
    direction = "asc";
  } else if (sortType === "za") {
    field = null;
    direction = "desc";
  } else if (sortType === "priceDesc") {
    field = "price_per_hour";
    direction = "desc";
  } else if (sortType === "ratingAsc") {
    field = "rating";
    direction = "asc";
  } else if (sortType === "ratingDesc") {
    field = "rating";
    direction = "desc";
  }

  const loadMore = async () => {
    if (isLoadingRef.current || !hasMore) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const pageSize = 3;
      const response = await fetchPsychologists(
        pageSize + 1,
        lastKey,
        field,
        direction,
        lastValue
      );
      const entries = [];
      response.forEach((childSnapshot) => {
        entries.push([childSnapshot.key, childSnapshot.val()]);
      });

      const hasNextPage = entries.length > pageSize;
      let visibleEntries;

      if (direction === "desc") {
        visibleEntries = entries.slice(-pageSize);
      } else {
        visibleEntries = entries.slice(0, pageSize);
      }

      if (visibleEntries.length > 0) {
        const newPsychologists = visibleEntries.map(([key, psychologist]) => ({
          ...psychologist,
          id: key,
        }));
        if (direction === "desc") {
          newPsychologists.reverse();
        }

        let boundaryIndex;
        if (direction === "desc") {
          boundaryIndex = 0;
        } else {
          boundaryIndex = visibleEntries.length - 1;
        }

        setPsychologists((prev) => [...prev, ...newPsychologists]);
        setLastKey(visibleEntries[boundaryIndex][0]);
        if (field) {
          setLastValue(visibleEntries[boundaryIndex][1][field]);
        } else {
          setLastValue(null);
        }
        setHasMore(hasNextPage);
        console.log(newPsychologists);
      } else {
        setHasMore(false);
      }
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
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
