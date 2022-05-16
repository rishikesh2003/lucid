import Navbar from "../Components/Navbar";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import books from "../data/book";
import BookCard from "../Components/BookCard";

const BookRecommendation = () => {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setData(books[genre]);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>Choose your Genre.</h2>
        <FormControl style={{ margin: "10px 0" }} fullWidth>
          <InputLabel>Genre</InputLabel>
          <Select
            value={genre}
            label="Genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <MenuItem value={"action"}>Action and Adventure</MenuItem>
            <MenuItem value={"selfHelp"}>Self Help</MenuItem>
            <MenuItem value={"fantasy"}>Fantasy</MenuItem>
            <MenuItem value={"scifi"}>Sci-Fi</MenuItem>
            <MenuItem value={"drama"}>Drama</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          style={{
            margin: "10px 0",
          }}
          onClick={handleClick}
          className={loading ? "" : "primary-btn"}
          variant="contained"
          loading={loading}
        >
          Get Recommendations.
        </LoadingButton>
        {data && data.map((b) => <BookCard data={b} />)}
      </div>
    </>
  );
};

export default BookRecommendation;
