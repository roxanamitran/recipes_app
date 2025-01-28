import { Card, Button } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function Recipe({ recipe }) {
  const handleDelete = async () => {
    try {
      const recipeDocRef = doc(db, "recipes", recipe.id);
      await deleteDoc(recipeDocRef);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const navigate = useNavigate();
  function handleViewDetails() {
    navigate(`/recipes/${recipe.id}`);
  }

  return (
    <div className="card">
      <Card style={{ width: "16rem" }}>
        <Card.Img
          variant="top"
          src={recipe.image}
          onClick={handleViewDetails}
        />
        <Card.Body>
          <Card.Title>{recipe.name}</Card.Title>
          <Button
            onClick={handleDelete}
            variant="dark"
            style={{ margin: "0 20px 0 px 40px" }}
          >
            <FaTrashAlt />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Recipe;
