import React from "react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const actions = [
  { icon: <EditIcon />, name: "Edit" },
  { icon: <DeleteIcon />, name: "Delete" },
];

const MenuDial = () => {
  return (
    <Box sx={{ position: "relative", mt: 0, height: 50 }}>
      <SpeedDial
        className="menu-dial"
        ariaLabel="SpeedDial playground example"
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          "& .MuiFab-primary": {
            width: 50,
            height: 50,
            backgroundColor: "#13c6b2",
            color: "#fff",
            "&:hover": { backgroundColor: "#0f9585" },
          },
        }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={{
              backgroundColor: "#18191a",
              border: "2px solid #13c6b2",
              color: "#fff",
              "&:hover": { backgroundColor: "#0f9585" },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default MenuDial;
