from flask import Flask, abort, request, jsonify
from typing import Dict, Union, List, Any

posible_inmemory_values = Union[str, bool, int, float, List[Any], Dict[str, Any]]

inmemory_db: Dict[str, posible_inmemory_values] = {}

upa = Flask(__name__)

@upa.route("/teams/<string:team_name>", methods=["GET"])
def read(team_name: str):
    if team_name in inmemory_db:
        record = inmemory_db[team_name]
        properties = request.args.get("properties", default="", type=str)
        if len(properties) > 0:
            properties = properties.split(",")
            team_with_filtered_properties = {prop: record[prop] for prop in properties if prop in record}
            return jsonify(team_with_filtered_properties)
        return jsonify(record)
    return abort(404, description="team name {} not found".format(team_name))

if __name__ == "__main__":
    pachuca = {
        "seguidores": 250000,
        "promedio_edad": 23.75,
        "colores": ["azul", "blanco"],
        "en_primera_division": True,
        "slug": "Tuzos",
        "metadata": {
            "coach": "Almada"
        }
    }
    inmemory_db["pachuca"] = pachuca
    upa.run(host="0.0.0.0", port=7070, debug=True)