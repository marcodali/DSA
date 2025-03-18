import pytest
from fastapi_crud import app
from fastapi.testclient import TestClient

@pytest.fixture
def bola():
    return TestClient(app)

def test_contestona1(bola):
    r = bola.put(
        "/intro1/hombre/yEs",
        params={"escuela": "Stanf"},
        json={"speciality": "Pediatría", "success_rate": 15.18},
    )
    assert r.status_code == 208
    assert r.headers.get("Content-Type") == "application/json"
    
    response = r.json()
    
    assert response["género"] == "hombre"
    assert response["estas discapacitado?"] == "a wi wi"
    assert response["universidad"] == "Stanf"
    assert response["tasa de éxito"] == 15.18
    assert response["pais de origen"] == "Hawaii"
    assert response["especialidad"] == "Pediatría"

def test_mit_contestona1(bola):
    response = bola.put(
        "/intro1/hombre/yEs",
        params={"escuela": "MIT"},
    )
    assert response.status_code == 409
    assert "text/plain" in response.headers.get("Content-Type")
    assert "bagre" in response.text

def test_contestona2(bola):
    r = bola.put(
        "/intro2/hembra/0",
        params={"escuela": "Berke", "origin": "Puerto Rico"},
        data={"success_rate": 85.08},
    )
    assert r.status_code == 208
    assert r.headers.get("Content-Type") == "application/json"
    
    response = r.json()
    
    assert response["género"] == "hembra"
    assert response["estas discapacitado?"] == "Nones"
    assert response["universidad"] == "Berke"
    assert response["tasa de éxito"] == 85.08
    assert response["pais de origen"] == "Puerto Rico"
    assert response["especialidad"] == "Veterinaria"

def test_mit_contestona2(bola):
    response = bola.put(
        "/intro2/hembra/1",
        params={"escuela": "MIT"},
    )
    assert response.status_code == 409
    assert "text/plain" in response.headers.get("Content-Type")
    assert "Mississipi" in response.text

def test_contestona3(bola):
    response = bola.put(
        "/intro3",
        data="el mero mero sabor ranchero",
        headers={"Content-Type": "text/plain"},
    )
    assert response.status_code == 200
    assert "text/html" in response.headers.get("Content-Type")
    assert "dijeron que eres el mero mero" in response.text