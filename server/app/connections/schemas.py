
from pydantic import BaseModel

class ConnectionBase(BaseModel):
    connectionName: str
    hostURL: str
    port: int
    database: str
    username: str
    password: str
    schema:   str=''
    # useSSL: bool = False  
    # Uncomment if you want to use SSL

class ConnectionCreate(ConnectionBase):
    pass

class Connection(ConnectionBase):
    id: int

class Config:
    orm_mode = True
