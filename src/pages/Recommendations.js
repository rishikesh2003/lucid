import Navbar from "../Components/Navbar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="bg">
        <h2 style={{ padding: "10px" }}>Recommendations.</h2>
        <div className="flex-card">
          <div>
            <Button
              onClick={() => {
                navigate("/recommendations/book");
              }}
              className="primary-btn"
            >
              📕 Book Recommendations
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                navigate("/recommendations/food");
              }}
              className="primary-btn"
            >
              🍑 Food Recommendations
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
