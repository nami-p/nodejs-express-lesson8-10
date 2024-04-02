import express from 'express';
import morgan from 'morgan';
import router  from "./Routes/book.route.js";
// import router as userRouter from "./Routes/user.route.js";
import cors from 'cors';
import {config} from 'dotenv';
import serverNotFound from './middle wares/errorsMW.js'
config()

const app = express();
import xxx from "./config/DB.js";
import userRouter from './Routes/user.router.js';
// mongoose.connect(config.DB_URL)
//   .then(() => console.log('mongo db connected'))
//   .catch(err => console.log(err));
xxx()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());

app.use('/books', router);
app.use('/users', userRouter);

// app.use(pageNotFound);
app.use(serverNotFound);


const port = 5000;
app.listen(port, () => {
  console.log(`running at https://localhost: ${ port}`);
});