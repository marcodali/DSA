from flask import Flask, request, jsonify
import time
import math

app = Flask(__name__)

def generatePrimesUpTo(num: int) -> None:
    sieve = [True] * (num+1)
    for i in range(2, int(math.sqrt(num))+1):
        if sieve[i]:
            for j in range(i*i, num+1, i):
                sieve[j] = False

@app.route("/bat", methods=["GET"])
def handler():
    goal = request.args.get("goal", 0)
    init_time = time.time()
    generatePrimesUpTo(int(goal))
    end_time = time.time()
    return jsonify({"time": end_time - init_time, "job": "done"}), 200

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)

