import usePsychologists from "../../hooks/usePsychologists";
import css from "./Psychologists.module.css";
import { useState } from "react";
import SortDropdown from "../SortDropdown/Sortdropdown";
import PsychologistCard from "../PsychologistsCard/PsychologistsCard";
export const Psychologists = ({ handleOpenLogin }) => {
  const [sortType, setSortType] = useState("az");
  const { psychologists, hasMore, loadMore, isLoading } =
    usePsychologists(sortType);
  return (
    <>
      <SortDropdown sortType={sortType} setSortType={setSortType} />
      <ul className={`${css.psychologistList} container`}>
        {psychologists.map((psychologist) => (
          <li key={psychologist.id}>
            <PsychologistCard
              psychologist={psychologist}
              handleOpenLogin={handleOpenLogin}
            ></PsychologistCard>
          </li>
        ))}
        {hasMore && (
          <li className={css.wrapperLoadMore}>
            <button
              onClick={loadMore}
              className={css.buttonLoadMore}
              type="button"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Psychologists;
