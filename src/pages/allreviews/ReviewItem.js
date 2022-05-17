import React, { useState, useContext } from "react";
import "./reviewitem.css";
import deletePic from "./trash-can-solid.svg";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

import starImg from "./star-solid.svg";

export default function ReviewItem(props) {
  const stars = props.movie.stars;
  const { currentUser } = useContext(AuthContext);

  function row(variable) {
    return <img src={starImg} />;
  }

  function loopy() {
    let rows = [];
    for (let i = 0; i < stars; i++) {
      rows.push(row(i));
    }
    return rows;
  }

  const rows = loopy();

  return (
    <div className="review">
      <div className="upper-section">
        <h3>{props.movie.movieName}</h3>
        {currentUser && (
          <img
            src={deletePic}
            className="trash-icon"
            onClick={() => props.onHandleDelete(props.movie.id)}
          ></img>
        )}
      </div>
      <div className="review-content">
        <img src={props.movie.img}></img>

        <div className="content">
          <p className="description">{props.movie.review}</p>
        </div>
      </div>
      <div className="stars-container">
        {rows.map((row, index) => {
          return (
            <span className="stars" key={index}>
              {row}
            </span>
          );
        })}
      </div>
    </div>
  );
}
