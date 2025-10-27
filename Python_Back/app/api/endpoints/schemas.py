from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas import schemas
from app.crud import crud_service_schema

router = APIRouter()

@router.post("/schemas/", response_model=schemas.ServiceSchema, status_code=status.HTTP_201_CREATED)
def create_service_schema(schema: schemas.ServiceSchemaCreate, db: Session = Depends(get_db)):
    db_schema = crud_service_schema.get_by_name(db, name=schema.name)
    if db_schema:
        raise HTTPException(
            status_code=400, 
            detail="Схема с таким именем уже существует"
        )
    return crud_service_schema.create(db=db, schema=schema)

@router.get("/schemas/", response_model=List[schemas.ServiceSchema])
def read_schemas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_service_schema.get_all(db, skip=skip, limit=limit)

@router.get("/schemas/{schema_id}", response_model=schemas.ServiceSchema)
def read_schema(schema_id: int, db: Session = Depends(get_db)):
    db_schema = crud_service_schema.get(db, schema_id=schema_id)
    if db_schema is None:
        raise HTTPException(status_code=404, detail="Схема не найдена")
    return db_schema