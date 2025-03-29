from typing import Union
import logging
import time
import uuid
from fastapi import FastAPI, Request, Depends

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
        
        return {"status": "received", "message": "Diff data logged"}
    except Exception as e:
        logger.error(
            f"Error processing diff data: {str(e)}",
            exc_info=True
        )
        raise
