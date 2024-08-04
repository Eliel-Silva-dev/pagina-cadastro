'use client';

import { useEffect, useState } from 'react';

import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { CidadesService } from '@/shared/services/api';
import { PessoasService } from '@/shared/services/api';
import { FerramentasDaListagem } from '@/shared/components';
import { LayoutBaseDePagina } from '@/shared/layout';

export default function Home() {
  const [isLoadingCidades, setIsLoadingCidades] = useState(true);
  const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
  const [totalCountCidades, setTotalCountCidades] = useState(0);
  const [totalCountPessoas, setTotalCountPessoas] = useState(0);

  useEffect(() => {
    setIsLoadingCidades(true);
    setIsLoadingPessoas(true);

    CidadesService.getAllCidades(1).then((result) => {
      setIsLoadingCidades(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountCidades(result.totalCount);
      }
    });

    PessoasService.getAllPessoas(1).then((result) => {
      setIsLoadingPessoas(false);

      if (result instanceof Error) {
        alert(result.message);
      } else {
        setTotalCountPessoas(result.totalCount);
      }
    });
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Página inicial"
      barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}
    >
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de pessoas
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingPessoas && (
                      <Typography variant="h1">{totalCountPessoas}</Typography>
                    )}
                    {isLoadingPessoas && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Total de cidades
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {!isLoadingCidades && (
                      <Typography variant="h1">{totalCountCidades}</Typography>
                    )}
                    {isLoadingCidades && (
                      <Typography variant="h6">Carregando...</Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
        <CardContent>
          <Box display="flex"  flexDirection="column" gap={2} width={'100%'}>
            <Typography variant="h5" align="center">
              Banco de dados Offline
            </Typography>
            <Typography variant="body1" align="center">
              Desculpe o transtorno, o BackEnd da aplicação esta em manutenção.
              Não será possivel acessa-la nesse momento.
            </Typography>
            <Typography variant="body1" align="center">
              Favor acessar o{' '}
              <a
                href="https://github.com/Eliel-Silva-dev"
                target="_blank"
                rel="noreferrer"
              >
                repositório
              </a>{' '}
              e clonar o projeto
            </Typography>
          </Box>
        </CardContent>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
}
