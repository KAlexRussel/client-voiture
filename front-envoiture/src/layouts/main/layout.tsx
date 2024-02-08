import Box from '@mui/material/Box';
import { usePathname } from 'src/routes/hook';
import { useResponsive } from 'src/hooks/use-responsive';
import Header from './header';
import { FooterMobile, FooterDesktop } from './footer';

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();
  const isDesktop = useResponsive('up', 'md');
  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      {isDesktop ? <FooterDesktop /> : <FooterMobile />}
    </Box>
  );
}
