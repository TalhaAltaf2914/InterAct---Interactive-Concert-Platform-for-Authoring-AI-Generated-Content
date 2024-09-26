from routes.api.model_api import call_txt2img_api
# from flask import (
#     Blueprint, flash, g, redirect, render_template, request, session, url_for
# )

# bp = Blueprint('api', __name__, url_prefix='/api')

prompt = "A fast food restaurant on the moon with name “Moon Burger”, (best quality:1.1)"
neg_prompt = "disfigured, ugly, bad, immature, cartoon, anime, 3d, painting, b&w"
nr_images = 1
style = "Cinematic"

# return main_api(prompt, neg_prompt, nr_images, style)
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
       
    return call_txt2img_api(**payload)