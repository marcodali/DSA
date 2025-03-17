import pytest
from flask_crud import app

json = {"hola": 11, "mundo": 21}

@pytest.fixture
def rosita():
    with app.test_client() as changuito:
        yield changuito

def test_delete_should_fail(rosita):
    response = rosita.delete("/suma/1", json=json)
    assert response.status_code == 405

def test_send_a_secret(rosita):
    response = rosita.patch("/suma/1", json={"secret": False})
    assert response.status_code == 402
    assert "no secrets" in response.text

def test_put_and_patch_should_accept_json_body(rosita):
    rA = rosita.put("/suma/10?final_multiplier=2", json=json)
    json["mundo"] += 1
    rB = rosita.patch("/suma/11?final_multiplier=3", json=json)
    assert rA.status_code == 201
    assert rB.status_code == 201
    responseA = rA.get_json()
    responseB = rB.get_json()
    assert responseA["total"] == 84
    assert responseB["total"] == 132

def test_post_should_accept_form_body(rosita):
    form_body = {"six": 4, "four": 6}
    rA = rosita.post("/suma/10?final_multiplier=5", data=form_body)
    assert rA.status_code == 202
    responseA = rA.get_json()
    assert responseA["total"] == 100