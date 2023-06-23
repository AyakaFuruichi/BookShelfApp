import { useBooks } from "../contexts/BookContext";

import Card from "../components/Card";

const Books = () => {
  const books = useBooks();

  return (
    <>
      <h2 className="page-title">Your Book List</h2>
      <div className="cards">
        {books.map((book) => (
          <Card key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Books;
