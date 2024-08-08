'use client';

import { useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';

import * as yup from 'yup';

import { useAuthContext } from '@/shared/contexts';

const loginSchema = yup.object().shape({
  email: yup.string().email('Insira um email válido').required('O email é obrigatório'),
  password: yup.string().required('A senha é obrigatória').min(5, 'A senha precisa ter pelo menos 5 caracteres'),
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }: ILoginProps) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    setIsLoading(true);

    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password).then(() => {
          setIsLoading(false);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);

        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Card>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={400}>
            <Typography variant="h6" align="center">
              Login
            </Typography>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError}
              onKeyDown={() => setEmailError('')}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Senha"
              type="password"
              value={password}
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError}
              onKeyDown={() => setPasswordError('')}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </CardContent>

        <CardContent>
          <Box width="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              fullWidth
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={
                isLoading ? (
                  <CircularProgress
                    variant="indeterminate"
                    color="inherit"
                    size={20}
                  />
                ) : undefined
              }
            >
              Entrar
            </Button>
          </Box>
        </CardContent>

        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={400}>
            <Typography variant="h6" align="center">
              Dados de login:
            </Typography>
            <Typography variant="body1">E-mail: teste@gmail.com</Typography>
            <Typography variant="body1">Senha: 123456</Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} width={400}>
            <Typography variant="h5" align="center">
              Banco de dados em manutenção.
            </Typography>
            <Typography variant="body1">
              Desculpe o transtorno, o banco de dados da aplicação esta em
              manutenção.
            </Typography>
            <Typography variant="body1">
              Algumas funcionalidades podem estar fora do ar nesse momento.
            </Typography>
            <Typography variant="body1" align="center">
              Favor acessar o{' '}
              <a
                href="https://github.com/Eliel-Silva-dev/pagina-cadastro"
                target="_blank"
                rel="noreferrer"
              >
                Repositório
              </a>{' '}
              e clonar o projeto
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
