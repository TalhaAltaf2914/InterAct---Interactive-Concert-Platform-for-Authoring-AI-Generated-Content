# Interactive Concert Platform for Authoring AI-Generated Content

This project is a **React-based web application** that interacts with **open-source AI models** for **image and text generation**. The frontend is built using **React and Material UI**, while the backend is powered by **Flask**. The application enables users to input queries, process them via AI models, and receive generated results in an interactive UI.

[Project Link Tree](https://linktr.ee/interactive_concert_platform)

## Features
- **Text Generation:** Uses AI models to generate human-like text.
- **Image Generation:** Generates images from user inputs.
- **User-Friendly UI:** Built with **Material UI** for a seamless experience.
- **State Management:** Managed using **Zustand**.
- **Backend Integration:** Communicates with a **Flask API** for AI processing.
- **Data Persistence:** Stores and retrieves data efficiently.

---

## Setup Instructions

## Generative AI Part

Warning: Arround 16 GB VRAM required to run text and image part

### Image Creation
For Creation of Images we used https://github.com/AUTOMATIC1111/stable-diffusion-webui. With that you can deploy local diffusion models and already have an api-access integrated. From our experience SDXL Basemodel (https://stablediffusionxl.com/#download) had the overall best performance. Refiner models (https://huggingface.co/stabilityai/stable-diffusion-xl-refiner-1.0) can be added to improve image quality, but they further reduce the speed.
You can follow the instructions of https://github.com/AUTOMATIC1111/stable-diffusion-webui to get it running on your hardware. In order to work seamlessly with our system, you need to exchange the webui-user.sh file (for linux) with the one included in this repo. This File basically configures the api and sets all ports.

1) Install https://github.com/AUTOMATIC1111/stable-diffusion-webui
2) Deploy Model https://stablediffusionxl.com/#download
3) change the webui-user.sh file with the one included in this repo
4) run webui.sh (for linux) to get it running


### Text Creation
For Creation of Texts we used https://github.com/oobabooga/text-generation-webui. It's simmilar to stable-diffusion-webui and also offers great possibilities to locally host LLMs with integrated API access. To deploy it locally, you can follow the steps from thier repo. We used Llama 3.1-8B (https://huggingface.co/meta-llama/Llama-3.1-8B) to generate text. In order to run with our project, you need to exchange the CMD_FLAGS.txt file. This enables api access and configures all ports.

1) Install https://github.com/oobabooga/text-generation-webui
2) Deploy Model https://huggingface.co/meta-llama/Llama-3.1-8B
3) change the CMD_FLAGS.txt file
4) run start_linux.sh (for linux)


## Server side with Frontend and Backend

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 20.14.0)
- **Python** (>= 3.12.4)
- **pip** (Python package manager)
- **Git** (optional, for cloning the repo)

---

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/TalhaAltaf2914/InterAct---Interactive-Concert-Platform-for-Authoring-AI-Generated-Content.git
cd InterAct---Interactive-Concert-Platform-for-Authoring-AI-Generated-Content
```

### 2️⃣ Backend Setup (Flask)

Navigate to the backend directory and set up the Flask server:

```
cd backend
pip install -r requirements.txt
```
Start the Flask server:
```sh
python app.py
```

### 3️⃣ Frontend Setup (React)

Navigate to the frontend directory and install dependencies:

```
cd ../frontend
npm install
```

Run the React development server:

```
npm run dev
```

Usage

1. Start the backend (python app.py).


2. Run the frontend (npm run dev).


3. Open http://localhost:5147/ in your browser.


4. Enter a prompt and interact with AI-generated content.


Project Structure
```
📂 project-root
 ├── 📂 backend         # Flask server with AI model integration
 |   ├── instance/    # SQL lite Database Instances
 │   ├── app.py        # Main Flask API
 │   ├── requirements.txt  # Backend dependencies
 ├── 📂 frontend        # React application
 │   ├── src/
 |   |   ├── config/         # Model URI configuration setting
 │   │   ├── components/  # UI components
 │   │   ├── store/       # Zustand state management
 │   ├── package.json  # Frontend dependencies
 ├── README.md        # Project documentation
 ├── .gitignore       # Files to ignore in Git
```
