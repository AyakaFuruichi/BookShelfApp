import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { COLORS } from "../utils/config";
import bookApi from "../api/book";

import Button from "../components/Button";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ModalPortal = ({ children }) => {
  const target = document.querySelector(".container");
  return createPortal(children, target);
};

const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    bookApi.get(id).then((_book) => {
      setBook(_book);
    }).catch((e) => {
      console.log('error occured!', e);
      setError('URL is not valid');
    });
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const navigate = useNavigate();
  const goToBooksPage = () => navigate("/");

  return (
    <>
      <div className="detail">
        <h3 className="book-title">{book.title}</h3>
        <div className="error-msg text-center">{error}</div>

        <div className="sub-title">Book Summary</div>
        <p className="text">{book.description}</p>

        <div className="sub-title">Book Report</div>
        <p className="text">{book.comment}</p>

        <div className="sub-title">Book Review</div>
        <div className="detail__stars">
          {
            <Rating
              emptySymbol={
                <FontAwesomeIcon icon={faStar} color={COLORS.star.empty} />
              }
              fullSymbol={
                <FontAwesomeIcon icon={faStar} color={COLORS.star.full} />
              }
              fractions={2} 
              initialRating={book.rating}
              readonly={true}
            />
          }
        </div>

        <div className="footer">
          <Button className="blue mr-16" onClick={toggleEditModal}>
            Edit
          </Button>
          <Button className="red" onClick={toggleDeleteModal}>
            Delete
          </Button>
        </div>
      </div>
      
      {isEditModalOpen && (
        <ModalPortal>
          <EditModal
            book={book}
            setBook={setBook}
            toggleEditModal={toggleEditModal}
          />
        </ModalPortal>
      )}

      {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteModal book={book} toggleDeleteModal={toggleDeleteModal} />
        </ModalPortal>
      )}

      <div className="detail__btnToBooks">
        <Button className="gray" onClick={goToBooksPage}>
          Back to List
        </Button>
      </div>
    </>
  );
};

export default Book;
