import { Api } from '../axios-config';

export interface IListagemCidade {
  id: number;
  nome: string;
}

export interface IDetalheCidade {
  id: number;
  nome: string;
}

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
  id = '',
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page${page}&nome_like=${filter}&id_like=${id}`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data: data['data'],
        totalCount: Number(data['items']),
      };
    }

    return new Error('erro ao listar os registros');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros.',
    );
  }
};

const getId = async (id: number): Promise<IDetalheCidade | Error> => {
  try {
    const { data } = await Api.get(`/cidades/${id}`);

    if (data) {
      return data;
    }

    return new Error('Erro ao consultar os registros');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao consultar os registro',
    );
  }
};

const create = async (
  dados: Omit<IDetalheCidade, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro.',
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheCidade,
): Promise<void | Error> => {
  try {
    await Api.put(`/cidade/${id}`, dados);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro',
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};

export { getAll, getId, create, updateById, deleteById };
