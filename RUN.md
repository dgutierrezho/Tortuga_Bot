# How to Run the Oil Spill Detector & Turtle Classifier

This project has two parts: a **FastAPI backend** (TensorFlow/Keras inference) and a **Next.js frontend** (v0 UI). The frontend proxies prediction requests to the backend via `/api/predict` (oil spill) and `/api/predict-turtle` (turtle).

## Prerequisites

- Python 3.10+ with pip
- Node.js 18+ with npm

## 1. Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

The API will be available at `http://127.0.0.1:8000`.

- Health check: `GET http://127.0.0.1:8000/health`
- Oil spill: `POST http://127.0.0.1:8000/predict` (multipart/form-data, field name `file`)
- Turtle: `POST http://127.0.0.1:8000/predict-turtle` (multipart/form-data, field name `file`)

## 2. Frontend (Next.js)

In a **separate terminal**:

```bash
cd oil_webappd
cp .env.local.example .env.local   # optional: customize BACKEND_URL
npm install
npm run dev
```

The app will be at `http://localhost:3000`.

## 3. Usage

1. Start the **backend** first (step 1).
2. Start the **frontend** (step 2).
3. Open `http://localhost:3000` in your browser.
4. Use the **Oil Spill** or **Turtle** tab to upload an image and click **Run Detection**.

## Environment Variables

| Variable     | Default                     | Description                          |
| ------------ | --------------------------- | ------------------------------------ |
| `BACKEND_URL` | `http://127.0.0.1:8000/predict` | FastAPI base URL (proxy derives `/predict` and `/predict-turtle`) |

Copy `.env.local.example` to `.env.local` and adjust if your backend runs on a different host/port.

## Model Files

- **Oil spill**: `backend/oil_spill_model.keras`
- **Turtle**: `backend/tortuga.keras`

If you have them elsewhere:

```bash
cp /path/to/oil_spill_model.keras backend/oil_spill_model.keras
cp /path/to/tortuga.keras backend/tortuga.keras
```

## Troubleshooting

- **502 Bad Gateway**: Ensure the FastAPI backend is running on port 8000.
- **CORS**: The Next.js proxy avoids CORS by routing `/api/predict` server-side to the backend.
- **Error responses**: The API returns `{"error": "message"}` on failure. The UI shows the raw response; you can parse it to display only the message.
