import express from "express";
import connect from "./connect";
import cors from "cors";
import RouterCategories from "./router/category"
import RouterProduct from "./router/product"
import RouterUsers from "./router/user"
import RouterCart from "./router/cart"
import RouterComments from "./router/comments"
import RouterCheckout from "./router/checkout"
import RouterBill from './router/bill'
import RouterRecyclebin from './router/recyclebin'

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// router

app.use('/api', RouterCategories)
app.use('/api', RouterProduct)
app.use('/api', RouterUsers)
app.use('/api', RouterCart)
app.use('/api', RouterComments)
app.use('/api', RouterCheckout)
app.use('/api', RouterBill)
app.use('/api', RouterRecyclebin)

connect.connect((err) => {
    if (err) {
        console.log('That bai !');
    }
    console.log('Thanh cong');
})



export const viteNodeApp = app;