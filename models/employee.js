const mongoose= require("mongoose")

const employeeSchema= new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    department:{type:String,required:true,enum:["Tech","Marketing","Operations"]},
    salary:{type:Number,required:true}
},{
    versionKey:false
})
module.exports=mongoose.model("Employee",employeeSchema);