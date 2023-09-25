const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User");

const jwt_secret_key = process.env.jwt_secret_key || "Masai";

const AuthentiCateJWT = async (req, res, next) => {

    const token = req.header("Authorization")

    if (!token) return res.status(401).send({ msg: "TOken Invalid" })

    jwt.verify(token, jwt_secret_key, async (err, decodedToken) => {
        if (err) return res.status(401).send({ msg: "ForBidden" })

        try {
            const user = await User.findById(decodedToken.userId)
            if (!user) {
                return res.status(404).send({ msg: "User Not found" });
            }

            req.user = user;
            next()

        } catch (error) {
            console.log(error)
            res.status(401).send({ msg: "Internal Server Error" })
        }
    })
}

module.exports={AuthentiCateJWT}