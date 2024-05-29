from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

# import crud
# from db.base_class import SessionLocal
# from . import crud as connection_crud
# from . import schemas as models 
from app.connections.crud import get_connection
from fastapi import APIRouter

analy_router = APIRouter(prefix="/api/v1/analystic")
from app.db.base_class import DataBaseEngine
# get_db,execute_query
from llm.openais import LLMS
# text2sql
from app.db.model import dbe


@analy_router.get("/text2sql/")
def analystic_text2sql(natural_lang:str, database_id: int, db: Session = Depends(dbe.get_db)):
    """
    自然语言转换成sql查询语句
    Raises:
        Exception: _description_
    Returns:
        _type_: _description_
    """
    try:
        if not natural_lang:
            raise Exception("请输入查询内容")
        connection = get_connection(db, database_id)
        db_uri = f"postgresql://{connection.username}:{connection.password}@{connection.hostURL}:{connection.port}/{connection.database}"
        llms = LLMS(db_uri)
        sql = llms.text2sql(natural_lang)
        base = DataBaseEngine(db_uri)
        datas = base.execute_query(sql)
        datas["sql"] = sql
        return {"code": 200, "message": "查询成功", "data": datas}
    except Exception as e:
        return {"code": 100, "message": f"查询失败{str(e)}"}

import json
from app.llm.openais import dim_measure
@analy_router.get("/distinguish/dim_metric/")
def dim_metric(columns: str):
    """
    区分维度和度量
    Raises:
        Exception: _description_
    Returns:
        _type_: _description_
    """
    try:
        if not columns:
            raise Exception("请输入查询内容")
        data = json.loads(dim_measure(columns))
        return {"code": 200, "message": "查询成功", "data": data}
    except Exception as e:
        return {"code": 100, "message": f"查询失败{str(e)}"}