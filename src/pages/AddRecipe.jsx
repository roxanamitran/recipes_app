import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function AddRecipe() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState(0);
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [preparation, setPreparation] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name);
          setCategory(data.category);
          setTime(data.time);
          setImage(data.image);
          setIngredients(data.ingredients || []);
          setPreparation(data.preparation);
        } else {
          console.log("Document inexistent!");
        }
      }
    };
    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = { name, category, image, time, preparation, ingredients };

    try {
      if (id) {
        const docRef = doc(db, "recipes, id");
        await updateDoc(docRef, newRecipe);
        console.log("Reteta editata cu succes");
      } else {
        await addDoc(collection(db, "recipes"), newRecipe);
        console.log("Reteta a fost adaugata cu succes");
      }

      setName("");
      setCategory("");
      setTime(0);
      setImage("");
      setIngredients([]);
      setPreparation("");

      navigate("/");
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="form">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Numele retetei</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduceti numele retetei"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Select
            type="text"
            placeholder="Selectati categoria"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Timp de preparare (minute)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Introduceti timpul necesar prepararii"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Imagine</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduceti url-ul imaginii"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingrediente</Form.Label>
          <div>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <span>{ingredient}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  Sterge
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "10px"
            }}
          >
            <Form.Control
              type="text"
              placeholder="Introduceti un ingredient"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <Button variant="success" onClick={handleAddIngredient}>
              Adauga
            </Button>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mod de preparare</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Introduceti modul de preparare"
            value={preparation}
            onChange={(e) => setPreparation(e.target.value)}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Salveaza modificarile facute
        </Button>
      </Form>
    </div>
  );
}

export default AddRecipe;
