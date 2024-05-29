from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
import os
from langchain_openai import AzureChatOpenAI

import sys
sys.path.append(os.getcwd())

from config.config import (
    AZURE_DEPLOYMENT,
    AZURE_OPENAI_API_KEY,
    OPENAI_API_VERSION,
    AZURE_OPENAI_ENDPOINT,
)
os.environ["AZURE_OPENAI_API_KEY"] = AZURE_OPENAI_API_KEY
os.environ["AZURE_OPENAI_ENDPOINT"] = AZURE_OPENAI_ENDPOINT

# from langchain.llms.openai import AzureChatOpenAI


model = AzureChatOpenAI(
    openai_api_version=OPENAI_API_VERSION,
    azure_deployment=AZURE_DEPLOYMENT,
)
# from langchain_openai import OpenAI


# from openai import OpenAI  
# model = OpenAI(base_url = 'http://localhost:11434/v1',   
#                    api_key='ollama', )  # required, but unused 
				 
# from langchain_community.llms import Ollama
# model = Ollama(model="llama3")
# print(llm.invoke("Tell me a joke"))
    


from langchain_community.utilities import SQLDatabase
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.sql_database.query import create_sql_query_chain

class LLMS:
    def __init__(self,data_uri) -> None:
        # postgresql://chat2data:nHPQZ6DMfNGYCeeb@144.24.77.244:5433/chat2data
        self.db = SQLDatabase.from_uri(data_uri)
        template = """Based on the table schema below, write a SQL query that would answer the user's question:
        {schema}

        Question: {question}
        SQL Query:"""
        prompt = ChatPromptTemplate.from_template(template)
    #     sql_response = (
    #     RunnablePassthrough.assign(schema=self.get_schema)
    #     | prompt
    #     | model.bind(stop=["\nSQLResult:"])
    #     | StrOutputParser()
    # )

    def get_schema(self):
        return self.db.get_table_info()


    def run_query(self,query):
        print(query)
        return self.db.run(query)


    def text2sql(self, text):
        chain = create_sql_query_chain(model, self.db)
        return chain.invoke({"question": text})


from langchain.output_parsers.openai_functions import JsonOutputFunctionsParser

def dim_measure(columns):
    """
    区分维度和度量
    """
    # columns = inspector.get_table_columns(table_name)
    template = """
        # ROLE:  Data Analyst
        ## Goals:  To distinguishing between "dimensions" and "metrics" in a given set of data. Please consider step by step
        columns: 
        ---
        {columns}
        ---
        ## CONTRACT:
            1. Please output only the JSON format; an explanation is not needed.
        ## OutputFormat[JSON]  {{"dimensions":["d1"], "mertics": ["m1"] }}
        """
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model  
    # | JsonOutputFunctionsParser()
    return chain.invoke({"columns": columns}).content

if __name__=="__main__":
    print(dim_measure('ad_group'))