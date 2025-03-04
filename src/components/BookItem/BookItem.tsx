import { FC } from "react";
import styles from "./BookItem.module.scss";
import { Book } from "../BookList/types";
import classNames from 'classnames';
import { bookUpdate } from "../../api-services/requests";

interface BookItemProps {
  book: Book;
  refreshPage: () => void;
}

const BookItem: FC<BookItemProps> = ({ book, refreshPage }) => {

  const { id, title, name, category, isbn, createdAt, editedAt, isActive } = book;

  const handleActivateClick: React.MouseEventHandler<HTMLButtonElement> = async() => {
    const response = await bookUpdate(id, {
      isActive: true
    });

    if (response && response.ok) {
      refreshPage();
    }
  }

  const handleDeActivateClick: React.MouseEventHandler<HTMLButtonElement> = async() => {
    const response = await bookUpdate(id, {
      isActive: false
    });

    if (response && response.ok) {
      refreshPage();
    }
  }

  return (
    <tr className={classNames({[styles.deactivated]: !isActive})}>
      <td className={styles.title}>{title}</td>
      <td className={styles.name}>{name}</td>
      <td className={styles.category}>{category}</td>
      <td className={styles.isbn}>{isbn}</td>
      <td className={styles.createdAt}>{createdAt}</td>
      <td className={styles.editedAt}>{editedAt}</td>
      <td className={styles.actions}>
        {isActive && <button className={styles.edit_button}>Edit</button>}
        {!isActive && <button className={styles.delete_button}>Delete</button>}
        {isActive && <button onClick={handleDeActivateClick} className={styles.deactivate_button}>Deactivate</button>}
        {!isActive && <button onClick={handleActivateClick} className={styles.activate_button}>Activate</button>}
      </td>
    </tr>
  );
};

export default BookItem;
