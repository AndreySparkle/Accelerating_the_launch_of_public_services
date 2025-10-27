from fastapi import FastAPI
from app.database import engine
from app.models import models
from app.api.endpoints import schemas_router, templates_router

# Создаем таблицы в БД
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gov Template Builder API",
    description="API для генерации Velocity-шаблонов для госуслуг",
    version="1.0.0"
)

# Подключаем роутеры
app.include_router(schemas_router, prefix="/api/v1", tags=["schemas"])
app.include_router(templates_router, prefix="/api/v1", tags=["templates"])

@app.get("/")
async def root():
    return {"message": "Gov Template Builder API", "version": "1.0.0"}