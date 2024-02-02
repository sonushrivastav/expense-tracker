const express = require("express")
const app = express();
const PORT = 8080;
const cors = require("cors")

app.use(cors())
app.use(express.json());

app.get("/api/", (req, res) => {
    res.json({msg:"hllo wrld"})
})

const transactionHistory = [];
app.post("/api/transaction", (req, res) => {
    if(!req.body) return res.json("Data Not Prvided")

    let {description,amount,date,categoryType,categoryColor} = req.body
    let data = {
        description,
        amount,
        date,
        categoryType,
        categoryColor,
    }
    transactionHistory.push(data);
    res.json({msg:"success", data:data})
})

app.get("/api/transaction/history", (req, res) => {
    res.json({ msg: "success", data: transactionHistory });
});


app.listen(PORT,()=> console.log(`server started on port ${PORT}`))