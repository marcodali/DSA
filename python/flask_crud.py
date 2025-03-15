from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/suma", methods=["PUT", "PATCH"])
def sumando():
    params = request.get_json()
    if "secret" in params:
        return jsonify({"msg": "no secrets allowed"}), 402
    total = sum(value for value in params.values())
    return jsonify({"total": total}), 201