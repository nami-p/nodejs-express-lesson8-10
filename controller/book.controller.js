//getBookById
import { Book as books } from '../models/book.model.js';
import * as mongoose from "mongoose";

export const getBookById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.send('id is not valid');
    else {
        try {
            const book = await books.findById(id).select("-__v");
            if (book)
                res.json(book);
            else
                res.send("book not found");
        }
        catch (err) {
            res.status(404).json({ error: 'book not found' });
        }
    }

}
//getAll
export const getAllBooks = async (req, res) => {
    const response = await books.find().select("-__v");
    res.json(response);
}
//addBook
export const addBook = async (req, res) => {
    try {
        const newBook = new books(req.body);
        await newBook.save();
        return res.status(201).json(newBook);
    }
    catch (err) {
        return res.send(err);
    }
    // let lastID = newUser[users.length - 1].id + 1;
    // if (isNaN(lastID))
    //     lastID = 1;

    // newBook.id = lastID;
    // books.push(newBook);
    // res.status(201).send(newUser);


}
//updateBook
export const updateBook = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.send('id is not valid');
    // if (id !== req.body.id) {
    //     return res.status(409).json({ error: 'body.id != parameter id' }); 
    // }
    try {
        const book = await books.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )
        return res.json(c);
    }
    catch (err) {
        return res.send(err.massage);
    }
    // const book = books.find(x => x.id == id);
    // if (book) {
    //     book.topics = req.body.topics || book.topics || null;
    //     book.Website = req.body.Website || book.Website;
    //     book.price = req.body.price || book.price;
    //     book.ISBN = req.body.ISBN || book.ISBN;
    //     book.bookLink = req.body.bookLink || book.bookLink;
    //     book.image = req.body.image || book.image;
    //     book.description = req.body.description || book.description;
    //     book.name = req.body.name || book.name;
    //     return res.send(book);
    // }

}
//removeBook
export const removeBook = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.send('id is not valid');
    try {
        await books.findByIdAndDelete(id)
        return res.status(204).send();
    }
    catch (err) {
        return res.send(err.massage);
    }
    // const i = books.findIndex(b => b.id == id);
    // // books = books.slice(0, i).concat(books.slice(-i));
    // articles.splice(i, 1);

    // res.send({ massage: "object deleted" });
}
