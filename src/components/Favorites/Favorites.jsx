import { useEffect, useMemo, useState } from "react";

import css from "../Psychologists/Psychologists.module.css";

import { fetchAllPsychologists } from "../../api/psyhologists";

import PsychologistCard from "../PsychologistsCard/PsychologistsCard";

import SortDropdown from "../SortDropdown/Sortdropdown";

export const Favorites = () => {
  const [sortType, setSortType] = useState("popular");

  const [favoritePsychologists, setFavoritePsychologists] = useState([]);

  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const saved = localStorage.getItem("favoriteItems");

    let parseId;

    if (saved) {
      parseId = JSON.parse(saved);
    } else {
      parseId = [];
    }

    fetchAllPsychologists().then((snapshot) => {
      const psychologists = [];

      snapshot.forEach((childSnapshot) => {
        psychologists.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      const filtered = psychologists.filter((psychologist) =>
        parseId.includes(psychologist.id),
      );

      setFavoritePsychologists(filtered);
    });
  }, []);

  const sortedPsychologists = useMemo(() => {
    const result = [...favoritePsychologists];

    if (sortType === "az") {
      return result.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortType === "za") {
      return result.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortType === "priceLow") {
      return result.filter((psychologist) => psychologist.price_per_hour < 10);
    }

    if (sortType === "priceHigh") {
      return result.filter((psychologist) => psychologist.price_per_hour > 10);
    }

    if (sortType === "popular") {
      return result.sort((a, b) => b.rating - a.rating);
    }

    if (sortType === "notPopular") {
      return result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [favoritePsychologists, sortType]);
  const handleRemoveFavorite = (id) => {
    setFavoritePsychologists((prev) =>
      prev.filter((psychologist) => psychologist.id !== id),
    );
  };

  const visiblePsychologists = sortedPsychologists.slice(0, visibleCount);

  const hasMore = visibleCount < sortedPsychologists.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <>
      <SortDropdown sortType={sortType} setSortType={setSortType} />

      <ul className={`${css.psychologistList} container`}>
        {visiblePsychologists.map((psychologist) => (
          <li key={psychologist.id}>
            <PsychologistCard
              psychologist={psychologist}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </li>
        ))}

        {hasMore && (
          <div className={css.wrapperLoadMore}>
            <button
              onClick={loadMore}
              className={css.buttonLoadMore}
              type="button"
            >
              Load More
            </button>
          </div>
        )}
      </ul>
    </>
  );
};

export default Favorites;
