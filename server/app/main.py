from fastapi import FastAPI
import sys

sys.path.append("../")

from app.connections import routers
from app.analystics.routers import analy_router

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware


# 配置 CORS
origins = [
    "http://localhost",  # 本地开发时的前端服务器地址
    "http://localhost:8080",  # 如果前端部署在不同的端口
    "https://yourapp.com",  # 生产环境的前端地址
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有头部
)

app.include_router(routers.router)
app.include_router(analy_router)
