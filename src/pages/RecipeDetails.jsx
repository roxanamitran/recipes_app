import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe(docSnap.data());
        } else {
          console.log("Document inexistent");
        }
      } catch (error) {
        console.error("Eroare la extragerea documentului", error);
      }
    };
    fetchData();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  function handleEdit() {
    navigate(`/edit_recipe/${id}`);
  }

  return (
    <div className="recipe">
      <Row>
        <Col xs={12} md={6}>
          <h1>{recipe.name}</h1>
          <img className="recipe-photo" src={recipe.image} alt={recipe.name} />
          <h3>Timp de preparare: {recipe.time} minute</h3>
          <h4>
            Ingrediente:
            {recipe.ingredients?.map((ingredient, i) => (
              <li key={i}>{ingredient}</li>
            ))}
          </h4>
        </Col>
        <Col xs={12} md={4}>
          <h3 className="preparation">
            Mod de preparare: {recipe.preparation}
          </h3>
          <Button
            variant="primary"
            style={{ marginBottom: "15px" }}
            onClick={handleEdit}
          >
            Editeaza reteta
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default RecipeDetails;
