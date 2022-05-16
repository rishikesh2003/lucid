import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../config/index";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Footer from "../Components/Footer";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    } else {
      setUser(user);
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      {user && (
        <div>
          <h2 style={{ padding: "10px 0", textAlign: "center" }}>
            Welcome, {user.user_metadata.name}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "50vh",
              justifyContent: "space-around",
              flexWrap: "wrap",
              margin: "20px 0",
            }}
          >
            {" "}
            <Button
              onClick={() => {
                navigate("/recommendations");
              }}
              className="primary-btn"
            >
              Recommendations
            </Button>
            <Button
              onClick={() => {
                navigate("/meditation");
              }}
              className="primary-btn"
            >
              Meditation
            </Button>
            <Button
              onClick={() => {
                navigate("/nutristats");
              }}
              className="primary-btn"
            >
              Nutristats
            </Button>
            <Button
              onClick={() => {
                navigate("/scheduler");
              }}
              className="primary-btn"
            >
              Smart Scheduler
            </Button>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Dashboard;
