const InputBookComment = ({ register, errors }) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-comment">
      Book Report
      </label>
      <textarea
        id="book-comment"
        placeholder="Write your Report about this book"
        {...register("comment", { required: "Write your Report about this book!" })}
      />
      {errors.comment && (
        <div className="error-msg">{errors.comment.message}</div>
      )}
    </>
  );
};

export default InputBookComment;
