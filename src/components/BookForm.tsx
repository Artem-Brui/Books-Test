import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageHeading from "./PageHeading";
import {
  faBookOpen,
  faCheck,
  faExclamationTriangle,
  faHashtag,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import {
  bookAdd,
  bookUpdate,
} from "../api-services/requests";
import { Book, updatedBook } from "./types";
import { FormOperation } from "../App";
import NavigateButton from "./NavigateButton";

type FormProps = {
  operation: FormOperation;
  bookForUpdate?: Book | null;
  reset: () => void;
  fullBooksList: Book[];
  categories: string[];
};

type CheckerType = {
  title: boolean;
  author: boolean;
  category: boolean;
  isbn: boolean;
};

const BookForm: FC<FormProps> = React.memo(
  ({ operation, bookForUpdate, reset, fullBooksList, categories }) => {
    const navigate = useNavigate();

    const isOperationUpdate = operation === "update";

    const [isAbleToSubmit, setIsAbleToSubmit] = useState(false);

    const [title, setTitle] = useState(bookForUpdate?.title || "");
    const [author, setAuthor] = useState(bookForUpdate?.name || "");
    const [category, setCategory] = useState(bookForUpdate?.category || "");
    const [isbn, setISBN] = useState(bookForUpdate?.isbn || "");

    const [isSuccess, setIsSuccess] = useState<CheckerType>({
      title: isOperationUpdate,
      author: isOperationUpdate,
      category: isOperationUpdate,
      isbn: isOperationUpdate,
    });

    const [isError, setIsError] = useState<CheckerType>({
      title: false,
      author: false,
      category: false,
      isbn: false,
    });

    const isFilledSuccessful = useRef(isAbleToSubmit);

    useEffect(() => {
      const submitForm = async () => {
        if (!isOperationUpdate) {
          await bookAdd(requestBodyBuilder(operation));
        } else if (bookForUpdate) {
          await bookUpdate(bookForUpdate.id, requestBodyBuilder(operation));
        }
        reset();
        navigate("/");
      };
      
      if (isFilledSuccessful.current) {
        submitForm();
      }
    }, [isAbleToSubmit]);

    const requestBodyBuilder = useCallback(
      (opreation: "create" | "update"): Book | updatedBook => {
        let newID = 0;

        if (fullBooksList) {
          newID = Number(fullBooksList[fullBooksList.length - 1].id) + 1;
        }

        const currentDate = new Date()
          .toLocaleString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
          .split(" at ")
          .join(", ");

        const hour12New = new Date()
          .toLocaleString("en-GB", { hour12: true })
          .split(" ")[2]
          .toUpperCase();

        const dateResult = currentDate + hour12New;

        return opreation === "create"
          ? {
              id: String(newID),
              title: title,
              name: author,
              category: category,
              isbn: isbn,
              createdAt: dateResult,
              editedAt: "-",
              isActive: true,
            }
          : {
              title: title,
              name: author,
              category: category,
              isbn: isbn,
              editedAt: dateResult,
            };
      },
      [title, author, isbn, category, fullBooksList]
    );

    const validateInput = useCallback(
      (
        input: string,
        inputType: "title" | "author" | "isbn" | "category"
      ): boolean => {
        let regexPattern;
        const isCategotyType = inputType === "category";

        switch (inputType) {
          case "title":
            regexPattern = /^[A-Za-z0-9 .,'-:;"]+$/;
            break;
          case "isbn":
            regexPattern = /^\d{3}-\d{10}$/;
            break;
          default:
            regexPattern = /^[A-Za-z .'-]+$/;
            break;
        }

        const isNotEmpty = input.trim().length !== 0;
        const isPatternOk = regexPattern.test(input);

        if (isCategotyType) {
          const isCategoryExist = categories.some((cat) => cat === input);

          if (!isCategoryExist) {
            setIsError(prevError => ({ ...prevError, category: true }));
          } else {
            setIsSuccess(prevSuccess => ({ ...prevSuccess, category: true }));
          }

          return isNotEmpty && isPatternOk && isCategoryExist;
        }

        return isNotEmpty && isPatternOk;
      },
      [categories]
    );

    const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const newTitle = event.target.value;

          const isTitleSuccess = validateInput(newTitle, "title");

          setIsError(prevError => ({ ...prevError, title: !isTitleSuccess }));
          setIsSuccess(prevSuccess => ({ ...prevSuccess, title: isTitleSuccess }));
          setTitle(newTitle);
        },
        [validateInput]
      );

    const handleAuthorChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const newAuthor = event.target.value;

          const isAuthorSuccess = validateInput(newAuthor, "author");

          setIsError(prevError => ({ ...prevError, author: !isAuthorSuccess }));
          setIsSuccess(prevSuccess => ({ ...prevSuccess, author: isAuthorSuccess }));
          setAuthor(newAuthor);
        },
        [validateInput]
      );

    const handleISBNChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const newISBN = event.target.value;

          const isISBNSuccess = validateInput(newISBN, "isbn");

          setIsError(prevError => ({ ...prevError, isbn: !isISBNSuccess }));
          setIsSuccess(prevSuccess => ({ ...prevSuccess, isbn: isISBNSuccess }));
          setISBN(newISBN);
        },
        [validateInput]
      );

    const handleCategoryChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
          const newCategory = event.target.value;

          const isCategorySuccess = validateInput(newCategory, "category");

          setIsError(prevError => ({ ...prevError, category: !isCategorySuccess }));
          setIsSuccess(prevSuccess => ({ ...prevSuccess, category: isCategorySuccess }));
          setCategory(newCategory);
        },
        [validateInput]
      );

    const handleSubmit = async () => {
      const isFilledRight = Object.keys(isSuccess).every(
        (key) => isSuccess[key as keyof CheckerType] === true
      );

      setIsError({
        title: !isSuccess.title,
        author: !isSuccess.author,
        category: !isSuccess.category,
        isbn: !isSuccess.isbn,
      });

      isFilledSuccessful.current = isFilledRight;
      setIsAbleToSubmit(!isAbleToSubmit)
    };

    console.log('RENDER');
    

    return (
      <div
        className="is-flex
      is-flex-direction-column
      mt-6
      form-container
      "
      >
        <NavigateButton buttonText="Dashboard" direction="/" reset={reset} />
        <PageHeading
          addClasses="is-align-self-center"
          heading={isOperationUpdate ? "Edit Book" : "Add Book"}
        />

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames(
                "input",
                { "is-warning": isError.title },
                { "is-success": isSuccess.title }
              )}
              type="text"
              name="title"
              value={title}
              placeholder="Book Title"
              onChange={handleTitleChange}
            />

            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faBookOpen} />
            </span>
            {isSuccess.title && (
              <span className="icon is-small is-right has-text-success">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
            {isError.title && (
              <span className="icon is-small is-right has-text-danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
            )}
          </div>

          <p
            className={classNames("help", "is-danger", {
              "not-visible": !isError.title,
            })}
          >
            Please, add BOOK TITLE (A-Z, a-z, 0-9, ., '-:;")
          </p>
        </div>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames(
                "input",
                { "is-warning": isError.author },
                { "is-success": isSuccess.author }
              )}
              type="text"
              name="author"
              value={author}
              placeholder="Author Name"
              onChange={handleAuthorChange}
            />

            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faUser} />
            </span>

            {isSuccess.author && (
              <span className="icon is-small is-right has-text-success">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}
            {isError.author && (
              <span className="icon is-small is-right has-text-danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
            )}
          </div>
          <p
            className={classNames("help", "is-danger", {
              "not-visible": !isError.author,
            })}
          >
            Please add AUTHOR NAME (A-Z, a-z, . '-)
          </p>
        </div>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames(
                "input",
                { "is-warning": isError.category },
                { "is-success": isSuccess.category }
              )}
              list="autocomplete-suggestions"
              id="autocomplete"
              name="autocomplete"
              value={category}
              placeholder="Category"
              onChange={handleCategoryChange}
            />

            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faList} />
            </span>

            {isSuccess.category && (
              <span className="icon is-small is-right has-text-success">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}

            {isError.category && (
              <span className="icon is-small is-right has-text-danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
            )}

            <datalist id="autocomplete-suggestions">
              {categories.map((cat) => {
                return <option key={cat} value={cat} />;
              })}
            </datalist>
          </div>
          <p
            className={classNames("help", "is-danger", {
              "not-visible": !isError.category,
            })}
          >
            Please select a CATEGORY from dropdown
          </p>
        </div>

        <div className="field">
          <div className="control has-icons-left has-icons-right">
            <input
              className={classNames(
                "input",
                { "is-warning": isError.isbn },
                { "is-success": isSuccess.isbn }
              )}
              type="text"
              value={isbn}
              name="isbn"
              placeholder="ISBN"
              onChange={handleISBNChange}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faHashtag} />
            </span>

            {isSuccess.isbn && (
              <span className="icon is-small is-right has-text-success">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            )}

            {isError.isbn && (
              <span className="icon is-small is-right has-text-danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
            )}
          </div>
          <p
            className={classNames("help", "is-danger", {
              "not-visible": !isError.isbn,
            })}
          >
            Please add ISBN number (XXX-AAABBBCCCD)
          </p>
        </div>

        <div className="field is-grouped is-align-self-center">
          <div className="control">
            <button className="button is-link" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default BookForm;
