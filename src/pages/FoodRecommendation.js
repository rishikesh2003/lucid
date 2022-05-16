import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config";
import foods from "../data/food";
import { LoadingButton } from "@mui/lab";

const FoodRecommendation = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = () => {
    setLoading(true);
    setInterval(() => {
      setData(foods[0]);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Food Recommendations.</h2>
        <LoadingButton
          style={{
            margin: "10px 0",
          }}
          onClick={handleClick}
          className={loading ? "" : "primary-btn"}
          variant="contained"
          loading={loading}
        >
          Get Recommendations.
        </LoadingButton>
        {data && (
          <div className="salad">
            <h2 style={{ textAlign: "center" }}>{data.name}</h2>
            <div className="main-card">
              <img src={data.imgURL} alt="salad" />
              <div>
                <h3>Ingredients</h3>
                {data.ingredients.split(",").map((d) => (
                  <li>{d}</li>
                ))}
              </div>
            </div>
            <h2 style={{ textAlign: "center" }}>Recipe</h2>
            {data.recipe.map((recipe) => (
              <p style={{ padding: "10px 0" }}>{recipe}</p>
            ))}
            <h2 style={{ marginTop: "20px" }}>Nutritional Values</h2>
            {data.nutritionalValues.split(",").map((d) => (
              <li>{d}</li>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FoodRecommendation;
