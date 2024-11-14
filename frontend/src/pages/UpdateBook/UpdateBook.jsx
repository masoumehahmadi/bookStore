import axios from "axios";
import styles from "./UpdateBook.module.scss";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../components/Context/Context";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

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

  isbn: Yup.string(),
});

export default function UpdateBook() {
  const { authState, setAuthState } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues:{
      title: "",
      author: "",
      isbn: "",
      publicationYear: "",
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
  });

  const getBookDetails = async () => {
    try {
      let response = await axios.get("http://localhost:3010/api/books/" + id);
      setBook(response.data.data);
      reset(response.data.data)
    } catch (error) {
      navigate("/error", { state: { errorMessage: error } });
    }
  };

  useEffect(() => {
    getBookDetails();
  }, [id]);

  const updateBook = async () => {
    try {
      console.log(book)
      await axios.put("http://localhost:3010/api/books/" + id, book, {
        headers: {
          Authorization: "Bearer " + authState.token,
        },
      });
      navigate("/api/books");
    } catch (err) {
      console.log(authState.token)
      console.error(err.response);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.boxInput}>
          <h2 className={styles.titlePage}>Edit Book</h2>
          <form
            className={styles.formStyle}
            onSubmit={handleSubmit(updateBook)}
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
              onChange={(e) =>
                setBook({
                  ...book,
                  title: e.target.value,
                })
              }
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
              onChange={(e) =>
                setBook({
                  ...book,
                  author: e.target.value,
                })
              }
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
              onChange={(e) =>
                setBook({
                  ...book,
                  isbn: e.target.value,
                })
              }
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
              onInput={(e) =>
                setBook({
                  ...book,
                  publicationYear: e.target.value,
                })
              }
            />
            {errors.publicationYear && (
              <p className={styles.errTxt}>{errors.publicationYear.message}</p>
            )}
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </form>
        </div>
        <Link to="/api/books" className={styles.backPage}>
          previous page
        </Link>
      </div>
    </>
  );
}
