from datetime import datetime
import urllib.request
import base64
import json
import time
import os

webui_server_url = 'http://127.0.0.1:7860'

out_dir = 'C:/Users/k67915/Documents/git_stable_diffusion/api_out'
out_dir_t2i = os.path.join(out_dir, 'txt2img')
out_dir_i2i = os.path.join(out_dir, 'img2img')
os.makedirs(out_dir_t2i, exist_ok=True)
os.makedirs(out_dir_i2i, exist_ok=True)


def timestamp():
    return datetime.fromtimestamp(time.time()).strftime("%Y%m%d-%H%M%S")


def encode_file_to_base64(path):
    with open(path, 'rb') as file:
        return base64.b64encode(file.read()).decode('utf-8')


def decode_and_save_base64(base64_str, save_path):
    with open(save_path, "wb") as file:
        file.write(base64.b64decode(base64_str))


def call_api(api_endpoint, **payload):
    data = json.dumps(payload).encode('utf-8')
    request = urllib.request.Request(
        f'{webui_server_url}/{api_endpoint}',
        headers={'Content-Type': 'application/json'},
        data=data,
    )
    response = urllib.request.urlopen(request)
    return json.loads(response.read().decode('utf-8'))


def call_txt2img_api(**payload):
    response = call_api('sdapi/v1/txt2img', **payload)
    for index, image in enumerate(response.get('images')):
        save_path = os.path.join(out_dir_t2i, f'txt2img-{timestamp()}-{index}.png')
        decode_and_save_base64(image, save_path)


def call_img2img_api(**payload):
    response = call_api('sdapi/v1/img2img', **payload)
    for index, image in enumerate(response.get('images')):
        save_path = os.path.join(out_dir_i2i, f'img2img-{timestamp()}-{index}.png')
        decode_and_save_base64(image, save_path)


def main_api(prompt, neg_prompt, nr_images, style):
    payload = {
        "alwayson_scripts" : {
            "API payload" :
                {
                    "args" :[ ]
                },
            "Comments" :
                {
                    "args" :[ ]
                },
            "Extra options" :
                {
                    "args" :[ ]
                },
            "Hypertile" :
                {
                    "args" :[ ]
                },
            "Refiner" :
                {
                    "args" : [True,"sd_xl_refiner_1.0.safetensors [7440042bbd]",0.8]
                },
            "Sampler" :
                {
                    "args" : [20,"DPM++ 2M","Automatic"]
                },
            "Seed" :
                {
                    "args" :[42,False,-1,0,0,0]
                },
            "Style Selector for SDXL 1.0" :
                {
                # Styles here
                "args" : [True,False,False, False, style]
                }
        },
        "batch_size" :
        1,
        "cfg_scale" :
        7,
        "comments" :
        { },
        "denoising_strength" :
        0.7,
        "disable_extra_networks" :
        False,
        "do_not_save_grid" :
        False,
        "do_not_save_samples" :
        False,
        "enable_hr" :
        False,
        "height" :
        1024,
        "hr_negative_prompt" :
        "",
        "hr_prompt" :
        "",
        "hr_resize_x" :
        0,
        "hr_resize_y" :
        0,
        "hr_scale" :
        2,
        "hr_second_pass_steps" :
        0,
        "hr_upscaler" :
        "Latent",
        "n_iter" :
        # Number of images here
        nr_images,
        "negative_prompt" :
        # Negative Prompts here
        neg_prompt,
        #"disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w",
        "override_settings" :
        { },
        "override_settings_restore_afterwards" :
        True,
        "prompt" :
        # Prompts here
        prompt,
        #"A fast food restaurant on the moon with name “Moon Burger”, (best quality:1.1)",
        "refiner_checkpoint" :
        # Refiner Checkpoint here
        "sd_xl_refiner_1.0.safetensors [7440042bbd]",
        "refiner_switch_at" :
        0.8,
        "restore_faces" :
        False,
        "s_churn" :
        0,
        "s_min_uncond" :
        0,
        "s_noise" :
        1,
        "s_tmax" :
        None,
        "s_tmin" :
        0,
        "sampler_name" :
        "DPM++ 2M",
        "scheduler" :
        "Automatic",
        "script_args" :
        [ ],
        "script_name" :
        None,
        "seed" :
        42,
        "seed_enable_extras" :
        True,
        "seed_resize_from_h" :
        -1,
        "seed_resize_from_w" :
        -1,
        "steps" :
        20,
        "styles" :
        [ ],
        "subseed" :
        -1,
        "subseed_strength" :
        0,
        "tiling" :
        False,
        "width" :
        1024
        }
       
    call_txt2img_api(**payload)

    # init_images = [
    #     encode_file_to_base64(r"C:/Users/k67915\Documents/git_stable_diffusion/api_out/txt2img/txt2img-20240701-143552-0.png"),
    #     # encode_file_to_base64(r"B:\path\to\img_2.png"),
    #     # "https://image.can/also/be/a/http/url.png",
    # ]

    # batch_size = 2
    # payload = {
    #     "prompt": "A fast food restaurant on the moon with name “Moon Burger”, (best quality:1.1)",
    #     "seed": 42,
    #     "steps": 20,
    #     "width": 1024,
    #     "height": 1024,
    #     "denoising_strength": 0.5,
    #     "n_iter": 1,
    #     "init_images": init_images,
    #     "batch_size": batch_size if len(init_images) == 1 else len(init_images),
    #     # "mask": encode_file_to_base64(r"B:\path\to\mask.png")
    # }
    # if len(init_images) > 1 then batch_size should be == len(init_images)
    # else if len(init_images) == 1 then batch_size can be any value int >= 1
    #call_img2img_api(**payload)

    # there exist a useful extension that allows converting of webui calls to api payload
    # particularly useful when you wish setup arguments of extensions and scripts
    # https://github.com/huchenlei/sd-webui-api-payload-display
