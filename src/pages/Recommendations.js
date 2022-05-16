import Navbar from "../Components/Navbar";
import { Button } from "@mui/material";

const Recommendations = () => {
  return (
    <>
      <Navbar />
      <h2 style={{ padding: "10px" }}>Recommendations.</h2>
      <div className="flex-card">
        <div>
          <Button className="primary-btn">📕 Book Recommendations</Button>
        </div>
        <div>
          <Button className="primary-btn">🍑 Food Recommendations</Button>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
