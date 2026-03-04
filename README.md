# Tortuga-Bot: Autonomous Marine Monitoring & Conservation
**SHPE REACH Ideathon | 2nd Place Award Winner**

## Project Overview
Marine conservation and disaster response currently face significant hurdles due to high operational costs and human-intensive monitoring. Tortuga-Bot is an autonomous marine vehicle system designed to bridge this gap. By utilizing a dual-model Machine Learning pipeline, the system provides real-time detection of oil spills and biological targets (sea turtles). The project integrates a bio-mimetic 3D-printed chassis with a modern full-stack dashboard to facilitate "human-less" marine research and environmental protection.

![IMG_8470](https://github.com/user-attachments/assets/7fb01090-b73c-4e24-8914-ca2396d484a5)
**3D-Printed Turtle Chassis**

## Engineering Problem
The project addresses two critical environmental challenges: the high latency in detecting oil spills near offshore rigs and the invasive, costly nature of manual sea turtle tagging. This fits the Coastal Technology track.

## Tools Used
| Layer | Technology |
| :--- | :--- |
| **Machine Learning** | TensorFlow, Keras, OpenCV, CNN+LSTM Architectures |
| **Backend** | FastAPI, Python 3.10+, Uvicorn |
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS |
| **Hardware** | CAD Design, Rapid Prototyping (3D Printing) |

## Technical Implementation
The system utilizes a decoupled architecture to ensure low-latency inference and a responsive user experience.

* **ML Pipeline (TensorFlow/Keras/OpenCV):**
    * **Oil Spill Detector:** Implemented a hybrid **CNN+LSTM** architecture to extract spatial and sequential features from satellite and RGB imagery.
    * **Turtle Classifier:** Utilized a Convolutional Neural Network (CNN) for high-accuracy biological identification.
* **Backend (FastAPI/Python 3.10+):** Built an asynchronous server to load Keras models, run inference, and return JSON predictions including confidence scores and inference time ($ms$).
* **Frontend (Next.js 16/React 19/TypeScript):** Developed a clean, responsive UI with Tailwind CSS that features drag-and-drop image uploads and real-time probability rendering.
* **Hardware & Rapid Prototyping:** Designed a turtle-shaped bio-mimetic chassis to reduce hydrodynamic drag and facilitate camouflage. The model was realized through **3D Printing (PLA)**.


```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Browser   │────▶│  Next.js (React) │────▶│  FastAPI        │
│   (UI)      │     │  API Routes      │     │  + Keras       │
└─────────────┘     │  (proxy)         │     │  Models        │
                    └──────────────────┘     └─────────────────┘
```
**System Architecture Diagram**

## Results

### 1. Open the app: [http://localhost:3000](http://localhost:3000) 
* use the **Oil Spill** or **Turtle** tab to upload an image.

###  2. High-Performance Inference
The system demonstrated the ability to process complex satellite imagery and return classification labels with **sub-100ms inference times**, validating the feasibility of real-time deployment on autonomous hardware.

###  3. Autonomous Research Prototype
The project successfully modeled the concept of "Human-less Tagging." By integrating the turtle detection model with a theoretical electromechanical arm, the bot can automate the deployment of PIT tags, significantly reducing the cost and impact of marine research.


## The Team: 
* **Daniela Gutierrez Hornedo** 
* **Evelyn M. Mares Moreno** 
* **Marlyn Arque Rupa** 
* **Anthony Flores-Mendez** 
