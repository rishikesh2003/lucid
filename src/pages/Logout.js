import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import supabase from "../config";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      await supabase.auth.signOut();
      await navigate("/");
    }
    logout();
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="spinner-container">
        <h2>Secure Logging you out...</h2>
        <div className="spinner"></div>
      </div>
    </>
  );
};

export default Logout;
