import { useEffect, useState } from "react";
import BookList from "../BookList/BookList";
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
      setFullList(await booksGET(""));
    };

    loadBooks();
  }, [filterParams, newRender]);

  const handleFilterSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setActiveFilter(event.target.value);
  };

  const handleNewRender = () => setNewRender((prev) => !prev);

  return (
    <div className="mt-6 mb-6">
      <header className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
        <button className="button is-success is-align-self-flex-end mb-4">Add New Book</button>

        <h1 className="is-size-1 is-size-3-mobile has-text-weight-bold has-text-text-25 pb-4">
          Dashboard
        </h1>

        <div className="is-flex is-align-items-center mb-4">
          <div className="select is-success">
            <select defaultValue={activeFilter} onChange={handleFilterSelect}>
              <option value="active">Show Active</option>
              <option value="deactivated">Show Deactivated</option>
              <option value="all">Show All</option>
            </select>
          </div>
          <p className="ml-2 has-text-weight-bold">
            {filteredList.length} / {fullList.length}
          </p>
        </div>
      </header>

      <BookList booksList={filteredList} reloadPage={handleNewRender} />
    </div>
  );
};

export default Dashboard;
