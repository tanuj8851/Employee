const mongoose= require("mongoose")

const connection = mongoose.connect(process.env.dbLink)

module.exports=connection;