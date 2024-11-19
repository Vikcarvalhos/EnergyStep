from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Carregar leituras e usuários do arquivo JSON
with open('data/leituras.json', 'r') as f:
    leituras = json.load(f)

with open('data/usuarios.json', 'r') as f:
    usuarios = json.load(f)

@app.route('/leituras', methods=['GET'])
def get_leituras():
    dia = request.args.get('dia')  # Exemplo: "2024-11-20"

    if not dia:
        return jsonify({"error": "Dia não especificado"}), 400

    # Filtrar leituras para o dia especificado
    leituras_filtradas = [
        leitura for leitura in leituras if leitura['data'].startswith(dia)
    ]

    # Criar intervalo de horas completo (00:00 - 23:59)
    horas_completas = {f"{hour:02}:00": 0 for hour in range(24)}

    # Somar energia gerada para cada hora
    for leitura in leituras_filtradas:
        hora = leitura['data'][11:13] + ":00"  # Pega somente a hora no formato "HH:00"
        horas_completas[hora] += leitura['energia_gerada']

    # Formatar resultado
    resultado = [
        {"hora": hora, "energia_gerada": round(energia, 2)}
        for hora, energia in sorted(horas_completas.items())
    ]

    return jsonify(resultado)

@app.route('/usuario/<int:id_usuario>', methods=['GET'])
def get_usuario(id_usuario):
    # Buscar usuário pelo ID
    usuario = next((u for u in usuarios if u['id'] == id_usuario), None)

    if not usuario:
        return jsonify({"error": "Usuário não encontrado"}), 404

    # Calcular o valor monetário do saldo
    valor_kwh = 0.656  # Valor do kWh em São Paulo
    valor_moeda = valor_kwh * 25
    valor_em_reais = round(usuario['saldo_moedas'] * valor_moeda, 2)

    # Retornar as informações simplificadas
    return jsonify({
        "id": usuario['id'],
        "nome": usuario['nome'],
        "email": usuario['email'],
        "saldo_moedas": usuario['saldo_moedas'],
        "valor_em_reais": valor_em_reais
    })


if __name__ == '__main__':
    app.run(debug=True)
