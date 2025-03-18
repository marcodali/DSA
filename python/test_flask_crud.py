import pytest
from flask_crud import app

json = {"hola": 11, "mundo": 21}

@pytest.fixture
def rosita():
    with app.test_client() as changuito:
        yield changuito

def test_delete_and_get_should_fail(rosita):
    response = rosita.delete("/suma/1", json=json)
    assert "text/html" in response.headers.get("Content-Type", type=str)
    assert response.status_code == 405

def test_send_a_secret(rosita):
    response = rosita.patch("/suma/1", json={"secret": False})
    assert response.headers.get("Content-Type", type=str) == "application/json"
    assert response.status_code == 402
    assert "no secrets" in response.text

def test_post_and_patch_should_accept_json_and_form_body(rosita):
    rA = rosita.post("/suma/10?final_multiplier=2", json=json)
    assert "application/json" in rA.headers.get("Content-Type", type=str)
    assert rA.status_code == 201
    responseA = rA.get_json()
    assert responseA["total"] == 84
    
    json["mundo"] += 1
    rB = rosita.patch("/suma/11?final_multiplier=3", data=json)
    assert "application/json" in rB.headers.get("Content-Type", type=str)
    assert rB.status_code == 201
    responseB = rB.get_json()
    assert responseB["total"] == 132

def test_put_should_accept_text_body(rosita):
    text_body = "1,2,3,4,5"
    response = rosita.put("/suma", data=text_body, content_type="text/plain")
    assert "text/html" in response.headers.get("Content-Type", type=str)
    assert response.status_code == 202
    assert "15" in response.text