from typing import Union, Dict
import os
import logging
import time
import uuid
from fastapi import FastAPI, Request, Depends, HTTPException
from google import genai
import json


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
PROMPT_TEMPLATE = """Analyze the following diff snippet solely based on its content. Identify and report only directly observable security vulnerabilities within the code itself, focusing on the following vulnerability categories:

Injection
Broken Authentication
Sensitive data exposure
XML External Entities (XXE)
Broken Access Control
Security Misconfiguration
XSS
Insecure Deserialization
Using Components with Known Vulnerabilities
Insufficient logging & monitoring 
Broken object level authorization
Broken object property level authorization
Unrestricted resource consumption
Broken function level authorization
Unrestricted access to sensitive business flows
Server side request forgery
Improper inventory management
Unsafe consumption of APIs
Broken access control
Cryptographic failures
Insecure design
Identification and authentication failures
Software and data integrity failures
Stack based buffer-overflows
Use-after-free vulnerabilities
Format string vulnerabilities
Integer Overflows/Underflows 
Double Free
Dangling Pointer
Type Confusion
Arbitrary Write
Uninitialized Memory

Do not consider external factors, potential scenarios, or dependencies. Only report vulnerabilities that are demonstrably present within the given code.

Here is the code diff:
{}
"""

vuln_client = genai.Client(api_key=GEMINI_API_KEY)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("api")

app = FastAPI()

# Add logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    request_id = str(uuid.uuid4())
    request.state.request_id = request_id
    
    logger.info(
        f"Request started: {request.method} {request.url.path}",
        extra={"request_id": request_id, "method": request.method, "path": request.url.path}
    )
    
    start_time = time.time()
    
    try:
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        
        logger.info(
            f"Request completed: {request.method} {request.url.path} - Status: {response.status_code} - Duration: {process_time:.2f}ms",
            extra={
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "duration_ms": round(process_time, 2)
            }
        )
        
        return response
    except Exception as e:
        logger.error(
            f"Request failed: {request.method} {request.url.path} - Error: {str(e)}",
            extra={"request_id": request_id, "method": request.method, "path": request.url.path},
            exc_info=True
        )
        raise

# Dependency to get logger with request context
def get_request_logger(request: Request):
    return logging.LoggerAdapter(
        logger, 
        {"request_id": getattr(request.state, "request_id", "unknown")}
    )

@app.get("/")
def read_root(logger=Depends(get_request_logger)):
    logger.info("Root endpoint accessed")
    return {"Status": "Healthy."}


@app.post("/diffsentry")
async def analyze_diff(
    request: Request,
    logger=Depends(get_request_logger)
):
    # Log the content of the POST request
    try:
        data = await request.json()
        logger.info(
            "Received diff data",
            extra={"data_size": len(str(data)), "data_type": type(data).__name__}
        )
        
        # Log detailed data at debug level to avoid exposing sensitive info at higher levels
        logger.info(f"Diff data content: {data}")

        await vulnerability_engine(data)
        
        return {"status": "received", "message": "Diff data logged"}
    
    except Exception as e:
        logger.error(
            f"Error processing diff data: {str(e)}",
            exc_info=True
        )
        raise

async def vulnerability_engine(
    diff: Dict,
    logger=Depends(get_request_logger)
):
    prompt = PROMPT_TEMPLATE.format(json.dumps(diff))

    response = vuln_client.models.generate_content(
        model="gemini-1.5-flash",
        contents=prompt
    )

    logger.info(f"{response.text}")

    
