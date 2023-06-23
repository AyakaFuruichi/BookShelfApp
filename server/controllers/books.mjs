import { validationResult } from "express-validator";
import { Book } from "../models/book.mjs";


export const getAllBooks = async function (req, res) {
  const books = await Book.find().sort({ updatedAt: -1 });
  res.json(books);
};

export const getBookById = async function (req, res) {
  const book = await Book.findById(req.params.id);

  if (book === null) return res.status(404).send("Book Not Found");

  res.json(book);
};
export const registerBook = async function (req, res) {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const err = errors.array();
    return res.status(400).json(errors.array()[0]);
  };

  const book = new Book(req.body);
  
  await book.save();
  
  res.status(201).json(book);
  
};

export const updateBook = async function (req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors.array());

  const _id = req.params.id;
  const newBook = await Book.findByIdAndUpdate(_id, req.body, { new: true });

  if (newBook === null) return res.status(404).send("Book Not Found");

  res.json(newBook);
};

export const deleteBook = async function (req, res) {
  const _id = req.params.id;
  const result = await Book.findByIdAndDelete(_id);

  if (result === null) return res.status(404).send("Book Not Found");

  res.json({ msg: "Delete succeeded." });
};

