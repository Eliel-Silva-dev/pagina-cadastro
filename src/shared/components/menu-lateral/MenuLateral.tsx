'use client';

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

import { Logout, DarkMode, Home } from '@mui/icons-material';

import { useRouter } from 'next/router';
interface IListItemLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({
  href,
  label,
  children,
  onClick,
}: IListItemLinkProps) => {
  const router = useRouter();

  const isActive = router.pathname === href;
  console.log(router.pathname, isActive);

  const handleClick = () => {
    router.push(href);
    onClick?.();
  };
  return (
    <ListItemButton selected={!!isActive} onClick={handleClick}>
      <ListItemIcon>{children}</ListItemIcon>
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
        onClose={toggleDrawerOpen} // evento de fechar disparado ao clicar fora do drawer. quando esse evento é disparado ele invoca o toggleDrawerOpen fechando o drawer.
      >
        <Box
          width={theme.spacing(28)}
          /*
          spacing: unidade de medida do mui.(essa função trabalha com múltiplos de 8. cada unidade spacing equivale a 4px. então spacing(2) == 8px...)
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
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }} // trabalha as características da imagem como altura, largura...
              src="/img/imgfotologo.svg"
            />
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              <ListItemLink
                href={'/'}
                label={'Inicio'}
                onClick={smDown ? toggleDrawerOpen : undefined}
              >
                <Home />
              </ListItemLink>
              <ListItemLink
                href={'/pessoas'}
                label={'pessoas'}
                onClick={smDown ? toggleDrawerOpen : undefined}
              >
                <Home />
              </ListItemLink>
              <ListItemLink
                href={'/cidades'}
                label={'cidades'}
                onClick={smDown ? toggleDrawerOpen : undefined}
              >
                <Home />
              </ListItemLink>
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>
                    <DarkMode />
                  </Icon>
                </ListItemIcon>
                <ListItemText
                  primary="Alterar tema"
                  //texto do botão
                />
              </ListItemButton>

              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>
                    <Logout />
                  </Icon>
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
