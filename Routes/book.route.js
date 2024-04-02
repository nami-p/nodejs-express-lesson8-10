import  express from "express";
import { getBookById ,getAllBooks, addBook, updateBook,removeBook} from '../controller/book.controller.js';

const router = express.Router();
//get by id
router.get("/:id",getBookById)
//get all
router.get("/",getAllBooks)
//add new book
router.post("/",addBook)
//update a book
router.put("/:id",updateBook);
// delete a book
router.delete("/:id",removeBook);
export default router;
