'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { IListagemCidade } from '@/shared/services/api/cidades/CidadesService';
import { CidadesService } from '@/shared/services/api';
import { FerramentasDaListagem } from '@/shared/components';
import { LayoutBaseDePagina } from '@/shared/layout';
import { Environment } from '@/shared/environment';
import { useDebounce } from '@/shared/hooks';
import { Delete, Edit } from '@mui/icons-material';

const ListagemDeCidades = () => {
  const searchParams = useSearchParams();
  const { debounce } = useDebounce();
  const navigate = useRouter();
  const pathName = usePathname();

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  const mudarTextoBusca = (texto: string, pagina: string) => {
    navigate.push(`${pathName.toString()}?pagina=${pagina}&busca=${texto}`);
  };

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {

      CidadesService.getAllCidades(pagina, busca).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);

          setTotalCount(result.totalCount);
          setRows(result.data);
        }
      });
    });
  }, [busca, pagina]);

  const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteCidadesById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => [
            ...oldRows.filter((oldRow) => oldRow.id !== id),
          ]);
          alert('Registro apagado com sucesso');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo="Listagem de cidades"
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputBusca
          textoDaBusca={busca}
          textoBotaoNovo="Nova"
          aoClicarEmNovo={() => navigate.push('/cidadesDetalhe?id=nova')}
          aoMudarTextoDeBusca={(texto) => mudarTextoBusca(texto, '1')}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row.id)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate.push(`/cidadesDetalhe?id=${row.id}`)
                      }
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.nome}</TableCell>
                </TableRow>
              ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}

            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      mudarTextoBusca(busca, newPage.toString())
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};

export default ListagemDeCidades;
