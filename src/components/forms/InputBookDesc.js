const InputBookDesc = ({ register, errors }) => {
  return (
    <>
      <label className="sub-title" htmlFor="book-desc">
        Book Summary
      </label>
      <textarea
        id="book-desc"
        placeholder="Write a Summary of this book"
        {...register("description", {
          required: "Write a Summary of this book!!",
        })}
      />
      {errors.description && (
        <div className="error-msg">{errors.description.message}</div>
      )}
    </>
  );
};

export default InputBookDesc;
