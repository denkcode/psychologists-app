import usePsychologists from "../../hooks/usePsychologists";
import css from "./Psychologists.module.css";
import { useState } from "react";
import PsychologistCard from "../PsychologistsCard/PsychologistsCard";
export const Psychologists = () => {
  const [sortType, setSortType] = useState("az");
  const [isOpen, setIsOpen] = useState(false);
  const { psychologists, hasMore, loadMore, isLoading } =
    usePsychologists(sortType);
  const options = [
    { label: "A to Z", value: "az" },
    { label: "Z to A", value: "za" },
    { label: "Price: low to high", value: "priceAsc" },
    { label: "Price: high to low", value: "priceDesc" },
    { label: "Rating: low to high", value: "ratingAsc" },
    { label: "Rating: high to low", value: "ratingDesc" },
  ];

  const optionFind = options.find((option) => option.value === sortType);

  const handleOption = (option) => {
    const resultOptions = option.value;
    setSortType(resultOptions);
    setIsOpen(false);
  };
  return (
    <>
      <div className={`${css.sortContainer} container`}>
        <p className={css.sortTitle}>Filters</p>
        <button
          className={css.sortButton}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {optionFind.label}
          <svg width="12" height="7">
            <use
              href={`/sprite.svg#${
                isOpen ? "icon-arrow-up" : "icon-arrow-down"
              }`}
            />
          </svg>
        </button>

        {isOpen && (
          <div className={css.sortOptions}>
            {options.map((option) => (
              <button
                className={`${css.sortOption} ${
                  sortType === option.value ? css.activeSortOption : ""
                }`}
                onClick={() => {
                  handleOption(option);
                }}
                key={option.value}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <ul className={`${css.psychologistList} container`}>
        {psychologists.map((psychologist) => (
          <li key={psychologist.id}>
            <PsychologistCard psychologist={psychologist}></PsychologistCard>
          </li>
        ))}
        {hasMore && (
          <div className={css.wrapperLoadMore}>
            <button
              onClick={loadMore}
              className={css.buttonLoadMore}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </ul>
    </>
  );
};

export default Psychologists;
