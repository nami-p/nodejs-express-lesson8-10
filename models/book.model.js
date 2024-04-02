import mongoose, { model, Schema } from 'mongoose';

const bookSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    description: {
        type: String,
        maxlength: 50,
    },
    image: {
        type: String,
    },
    bookLink: {
        type: String,
    },
    ISBN: {
        type: String,
        enum: ['sergr2', 'gbaw4tb4', 'bshdhtby56']
    },
    price: {
        type: Number,
    },
    topics: [String],
    pageNumber: {type :Number,min:1},
    publishedDate: { type: Date, default: new Date() },
    isLend: Boolean
});


const Book = model('books', bookSchema);
//הוספה
const InsertBook = async (name, description, image, bookLink, ISBN, price, Website, topics) => {
    const newBook = new Book({ name, description, image, bookLink, ISBN, price, Website, topics });
    await newBook.save();
    return newBook;
};
//מחיקה
const RemoveBook = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id))
        console.log(await Book.findByIdAndDelete(id));
    else
        console.log('error: not valid');
}
//עדכון
const UpdateBook = async (id, book1) => {
    try {
        const b = await Book.findById(id);
        if (!b)
            throw new Error('id does not exists')
        if (book1.name)
            Book.name = book1.name;
        if (book1.image)
            Book.image = book1.image;
        if (book1.description)
            Book.description = book1.description;
        if (book1.bookLink)
            Book.bookLink = book1.bookLink;
        if (book1.ISBN)
            Book.ISBN = book1.ISBN;
        if (book1.price)
            Book.price = book1.price;
        if (book1.topics)
            Book.topics = book1.topics;
        if (book1.pageNumber)
            Book.pageNumber = book1.pageNumber;
        if (book1.publishedDate)
            Book.publishedDate = book1.publishedDate;
        if (book1.isLend)
            Book.isLend = book1.isLend;
    }
    catch (err) {
        console.log(err);
    }
}
//קבלת ערך לפי מפתח
const FindById = async (id) => {
    if (mongoose.Types.ObjectId.isValid(id))
        console.log(await Book.findById(id));
    else
        console.log('error: not valid');
}
//קבלת כל הרשימה 
const GetAll = async () => {
    console.log(await Book.find({}).sort({ pageNumber: 1 }));
}
//a חיפוש כל הספרים ששמם מתחיל ב 
const FindAllStartWithA= async ()=>{
    console.log(await Book.find({name:'/^a'}));
}
export  { Book, InsertBook, RemoveBook, UpdateBook, FindById,GetAll,FindAllStartWithA };