from pydantic import BaseModel
from typing import Optional, List
from model.cliente import Cliente


class ClienteSchema(BaseModel):
    """ Define como um novo Cliente a ser inserido deve ser representado
    """
    nome: str = "Cliente"
    telefone: str = "21 99123-4455"
    endereco: str = "Rua Abc numero 3"
    cidade: str = "Niteroi"
    estado: str = "Rio de Janeiro"


class ClienteBuscaSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a busca. Que será
        feita apenas com base no nome do Cliente.
    """
    nome: str = "Teste"


class ListagemClientesSchema(BaseModel):
    """ Define como uma listagem de Clientes será retornada.
    """
    Clientes:List[ClienteSchema]


def apresenta_clientes(Clientes: List[Cliente]):
    """ Retorna uma representação do Cliente seguindo o schema definido em
        ClienteViewSchema.
    """
    result = []
    for Cliente in Clientes:
        result.append({
            "nome": Cliente.nome,
            "telefone": Cliente.telefone,
            "endereco": Cliente.endereco,
            "cidade": Cliente.cidade,
            "estado": Cliente.estado,
        })

    return {"Clientes": result}


class ClienteViewSchema(BaseModel):
    """ Define como um Cliente será retornado: Cliente + comentários.
    """
    id: int = 1
    nome: str = "Cliente"
    telefone: str = "21 99123-4455"
    endereco: str = "Rua Abc numero 3"
    cidade: str = "Niteroi"
    estado: str = "Rio de Janeiro"


class ClienteDelSchema(BaseModel):
    """ Define como deve ser a estrutura do dado retornado após uma requisição
        de remoção.
    """
    mesage: str
    nome: str

def apresenta_cliente(Cliente: Cliente):
    """ Retorna uma representação do Cliente seguindo o schema definido em
        ClienteViewSchema.
    """
    return {
        "id": Cliente.id,
        "nome": Cliente.nome,
        "telefone": Cliente.telefone,
        "endereco": Cliente.endereco,
        "cidade": Cliente.cidade,
        "estado": Cliente.estado,
    }
