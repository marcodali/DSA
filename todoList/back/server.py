from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tasks = {}
stats = { "lastId": 0 }

@app.route("/tasks", methods=["GET"])
def handlerGet():
    return jsonify([value for key, value in tasks.items()]), 200

@app.route("/tasks", methods=["POST"])
def handlerPost():
    stats["lastId"] += 1
    data = request.get_json()
    new_task = {
        "id": stats["lastId"],
        "description": data.get("description")
    }
    tasks[stats["lastId"]] = new_task
    return jsonify(new_task), 201

if __name__ == '__main__':
    app.run(port="3030", host="localhost")
