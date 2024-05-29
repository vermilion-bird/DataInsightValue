
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.engine.reflection import Inspector
from sqlalchemy.engine import reflection
import pandas as pd
import sqlalchemy
import json
from sqlalchemy import MetaData

class DataBaseEngine:
    def __init__(self, DATABASE_URL) -> None:
        self.engine = create_engine(DATABASE_URL, echo=True)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    # Dependency
    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()


    def get_tables_with_inspector(self):
        inspector = Inspector.from_engine(self.engine)
        # 获取数据库中所有表的名字
        table_names = inspector.get_table_names()
        return table_names

    def get_column_metadata(self, table_name):
        insp = reflection.Inspector.from_engine(self.engine)
        columns = insp.get_columns(table_name)
        column_metadata = []
        for column in columns:
            column_info = {
                "name": column['name'],
                "type": str(column['type']),
                "nullable": column['nullable'],
                "default": column['default'],
                "primary_key": 'primary_key' in column and column['primary_key']
            }
            column_metadata.append(column_info)
        return column_metadata


    def get_table_names(self):
            inspector = sqlalchemy.inspect(self.engine)
            return inspector.get_table_names()

    def execute_query(self, query, return_type="table"):
        with self.engine.connect() as connection:
            result = connection.execute(sqlalchemy.text(query))
            headers = [col.name for col in result.cursor.description]
            rows = []
            for row in result:
                rows.append(list(row))
            if return_type == "table":
                # dim_mesures = json.loads(dim_measure(headers))
                # print(dim_mesures, type(dim_mesures))
                d = {"headers": headers, "rows": rows}
                # d.update(dim_mesures)
                return d
            elif return_type == "dataframe":
                return pd.DataFrame(data=rows, columns=headers)

    def get_table_columns(self, table_name):
        inspector = sqlalchemy.inspect(self.engine)
        return inspector.get_columns(table_name)

    def get_tables(self):
        # 创建 MetaData 实例
        metadata = MetaData()
        # 使用 MetaData 对象绑定引擎并反射数据库模式
        metadata.reflect(bind=self.engine)
        # 准备存储表信息的字典
        database_info = {}
        # 遍历每个表
        for table_name, table in metadata.tables.items():
            columns_info = []
            for column in table.columns:
                column_info = {
                    "name": column.name,
                    "type": str(column.type)
                }
                columns_info.append(column_info)
            
            database_info[table_name] = columns_info

        # 将信息转换为 JSON 格式
        database_info_json = json.dumps(database_info, indent=4)
        print(database_info)
        return database_info