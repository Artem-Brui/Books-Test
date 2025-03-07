export interface Book {
  id: string;
  title: string;
  name: string;
  category: string;
  isbn: string;
  createdAt: string;
  editedAt: string;
  isActive: boolean;
  actions?: HTMLButtonElement | string | undefined;
}

export interface Category {
  id: string;
  name: string;
}

export type updatedBook = Omit<Book, 'id' | 'isActive' | 'createdAt'>

export type BookForHeading = Omit<Book, 'id' | 'isActive'>;
