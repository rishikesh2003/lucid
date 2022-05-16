import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import supabase from "../config";
import { useNavigate } from "react-router-dom";
import DonutChart from "react-donut-chart";
import styles from "./css/form.module.css";
import { TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Scheduler = () => {
  const [loading, setLoading] = useState(false);
  const [workH, setWorkH] = useState("");
  const [leisureH, setLeisureH] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    if (Number(workH) > 15) {
      setError("Your work hours can't be greater than 15");
      setLoading(false);
    } else if (Number(leisureH) > 10) {
      setError("Your leisure hours can't be greater than 10");
      setLoading(false);
    } else {
      const sleep = 8;
      const totalNotFree = sleep + Number(workH) + Number(leisureH);
      const totalFree = 24 - totalNotFree;

      const d = [
        { label: "Yoga", value: ((totalFree * (10 / 100)) / 24) * 100 },
        { label: "Meditation", value: ((totalFree * (10 / 100)) / 24) * 100 },
        { label: "Breakfast", value: ((totalFree * (10 / 100)) / 24) * 100 },
        { label: "Work", value: (workH / 24) * 100 },
        {
          label: "Reading Books",
          value: ((totalFree * (20 / 100)) / 24) * 100,
        },
        { label: "Leisure", value: (leisureH / 24) * 100 },
        { label: "Study / Work", value: ((totalFree * (10 / 100)) / 24) * 100 },
        { label: "Dinner", value: ((totalFree * (10 / 100)) / 24) * 100 },
        { label: "Sleep", value: (8 / 24) * 100 },
      ];
      d.forEach((d) => {
        d.value = Math.floor(d.value, 4);
      });
      // breakfast, dinner -> 10 % each work -> Yoga -20%, Meditation 10%, Reading Books 20%, Study - 30%,
      setTimeout(() => {
        setData(d);
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles["form-container"]}>
        <form onSubmit={handleClick} className={styles.form}>
          <h2>Smart Scheduler.</h2>
          <div className={styles["form-group"]}>
            <TextField
              fullWidth
              type={"text"}
              value={workH}
              onChange={(e) => {
                setWorkH(e.target.value);
              }}
              required
              id="outlined-basic"
              label="No of Work Hours (in numbers)"
              variant="outlined"
            />
          </div>
          <div className={styles["form-group"]}>
            <TextField
              fullWidth
              value={leisureH}
              onChange={(e) => {
                setLeisureH(e.target.value);
              }}
              type={"text"}
              required
              id="outlined-basic"
              label="Leisure hours(in numbers)"
              variant="outlined"
            />
          </div>
          <div className={styles["form-group"]}>
            <p>
              Note : Leisure Hours here denote the <br /> number of hours you
              want to take free <br />
              apart from our schedule.
            </p>
          </div>
          {error && (
            <Alert style={{ margin: "10px 0" }} severity="error">
              {error}
            </Alert>
          )}
          <LoadingButton
            fullWidth
            type="submit"
            className={loading ? "" : "primary-btn"}
            variant="contained"
            loading={loading}
          >
            Get Schedule
          </LoadingButton>
        </form>
      </div>
      {data && (
        <div style={{ padding: "20px" }}>
          <h2 style={{ textAlign: "center" }}>Chart</h2>
          <div className="chart-container flex-container">
            <DonutChart data={data} />
          </div>

          <div className="flex-container">
            <div>
              <h2>Time Allocation</h2>
              {data.map((d) => (
                <li>
                  {d.label} -{" "}
                  {(d.value / 100) * 24 > 1
                    ? Math.round((d.value / 100) * 24) + " Hours"
                    : Math.round((d.value / 100) * 24 * 60) + " Minutes"}
                </li>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Scheduler;
