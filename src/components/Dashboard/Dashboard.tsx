import { useEffect, useState } from "react";
import BookList from "../BookList/BookList";
import styles from "./Dashboard.module.scss";
import { Book } from "../BookList/types";
import { booksGET } from "../../api-services/requests";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [fullList, setFullList] = useState<Book[]>([]);
  const [filteredList, setFilteredList] = useState<Book[]>([]);
  const [newRender, setNewRender] = useState(false);

  let filterParams;

  switch (activeFilter) {
    case "active":
      filterParams = "isActive=true";
      break;
    case "deactivated":
      filterParams = "isActive=false";
      break;
    default:
      filterParams = "";
  }


  useEffect(() => {
    const loadBooks = async () => {
      setFilteredList(await booksGET(filterParams));
      setFullList(await booksGET(''));
    };

    loadBooks();
  }, [filterParams, newRender]);

  const handleFilterSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setActiveFilter(event.target.value);
  };

  const handleNewRender = () => setNewRender(prev => !prev)

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.activeFilter}>
          <select defaultValue={activeFilter} onChange={handleFilterSelect}>
            <option value="active">Show Active</option>
            <option value="deactivated">Show Deactivated</option>
            <option value="all">Show All</option>
          </select>
          <p>{filteredList.length} / {fullList.length}</p>
        </div>

        <h1>Dashboard</h1>

        <button className={styles.newBook__button}>Add New Book</button>
      </header>

      <BookList booksList={filteredList} reloadPage={handleNewRender} />
    </div>
  );
};

export default Dashboard;
