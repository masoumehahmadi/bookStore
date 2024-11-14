import { useState, useContext } from "react";
import styles from "./BookForm.module.scss";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/Context";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Please add a book title")
    .max(50, "Title cannot be more than 50 characters"),
  author: Yup.string().required("Please add an author"),
  publicationYear: Yup.number()
    .positive("Must be a positive number")
    .integer("Must be an integer")
    .min(1000, "Publication year should be 4 digits")
    .max(
      new Date().getFullYear(),
      `Publication year cannot be greater than ${new Date().getFullYear()}`
    ),

  isbn: Yup.string().required("Please add a book isbn"),
});

export default function BookForm() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const createBook = async (data) => {
    try {
      //console.log(data)
      await axios.post("http://localhost:3010/api/books", data, {
        headers: {
          Authorization: "Bearer " + authState.token,
        },
      });
      reset();
    } catch (error) {
      //console.log(authState.token)

      if (error.response) {
        console.error(error.response.data);
      }
      console.error(error);
      navigate("/error", {
        state: { errorMessage: error.message },
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.boxInput}>
          <h1 className={styles.titlePage}> Add book </h1>
          <form
            onSubmit={handleSubmit(createBook)}
            className={styles.formStyle}
          >
            <label className={styles.lableStyle} htmlFor="title">
              title:
            </label>
            <input
              className={styles.inputStyle}
              {...register("title")}
              id="title"
              type="text"
              placeholder="Enter your title"
            />

            {errors.title && (
              <p className={styles.errTxt}>{errors.title.message}</p>
            )}

            <label className={styles.lableStyle} htmlFor="author">
              author:
            </label>
            <input
              className={styles.inputStyle}
              {...register("author")}
              id="author"
              type="text"
              placeholder="Enter your author"
            />

            {errors.author && (
              <p className={styles.errTxt}>{errors.author.message}</p>
            )}

            <label className={styles.lableStyle} htmlFor="isbn">
              isbn:
            </label>
            <input
              className={styles.inputStyle}
              {...register("isbn")}
              id="isbn"
              type="text"
              placeholder="Enter your isbn"
            />

            {errors.isbn && (
              <p className={styles.errTxt}>{errors.isbn.message}</p>
            )}
            <label className={styles.lableStyle} htmlFor="publicationYear">
              publicationYear:
            </label>
            <input
              className={styles.inputStyle}
              {...register("publicationYear")}
              id="publicationYear"
              type="text"
              placeholder="Enter your date"
            />
            {errors.publicationYear && (
              <p className={styles.errTxt}>{errors.publicationYear.message}</p>
            )}

            <button className={styles.submitBtn}>Submit </button>
          </form>
        </div>
        <Link to="/options" className={styles.backPage}>
          previous page
        </Link>
      </div>
    </>
  );
}
