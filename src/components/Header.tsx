import { FC } from "react";
import { Book } from "./types";
import PageHeading from "./PageHeading";
import NavigateButton from "./NavigateButton";

type HeaderProps = {
  dbList: Book[];
  allBooks: Book[];
  filterValue: string;
  updateFilter: (filter: string) => void;
};

const Header: FC<HeaderProps> = ({
  dbList,
  allBooks,
  filterValue,
  updateFilter,
}) => {
  const handleFilterSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    updateFilter(event.target.value)
  };

  return (
    <header
      className="is-flex
          is-flex-direction-column
          is-align-items-center
          is-justify-content-center
          p-2"
    >
      <NavigateButton buttonText="Add New Book" direction="/form" />

      <PageHeading heading="Dashboard" />

      <div
        className="is-flex 
      is-align-items-center 
      mb-4"
      >
        <div className="select is-success">
          <select defaultValue={filterValue} onChange={handleFilterSelect}>
            <option value="active">Show Active</option>
            <option value="deactivated">Show Deactivated</option>
            <option value="all">Show All</option>
          </select>
        </div>
        <p className="ml-2 has-text-weight-bold">
          {dbList.length} / {allBooks.length}
        </p>
      </div>
    </header>
  );
};

export default Header;
