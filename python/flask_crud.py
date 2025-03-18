from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/suma/<int:init_value>", methods=["POST", "PATCH"])
def sumando_con_json_y_form(init_value: int = 0):
    body_params = request.get_json() if request.is_json else request.form
    final_multiplier = request.args.get("final_multiplier", type=int, default=1)
    if "secret" in body_params:
        return jsonify({"msg": "no secrets allowed"}), 402
    total = init_value + sum(int(value) for value in body_params.values())
    return jsonify({"total": total * final_multiplier}), 201

@app.route("/suma", methods=["PUT"])
def sumando_con_text_plain():
    body_params = request.get_data(as_text=True).strip()
    return "Mi suma me da %d" % sum(int(value) for value in body_params.split(',')), 202

#How to run?
#from flask_crud import app
#app.run(host="0.0.0.0", port=9090)