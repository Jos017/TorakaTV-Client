import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/logo.png";
import profileDefault from "../../images/profile-default.png";
import SearchBar from "../SearchBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FactCheckIcon from "@mui/icons-material/FactCheck";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <nav>
      <Link to={"/"} className="nav__projectName">
        <div className="logo-image">
          <img src={logo} alt="Logo" />
        </div>
        <h2>TorakaTV</h2>
      </Link>
      <SearchBar
        searchResults={props.searchResults}
        handleKeyUp={props.handleKeyUp}
        search={props.search}
      />
      <div className="nav__authLinks">
        {/** Menu shown when a user is loged in */}
        {props.user ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Tooltip title="Account settings">
              <IconButton
                ref={anchorRef}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Avatar
                  src={props.user.avatar ? props.user.avatar : profileDefault}
                  alt="avatar"
                />
              </IconButton>
            </Tooltip>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={(e) => {
                            handleClose(e);
                            navigate("/profile");
                          }}
                        >
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          Profile
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            handleClose(e);
                            navigate("/myList");
                          }}
                        >
                          <ListItemIcon>
                            <FactCheckIcon />
                          </ListItemIcon>
                          My List
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          onClick={(e) => {
                            handleClose(e);
                            navigate("/profile/edit");
                          }}
                        >
                          <ListItemIcon>
                            <Settings />
                          </ListItemIcon>
                          Edit Profile
                        </MenuItem>
                        <MenuItem>
                          <ListItemIcon
                            onClick={(e) => {
                              handleClose(e);
                              props.handleLogout(e);
                            }}
                          >
                            <Logout />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Stack>
        ) : (
          <>
            <Link to="/auth/signup" className="authLink">
              Signup
            </Link>
            <Link to="/auth/login" className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
