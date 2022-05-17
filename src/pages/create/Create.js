import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import SectionHeader from "../../components/SectionHeader";
import "./Create.css";
import Loading from "../../components/Loading";

export default function Create() {
  const [movieNameInput, setMovieName] = useState("");
  const [reviewInput, setReviewInput] = useState("");
  const [starsInput, setStarInput] = useState("");
  const [file, setFile] = useState("");
  const [fileImg, setFileImg] = useState("");
  const [fileUpload, setFileUpload] = useState(false);
  const [fileMessage, setFileMessage] = useState(false);

  const movieCollection = collection(db, "movies");

  const navigate = useNavigate();

  // async skal bruges når vi bruger await, ellers virker det ikke

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              setFileUpload(true);
              break;
            default: {
              return;
            }
          }
        },
        (error) => {
          console.log(error.message);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileImg(downloadURL);
            setFileUpload(false);
            setFileMessage(true);
            console.log(file);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const res = await addDoc(collection(db, "movies"), {
      movieName: movieNameInput,
      review: reviewInput,
      img: fileImg,
      stars: parseInt(starsInput),
    });
    console.log(res.id);
    navigate("/allreviews");
  };

  const onChangeMovie = (e) => {
    setMovieName(e.target.value);
  };

  const onChangeReview = (e) => {
    setReviewInput(e.target.value);
  };

  const onChangeStars = (e) => {
    setStarInput(e.target.value);
  };

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="gradient-background">
      <SectionHeader heading="Create a new review" />
      <div className="create-form">
        <form onSubmit={handleCreateSubmit}>
          <input
            placeholder="Name of the movie"
            type="text"
            onChange={onChangeMovie}
            required="required"
          />
          <textarea
            placeholder="Review, 300 characters."
            type="text"
            maxLength="300"
            onChange={onChangeReview}
            required="required"
          />
          <input
            type="file"
            id="file"
            required="required"
            onChange={onChangeFile}
          />
          <label htmlFor="file" className="btn-3">
            <span className="loadBtn">
              {!fileUpload ? (
                <span>Upload image</span>
              ) : (
                <span className="Uploading">
                  <span>Uploading</span>

                  <Loading />
                </span>
              )}
            </span>
          </label>
          {fileMessage && <p className="fileMessage">Upload is done</p>}
          <input
            placeholder="Give a star between 1-5"
            required="required"
            type="number"
            min="1"
            max="5"
            onChange={onChangeStars}
          />
          {!fileUpload && <button type="submit">Add review</button>}
        </form>
      </div>
    </div>
  );
}
