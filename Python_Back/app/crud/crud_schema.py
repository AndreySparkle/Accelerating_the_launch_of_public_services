from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.models import ServiceSchema
from app.schemas.schemas import ServiceSchemaCreate

class CRUDServiceSchema:
    def get(self, db: Session, schema_id: int) -> Optional[ServiceSchema]:
        return db.query(ServiceSchema).filter(ServiceSchema.id == schema_id).first()
    
    def get_by_name(self, db: Session, name: str) -> Optional[ServiceSchema]:
        return db.query(ServiceSchema).filter(ServiceSchema.name == name).first()
    
    def get_all(self, db: Session, skip: int = 0, limit: int = 100) -> List[ServiceSchema]:
        return db.query(ServiceSchema).offset(skip).limit(limit).all()
    
    def create(self, db: Session, schema: ServiceSchemaCreate) -> ServiceSchema:
        db_schema = ServiceSchema(
            name=schema.name,
            description=schema.description,
            input_json_schema=schema.input_json_schema,
            output_xml_structure=schema.output_xml_structure
        )
        db.add(db_schema)
        db.commit()
        db.refresh(db_schema)
        return db_schema

crud_service_schema = CRUDServiceSchema()