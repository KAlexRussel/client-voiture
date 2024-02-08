import { useCallback, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { LoginDialogue } from 'src/sections/auth';
import { View403 } from 'src/sections/error';
import Image from 'src/components/image';
import { useSettingsContext } from 'src/components/settings';
import { MotionViewport, varFade } from 'src/components/animate';
import { NewRideForm } from '../component';

export default function RideView() {
  const upMd = useResponsive('up', 'md');
  const settings = useSettingsContext();
  const { user } = useAuthContext();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleClosenModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    if (user?.id) {
      handleClosenModal();
    } else {
      handleOpenModal();
    }
  }, [user, handleClosenModal, handleOpenModal]);

  const renderHeader = (
    <Stack alignItems="center" spacing={3}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ color: '#619FCB' }}>
          Publier un trajet
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Divider />
      </m.div>
    </Stack>
  );

  const renderImg = (
    <m.div variants={varFade().inUp}>
      <Image
        alt="darkmode"
        src="/assets/images/home/Envoiture_11.png"
        sx={{
          borderRadius: 2,
        }}
      />
    </m.div>
  );

  return (
    <Container component={MotionViewport}>
      {renderHeader}
      <Grid container alignItems="center" justifyContent="space-between" spacing={{ xs: 5, md: 0 }}>
        {upMd && (
          <Grid item xs={12} md={6}>
            {renderImg}
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <m.div variants={varFade().inUp}>
            <Card
              sx={{
                marginLeft: upMd ? 20 : 0,
                borderRadius: 2,
                my: { xs: 5, md: 10 },
                boxShadow: (theme) => `-10px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
              }}
            >
              <CardContent>
                {user?.id ? (
                  <NewRideForm />
                ) : (
                  <>
                    <View403 />
                    <LoginDialogue openModal={openModal} onClose={() => handleClosenModal()} />
                  </>
                )}
              </CardContent>
            </Card>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}
