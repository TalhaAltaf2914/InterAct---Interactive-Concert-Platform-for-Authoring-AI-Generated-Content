from flask import Blueprint, request, jsonify
# from backend.services.my_service import my_python_function
from routes.api.run_api import main_api

api_bp = Blueprint('api', __name__)

prompt = "A fast food restaurant on the moon with name “Moon Burger”, (best quality:1.1)"
neg_prompt = "disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w"
nr_images = 1
style = "Cinematic"

@api_bp.route('/call_api', methods=['GET', 'POST'])
def call_api():
    data = request.get_json()
    print(data)
    # if not data or 'number' not in data:
    #     return jsonify({'error': 'No data provided or invalid data'}), 400
    
    # result = my_python_function(data)

    result = main_api(
        prompt, neg_prompt, nr_images, style
    )

    # return jsonify({'result': result})
    return result
