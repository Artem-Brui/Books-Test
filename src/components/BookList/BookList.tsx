import { Book, BookForHeading } from "./types";
import BookItem from "../BookItem/BookItem";
import styles from "./Booklist.module.scss";
import { headings } from "./service";
import { FC } from "react";

type Props = {
  booksList: Book[];
  reloadPage: () => void;
}

const BookList: FC<Props> = ( {booksList, reloadPage} ) => {

  return (
    <div className={styles.table__container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(headings).map((head) => {
              return (
                <td key={head} className={styles[head]}>
                  {headings[head as keyof BookForHeading]}
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {booksList.map((bookData) => {
            return <BookItem key={bookData.isbn} book={bookData} refreshPage={reloadPage} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
