import { Environment } from '@/shared/environment';
import { Api } from '../axios-config';

export interface IListagemPessoa {
  id: string;
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

export interface IDetalhePessoa {
  id: string;
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const getAllPessoas = async (
  page = 1,
  filter = '',
): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_per_page=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

    const { data } = await Api.get(urlRelativa);

    if (data) {
      return {
        data: data['data'],
        totalCount: Number(data['items'] || Environment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao listar registros');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao listar os registros.',
    );
  }
};
const getPessoasById = async (id: string): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);
    if (data) {
      return data;
    }

    return new Error('erro ao consultar registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao consultar o registro',
    );
  }
};
const createPessoas = async (
  dados: Omit<IDetalhePessoa, 'id'>,
): Promise<string | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);

    if (data) {
      return data.id;
    }

    return new Error('Erro ao criar o registro');
  } catch (error) {
    console.error(error);

    return new Error(
      (error as { message: string }).message || 'Erro ao criar o registro',
    );
  }
};
const updatePessoasById = async (
  id: string,
  dados: IDetalhePessoa,
): Promise<void | Error> => {
  try {
    await Api.put(`/pessoas/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao atualizar o registro',
    );
  }
};
const deletePessoasById = async (id: string): Promise<void | Error> => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || 'Erro ao apagar o registro',
    );
  }
};

export {
  getAllPessoas,
  getPessoasById,
  createPessoas,
  updatePessoasById,
  deletePessoasById,
};
