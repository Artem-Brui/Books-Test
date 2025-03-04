import { BookForHeading } from "./types";

export const headings: { [key in keyof BookForHeading]: string } = {
  title: "Book title",
  name: "Author Name",
  category: "Category",
  isbn: "ISBN",
  createdAt: "Created At",
  editedAt: "Edited At",
  actions: "Actions",
}
