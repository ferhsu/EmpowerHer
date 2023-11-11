from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

import logging
import sys
import os.path
from llama_index import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage,
)

app = FastAPI()

@app.get("/items")
def my_function():

    logging.basicConfig(stream=sys.stdout, level=logging.INFO)
    logging.getLogger().addHandler(logging.StreamHandler(stream=sys.stdout))

    # check if storage already exists
    if not os.path.exists("./storage"):
        # load the documents and create the index
        documents = SimpleDirectoryReader("data").load_data()
        index = VectorStoreIndex.from_documents(documents)
        # store it for later
        index.storage_context.persist()
    else:
        # load the existing index
        storage_context = StorageContext.from_defaults(persist_dir="./storage")
        index = load_index_from_storage(storage_context)

    # either way we can now query the index
    query_engine = index.as_query_engine()
    query = "What school did the author attend?"
    response = query_engine.query(query)
    # element = response[0].event
    # print(response)
    return {"question": query, "answer": response.response}

@app.put("/items")
def userQuery(query: str = "What is the author's name?"):
    return {"query": query}