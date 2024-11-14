import axios from "axios";
import { useEffect, useState,useContext } from "react";
import styles from "./BookList.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaInfo } from "react-icons/fa";
import {AuthContext} from "../../components/Context/Context";

export default function BookList() {
  const { authState, setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const getBookList = async () => {
    try {
      let response = await axios.get("http://localhost:3010/api/books");
      setList(response.data.data);
    } catch (error) {
      navigate("/error", { state: { errorMessage: error } });
    }
  };
  const handleInfo = (bookId) => {
    navigate(`/info/books/${bookId}`);
  };
  const handleEdit = (bookId) => {
    navigate(`/update/books/${bookId}`);
  };
  const deleteBook = async (bookId) => {
    try {
      await axios.delete("http://localhost:3010/api/books/" + bookId,{
        
          headers: {
            Authorization: "Bearer " + authState.token,
          },
        
      });

      setList((prevList) => prevList.filter((book) => book._id !== bookId));
    } catch (error) {
      navigate("/error", {
        state: { errorMessage: error || "an error occurred" },
      });
    }
  };

  useEffect(() => {
    getBookList();
  }, []);


  return (
    <div className={styles.Container}>
      <div className={styles.Wrapper}>
        {list ? (
          <table className={styles.bookTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>MoreInfo</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {list.map((book) => (
                <tr key={book._id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button onClick={() => handleInfo(book._id)}>
                      <FaInfo />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(book._id)}>
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => deleteBook(book._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "loading..."
        )}
      </div>
      <Link to="/options" className={styles.backPage}>
        previous page
      </Link>
    </div>
  );
}
