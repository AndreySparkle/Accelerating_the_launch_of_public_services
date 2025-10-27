from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas import schemas
from app.crud import crud_template

router = APIRouter()

@router.post("/templates/", response_model=schemas.Template, status_code=status.HTTP_201_CREATED)
def create_template(template: schemas.TemplateCreate, db: Session = Depends(get_db)):
    return crud_template.create(db=db, template=template)

@router.get("/templates/", response_model=List[schemas.Template])
def read_templates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_template.get_all(db, skip=skip, limit=limit)

@router.get("/templates/{template_id}", response_model=schemas.Template)
def read_template(template_id: int, db: Session = Depends(get_db)):
    db_template = crud_template.get(db, template_id=template_id)
    if db_template is None:
        raise HTTPException(status_code=404, detail="Шаблон не найден")
    return db_template