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
document.getElementById("successRate").innerText = data.successRate + "%";

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

fetch("http://localhost:3000/transactions")
.then(res => res.json())
.then(data => {

const tableBody = document.querySelector("#transactionTable tbody");
const filter = document.getElementById("typeFilter");

function renderTable(type){

tableBody.innerHTML = "";

let filtered = data;

if(type !== "All"){
filtered = data.filter(t => t.type === type);
}

filtered.slice(0,20).forEach(t => {

const row = document.createElement("tr");

const risk = t.amount > 4000 ? "High Risk" : "Normal";

row.innerHTML = `
<td>${t.transaction_id}</td>
<td>${t.user_id}</td>
<td>${t.amount}</td>
<td>${t.type}</td>
<td>${t.status}</td>
<td>${t.timestamp}</td>
<td>${risk}</td>
`;

if(t.amount > 4000){
row.classList.add("high-risk");
}
tableBody.appendChild(row);

});

}

renderTable("All");

const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const userSearch = document.getElementById("userSearch");

searchBtn.addEventListener("click", () => {

const user = userSearch.value.trim();

tableBody.innerHTML = "";

const filtered = data.filter(t => t.user_id === user);

filtered.slice(0,20).forEach(t => {

const row = document.createElement("tr");

const risk = t.amount > 4000 ? "High Risk" : "Normal";

row.innerHTML = `
<td>${t.transaction_id}</td>
<td>${t.user_id}</td>
<td>${t.amount}</td>
<td>${t.type}</td>
<td>${t.status}</td>
<td>${t.timestamp}</td>
<td>${risk}</td>
`;

if(t.amount > 4000){
row.classList.add("high-risk");
}

tableBody.appendChild(row);

});

});

filter.addEventListener("change", () => {
renderTable(filter.value);
});

resetBtn.addEventListener("click", () => {

userSearch.value = "";
filter.value = "All";

renderTable("All");

});

});