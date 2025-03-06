export const booksGET = async (params?: string) => {
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

export const bookAdd = async (body: object) => {
  try {
    const response = await fetch(`http://localhost:3000/books`, {
      method: "POST",
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

export const bookDelete = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const categoriesGET = async () => {
  try {
    const response = await fetch(`http://localhost:3000/categories?`, {
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
