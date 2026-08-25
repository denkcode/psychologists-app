import { useEffect, useState, useRef, useCallback } from "react";

import { fetchPsychologists } from "../api/psyhologists";

const usePsychologists = (sortType) => {
  const [psychologists, setPsychologists] = useState([]);

  const [lastKey, setLastKey] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const [lastValue, setLastValue] = useState(null);

  const isLoadingRef = useRef(false);

  const lastKeyRef = useRef(null);

  const lastValueRef = useRef(null);

  const hasMoreRef = useRef(true);

  const sortTypeRef = useRef(sortType);

  const previousSortTypeRef = useRef(sortType);

  useEffect(() => {
    lastKeyRef.current = lastKey;
  }, [lastKey]);

  useEffect(() => {
    lastValueRef.current = lastValue;
  }, [lastValue]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    sortTypeRef.current = sortType;
  }, [sortType]);

  let field = null;

  let direction = "asc";

  let priceFilter = null;

  if (sortType === "az") {
    field = "name";
    direction = "asc";
  } else if (sortType === "za") {
    field = "name";
    direction = "desc";
  } else if (sortType === "priceLow") {
    field = "price_per_hour";
    direction = "asc";
  } else if (sortType === "priceHigh") {
    field = "price_per_hour";
    direction = "desc";
  } else if (sortType === "priceLess10") {
    field = "price_per_hour";
    direction = "asc";
    priceFilter = "less";
  } else if (sortType === "priceGreater10") {
    field = "price_per_hour";
    direction = "desc";
    priceFilter = "greater";
  } else if (sortType === "popular") {
    field = "rating";
    direction = "desc";
  } else if (sortType === "notPopular") {
    field = "rating";
    direction = "asc";
  } else if (sortType === "showAll") {
    field = null;
    direction = "asc";
  }

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    const sortChanged = previousSortTypeRef.current !== sortTypeRef.current;

    if (sortChanged) {
      setPsychologists([]);
      setLastKey(null);
      setLastValue(null);
      setHasMore(true);

      lastKeyRef.current = null;
      lastValueRef.current = null;
      hasMoreRef.current = true;

      previousSortTypeRef.current = sortTypeRef.current;
    }

    if (!hasMoreRef.current) {
      return;
    }

    isLoadingRef.current = true;

    setIsLoading(true);

    try {
      const pageSize = 3;

      const response = await fetchPsychologists(
        pageSize + 1,
        sortChanged ? null : lastKeyRef.current,
        field,
        direction,
        sortChanged ? null : lastValueRef.current,
        priceFilter,
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

        const boundaryIndex =
          direction === "desc" ? 0 : visibleEntries.length - 1;

        setPsychologists((prev) => [...prev, ...newPsychologists]);

        setLastKey(visibleEntries[boundaryIndex][0]);

        if (field) {
          setLastValue(visibleEntries[boundaryIndex][1][field]);
        } else {
          setLastValue(null);
        }

        setHasMore(hasNextPage);
      } else {
        setHasMore(false);
      }
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [direction, field, priceFilter]);

  useEffect(() => {
    const id = setTimeout(() => {
      loadMore();
    }, 0);

    return () => clearTimeout(id);
  }, [loadMore]);

  return {
    psychologists,
    isLoading,
    hasMore,
    loadMore,
  };
};

export default usePsychologists;
