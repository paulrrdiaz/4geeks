from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = OpenAI()

# Create => createOne / createMany
# Read => findOne / findAll
# Update => updateOne / updateMany
# Delete => deleteOne / deleteMany

# Table Users
# GET /api/v1/users/me findMe
# GET /api/v1/users findAll
# GET /api/v1/users/:id findOne
# POST /api/v1/users createOne

# Table Messages
# id
# userId
# role
# content

# Authorization role => user, system, admin, superadmin, client, provider
# Authentication login => token

# Home, Contact, About => sin token

# Dashboard, Profile, Settings => token (id: currentUser, role, name, timestamp)

messages = []


@app.get("/api/v1/messages")
def find_all_messages():
    return jsonify(messages), 200


# Providers should come from DB
providers = [
    {
        "id": 1,
        "name": "Juan",
        "service": "Electricidad",
        "phone": "123456789",
    },
    {
        "id": 2,
        "name": "Pedro",
        "service": "Plomería",
        "phone": "987654321",
    },
    {
        "id": 3,
        "name": "María",
        "service": "Carpintería",
        "phone": "456123789",
    },
    {
        "id": 4,
        "name": "José",
        "service": "Jardinería",
        "phone": "789456123",
    },
]
system_role_1 = """
Eres un especialista en servicios del hogar, reconocido a nivel mundial por tus consejos y recomendaciones.
Tienes un conocimiento profundo en el área de la limpieza, organización y mantenimiento de espacios.
Además, tienes un gran expertise en electricidad, plomería, carpintería y jardinería.
"""
system_role_2 = f"Además, tienes una lista de especialistas listo para ser contactados en caso de emergencia, debes recomendar al menos 1 contacto en cada iteración. Aquí tienes la lista de especialistas disponibles: {providers}"
system_role_3 = """
la respuesta debe ser en formato JSON, 
{
    "text": "mensaje del modelo"
    contacts: [
        {
            "id": 1,
            "name": "Juan",
            "service": "Electricidad",
            "phone": "123456789",
        },
    ]
},
"""
system_role_4 = """
Si el mensaje del usuario no contiene información relacionada con los servicios antes mencionados, debes responder con un mensaje genérico.
ej: "Lo siento, no puedo ayudarte con eso. ¿En qué más puedo ayudarte?"
"""


@app.post("/api/v1/messages")
def create_one_message():
    user_message = request.json.get("message")

    if not user_message:
        return jsonify("Message is required"), 400

    messages.append({"role": "user", "content": user_message})

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_role_1},
                {"role": "system", "content": system_role_2},
                {"role": "system", "content": system_role_3},
                {"role": "system", "content": system_role_4},
                {"role": "user", "content": user_message},
            ],
            n=1,
            stop=None,
            max_tokens=200,
            temperature=0.6,
        )

        message = response.to_dict().get("choices")[0].get("message").get("content")

        messages.append({"role": "system", "content": message})

        return jsonify({"role": "system", "content": message}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
