import Navbar from "../Components/Navbar";
import styles from "./css/form.module.css";
import { TextField } from "@mui/material";
import Footer from "../Components/Footer";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import supabase from "../config/index";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      if (error) {
        throw new Error(error.message);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
    await setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Login</h2>
          <div className={styles["form-group"]}>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type={"email"}
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
            />
          </div>
          <div className={styles["form-group"]}>
            <TextField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type={"password"}
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
          </div>
          <LoadingButton
            fullWidth
            type="submit"
            className={loading ? "" : "primary-btn"}
            variant="contained"
            loading={loading}
          >
            Login
          </LoadingButton>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
