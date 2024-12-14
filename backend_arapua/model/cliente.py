from sqlalchemy import Column, String, Integer, DateTime, Float
from datetime import datetime
from typing import Union

from  model import Base


class Cliente(Base):
    __tablename__ = 'Cliente'

    id = Column("pk_Cliente", Integer, primary_key=True, unique=True)
    nome = Column(String(140))
    telefone = Column(String(140))
    endereco = Column(String(140))
    cidade = Column(String(140))
    estado = Column(String(140))
    data_insercao = Column(DateTime, default=datetime.now())

def __init__(self, nome:str, telefone:str, endereco:str, cidade:str, estado:str,
                 data_insercao:Union[DateTime, None] = None):
        """
        Cria um Cliente

        Arguments:
            nome: nome do Cliente.
            quantidade: quantidade que se espera comprar daquele Cliente
            valor: valor esperado para o Cliente
            data_insercao: data de quando o Cliente foi inserido à base
        """
        self.nome = nome
        self.telefone = telefone    
        self.endereco = endereco
        self.cidade = cidade
        self.estado = estado

        # se não for informada, será o data exata da inserção no banco
        if data_insercao:
            self.data_insercao = data_insercao

   
