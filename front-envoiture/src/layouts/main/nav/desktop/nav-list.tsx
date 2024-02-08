import { useEffect } from 'react';
import { Fade, Stack, Portal } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { usePathname, useActiveLink } from 'src/routes/hook';
import { NavItemProps } from '../types';
import { NavItem } from './nav-item';
import { StyledSubheader, StyledMenu } from './styles';

type NavListProps = {
  item: NavItemProps;
  offsetTop: boolean;
};

export default function NavList({ item, offsetTop }: NavListProps) {
  const pathname = usePathname();
  const nav = useBoolean();
  const { path, children } = item;
  const active = useActiveLink(path, false);
  const externalLink = path.includes('http');

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = () => {
    if (children) {
      nav.onTrue();
    }
  };

  return (
    <>
      <NavItem
        item={item}
        offsetTop={offsetTop}
        active={active}
        open={nav.value}
        externalLink={externalLink}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={nav.onFalse}
      />

      {!!children && nav.value && (
        <Portal>
          <Fade in={nav.value}>
            <StyledMenu
              onMouseEnter={handleOpenMenu}
              onMouseLeave={nav.onFalse}
              sx={{ display: 'flex' }}
            >
              {children.map((list) => (
                <NavSubList
                  key={list.subheader}
                  subheader={list.subheader}
                  items={list.items}
                  onClose={nav.onFalse}
                />
              ))}
            </StyledMenu>
          </Fade>
        </Portal>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavSubListProps = {
  subheader: string;
  items: NavItemProps[];
  onClose: VoidFunction;
};

function NavSubList({ items, subheader, onClose }: NavSubListProps) {
  const pathname = usePathname();

  return (
    <Stack
      spacing={1}
      alignItems="flex-start"
      sx={{
        flexGrow: 1,
      }}
    >
      <StyledSubheader disableSticky>{subheader}</StyledSubheader>

      {items.map((item) => (
        <NavItem
          subItem
          key={item.title}
          item={item}
          active={pathname === item.path}
          onClick={onClose}
        />
      ))}
    </Stack>
  );
}
