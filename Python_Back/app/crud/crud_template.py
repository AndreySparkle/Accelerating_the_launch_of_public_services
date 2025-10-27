from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import Template
from app.schemas.schemas import TemplateCreate

class CRUDTemplate:
    def get(self, db: Session, template_id: int) -> Optional[Template]:
        return db.query(Template).filter(Template.id == template_id).first()
    
    def get_by_schema(self, db: Session, schema_id: int) -> List[Template]:
        return db.query(Template).filter(Template.service_schema_id == schema_id).all()
    
    def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> List[Template]:
        return db.query(Template).offset(skip).limit(limit).all()
    
    def create(self, db: Session, template: TemplateCreate) -> Template:
        db_template = Template(
            name=template.name,
            service_schema_id=template.service_schema_id,
            field_mappings=template.field_mappings
        )
        db.add(db_template)
        db.commit()
        db.refresh(db_template)
        return db_template

crud_template = CRUDTemplate()