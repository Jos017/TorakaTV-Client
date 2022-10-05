import React from "react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const actions = [
  {
    icon: <EditIcon />,
    name: "Edit",
    hover: "#0f9585",
    border: "2px solid #13c6b2",
    color: "#fff",
  },
  {
    icon: <DeleteIcon />,
    name: "Delete",
    hover: "#eb1e39",
    border: "2px solid #ee4056",
    color: "#fff",
  },
];

const MenuDial = (props) => {
  const { editComment, deleteComment, commentId } = props;
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
            width: 40,
            height: 40,
            backgroundColor: "#13c6b2",
            color: "#fff",
            "&:hover": { backgroundColor: "#0f9585" },
          },
        }}
        icon={
          <SpeedDialIcon icon={<MoreVertIcon />} openIcon={<MoreHorizIcon />} />
        }
        direction="left"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={{
              backgroundColor: "#18191a",
              border: `${action.border}`,
              color: `${action.color}`,
              "&:hover": { backgroundColor: `${action.hover}` },
            }}
            onClick={
              action.name === "Delete"
                ? () => deleteComment(commentId)
                : () => editComment(commentId)
            }
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default MenuDial;
