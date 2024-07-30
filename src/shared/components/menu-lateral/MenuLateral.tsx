import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
//listClasses pra que serve?

import { Box } from '@mui/system'; // é tipo uma div

import {
  useAppThemeContext,
  useDrawerContext,
  useAuthContext,
} from '@/shared/contexts';

//import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
// qual o equivalente do router no next?

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}: IListItemLinkProps) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.(); // se não for undefined atribui fuc
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface IMenuLateralProps {
  children: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({
  children,
}: IMenuLateralProps) => {
  const theme = useTheme(); //trás todos os dados relacionados ao tema em exclusão.
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // se a largura for menor q sm(600px) retorna true

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? 'temporary' : 'permanent'}
        /*
          temporary: fica por cima do conteúdo sem empurrar os outros.
          permanent: fica sempre visível, e empurra o conteúdo ao redor.
        */
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          /*
          spacing: unidade de medida do mui.(essa função trabalha com multiplos de 8. cada unidade spacing equivale a 4px. então spacing(2) == 8px...)
          */
          height="100%"
          display="flex" // transforma os filhos em flex com flex direction de row.
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)} // 20*4px == 80px
            display="flex"
            alignItems="center" // centraliza a imagem
            justifyContent="center" // centraliza a imagem
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }} // trabalha as caracteristicas da imagem como altura, largura...
              src="/img/imgfotologo.svg"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon
                  // para colocar um ícone com mui basta abrir e fechar a tag <icon>passando o nome do ícone entre elas</icon>
                  >
                    dark_mode
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary="Alterar tema"
                  //texto do botão
                />
              </ListItemButton>

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box
        height="100vh" //100% da altura da tela.
        marginLeft={smDown ? 0 : theme.spacing(28)}
        // se a largura da tela for menor que 600px == marginLeft ganha 0px, se for maior que 600px ela ganha 28spacing == 28*4px == 112px.
      >
        {children}
      </Box>
    </>
  );
};
