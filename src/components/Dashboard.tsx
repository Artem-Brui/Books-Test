import { FC, useEffect, useState } from "react";
import BookList from "./BookList";
import { Book } from "./types";
import { booksGET } from "../api-services/requests";
import Header from "./Header";
import Message from "./Message";
import Footer from "./Footer";

type DashboardProps = {
  updateOperation: (book: Book) => void;
  fullBooksList: Book[];
  getBooksList: (books: Book[]) => void;
};

const Dashboard: FC<DashboardProps> = ({
  updateOperation,
  fullBooksList,
  getBooksList,
}) => {
  const [activeFilter, setActiveFilter] = useState("active");
  const [filteredList, setFilteredList] = useState<Book[]>([]);
  const [newRender, setNewRender] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  let filterParams = "";

  switch (activeFilter) {
    case "active":
      filterParams = "isActive=true";
      break;
    case "deactivated":
      filterParams = "isActive=false";
      break;
    default:
      break;
  }

  useEffect(() => {
    const loadBooks = async () => {
      const booksForTable = await booksGET(filterParams);
      const allBooks = await booksGET("");

      getBooksList(allBooks);
      if (JSON.stringify(booksForTable) !== JSON.stringify(filteredList)) {
        setFilteredList(booksForTable);
      }
    };

    loadBooks();
  }, [filterParams, newRender]);

  const showMessageDelete = () => {
    setIsMessageVisible(true);

    setTimeout(() => {
      setIsMessageVisible(false);
    }, 2000);
  };

  return (
    <div className="dashboard-container mt-6">
      {isMessageVisible && <Message type={"delete"} />}
      <Header
        dbList={filteredList}
        allBooks={fullBooksList}
        filterValue={activeFilter}
        updateFilter={(filter: string) => setActiveFilter(filter)}
      />

      <BookList
        booksList={filteredList}
        reloadPage={() => setNewRender((prev)=>!prev)}
        updateBook={updateOperation}
        deleteMessage={showMessageDelete}
      />

      <Footer />
    </div>
  );
};

export default Dashboard;
