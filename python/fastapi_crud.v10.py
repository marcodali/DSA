import fastapi

app = fastapi(__name__)

@route("/hello")
def contestame(req, res):
    return res.json({"hello", req.params.get("name")})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port="9090")