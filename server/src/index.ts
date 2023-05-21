// LIBRARY IMPORTS
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// INTERNAL IMPORTS
import salesRoutes from './routes/salesRoutes';
import clientRoutes from './routes/clientRoutes';
import generalRoutes from './routes/generalRoutes';
import managementRoutes from './routes/managementRoutes';

// DATA IMPORTS TO SEED USER DATA
// import User from './models/User';
// import { dataUser } from './data';

// DATA IMPORTS TO SEED PRODUCT DATA
// import Product from './models/Product';
// import ProductStat from './models/ProductStat';
// import { dataProduct, dataProductStat } from './data';

// DATA IMPORTS TO SEED TRANSACTION DATA
// import Transaction from './models/Transaction';
// import { dataTransaction } from './data';

// DATA IMPORTS TO SEED OVERALL STAT DATA
// import { dataOverallStat } from './data';
// import OverallStat from './models/OverallStat';

// DATA IMPORTS TO SEED AFFILIATE STAT DATA
// import { dataAffiliateStat } from './data';
// import AffiliateStat from './models/AffiliateStat';

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use('/sales', salesRoutes);
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);

// MONGOOSE SETUP
const PORT = process.env.SERVER_PORT || 9000;
mongoose
  .connect(process.env.MONGODB_URL!)
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* Seed data - Run only once when server is started for the first time */
    // const userCount = await User.find().count();
    // console.log('Users count', userCount);
    // if (!userCount) {
    //   User.insertMany(dataUser);
    // }

    /* PRODUCT DATA */
    // const productCount = await Product.find().count();
    // console.log('Products count', productCount);
    // if (!productCount) {
    //   Product.insertMany(dataProduct);
    // }

    // const productStatCount = await ProductStat.find().count();
    // console.log('Product stat count', productStatCount);
    // if (!productStatCount) {
    //   ProductStat.insertMany(dataProductStat);
    // }

    /* TRANSACTION DATA */
    // const transactionCount = await Transaction.find().count();
    // console.log('Transaction count', transactionCount);
    // if (!transactionCount) {
    //   Transaction.insertMany(dataTransaction);
    // }

    /* OVERALL STAT DATA */
    // const overallStatCount = await OverallStat.find().count();
    // console.log('OverallStat count', overallStatCount);
    // if (!overallStatCount) {
    //   OverallStat.insertMany(dataOverallStat);
    // }

    /* AFFILIATE STAT DATA */
    // const affiliateStatCount = await AffiliateStat.find().count();
    // console.log('AffiliateStat count', affiliateStatCount);
    // if (!affiliateStatCount) {
    //   AffiliateStat.insertMany(dataAffiliateStat);
    // }

    console.log('Connected to database');
  })
  .catch(error => {
    console.log('Connection Error: ', error);
  });
