from sqlalchemy.orm import Session
from . import models 

def get_connection(db: Session, connection_id: int):
    return db.query(models.Connection).filter(models.Connection.id == connection_id).first()

def get_connections(db: Session, skip: int = 0, limit: int = 100):
    rows = db.query(models.Connection).offset(skip).limit(limit).all()
    return rows

def create_connection(db: Session, connection: models.Connection):
    db_connection = models.Connection(**connection.dict())
    db.add(db_connection)
    db.commit()
    db.refresh(db_connection)
    return db_connection

def update_connection(db: Session, connection_id: int, connection: models.Connection):
    db_connection = get_connection(db, connection_id)
    if db_connection:
        update_data = connection.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_connection, key, value)
        db.commit()
        db.refresh(db_connection)
    return db_connection

def delete_connection(db: Session, connection_id: int):
    db_connection = get_connection(db, connection_id)
    if db_connection:
        db.delete(db_connection)
        db.commit()
    return db_connection
