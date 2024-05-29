from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
from sqlalchemy import create_engine
from app.config.config import DB_DATABASE, DB_HOST, DB_PASSWD, DB_PORT, DB_USERNAME


class Connection(Base):
    __tablename__ = "connections"
    id = Column(Integer, primary_key=True, index=True)
    connectionName = Column(String)  # , unique=True, index=True)
    hostURL = Column(String)
    port = Column(Integer)
    database = Column(String)
    username = Column(String)
    password = Column(String)
    schema = Column(String)
    useSSL = Column(Boolean)
    # Uncomment if you want to use SSL


DATABASE_URL = (
    f"postgresql://{DB_USERNAME}:{DB_PASSWD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"
)
# engine = create_engine(DATABASE_URL)

from app.db.base_class import DataBaseEngine

dbe = DataBaseEngine(DATABASE_URL)

Base.metadata.create_all(bind=dbe.engine)
