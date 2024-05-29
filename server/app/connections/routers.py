from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud as connection_crud
from . import schemas as models
from fastapi import APIRouter
from app.db.model import dbe
from app.connections.crud import get_connection
from app.db.base_class import DataBaseEngine

router = APIRouter(prefix="/api/v1")

# app = FastAPI()

# from app.db.base_class import get_db
# from app.db.base_class import SessionLocal
# from app.db.base_class import get_tables_with_inspector,get_column_metadata


@router.post("/connections/", response_model=models.Connection)
def create_connection(
    connection: models.ConnectionCreate, db: Session = Depends(dbe.get_db)
):
    return connection_crud.create_connection(db=db, connection=connection)


@router.get("/connections/", response_model=list[models.Connection])
def read_connections(
    skip: int = 0, limit: int = 100, db: Session = Depends(dbe.get_db)
):

    connections = connection_crud.get_connections(db, skip=skip, limit=limit)
    return connections


@router.get("/tables/")
def read_tables(
    database_id: int = 1,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(dbe.get_db),
):
    connection = get_connection(db, database_id)
    db_uri = f"postgresql://{connection.username}:{connection.password}@{connection.hostURL}:{connection.port}/{connection.database}"
    # data_url = "postgresql://postgres:example@143.47.186.111:5432/postgres"
    base = DataBaseEngine(db_uri)
    db_info = base.get_tables()
    return db_info


@router.get("/columns_by_table/")
def read_tables_by_name(table: str = "", db: Session = Depends(dbe.get_db)):
    tables = dbe.get_column_metadata(table)
    return tables


@router.get("/connections/{connection_id}", response_model=models.Connection)
def read_connection(connection_id: int, db: Session = Depends(dbe.get_db)):
    db_connection = connection_crud.get_connection(db, connection_id=connection_id)
    if db_connection is None:
        raise HTTPException(status_code=404, detail="Connection not found")
    return db_connection


@router.put("/connections/{connection_id}", response_model=models.Connection)
def update_connection(
    connection_id: int,
    connection: models.ConnectionCreate,
    db: Session = Depends(dbe.get_db),
):
    db_connection = connection_crud.update_connection(
        db, connection_id=connection_id, connection=connection
    )
    if db_connection is None:
        raise HTTPException(status_code=404, detail="Connection not found")
    return db_connection


@router.delete("/connections/{connection_id}", response_model=models.Connection)
def delete_connection(connection_id: int, db: Session = Depends(dbe.get_db)):
    db_connection = connection_crud.delete_connection(db, connection_id=connection_id)
    if db_connection is None:
        raise HTTPException(status_code=404, detail="Connection not found")
    return db_connection
