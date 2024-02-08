import { Box, Link, Stack, Container, Grid, Typography } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { paths } from 'src/routes/paths';

export default function FooterDesktop() {
  const LINKS = [
    {
      headline: 'A propos de nous',
      children: [
        {
          name: 'Faqs',
          href: paths.faqs,
          icon: 'streamline:interface-help-question-circle-circle-faq-frame-help-info-mark-more-query-question',
        },
        { name: 'CGU', href: '/', icon: 'fa6-regular:copyright' },
        { name: 'Nos évènements', href: paths.maintenance, icon: 'mdi:events' },
        { name: 'Qui sommes-nous', href: paths.aboutUs, icon: 'mdi:about-circle-outline' },
      ],
    },
    {
      headline: 'Co-Voiturage',
      children: [
        { name: 'Rechercher un trajets', href: paths.ride.root, icon: 'akar-icons:search' },
        { name: 'Publier un trajet', href: paths.ride.root, icon: 'gala:add' },
        { name: 'On vous accompagne', href: paths.faqs, icon: 'gridicons:help-outline' },
      ],
    },
    {
      headline: 'Contact',
      children: [
        {
          name: 'contact@envoitures.com',
          href: 'mailto:contact@envoitures.com',
          icon: 'noto:e-mail',
        },
        { name: 'Envoitures', href: '#', icon: 'devicon:facebook' },
        {
          name: 'Envoiture',
          href: 'https://www.linkedin.com/company/envoitures/ ',
          icon: 'skill-icons:linkedin',
        },
        /* { name: '@envoitures', href: '#', icon: 'eva:twitter-fill' }, */
        {
          name: 'envoituresfr',
          href: 'https://www.instagram.com/envoituresfr/?igshid=MzRlODBiNWFlZA%3D%3D',
          icon: 'skill-icons:instagram',
        },
      ],
    },
  ];

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#000',
      }}
    >
      <Container sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
        <Stack alignItems="center" sx={{ pt: 10, pb: 5 }}>
          <Logo
            maxSizeWidth={250}
            maxSizeHeight={80}
            sizeWidth={239.94}
            sizeHeight={72.57}
            sx={{ mb: 3 }}
          />
        </Stack>
        <Stack
          spacing={5}
          alignContent="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
        >
          {LINKS.map((list) => (
            <Stack
              key={list.headline}
              spacing={2}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{ width: 1 }}
            >
              <Typography color="white" component="div" variant="h3">
                {list.headline}
              </Typography>

              {list.children.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  href={link.href}
                  color="inherit"
                  variant="body2"
                >
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Iconify color="#7AC8FF" icon={link.icon} />
                    <Typography color="#7AC8FF" component="div" variant="body1">
                      {link.name}
                    </Typography>
                  </Stack>
                </Link>
              ))}
            </Stack>
          ))}
        </Stack>
        <Typography color="white" variant="body2" sx={{ mt: 10 }}>
          ©2023. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
}
