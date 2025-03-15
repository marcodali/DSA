from fastapi import FastAPI

app = FastAPI()

@app.get("/saludo")
def contestame(nombre: str = "Chucho"):
    return {"name": nombre}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9090)