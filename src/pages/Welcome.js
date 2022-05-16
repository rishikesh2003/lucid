import styles from "./css/welcome.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect } from "react";
import supabase from "../config";

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className={styles.container}>
      <img className={styles.banner} src="/images/banner.webp" alt="banner" />

      <h1>Welcome To Lucid!</h1>
      <p className={styles.quote}>Lifestyle Made Lucid!</p>
      <Link className="no-links" to={"/register"}>
        <Button className={"primary-btn"} variant="contained">
          Get Started
        </Button>
      </Link>
      <div className={styles["bottom-bar"]}>
        Already Have an account? <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default Welcome;
