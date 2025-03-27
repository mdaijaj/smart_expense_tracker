

const express = require("express");

const { 
    addExpense,
    expenseList,
    expenseDetails,
    updateExpense,
    deleteExpense
} = require("../controller/expense_controller");
const { 
    signup, 
    login, 
    profielDetails, 
    updateProfile 
} = require("../controller/user_controller");
const verifyUser = require("../middleware/index");

const app = express.Router();


//user routes:-
app.post("/auth/signup", signup);
app.post("/auth/login", login);
app.get("/auth/profile", verifyUser, profielDetails);
app.put("/auth/profile/:id", verifyUser, updateProfile);


//expense routes:-
app.post("/add_expense", verifyUser, addExpense); 
app.get("/expenses", verifyUser, expenseList); 
app.get("/expenses/:id", verifyUser, expenseDetails);
app.put("/expenses/:id", verifyUser, updateExpense); 
app.delete("/expenses/:id", verifyUser, deleteExpense); 

module.exports = app;
