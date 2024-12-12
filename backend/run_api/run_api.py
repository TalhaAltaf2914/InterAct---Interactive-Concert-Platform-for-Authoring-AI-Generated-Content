from api import main_api

prompt = "A fast food restaurant on the moon with name “Moon Burger”, (best quality:1.1)"
neg_prompt = "disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w"
nr_images = 1
style = "Cinematic"

main_api(prompt, neg_prompt, nr_images, style)
