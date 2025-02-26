import flask

database = {}

@route("/teams/:name")
@methods(["GET"])
def leer(req, res):
    name = req.url_params["name"]
    if name in database:
        return res.status(200).json(database[name])
    return res.status(400).json({"msg": "user {} not found".format(name)})

if __name__ == "__main__":
    flask.listen("8080").start("servidor escuchando en el puerto 8080")