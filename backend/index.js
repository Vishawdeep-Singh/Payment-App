const express = require("express");
const app =express();
const zod = require("zod");
const mongoose = require("mongoose");
const rootrouter = require("./routes/index");
const cors = require("cors")
const port =3000;

async function main1() {
    await mongoose.connect("mongodb+srv://vishawdeepsingh29:DxzYlg9wcjGuHKGh@cluster0.vovi9j4.mongodb.net/PayTM")
}
main1().then(() => {
    console.log("connected to DB");

}).catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use(cors())



app.use("/api/v1",rootrouter)



app.listen(3000,(req,res)=>{
    console.log("Server started")
});
