import { useState, useCallback } from 'react';
import { Card, Container, Tab, Tabs, tabsClasses } from '@mui/material';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { m } from 'framer-motion';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { MotionViewport, varHover } from 'src/components/animate';
import { useSelector } from 'src/redux/store';
import { ProfileCover } from '../component';
import UserInfoView from './info/user-info-view';
import UserTrajetView from './trajet/user-trajet-view';
import UserReviewView from './review/user-review-view';
import ChatView from './chat/user-chat-view';

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'trajet',
    label: 'Trajet',
    icon: <Iconify icon="fa6-solid:route" width={24} />,
  },
  {
    value: 'avis',
    label: 'Avis',
    icon: <Iconify icon="streamline:interface-favorite-star-reward-rating-rate-social-star-media-favorite-like-stars" width={24} />,
  },
  {
    value: 'messages',
    label: 'Messages',
    icon: <Iconify icon="jam:message-alt" width={24} />,
  },
];

export default function UserProfileView() {
  const settings = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('profile');
  const { profil } = useSelector((state) => state.account);

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container component={MotionViewport} maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'accueil', href: '/' },
          { name: 'Profil' },
          { name: `${profil.fname}` },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card
        sx={{
          mb: 3,
          height: 350,
        }}
      >
        <ProfileCover
          name={`${profil?.fname} ${profil?.lname}`}
          avatarUrl={profil?.imageName ?? '/assets/images/avatar.jpg'}
          coverUrl="/assets/images/cover/cover_21.jpg"
          // coverUrl={profil?.coverImage}
          tel={profil?.phoneNumber}
          age={profil?.age}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              component={m.div}
              whileTap="tap"
              whileHover="hover"
              variants={varHover(1.1)}
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={tab.label}
              sx={{
                color: '#619FCB',
              }}
            />
          ))}
        </Tabs>
      </Card>
      {currentTab === 'profile' && <UserInfoView />}
      {currentTab === 'trajet' && <UserTrajetView />}
      {currentTab === 'avis' && <UserReviewView />}
      {currentTab === 'messages' && <ChatView />}
    </Container>
  );
}
