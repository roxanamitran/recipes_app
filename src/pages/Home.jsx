import { useState } from "react";
import Recipe from "../components/Recipe";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home({ recipes }) {
  const navigate = useNavigate();
  function handleAddRecipe() {
    navigate("/add_recipe");
  }
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((recipe) => recipe.category === selectedCategory)
    : recipes;

  return (
    <div>
      <div className="buttons">
        <Button
          variant={selectedCategory === "" ? "success" : "secondary"}
          onClick={handleCategoryChange}
          value=""
        >
          Toate retetele
        </Button>
        <Button
          variant={selectedCategory === "breakfast" ? "success" : "secondary"}
          value="breakfast"
          onClick={handleCategoryChange}
        >
          Mic-dejun
        </Button>
        <Button
          variant={selectedCategory === "lunch" ? "success" : "secondary"}
          type="checkbox"
          value="lunch"
          checked={selectedCategory === "lunch"}
          onClick={handleCategoryChange}
        >
          Pranz
        </Button>
        <Button
          variant={selectedCategory === "dinner" ? "success" : "secondary"}
          value="dinner"
          onClick={handleCategoryChange}
        >
          Cina
        </Button>
        <Button
          variant={selectedCategory === "dessert" ? "success" : "secondary"}
          value="dessert"
          onClick={handleCategoryChange}
        >
          Desert
        </Button>
        <Button variant="dark" size="lg" onClick={handleAddRecipe}>
          Adauga o noua reteta
        </Button>
      </div>
      <div className="card-container">
        {filteredRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
