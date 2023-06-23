const InputBookTitle = ({ register, errors }) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-title">
        Book Title
      </label>
      <input
        type="text"
        id="book-title"
        placeholder="Write a book title"
        {...register("title", {
          required: "Write a book title!!!",
          maxLength: { value:40, message: `Only under 40 words is allowed` },
        })}
      />
      {errors.title && <div className="error-msg">{errors.title.message}</div>}
    </>
  );
};

export default InputBookTitle;
