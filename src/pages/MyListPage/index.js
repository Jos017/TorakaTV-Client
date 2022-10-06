import axios from "axios";
import React, { useEffect, useState } from "react";
import ListCard from "../../components/ListCard";

import "./styles.css";

const API_URL = process.env.REACT_APP_SERVER_URL;

const MyListPage = (props) => {
  const { userSession } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    const getAllListItems = () => {
      axios
        .get(`${API_URL}/myList/${userSession._id}`)
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
    console.log(request);
    axios
      .put(`${API_URL}/myList/update/${listItemId}`, request)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="my-list">
      {list.map((listItem) => {
        return (
          <ListCard
            info={{ ...listItem }}
            deleteListItem={deleteListItem}
            updateListItem={updateListItem}
            key={listItem._id}
          />
        );
      })}
    </div>
  );
};

export default MyListPage;
