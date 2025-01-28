import Recipe from "../components/Recipe";

function Home({ recipes }) {
  console.log("Render", recipes);
  return (
    <div className="card-container">
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe}></Recipe>
      ))}
    </div>
  );
}

export default Home;
