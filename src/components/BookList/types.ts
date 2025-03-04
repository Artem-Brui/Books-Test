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

export type BookForHeading = Omit<Book, 'id' | 'isActive'>;
