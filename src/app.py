from flask import Flask
from api.users import users_bp
from web.routes import web_bp

def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    # Registramos blueprints
    app.register_blueprint(users_bp, url_prefix="/api")
    app.register_blueprint(web_bp)
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
