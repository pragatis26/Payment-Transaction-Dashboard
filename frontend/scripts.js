console.log("SCRIPT LOADED SUCCESSFULLY");
document.addEventListener("DOMContentLoaded", function () {

console.log("script loaded");

fetch("http://localhost:3000/analytics")
.then(res => res.json())
.then(data => {

document.getElementById("totalTransactions").innerText = data.totalTransactions;
document.getElementById("totalAmount").innerText = data.totalAmount;
document.getElementById("successCount").innerText = data.successCount;
document.getElementById("failedCount").innerText = data.failedCount;

const ctx = document.getElementById("typeChart").getContext("2d");

new Chart(ctx, {
type: "pie",
data: {
labels: Object.keys(data.typeStats),
datasets: [{
data: Object.values(data.typeStats),
backgroundColor: [
"#4CAF50",
"#2196F3",
"#FFC107",
"#F44336"
]
}]
}
});

});

});