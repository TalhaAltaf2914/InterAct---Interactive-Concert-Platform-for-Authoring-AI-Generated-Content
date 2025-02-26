# AI-Powered React Web App

This project is a **React-based web application** that interacts with **open-source AI models** for **image and text generation**. The frontend is built using **React and Material UI**, while the backend is powered by **Flask**. The application enables users to input queries, process them via AI models, and receive generated results in an interactive UI.

## Features
- **Text Generation:** Uses AI models to generate human-like text.
- **Image Generation:** Generates images from user inputs.
- **User-Friendly UI:** Built with **Material UI** for a seamless experience.
- **State Management:** Managed using **Zustand**.
- **Backend Integration:** Communicates with a **Flask API** for AI processing.
- **Data Persistence:** Stores and retrieves data efficiently.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **Python** (>= 3.8)
- **pip** (Python package manager)
- **Git** (optional, for cloning the repo)

---

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2️⃣ Backend Setup (Flask)

Navigate to the backend/ directory and set up the virtual environment:

cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

Start the Flask server:
```sh
python app.py

3️⃣ Frontend Setup (React)

Navigate to the frontend/ directory and install dependencies:

cd ../frontend
npm install

Run the React development server:

npm start

Usage

1. Start the backend (python app.py).


2. Run the frontend (npm start).


3. Open http://localhost:5147/ in your browser.


4. Enter a prompt and interact with AI-generated content.


Project Structure

📂 project-root
 ├── 📂 backend         # Flask server with AI model integration
 │   ├── app.py        # Main Flask API
 │   ├── routes.py     # API routes
 │   ├── models/       # AI model files
 │   ├── requirements.txt  # Backend dependencies
 ├── 📂 frontend        # React application
 │   ├── src/
 │   │   ├── components/  # UI components
 │   │   ├── store/       # Zustand state management
 │   ├── package.json  # Frontend dependencies
 ├── README.md        # Project documentation
 ├── .gitignore       # Files to ignore in Git


