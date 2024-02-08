import { m } from 'framer-motion';
import {
  Button,
  Card,
  Stack,
  Typography,
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  DialogActions,
} from '@mui/material';
import { varFade } from 'src/components/animate';

interface Props extends DialogProps {
  onClose: any;
  open: boolean;
}

export default function AboutText({ open, onClose, ...other }: Props) {
  return (
    <Dialog maxWidth="md" open={open} onClose={onClose} {...other}>
      <DialogTitle> Qui sommes-nous ? </DialogTitle>
      <DialogContent dividers sx={{ overflow: 'unset' }}>
        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            Depuis toujours, se déplacer est vital pour l’homme. Les mouvements démographiques
            amènent les populations à se déplacer massivement en quête de nouveaux horizons. Pour
            favoriser et faciliter ces déplacements, l’homme a mis en place des moyens de transport
            public et privé tel que : l’avions, bateau, voitures, vélo, moto, trains…
          </Typography>
        </m.div>
        <br />
        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            Ces modes de déplacements autrefois mise en place pour permettre de gagner en temps sont
            de moins en moins adaptés du fait de son accessibilité et la population grandissante.Ces
            modes de déplacements autrefois mise en place pour permettre de gagner en temps sont de
            moins en moins adaptés du fait de son accessibilité et la population grandissante.
          </Typography>
        </m.div>
        <br />
        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            Ce fléau amène la population à ne prendre aucun risque en s’orientant vers des modes de
            déplacements les plus confortable et pratique. Pendant que d’autre prennent leur vélo,
            certains choisissent la marche à pied ou moto, ou leur véhicule…
          </Typography>
        </m.div>
        <br />
        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            Le coté confort et pratique recherché peut s’avérer être un cauchemar pour beaucoup.
            Environ 80% des Français utilisent leur véhicule personnel pour des courtes et longues
            distances. Ce qui crée des saturations sur les routes et augmente le temps de
            déplacement pour un bon nombre de français. A ceci, s’ajoute le cout annuel de
            l’entretien d’un véhicule, l’inflation, la baisse du pouvoir d’achat des ménages…
          </Typography>
        </m.div>
        <br />
        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            Aujourd’hui, on observe une population de plus en plus sensible aux questions liées à
            l’environnement. Ceci amené les citoyens vivants en zone Urbaine à opter pour des
            déplacements quotidiens des alternatives tel que le vélo, trottinettes, scooter
            électrique…pour gagner en temps.
          </Typography>
        </m.div>
        <br />
        <m.div variants={varFade().inRight}>
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
            Toutefois, pour des déplacements longue distance (trajets quotidiens, week-end,
            vacances) la question se pose encore. Car, nombreux sont les personnes voyageant avec
            des sièges vides. Doivent-elles continuer de subir les points cités ci-dessus ? ou
            pouvons-nous les mobiliser afin de leur permettre de gagner en temps et faire des
            économies ?
          </Typography>
        </m.div>
      </DialogContent>
      <DialogActions>
      <Button variant="outlined" color="inherit" onClick={onClose}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
