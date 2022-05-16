import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../config/index";
import { useNavigate } from "react-router-dom";

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
          <h2>Welcome, {user.user_metadata.name}</h2>
          <p>Email : {user.email}</p>
          <p></p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
