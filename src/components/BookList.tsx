import { Book, BookForHeading } from "./types";
import BookItem from "./BookItem";
import { tableHeadings } from "./service.ts";
import { FC } from "react";

type Props = {
  booksList: Book[];
  reloadPage: () => void;
  updateBook: (book: Book) => void;
  deleteMessage: () => void;
};

const BookList: FC<Props> = ({ booksList, reloadPage, updateBook, deleteMessage }) => {
  return (
    <div
      className="table-container is-size-6 is-size-7-mobile"
      id="table-container"
    >
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth ">
        <thead>
          <tr>
            {Object.keys(tableHeadings).map((head) => {
              return (
                <td
                  key={head}
                  className="has-text-centered has-text-weight-bold is-uppercase"
                  style={{ verticalAlign: "middle" }}
                >
                  {tableHeadings[head as keyof BookForHeading]}
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {booksList.map((bookData) => {
            return (
              <BookItem
                key={bookData.id}
                book={bookData}
                refreshPage={reloadPage}
                updateBook={updateBook}
                deleteMessage={deleteMessage}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
