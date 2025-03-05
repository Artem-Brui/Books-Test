import { FC } from "react";
// import styles from "./BookItem.module.scss";
import { Book } from "../BookList/types";
import classNames from "classnames";
import { bookUpdate } from "../../api-services/requests";
import editIcon from "../../../public/icons/edit.svg";
import deleteIcon from "../../../public/icons/delete.svg";

interface BookItemProps {
  book: Book;
  refreshPage: () => void;
}

const BookItem: FC<BookItemProps> = ({ book, refreshPage }) => {
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

  return (
    <tr
      className={classNames("has-text-centered", {
        "has-background-warning-85": !isActive,
      })}
    >
      <td style={{ verticalAlign: "middle" }}>{title}</td>
      <td style={{ verticalAlign: "middle" }}>{name}</td>
      <td style={{ verticalAlign: "middle" }}>{category}</td>
      <td style={{ verticalAlign: "middle" }}>{isbn}</td>
      <td style={{ verticalAlign: "middle" }}>{createdAt}</td>
      <td style={{ verticalAlign: "middle" }}>{editedAt}</td>
      <td
        className="is-flex is-flex-wrap-nowrap is-align-items-center is-justify-content-flex-end"
        style={{ verticalAlign: "middle" }}
      >
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
        {isActive && <img className="button is-small" src={editIcon} />}
        {!isActive && <img className="button is-small" src={deleteIcon} />}
      </td>
    </tr>
  );
};

export default BookItem;
