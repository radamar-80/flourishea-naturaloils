const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/products", (req,res)=>{

const product = req.body;

const products = JSON.parse(
fs.readFileSync("products.json")
);

products.push(product);

fs.writeFileSync(
"products.json",
JSON.stringify(products,null,2)
);

res.json({
success:true
});

});

app.get("/products",(req,res)=>{

const products = JSON.parse(
fs.readFileSync("products.json")
);

res.json(products);

});

app.post("/orders",(req,res)=>{

const order = req.body;

const orders = JSON.parse(
fs.readFileSync("orders.json")
);

orders.push(order);

fs.writeFileSync(
"orders.json",
JSON.stringify(orders,null,2)
);

res.json({
success:true
});

});

app.get("/orders",(req,res)=>{

const orders = JSON.parse(
fs.readFileSync("orders.json")
);

res.json(orders);

});

const axios = require("axios");

app.post(
"/initialize-payment",
async (req,res)=>{

try{

const response =
await axios.post(

"https://api.paystack.co/transaction/initialize",

{
email:req.body.email,
amount:req.body.amount * 100
},

{
headers:{
Authorization:
`Bearer ${process.env.PAYSTACK_SECRET_KEY}`
}
}

);

res.json(
response.data
);

}catch(err){

res.status(500).json(err);

}

});

app.listen(3000, () => {
  console.log("Server running");
});