const express= require("express")
const app = express()
require("dotenv").config()
const port= process.env.port || 1000;
const connection= require("./Config/db");
const userRoutes= require("./routes/userRoutes")
const employeeRoutes= require("./routes/employeeRoutes")
const cors= require("cors")

app.use(cors())
app.use(express.json())
app.use("/api",userRoutes);
app.use("/api",employeeRoutes);
app.get("/",(req,res)=>{
    try {
        res.send({msg:"HomePage"})
    } catch (error) {
        console.log(error)
        res.send({err:error})
    }
})


app.listen(port,async()=>{
console.log(`App is running on Port ${port}`)
    try {
    await connection
    console.log("DB COnnected")
} catch (error) {
    console.log("DB COnnection Failed")
}
})


