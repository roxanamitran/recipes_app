import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import RecipeDetails from "./pages/RecipeDetails";
import AddRecipe from "./pages/AddRecipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "recipes"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecipes(data);
      },
      (error) => {
        console.error("Error fetching items: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home recipes={recipes} />} />
          <Route path="/recipes" element={<Home recipes={recipes} />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/add_recipe" element={<AddRecipe />} />
          <Route path="/edit_recipe/:id" element={<AddRecipe />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
