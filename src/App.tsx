import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import BookForm from "./components/BookForm";
import { useCallback, useEffect, useRef, useState } from "react";
import { Book } from "./components/types";
import { booksGET, categoriesGET } from "./api-services/requests";

export type FormOperation = "create" | "update";
export type bookForUpdateType = Book | null;

function App() {
  const [formOperation, setFormOperation] = useState<FormOperation>("create");
  const [bookForUpdate, setBookForUpdate] = useState<bookForUpdateType>(null);

  const booksFullList = useRef([]);
  const categoriesList = useRef([]);

  useEffect(() => {
      const loadBooks = async () => {
        booksFullList.current = await booksGET("");
        categoriesList.current = await categoriesGET();
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
          element={<Dashboard updateOperation={switchOperationToUpdate} fullBooksList={booksFullList.current} />}
        />
        <Route
          path="/form"
          element={
            <BookForm
              bookForUpdate={bookForUpdate}
              reset={resetOperation}
              operation={formOperation}
              fullBooksList={booksFullList.current}
              categories={categoriesList.current}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
