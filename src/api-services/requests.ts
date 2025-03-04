export const booksGET = async (params: string) => {
  try {
    const response = await fetch(`http://localhost:3000/books?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const bookUpdate = async (id: string, body: object) => {
  try {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(error);
  }
};
