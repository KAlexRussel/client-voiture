import { useScroll } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ScrollProgress from 'src/components/scroll-progress';
import HomePresentation from './home-presentation/home-presentation';
import HomeEnvoituresHelp from './home-enoitures-help/home-enoitures-help';
import HomeCostView from './home-cost/home-cost';
import HomeFamilyView from './home-family/home-family';
import HomeTogetherView from './home-together/home-together';
import HomeDestinationView from './home-destination/home-destination';

type StyledPolygonProps = {
  anchor?: 'top' | 'bottom';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(({ anchor = 'top', theme }) => ({
  left: 0,
  zIndex: 9,
  height: 80,
  width: '100%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  backgroundColor: theme.palette.background.default,
  display: 'block',
  lineHeight: 0,
  ...(anchor === 'top' && {
    top: -1,
    transform: 'scale(-1, -1)',
  }),
  ...(anchor === 'bottom' && {
    bottom: -1,
    backgroundColor: '#619FCB',
  }),
}));

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <HomePresentation />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeEnvoituresHelp />
        <HomeCostView /> {/* a definir avec Erwan quoi afficher */}
        <Box sx={{ position: 'relative' }}>
          <StyledPolygon />
          <HomeFamilyView />
          <StyledPolygon anchor="bottom" />
        </Box>
        <HomeTogetherView />
        <HomeDestinationView />
      </Box>
    </>
  );
}
