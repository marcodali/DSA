from flask import Flask

app = Flask(__name__)

@app.route("/despedida", methods=["POST", "DELETE"])
def chico(req, res):
    params = req.get_params.json()
    num1 = int(params.get("num1", 0))
    num2 = int(params.get("num2", 0))
    return res.jsonify({"respuesta": num1+num2})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9797)