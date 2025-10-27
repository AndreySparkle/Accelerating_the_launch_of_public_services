from sqlalchemy import Column, Integer, String, JSON, Text, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class ServiceSchema(Base):
    __tablename__ = "service_schemas"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    input_json_schema = Column(JSON, nullable=False)
    output_xml_structure = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    templates = relationship("Template", back_populates="service_schema")

class Template(Base):
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    service_schema_id = Column(Integer, ForeignKey("service_schemas.id"), nullable=False)
    field_mappings = Column(JSON, nullable=False)
    generated_velocity_template = Column(Text)
    version = Column(String, default="1.0")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    service_schema = relationship("ServiceSchema", back_populates="templates")