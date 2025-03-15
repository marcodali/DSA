import pytest
from flask_crud import app

json = {"hola": 11, "mundo": 31}

@pytest.fixture
def rosita():
    with app.test_client() as changuito:
        yield changuito

def test_delete_and_post_should_fail(rosita):
    rA = rosita.delete("/suma", json=json)
    rB = rosita.post("/suma", json=json)
    assert rA.status_code == 405
    assert rB.status_code == 405

def test_send_a_secret(rosita):
    r = rosita.patch("/suma", json={"secret": False})
    assert r.status_code == 402
    assert "no secrets" in r.text

def test_put_and_patch_should_succed(rosita):
    rA = rosita.put("/suma", json=json)
    json["mundo"] = 32
    rB = rosita.patch("/suma", json=json)
    assert rA.status_code == 201
    assert rB.status_code == 201
    responseA = rA.get_json()
    responseB = rB.get_json()
    assert responseA["total"] == 42
    assert responseB["total"] == 43