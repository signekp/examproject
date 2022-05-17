import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ReviewItem from "./ReviewItem";
import SectionHeader from "../../components/SectionHeader";

export default function AllReviews(props) {
  const movieCollection = collection(db, "movies");
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);

  const styles = {
    marginTop: "90px",
  };

  // useEffect(() => {
  //   onSnapshot(query(movieCollection), (snapchot) => {
  //     let data = [];
  //     snapchot.docs.forEach((doc) => {
  //       data.push({ id: doc.id, ...doc.data() });
  //     });
  //     setMovies(data);
  //     console.log(data);
  //   });
  // }, []);

  useEffect(() => {
    onSnapshot(query(movieCollection), (snapchot) => {
      const data = snapchot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMovies(data);
      console.log(data);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "movies", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles}>
      <SectionHeader style={styles} heading="See all reviews here" />
      <div className="reviews-hero">
        {movies.map((movie, index) => {
          return (
            <ReviewItem
              movie={movie}
              key={index}
              onHandleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}
