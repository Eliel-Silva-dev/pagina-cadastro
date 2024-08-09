import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemCidade {
  id: string;
  nome: string;
}

export interface IDetalheCidade {
  id: string;
  nome: string;
}

type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAllCidades = async (
  page = 1,
  filter = '',
  id = '',
): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_per_page=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}&id_like=${id}`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data: data['data'],
        totalCount: Number(data['items'] || Environment.LIMITE_DE_LINHAS),
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

const getCidadesById = async (id: string): Promise<IDetalheCidade | Error> => {
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

const createCidades = async (
  dados: Omit<IDetalheCidade, 'id'>,
): Promise<string | Error> => {
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

const updateCidadeById = async (
  id: string,
  dados: IDetalheCidade,
): Promise<void | Error> => {
  try {
    await Api.put(`/cidades/${id}`, dados);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro',
    );
  }
};

const deleteCidadesById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/cidades/${id}`);
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};

export {
  getAllCidades,
  getCidadesById,
  createCidades,
  updateCidadeById,
  deleteCidadesById,
};
