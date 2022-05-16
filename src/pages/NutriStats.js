import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase, { nutristatsURLGenerator } from "../config";
import styles from "./css/form.module.css";
import { LoadingButton } from "@mui/lab";
import { TextareaAutosize } from "@mui/material";

const NutriStats = () => {
  const [loading, setLoading] = useState(false);
  const [ingr, setIngr] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = supabase.auth.user();
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  const nutritionURL = nutristatsURLGenerator(ingr);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch(nutritionURL);
      const d = await req.json();
      await setData(d);
      await console.log(data.totalNutrients);
    } catch (error) {
      console.log(error.message);
    }
    await setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles["form-container"]}>
        <form onSubmit={handleClick} className={styles.form}>
          <h2>NutriStats.</h2>
          <div className={styles["form-group"]}>
            <TextareaAutosize
              value={ingr}
              onChange={(e) => {
                setIngr(e.target.value);
              }}
              required
              placeholder="Ingredients"
              minRows={8}
              style={{ width: 300, padding: 5 }}
              id="outlined-basic"
              label="Email"
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
            Analyze
          </LoadingButton>
        </form>
      </div>
      {data && (
        <div
          style={{
            zIndex: 100,
            background: "white",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <div className="performance-facts">
            <div className="performance-facts__header">
              <h1 className="performance-facts__title">NutriStats.</h1>
              <p>
                <span id="lnumser">0</span> servings per container
              </p>
            </div>
            <table className="performance-facts__table">
              <thead>
                <tr>
                  <th colSpan="3" className="amps">
                    Amount Per Serving
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan="2" id="lkcal-val-cal">
                    <b>Calories</b>
                  </th>
                  <td className="nob">{data.calories}</td>
                </tr>
                <tr className="thick-row">
                  <td colSpan="3" className="small-info">
                    <b>% Daily Value*</b>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">
                    <b>Total Fat </b>
                    {Math.floor(
                      Number(
                        data.totalNutrients.FAT
                          ? data.totalNutrients.FAT.quantity
                          : "0"
                      )
                    )}{" "}
                    g
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.FAT
                            ? data.totalDaily.FAT.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="blank-cell"></td>
                  <th>
                    Saturated Fat{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.FASAT
                          ? data.totalNutrients.FASAT.quantity
                          : "0"
                      )
                    )}{" "}
                    g
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.FASAT
                            ? data.totalDaily.FASAT.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="blank-cell"></td>
                  <th>Trans Fat 0 g</th>
                  <td></td>
                </tr>
                <tr>
                  <th colSpan="2">
                    <b>Cholesterol</b>{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.CHOLE
                          ? data.totalNutrients.CHOLE.quantity
                          : "0"
                      )
                    )}{" "}
                    mg
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.CHOLE
                            ? data.totalDaily.CHOLE.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">
                    <b>Sodium</b>
                    {Math.floor(
                      Number(
                        data.totalNutrients.NA
                          ? data.totalNutrients.NA.quantity
                          : "0"
                      )
                    )}{" "}
                    mg
                  </th>
                  <td>
                    <b>
                      {Math.floor(
                        Number(
                          data.totalDaily.NA ? data.totalDaily.NA.quantity : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">
                    <b>Total Carbohydrate</b>{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.CHOCDF
                          ? data.totalNutrients.CHOCDF.quantity
                          : "0"
                      )
                    )}{" "}
                    g
                  </th>
                  <td>
                    <b>
                      {Math.floor(
                        Number(
                          data.totalDaily.CHOCDF
                            ? data.totalDaily.CHOCDF.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="blank-cell"></td>
                  <th>
                    Dietary Fiber{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.FIBTG
                          ? data.totalNutrients.FIBTG.quantity
                          : "0"
                      )
                    )}{" "}
                    g
                  </th>
                  <td>
                    <b>
                      {Math.floor(
                        Number(
                          data.totalDaily.FIBTG
                            ? data.totalDaily.FIBTG.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <td className="blank-cell"></td>
                  <th>
                    Total Sugars{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.SUGAR
                          ? data.totalNutrients.SUGAR.quantity
                          : "0"
                      )
                    )}{" "}
                    g
                  </th>
                  <td></td>
                </tr>
                <tr>
                  <td className="blank-cell"></td>
                  <th>Includes - Added Sugars</th>
                  <td></td>
                </tr>
                <tr className="thick-end">
                  <th colSpan="2">
                    <b>Protein</b>{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.PROCNT
                          ? data.totalNutrients.PROCNT.quantity
                          : "0"
                      )
                    )}{" "}
                    g
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.PROCNT
                            ? data.totalDaily.PROCNT.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="performance-facts__table--grid">
              <tbody>
                <tr>
                  <th>
                    Vitamin D{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.VTTD
                          ? data.totalNutrients.VTTD.quantity
                          : "0"
                      )
                    )}{" "}
                    µg
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.VTTD
                            ? data.totalDaily.VTTD.quantity
                            : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <th>
                    Calcium{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.CA
                          ? data.totalNutrients.CA.quantity
                          : "0"
                      )
                    )}{" "}
                    mg
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.CA ? data.totalDaily.CA.quantity : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr>
                  <th>
                    Iron{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.FE
                          ? data.totalNutrients.FE.quantity
                          : "0"
                      )
                    )}{" "}
                    mg
                  </th>
                  <td>
                    <b>
                      {Math.floor(
                        Number(
                          data.totalDaily.FE ? data.totalDaily.FE.quantity : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
                <tr className="thin-end">
                  <th>
                    Potassium{" "}
                    {Math.floor(
                      Number(
                        data.totalNutrients.K
                          ? data.totalNutrients.K.quantity
                          : "0"
                      )
                    )}{" "}
                    mg
                  </th>
                  <td>
                    <b>
                      {" "}
                      {Math.floor(
                        Number(
                          data.totalDaily.K ? data.totalDaily.K.quantity : "0"
                        )
                      )}{" "}
                      %
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="small-info" id="small-nutrition-info">
              *Percent Daily Values are based on a 2,000 calorie diet.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NutriStats;
