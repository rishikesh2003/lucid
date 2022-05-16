import Navbar from "../Components/Navbar";
import styles from "./css/form.module.css";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import supabase from "../config";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp(
        {
          email: email,
          password: password,
        },
        {
          data: {
            name: name,
          },
        }
      );
      if (error) {
        throw new Error(error.message);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Register</h2>
          <div className={styles["form-group"]}>
            <TextField
              value={name}
              onChange={(e) => [setName(e.target.value)]}
              required
              type={"text"}
              id="outlined-basic"
              label="Name"
              variant="outlined"
            />
          </div>
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
            loading={loading}
            fullWidth
            type="submit"
            className={loading ? "" : "primary-btn"}
            variant="contained"
          >
            Register
          </LoadingButton>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
