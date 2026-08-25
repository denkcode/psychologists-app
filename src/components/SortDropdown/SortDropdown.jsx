import { useState } from "react";
import css from "../Psychologists/Psychologists.module.css";
const SortDropdown = ({ sortType, setSortType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: "A to Z", value: "az" },
    { label: "Z to A", value: "za" },
    { label: "Less than 10$", value: "priceLow" },
    { label: "Greater than 10$", value: "priceHigh" },
    { label: "Popular", value: "popular" },
    { label: "Not popular", value: "notPopular" },
    { label: "Show all", value: "showAll" },
  ];
  const optionFind = options.find((option) => option.value === sortType);
  const handleOption = (option) => {
    const resultOptions = option.value;
    setSortType(resultOptions);
    setIsOpen(false);
  };
  return (
    <div className={`${css.sortContainer} container`}>
      <p className={css.sortTitle}>Filters</p>
      <button
        className={css.sortButton}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {optionFind?.label}
        <svg width="12" height="7">
          <use
            href={`/sprite.svg#${isOpen ? "icon-arrow-up" : "icon-arrow-down"}`}
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
  );
};

export default SortDropdown;
