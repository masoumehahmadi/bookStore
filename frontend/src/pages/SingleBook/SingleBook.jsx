import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./SingleBook.module.scss";
export default function SingleBook() {
  const param = useParams();
  const [SingleBook, setSingleBook] = useState(null);
  const navigate = useNavigate();
  const getBookList = async (id) => {
    try {
      let response = await axios.get("http://localhost:3010/api/books/" + id);
      setSingleBook(response.data.data);
    } catch (error) {
      navigate("/error", { state: { errorMessage: error } });
    }
  };
  useEffect(() => {
    getBookList(param.id);
  }, [param.id]);

  return (
    <div className={styles.Container}>
      <div className={styles.Containerinf}>
        {SingleBook ? (
          <div className={styles.ContainerInfo}>
            <h1 className={styles.info}>more information:</h1>
            <p>
              <strong>id:</strong> {SingleBook._id}
            </p>

            <p>
              <strong>Title:</strong> {SingleBook.title}
            </p>
            <p>
              <strong>Author:</strong> {SingleBook.author}
            </p>
            <p>
              <strong>ISBN:</strong> {SingleBook.isbn}
            </p>
            <p>
              <strong>Publication Year:</strong> {SingleBook.publicationYear}
            </p>
          </div>
        ) : (
          <p className={styles.ContainerInfo}>Loading...</p>
        )}
        <Link to="/api/books" className={styles.backPage}>
          previous page
        </Link>
      </div>
    </div>
  );
}
