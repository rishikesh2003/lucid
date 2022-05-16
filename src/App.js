import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import Meditation from "./pages/Meditation";
import NutriStats from "./pages/NutriStats";
import FoodRecommendation from "./pages/FoodRecommendation";
import Scheduler from "./pages/Scheduler";
import BookRecommendation from "./pages/BookRecommendation";
import Recommendations from "./pages/Recommendations";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/nutristats" element={<NutriStats />} />
        <Route path="/recommendations/food" element={<FoodRecommendation />} />
        <Route path="/recommendations/book" element={<BookRecommendation />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
};

export default App;
