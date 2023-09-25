const express = require("express")
const brycpt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Employee = require("../models/employee");
const router = express.Router()
const { AuthentiCateJWT } = require("../middleware/auth")

router.use(AuthentiCateJWT);

router.post("/create", async (req, res) => {
    try {

        const { firstName, lastName, email, department, salary } = req.body;

        const employee = new Employee({
            firstName, lastName, email, department, salary
        });

        await employee.save()

        res.status(201).send({ msg: "Employee Created SuccessFully" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: " Employee Creation Failed" })
    }
})


router.get("/get", async (req, res) => {
    try {
        const employee = await Employee.find()

        res.status(200).send(employee);

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: " Employee Fetchin Failed" })
    }
})

router.put("/update/:id", async (req, res) => {
    try {
        const { firstName, lastName, email, department, salary } = req.body;
        const employeeId = req.params.id;
        await Employee.findByIdAndUpdate(employeeId, {
            firstName, lastName, email, department, salary
        })

        res.status(201).send({ msg: "Employee Update SuccessFull" });


    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: " Employee Fetchin Failed" })
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;

        await Employee.findByIdAndDelete(employeeId);
        res.status(201).send({ msg: "Employee Deleted SuccessFull" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: " Employee Fetchin Failed" })
    }
})

router.get("/sort/salary/:Order", async (req, res) => {
    try {
        const { Order } = req.params;
        const sortedOrder = Order === "asc" ? 1 : Order === "desc" ? -1 : 1;
        const sortedEmployee = await Employee.find().sort({ salary: sortedOrder })

        res.status(201).send(sortedEmployee);

    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: " Employee Sort Failed" })
    }
})

router.get("/filter/:department", async (req, res) => {
    try {

        const { department } = req.params;
        const filterEmployee = await Employee.find({ department });
        res.status(200).send(filterEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: " Employee Filter Failed" })
    }
})


module.exports = router;