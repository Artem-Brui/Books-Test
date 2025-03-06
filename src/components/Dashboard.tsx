import { FC, useEffect, useState } from "react";
import BookList from "./BookList";
import { Book } from "./types";
import { booksGET } from "../api-services/requests";
import Header from "./Header";

type DashboardProps = {
  updateOperation: (book: Book) => void;
  fullBooksList: Book[];
}

const Dashboard: FC<DashboardProps> = ({ updateOperation, fullBooksList }) => {
  const [activeFilter, setActiveFilter] = useState("active");
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
    };

    loadBooks();
  }, [filterParams, newRender]);

  const handleNewRender = () => setNewRender((prev) => !prev);
  const handleSelectFilter = (filter: string) => setActiveFilter(filter);

  return (
    <div className="mt-6 mb-6">
      <Header
        dbList={filteredList}
        allBooks={fullBooksList}
        filterValue={activeFilter}
        updateFilter={handleSelectFilter}
      />

      <BookList booksList={filteredList} reloadPage={handleNewRender} updateBook={updateOperation} />
    </div>
  );
};

export default Dashboard;
