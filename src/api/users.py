from flask import Blueprint, jsonify, request, abort
import threading

users_bp = Blueprint("users", __name__)

# Lista en memoria y lock para seguridad en concurrencia
_users = []
_users_lock = threading.Lock()
_next_id = 1

def _get_next_id():
    global _next_id
    with _users_lock:
        nid = _next_id
        _next_id += 1
    return nid

@users_bp.route("/users", methods=["GET"])
def list_users():
    # Devuelve la lista completa de usuarios como JSON
    with _users_lock:
        return jsonify(_users), 200

@users_bp.route("/users", methods=["POST"])
def create_user():
    """
    Acepta:
    - application/json: {"name": "...", "email": "..."}
    - form-data / application/x-www-form-urlencoded: name, email
    Responde con el usuario creado en JSON.
    """
    if request.is_json:
        payload = request.get_json()
        name = payload.get("name")
        email = payload.get("email")
    else:
        name = request.form.get("name")
        email = request.form.get("email")

    if not name or not email:
        abort(400, description="Faltan campos 'name' o 'email'")

    user = {
        "id": _get_next_id(),
        "name": name,
        "email": email
    }
    with _users_lock:
        _users.append(user)
    return jsonify(user), 201
