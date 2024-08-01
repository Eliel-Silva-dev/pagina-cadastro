'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import * as yup from 'yup';

import { CidadesService } from '@/shared/services/api';
import { VTextField, VForm, useVForm, IVFormsErros } from '@/shared/forms';
import { FerramentasDeDetalhe } from '@/shared/components';
import { LayoutBaseDePagina } from '@/shared/layout/LayoutBaseDePagina';

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup
  .object()
  .shape({ nome: yup.string().required().min(3) });

const DetalheDeCidades = () => {
  const { formRef, save, saveAndClose, isSavingAndClose } = useVForm();

  const search = useSearchParams();
  const id = search.get('id');
  const navigate = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    console.log(id);
    if (id !== 'nova') {
      setIsLoading(true);

      CidadesService.getCidadesById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate.push('/cidadesListagem');
        } else {
          setNome(result.nome);
          formRef.current?.setData(result);
        }
      });
    } else {
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nova') {
          CidadesService.createCidades(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSavingAndClose()) {
                navigate.push('/cidadesListagem');
              } else {
                navigate.push(`/cidadesDetalhe?id=${result}`);
              }
            }
          });
        } else {
          CidadesService.updateCidadeById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (isSavingAndClose()) {
                navigate.push('/cidadesListagem');
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErros: IVFormsErros = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErros[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErros);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteCidadesById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso"');
          navigate.push('/cidadesListagem');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmVoltar={() => navigate.push('/cidadesListagem')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate.push('/cidadesDetalhe?id=nova')}
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
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name="nome"
                  label="Nome"
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};

export default DetalheDeCidades;