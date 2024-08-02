'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';

import { PessoasService } from '@/shared/services/api';
import { IVFormsErros, VForm, VTextField, useVForm } from '@/shared/forms';
import { AutoCompleteCidade } from '@/shared/components';
import { FerramentasDeDetalhe } from '@/shared/components';
import { LayoutBaseDePagina } from '@/shared/layout';

interface IFormData {
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  email: yup.string().required().email(),
  cidadeId: yup.string().required(),
  nomeCompleto: yup.string().required().min(3),
});

const DetalheDePessoas = () => {
  const { formRef, save, saveAndClose, isSavingAndClose } = useVForm();
  const search = useSearchParams();
  const id = search.get('id');
  const navigate = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getPessoasById(String(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate.push('/pessoasListagem');
        } else {
          setNome(result.nomeCompleto);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        email: '',
        nomeCompleto: '',
        cidadeId: undefined,
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          PessoasService.createPessoas(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSavingAndClose()) {
                navigate.push('/pessoasListagem');
              } else {
                navigate.push(`/pessoasDetalhe?id=${result}`);
              }
            }
          });
        } else {
          PessoasService.updatePessoasById(String(id), {
            id: String(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSavingAndClose()) {
                navigate.push('/pessoasListagem');
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const ValidationErrors: IVFormsErros = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          ValidationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(ValidationErrors);
      });
  };

  const handleDelete = (id: string) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deletePessoasById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate.push('/pessoasListagem');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate.push('/pessoasListagem')}
          aoClicarEmApagar={() => handleDelete(String(id))}
          aoClicarEmNovo={() => navigate.push('/pessoasDetalhe?id=nova')}
        />
      }
    >
      <VForm placeholder="formulario" ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="nomeCompleto"
                  disabled={isLoading}
                  label="Nome completo"
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="email"
                  label="Email"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <AutoCompleteCidade />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};

export default DetalheDePessoas;
