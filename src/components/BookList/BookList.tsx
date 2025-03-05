import { Book, BookForHeading } from "./types";
import BookItem from "../BookItem/BookItem";
// import styles from "./Booklist.module.scss";
import { headings } from "./service";
import { FC } from "react";

type Props = {
  booksList: Book[];
  reloadPage: () => void;
};

const BookList: FC<Props> = ({ booksList, reloadPage }) => {
  return (
    <div className="table-container is-size-6 is-size-7-mobile">
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            {Object.keys(headings).map((head) => {
              return (
                <td
                  key={head}
                  className="has-text-centered has-text-weight-bold is-uppercase"
                  style={{ verticalAlign: "middle" }}
                >
                  {headings[head as keyof BookForHeading]}
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {booksList.map((bookData) => {
            return (
              <BookItem
                key={bookData.isbn}
                book={bookData}
                refreshPage={reloadPage}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
