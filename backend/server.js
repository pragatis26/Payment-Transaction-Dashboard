const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = 3000;

const dataPath = path.join(__dirname, "data", "transactions.json");

// Get all transactions
app.get("/transactions", (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataPath));
    res.json(data);
});

// Dashboard analytics
app.get("/analytics", (req, res) => {

    const transactions = JSON.parse(fs.readFileSync(dataPath));

    const totalTransactions = transactions.length;

    const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

    const successCount = transactions.filter(t => t.status === "Success").length;

    const failedCount = transactions.filter(t => t.status === "Failed").length;

    const typeStats = {};

    transactions.forEach(t => {
        typeStats[t.type] = (typeStats[t.type] || 0) + 1;
    });

    const successRate = ((successCount / totalTransactions) * 100).toFixed(2);

    res.json({
        totalTransactions,
        totalAmount,
        successCount,
        failedCount,
        successRate,
        typeStats
    });

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});