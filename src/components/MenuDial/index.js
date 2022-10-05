import React, { useState } from "react";

import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CommentInput from "../CommentInput";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

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
  const { editComment, deleteComment, commentId, description } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ position: "relative", mt: 0, height: 50 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit your comment
          </Typography>
          <CommentInput
            previousComment={description}
            editComment={editComment}
            handleClose={handleClose}
            commentId={commentId}
            type="edit"
          />
          <IconButton
            color="primary"
            aria-label="cancel"
            onClick={handleClose}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      </Modal>
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
                : () => handleOpen()
            }
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default MenuDial;
