from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime

class ServiceSchemaBase(BaseModel):
    name: str
    description: Optional[str] = None
    input_json_schema: Dict[str, Any]
    output_xml_structure: Dict[str, Any]

class ServiceSchemaCreate(ServiceSchemaBase):
    pass

class ServiceSchema(ServiceSchemaBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class TemplateBase(BaseModel):
    name: str
    service_schema_id: int
    field_mappings: Dict[str, str]

class TemplateCreate(TemplateBase):
    pass

class Template(TemplateBase):
    id: int
    generated_velocity_template: Optional[str] = None
    version: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True