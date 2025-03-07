import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BookForm from "./components/BookForm";
import { useCallback, useEffect, useState } from "react";
import { Book } from "./components/types";
import { booksGET } from "./api-services/requests";

export type FormOperation = "create" | "update";
export type bookForUpdateType = Book | null;

function App() {
  const [formOperation, setFormOperation] = useState<FormOperation>("create");
  const [bookForUpdate, setBookForUpdate] = useState<bookForUpdateType>(null);
  const [booksList, setBooksList] = useState<Book[] | []>([]);

  useEffect(() => {
    const loadBooks = async () => {
      setBooksList(await booksGET(""));
    };

    loadBooks();
  }, []);

  const switchOperationToUpdate = useCallback((book: bookForUpdateType) => {
    setFormOperation("update");
    setBookForUpdate(book);
  }, []);

  const resetOperation = useCallback(() => {
    setFormOperation("create");
    setBookForUpdate(null);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              updateOperation={switchOperationToUpdate}
              fullBooksList={booksList}
            />
          }
        />
        <Route
          path="/form"
          element={
            <BookForm
              bookForUpdate={bookForUpdate}
              reset={resetOperation}
              operation={formOperation}
              fullBooksList={booksList}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
