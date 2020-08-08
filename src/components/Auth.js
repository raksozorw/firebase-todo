import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase/app";

import { signIn, signOut, fetch, stopFetch } from "../actions";
import { Link } from "react-router-dom";
import history from "../history";

import CircularProgress from "@material-ui/core/CircularProgress";

// I think we use reducer here...
// on sign in, set the authResult uid... then access things from database that have that same uid.

export default function Auth() {
  const signedIn = useSelector((state) => state.auth.isSignedIn);
  const userId = useSelector((state) => state.auth.userId);
  const [name, setName] = useState();
  const [displayName, setDN] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthChange();
  }, []);

  const onAuthChange = () => {
    dispatch(fetch());
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        const displayName = user.email;
        const uid = user.uid;
        dispatch(signIn(uid));
        setDN(displayName);
        dispatch(stopFetch());
        history.push("/home");
        // ...
      } else {
        dispatch(stopFetch());
        history.push("/");
        // User is signed out.
        // ...
      }
    });
  };

  return (
    <div className='sign-in'>
      <div id='firebaseui-auth-container'></div>
      <div>{displayName && displayName}</div>
      <div>
        {signedIn ? (
          <div
            onClick={() => {
              firebase.auth().signOut();
              history.push("/");
              setDN("");

              dispatch(signOut());
            }}
          >
            Sign Out
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
