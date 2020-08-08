import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebaseConfig";
import DisplayListItem from "./DisplayListItem";
import { v4 as uuidv4 } from "uuid";
import history from "../history";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function NewList() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const uid = useSelector((state) => state.auth.userId);
  const fetching = useSelector((state) => state.fetching.isFetching);

  // reads the db

  useEffect(() => {
    db.ref(`lists/${uid}`).on("value", (snapshot) => {
      const fireList = [];
      snapshot.forEach((snap) => {
        const value = {
          value: snap.val(),
          key: snap.key,
        };
        fireList.push(value);
      });
      setList(fireList);
    });
  }, [uid]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // on submit, create a timestamp
  // timestamp may work as key... could concatenate even
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const dId = date.toUTCString();
    const id = uuidv4();
    db.ref(`lists/${uid}/${dId + id}`).set(input);
    setInput("");
  };

  return uid ? (
    <div>
      <h1>This is the List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='new-item-input'
          value={input}
          onChange={handleChange}
        ></input>
        <Button onClick={handleSubmit} variant='contained' color='primary'>
          Add Item
        </Button>
      </form>
      {list.length === 0 && (
        <div className='no-list'> Enter an item to start your list!</div>
      )}

      {list.length > 0 && (
        <div className='list'>
          {list &&
            list.map((item) => {
              return (
                <DisplayListItem
                  item={item.value}
                  index={item.key}
                  key={item.key}
                />
              );
            })}
        </div>
      )}
    </div>
  ) : (
    <div className='no-user-id'>
      <CircularProgress />
      <br></br>
      {!fetching && <p>Sign in to create a list.</p>}
    </div>
  );
}

// try to mess around i nthe action creator .... just want to redirect if there is no uid after a few seconds
