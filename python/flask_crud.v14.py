from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/suma", methods=["PUT", "DELETE"])
def sumando():
    params = request.get_json()
    if "secret" in params:
        return jsonify({"msg": "no secrets allowed"}), 402
    total = sum(value for value in params.values())
    return jsonify({"total": total}), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8787)