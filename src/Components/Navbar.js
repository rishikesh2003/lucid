import MenuIcon from "@mui/icons-material/Menu";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import supabase from "../config";

const Navbar = () => {
  const user = supabase.auth.user();

  const navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  const loggedIn = {
    first: [
      { name: "🌿 NutriStats.", link: "/nutristats" },
      { name: "🗓️ Smart Scheduler.", link: "/scheduler" },
      { name: "🧘🏻‍♂️ Meditation.", link: "/meditation" },
      { name: "🥗 Food Recommendations.", link: "/recommendations/food" },
      { name: "📕 Book Recommendations.", link: "/recommendations/book" },
    ],
    second: [
      { name: "👨 Dashboard.", link: "/dashboard" },
      { name: "➡️ Logout.", link: "/logout" },
    ],
  };
  const notLoggedIn = {
    first: [
      { name: "🔒 Login.", link: "/login" },
      { name: "👤 Register.", link: "/register" },
    ],
    second: [],
  };

  const contents = user ? loggedIn : notLoggedIn;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {contents.first.map((content, index) => (
          <ListItem key={content.name} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(content.link);
              }}
            >
              <ListItemText primary={content.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {contents.second.map((content, index) => (
          <ListItem key={content.name} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(content.link);
              }}
            >
              <ListItemText primary={content.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="navbar">
            <div className="flex-center">
              <MenuIcon
                style={{ cursor: "pointer" }}
                onClick={toggleDrawer(anchor, true)}
              />
            </div>
            <div className="flex-center">
              <img
                style={{ height: "50px" }}
                src="/images/logo.png"
                alt="logo"
              />
              <h2 style={{ textAlign: "center" }}>Lucid.</h2>
            </div>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Navbar;
