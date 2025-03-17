from fastapi import FastAPI, Form, Query, Body, Response, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional

class Doctor(BaseModel):
    speciality: str
    success_rate: float

app = FastAPI()

@app.put("/intro/{genre}/{has_disability}")
def contestona(
    genre: str,
    has_disability: bool,
    speciality: Optional[str] = Form("Veterinaria", examples=["Oftalmología", "Obstetricia"], alias="especialidad"),
    success_rate: Optional[float] = Form(75.92, description="pacientes curados vs pacientes muertos"),
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
            "estas discapacitado?": ["No", "Sí"][has_disability],
            "especialidad": json_properties.speciality if json_properties else speciality,
            "tasa de exito": json_properties.success_rate if json_properties else success_rate,
            "universidad": school,
            "pais de origen": origin,
        },
        status_code=status.HTTP_208_ALREADY_REPORTED,
    )

#How to run?
#import app from fastapi_crud
#import uvicorn
#uvicorn.run(app, host="0.0.0.0", port=9090)
