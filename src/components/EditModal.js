import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatchBooks } from '../contexts/BookContext';
import bookApi from '../api/book';
import Button from '../components/Button';
import { InputBookTitle, InputBookDesc, InputBookComment, InputBookRating } from '../components/forms';

const EditModal = ({ book, setBook, toggleEditModal }) => {
  const dispatch = useDispatchBooks();

  const [editedBook, setEditedBook] = useState({ ...book });

  const clickCancel = () => toggleEditModal();

  const handleChangeRating = (rate) => setEditedBook({ ...editedBook, rating: rate });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    criteriaMode: 'firstError', 
    mode: 'onSubmit',
    reValidateMode: 'onSubmit', 
    defaultValues: {
      title: editedBook.title,
      description: editedBook.description,
      comment: editedBook.comment,
    },
  });

  const [error, setError] = useState('');
  const onSubmit = (inputs) => {
    const formedBook = {
      _id: editedBook._id,
      rating: editedBook.rating,
      title: inputs.title,
      description: inputs.description,
      comment: inputs.comment,
    };

    bookApi
      .patch(formedBook)
      .then((_editedBook) => {
        dispatch({ type: 'book/update', book: _editedBook });
        reset();
        setBook(_editedBook);
        toggleEditModal();
      })
      .catch((e) => {
        console.log('error occured!', e);
        setError(e);
      });
  };

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="page-title">
        <span>Edit </span>"{editedBook.title}"
        </h3>

        <InputBookTitle register={register} errors={errors} />
        <InputBookDesc register={register} errors={errors} />
        <InputBookComment register={register} errors={errors} />
        <InputBookRating rating={editedBook.rating} onChange={handleChangeRating} />

        <div className="error-msg text-center">{error}</div>

        <div className="footer">
          <Button className="gray mr-16" onClick={clickCancel}>
            Cancel
          </Button>
          <Button className="blue">Edit</Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
