'use client';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { useRouter, usePathname } from 'next/navigation';

interface IListItemLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
  onClick: (() => void) | undefined;
}

const ListItemLink = ({
  href,
  label,
  children,
  onClick,
}: IListItemLinkProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive = pathName === href;
  console.log(pathName, isActive);

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

export default ListItemLink;
