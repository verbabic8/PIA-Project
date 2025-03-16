import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import loginRouter from './routers/login.router';
import adminRouter from './routers/admin.router';
import ownerRouter from './routers/owner.router';
import decoratorRouter from './routers/decorator.router';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/projekatDB")
mongoose.connection.once('open', () => {
    console.log("db connection ok")
})
const router = express.Router()

router.use('/login', loginRouter);
router.use('/admin', adminRouter);
router.use('/owner', ownerRouter);
router.use('/decorator', decoratorRouter);


app.use('/', router)

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(4000, () => console.log(`Express server running on port 4000`));