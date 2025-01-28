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
    // Attach a real-time listener to Firebase
    const unsubscribe = onSnapshot(
      collection(db, "recipes"), // Replace "items" with your collection name
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecipes(data); // Update state when data changes
      },
      (error) => {
        console.error("Error fetching items: ", error);
      }
    );

    // Cleanup listener on unmount
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
