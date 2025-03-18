from fastapi import FastAPI, Form, Query, Body, Response, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional

class Doctor(BaseModel):
    speciality: str
    success_rate: float

app = FastAPI()

@app.put("/intro1/{genre}/{has_disability}")
def contestona1(
    genre: str,
    has_disability: bool,
    json_properties: Optional[Doctor] = Body(None),
    school: str = Query(..., examples=["ESCOM", "UCLA"], description="Tu Alma Mater", alias="escuela", max_length=5),
    origin: str = Query("Hawaii"),
):
    if school == "MIT":
        return Response(
            content="En Mississipi hacen un buen bagre?",
            media_type="text/plain",
            status_code=status.HTTP_409_CONFLICT
        )
    return JSONResponse(
        content={
            "género": genre,
            "estas discapacitado?": ["nel perro", "a wi wi"][has_disability],
            "especialidad": json_properties.speciality,
            "tasa de éxito": json_properties.success_rate,
            "universidad": school,
            "pais de origen": origin,
        },
        status_code=status.HTTP_208_ALREADY_REPORTED,
    )

@app.put("/intro2/{genre}/{has_disability}")
def contestona2(
    genre: str,
    has_disability: bool,
    speciality: Optional[str] = Form("Veterinaria", examples=["Oftalmología", "Obstetricia"], alias="especialidad"),
    success_rate: Optional[float] = Form(75.92, description="pacientes curados vs pacientes muertos"),
    school: str = Query(..., examples=["ESCOM", "UCLA"], description="Tu Alma Mater", alias="escuela", max_length=5),
    origin: str = Query("Hawaii"),
):
    if school == "MIT":
        return Response(
            content="En Mississipi hacen un buen bagre?",
            media_type="text/plain",
            status_code=status.HTTP_409_CONFLICT,
        )
    return JSONResponse(
        content={
            "género": genre,
            "estas discapacitado?": ["Nones", "chi que shi"][has_disability],
            "especialidad": speciality,
            "tasa de éxito": success_rate,
            "universidad": school,
            "pais de origen": origin,
        },
        status_code=status.HTTP_208_ALREADY_REPORTED,
    )

@app.put("/intro3")
def contestona3(texto: str = Body("no soy nadie", media_type="text/plain")):
    return Response(
        content="Me dijeron que eres %s" % texto,
        media_type="text/html",
        status_code=status.HTTP_200_OK,
    )

#How to run?
#from fastapi_crud import app
#import uvicorn
#uvicorn.run(app, host="0.0.0.0", port=9090)
