import { useEffect, useState } from "react";
import { fetchPsychologists } from "../../api/psyhologists";

export const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    fetchPsychologists().then((snapshot) => {
      setPsychologists(snapshot.val());
    });
  }, []);

  return (
    <>
      <h1>Phychologists</h1>
      <ul>
        {psychologists.map((psychologist) => (
          <li key={psychologist.name}>{psychologist.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Psychologists;

{
  /* <ul className={css.list}>
  {recipes.map((recipe) => (
    <li key={recipe._id} className={css.item}>
      <RecipeCard recipe={recipe} recipeType={recipeType} />
    </li>
  ))}
</ul>; */
}
