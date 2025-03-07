import { FC, useCallback } from "react";
import { Book } from "./types";
import { bookDelete, bookUpdate } from "../api-services/requests";
import { useNavigate } from "react-router-dom";

interface BookItemProps {
  book: Book;
  refreshPage: () => void;
  updateBook: (book: Book) => void;
  deleteMessage: () => void;
}

const BookItem: FC<BookItemProps> = ({ book, refreshPage, updateBook, deleteMessage }) => {
  const navigate = useNavigate()
  const { id, title, name, category, isbn, createdAt, editedAt, isActive } =
    book;

  const handleActivateClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const response = await bookUpdate(id, {
      isActive: true,
    });

    if (response && response.ok) {
      refreshPage();
    }
  };

  const handleDeActivateClick: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const response = await bookUpdate(id, {
      isActive: false,
    });

    if (response && response.ok) {
      refreshPage();
    }
    };
  
  const hadleEditClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((): void => {
    updateBook(book);
    navigate('/form')
  },
    [updateBook, navigate, book]
  ) 

  const hadleDeleteClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((): void => {
    bookDelete(book.id);
    deleteMessage();
    refreshPage();
  },
    [refreshPage, book, deleteMessage]
  ) 

  return (
    <tr className="has-text-centered">
      <td style={{ verticalAlign: "middle" }}>{title}</td>
      <td style={{ verticalAlign: "middle" }}>{name}</td>
      <td style={{ verticalAlign: "middle" }}>{category}</td>
      <td style={{ verticalAlign: "middle" }}>{isbn}</td>
      <td className="date-column" style={{ verticalAlign: "middle" }}>
        {createdAt}
      </td>
      <td className="date-column" style={{ verticalAlign: "middle" }}>
        {editedAt}
      </td>
      <td className="actions-cell" style={{ verticalAlign: "middle" }}>
        {isActive && (
          <button
            onClick={handleDeActivateClick}
            className="button is-small is-danger is-uppercase"
          >
            Deactivate
          </button>
        )}
        {!isActive && (
          <button
            onClick={handleActivateClick}
            className="button is-small is-success is-uppercase"
          >
            Re-Activate
          </button>
        )}
        {isActive && (
          <button className="button is-small is-warning button-edit" onClick={hadleEditClick} />
        )}
        {!isActive && (
          <button className="button is-small is-danger button-delete" onClick={hadleDeleteClick} />
        )}
      </td>
    </tr>
  );
};

export default BookItem;
