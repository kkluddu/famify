import React, { useState } from "react";
import ListForm from "./ListForm";
import List from "./List";
import "./GroceryList.css";
import axios from "axios";

function GroceryList(props) {
  const [lists, setLists] = useState([]);

  const createList = (list) => {
    console.log(list);

    const config = {
      url: "http://localhost:3001/groceries",
      method: "post",
      withCredentials: true,
      data: {
        content: list,
      },
    };

    axios
      .request(config)
      .then((res) => {
        console.log(res);
        props.onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addList = (list) => {
    const newLists = [list, ...lists];
    setLists(newLists);
    createList(list.list);
  };

  const removeList = (id) => {
    const removeArr = [...lists].filter((list) => list.id !== id);
    setLists(removeArr);
  };

  const completeList = (id) => {
    let updatedLists = lists.map((list) => {
      if (list.id === id) {
        list.isComplete = !list.isComplete;
      }
      return list;
    });
    setLists(updatedLists);
  };

  const updateList = (listId, newValue) => {
    setLists((prev) =>
      prev.map((item) => (item.id === listId ? newValue : item))
    );
  };

  return (
    <div className="listspage-container">
      <div className="list-header">
        <h1>Grocery List</h1>
      </div>
      <div className="list-form-container">
        <ListForm onSubmit={addList} />
      </div>
      <div className="lists-container text-center">
        <List
          lists={lists}
          completeList={completeList}
          removeList={removeList}
          updateList={updateList}
        />
      </div>
    </div>
  );
}

export default GroceryList;