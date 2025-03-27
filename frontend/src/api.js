import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const signup = (user) => API.post("/auth/signup", user);
export const loginApi = (user) => API.post("/auth/login", user);
export const profileDetails = (token) => API.get("/auth/profile", { headers: { Authorization: token } });
export const updateProfile = (token) => API.put("/auth/profile", { headers: { Authorization: token } });
export const getExpenses = (token) => API.get("/expenses", { headers: { Authorization: token } });
export const addExpense = (expense, token) => API.post("/add_expense", expense, { headers: { Authorization: token } });
export const expenseDetails = (id, token) => API.get(`/expenses/${id}`, { headers: { Authorization: token } });
export const updateExpense = (id, expense, token) => API.put(`/expenses/${id}`, expense, { headers: { Authorization: token } });
export const deleteExpense = (id, token) => API.delete(`/expenses/${id}`, { headers: { Authorization: token } });
export const getTotalExpenses = (token) => API.get("/expenses/total", { headers: { Authorization: token } });
