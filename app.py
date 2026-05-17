from flask import Flask, render_template, request, jsonify
import importlib
try:
    markdown_lib = importlib.import_module('markdown')
except ImportError:
    markdown_lib = None
import base64
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/markdown', methods=['POST'])
def convert_markdown():
    data = request.get_json()
    if not data:
        return jsonify({'result': '', 'status': 'error'})
    text = data.get('text', '')
    try:
        if markdown_lib is None:
            return jsonify({'result': 'Markdown library is not installed. Run: pip install markdown', 'status': 'error'})
        html = markdown_lib.markdown(text)
        return jsonify({'result': html, 'status': 'success'})
    except Exception as e:
        return jsonify({'result': str(e), 'status': 'error'})

@app.route('/api/json-format', methods=['POST'])
def format_json():
    data = request.get_json()
    if not data:
        return jsonify({'result': '', 'status': 'error'})
    text = data.get('text', '')
    try:
        parsed = json.loads(text)
        formatted = json.dumps(parsed, indent=4)
        return jsonify({'result': formatted, 'status': 'success'})
    except Exception as e:
        return jsonify({'result': f"Invalid JSON: {str(e)}", 'status': 'error'})

@app.route('/api/base64', methods=['POST'])
def handle_base64():
    data = request.get_json()
    if not data:
        return jsonify({'result': '', 'status': 'error'})
    text = data.get('text', '')
    action = data.get('action', 'encode')
    
    try:
        if action == 'encode':
            result = base64.b64encode(text.encode('utf-8')).decode('utf-8')
        else:
            result = base64.b64decode(text.encode('utf-8')).decode('utf-8')
        return jsonify({'result': result, 'status': 'success'})
    except Exception as e:
        return jsonify({'result': 'Error: Invalid Base64 input.', 'status': 'error'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
