from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/suma/<int:init_value>", methods=["PUT", "PATCH"])
def sumando_con_json(init_value: int):
    body_params = request.get_json()    # application/json
    final_multiplier = request.args.get("final_multiplier", type=int, default=1)
    if "secret" in body_params:
        return jsonify({"msg": "no secrets allowed"}), 402
    total = init_value + sum(value for value in body_params.values())
    return jsonify({"total": total * final_multiplier}), 201

@app.route("/suma/<int:init_value>", methods=["POST"])
def sumando_con_form(init_value: int):
    body_params = request.form          # application/x-www-form-urlencoded
    final_multiplier = request.args.get("final_multiplier", type=int, default=1)
    if "secret" in body_params:
        return jsonify({"msg": "no secrets allowed"}), 402
    total = init_value + sum(int(value) for value in body_params.values())
    return jsonify({"total": total * final_multiplier}), 202

#How to run?
#import app from flask_crud
#app.run(host="0.0.0.0", port=9090)