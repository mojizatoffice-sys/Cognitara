from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def main():
    return {
        "API status": "Under Development"
    }

@app.get("/health")
def get_status():
    return {
        "API Health": "OK"
    }