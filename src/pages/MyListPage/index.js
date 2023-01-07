import axios from "axios";
import React, { useEffect, useState } from "react";
import ListCard from "../../components/ListCard";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import "./styles.css";

const API_URL = process.env.REACT_APP_SERVER_URL;

const MyListPage = (props) => {
  const { userSession } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const getAllListItems = () => {
      axios
        .get(`${API_URL}/myList/${userSession?._id}`)
        .then((response) => {
          setList(response.data);
        })
        .catch((err) => console.log(err));
    };
    getAllListItems();
  }, [userSession]);

  const deleteListItem = (listItemId) => {
    axios
      .delete(`${API_URL}/myList/delete/${listItemId}`)
      .then((response) => {
        const deletedListItemId = response.data._id;
        const newList = list.filter((item) => item._id !== deletedListItemId);
        setList([...newList]);
      })
      .catch((err) => console.log(err));
  };

  const updateListItem = (listItemId, request) => {
    axios
      .put(`${API_URL}/myList/update/${listItemId}`, request)
      .then((response) => {})
      .catch((err) => console.log(err));
  };
  return (
    <div className="my-list">
      <Grid
        container
        rowSpacing={2}
        columnSpacing={{ xs: 0, md: 2 }}
        maxWidth="1440px"
        height="fit-content"
      >
        <Grid item xs={12} marginTop={{ xs: 8, sm: 1 }}>
          <Typography
            variant="h2"
            color="#fff"
            fontWeight="Bold"
            fontSize={{ xs: '2rem', md: '3rem' }}
          >
            My List
          </Typography>
        </Grid>
        <Grid container mt="0.5rem">
          {userSession?.list &&
            list.map((listItem) => {
              return (
                <ListCard
                  info={{ ...listItem }}
                  deleteListItem={deleteListItem}
                  updateListItem={updateListItem}
                  userSession={userSession}
                  key={listItem._id}
                />
              );
            })}
        </Grid>
      </Grid>
    </div>
  );
};

export default MyListPage;
