from flask import Flask, jsonify, request, abort
from types import Dict, any  #typing

inmemory_db = Dict[str, Dict[str, str]] #: Dict[str, Dict[str, any]] = {}

upa = Flask(__name__)

@upa.router("/teams/<string:name>", methods=["GET"])    #upa.route()
def leer(name: string): #str
    properties = request.args.get("properties", default="", type=str)
    if len(properties) > 0 and "," in properties:
        properties = properties.split(",")
        print("the response should only include these properties:", properties)
    if name in inmemory_db:
        return jsonify(inmemory_db[name]), 200
    return jsonify({"msg": "team {} not found".format(name)}), 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)  #upa
    pachuca = {"slug": "Tuzos", "state":"Hidalgo", "colors":"blanco y azul"}    #"colors":["blanco", "azul marino"]
    #inmemory_db["pachuca"] = pachuca