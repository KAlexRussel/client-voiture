import { useCallback } from 'react';
import {
  Stack,
  Button,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { TRidesFilters } from 'src/types/ride';

type Props = {
  filters: TRidesFilters;
  onFilters: (name: string, value: any) => void;
  onResetFilters: VoidFunction;
};

export default function SearchToolbar({ filters, onFilters, onResetFilters }: Props) {
  const handleFilterBagage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === 'true') {
        onFilters('isBagAllowed', true);
      } else {
        onFilters('isBagAllowed', false);
      }
    },
    [onFilters]
  );
  const handleFilterAnimal = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === 'true') {
        onFilters('isAnimalAllowed', true);
      } else {
        onFilters('isAnimalAllowed', false);
      }
    },
    [onFilters]
  );
  const handleFilterFood = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === 'true') {
        onFilters('isFoodAllowed', true);
      } else {
        onFilters('isFoodAllowed', false);
      }
    },
    [onFilters]
  );
  const handleFilterMusic = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === 'true') {
        onFilters('isMusicAllowed', true);
      } else {
        onFilters('isMusicAllowed', false);
      }
    },
    [onFilters]
  );
  const handleFilterDetour = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === 'true') {
        onFilters('isDetourAllowed', true);
      } else {
        onFilters('isDetourAllowed', false);
      }
    },
    [onFilters]
  );
  const handleFilterPrice = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('price', Number(event.target.value));
    },
    [onFilters]
  );

  return (
    <Stack sx={{ p: 2.5 }}>
      <Stack sx={{ mb: 2.5 }} direction="row" justifyContent="space-between">
        <Typography variant="h5">filtrer par :</Typography>
        <Button color="primary" sx={{ flexShrink: 0 }} onClick={onResetFilters}>
          Reinitialiser
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Trajet le moins cher</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="price"
            name="price"
            value={filters.price}
            onChange={handleFilterPrice}
          >
            <FormControlLabel
              value="1"
              label="Oui"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
            <FormControlLabel
              value="0"
              label="Non"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Accepte les bagages</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="bagage"
            name="isBagAllowed"
            value={filters.isBagAllowed.toString()}
            onChange={handleFilterBagage}
          >
            <FormControlLabel
              value="true"
              label="Oui"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
            <FormControlLabel
              value="false"
              label="Non"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Animaux autorisés</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="animal"
            name="isAnimalAllowed"
            value={filters.isAnimalAllowed}
            onChange={handleFilterAnimal}
          >
            <FormControlLabel
              value="true"
              label="Oui"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
            <FormControlLabel
              value="false"
              label="Non"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Nourriture autorisée</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="food"
            name="isFoodAllowed"
            value={filters.isFoodAllowed}
            onChange={handleFilterFood}
          >
            <FormControlLabel
              value="true"
              label="Oui"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
            <FormControlLabel
              value="false"
              label="Non"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Musique autorisée</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="music"
            name="isMusicAllowed"
            value={filters.isMusicAllowed}
            onChange={handleFilterMusic}
          >
            <FormControlLabel
              value="true"
              label="Oui"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
            <FormControlLabel
              value="false"
              label="Non"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Détour autorisé</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="detour"
            name="isDetourAllowed"
            value={filters.isDetourAllowed}
            onChange={handleFilterDetour}
          >
            <FormControlLabel
              value="true"
              label="Oui"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
            <FormControlLabel
              value="false"
              label="Non"
              control={<Radio sx={{ '&, &.Mui-checked': { color: '#663F81' } }} />}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Stack>
  );
}
