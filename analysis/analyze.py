import json
import random
from datetime import datetime, timedelta
import os

transactions = []

users = ["U101","U102","U103","U104","U105","U106","U107","U108"]
types = ["UPI","Card","NEFT","IMPS"]
statuses = ["Success","Failed"]

start_date = datetime(2025,1,1)

for i in range(1000):

    transaction = {
        "transaction_id": f"T{i+1}",
        "user_id": random.choice(users),
        "amount": round(random.uniform(50, 5000),2),
        "type": random.choice(types),
        "status": random.choices(statuses, weights=[90,10])[0],
        "timestamp": str(start_date + timedelta(minutes=random.randint(0,500000)))
    }

    transactions.append(transaction)

path = os.path.join(os.path.dirname(__file__), "..", "backend", "data", "transactions.json")

with open(path, "w") as f:
    json.dump(transactions, f, indent=4)

print("Transaction data generated successfully")