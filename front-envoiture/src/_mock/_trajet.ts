import { add } from 'date-fns';
import { fDate } from 'src/utils/format-time';

export const TRAJET_TYPE_OPTIONS = [
  { value: 'conducteur', label: 'Conducteur' },
  { value: 'passager', label: 'Passager' },
];

export const _PasseTrajet = [
  {
    from: 'Paris',
    to: 'Dijon',
    date: new Date('8/12/2022'),
    price: 30,
  },
  {
    from: 'Paris',
    to: 'Lyon',
    date: new Date('10/11/2022'),
    price: 35,
  },
  {
    from: 'Marseille',
    to: 'Dijon',
    date: new Date('8/01/2023'),
    price: 40,
  },
  {
    from: 'Paris',
    to: 'Dijon',
    date: new Date('5/12/2022'),
    price: 30,
  },
  {
    from: 'Paris',
    to: 'Vesoul',
    date: new Date('6/12/2022'),
    price: 25,
  },
];

export const _ToBeTrajet = [
  {
    from: 'Paris',
    to: 'Dijon',
    date: new Date('2/07/2022'),
    price: 30,
  },
];

export const _Trajets = [
  {
    id: 0,
    from: 'Paris',
    to: 'Dijon',
    date: fDate(new Date('8/08/2023')),
    price: 30,
    nbPassenger: 3,
    availablePlace: 0,
    type: 'passager',
    animal: '1',
    bagage: '0',
    TrajetPublisher: {
      name: 'Elodie J.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      profilImage: '/assets/images/passenger.png',
      carImage: '/assets/images/c4.jpg',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Thomas D',
        age: 34,
        image: '/assets/images/reviewer1.png',
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      }]
    }
  },
  {
    id: 1,
    from: 'Paris',
    to: 'Lyon',
    date: fDate(new Date('8/08/2023')),
    price: 35,
    nbPassenger: 1,
    availablePlace: 2,
    type: 'passenger',
    animal: '0',
    bagage: '1',
    TrajetPublisher: {
      name: 'Elodie J.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      carImage: '/assets/images/c4.jpg',
      profilImage: '/assets/images/passenger.png',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Thomas D',
        age: 34,
        image: '/assets/images/reviewer1.png',
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      }]
    }
  },
  {
    id: 2,
    from: 'Marseille',
    to: 'Dijon',
    date: fDate(new Date('8/08/2023')),
    price: 40,
    nbPassenger: 2,
    availablePlace: 1,
    type: 'conducteur',
    animal: '1',
    bagage: '0',
    TrajetPublisher: {
      name: 'Thomas D.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      carImage: '/assets/images/c4.jpg',
      profilImage: '/assets/images/conducteur.png',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Stephane P',
        age: 34,
        image: '/assets/images/reviewer2.png',
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      },
      {
        name: 'Erwan D',
        age: 54,
        image: '/assets/images/reviewer1.png',
        trajetDate: '17/09/2022',
        comment: 'Très sympa',
        rate: 4,
      }]
    }
  },
  {
    id: 3,
    from: 'Paris',
    to: 'Dijon',
    date: fDate(new Date('8/08/2023')),
    price: 30,
    nbPassenger: 1,
    availablePlace: 2,
    type: 'passenger',
    animal: '0',
    bagage: '1',
    TrajetPublisher: {
      name: 'Elodie J.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      carImage: '/assets/images/c4.jpg',
      profilImage: '/assets/images/passenger.png',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Thomas D',
        age: 34,
        image: '/assets/images/reviewer1.png',
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      }]
    }
  },
  {
    id: 4,
    from: 'Paris',
    to: 'Vesoul',
    date: fDate(new Date('8/08/2023')),
    price: 25,
    nbPassenger: 2,
    availablePlace: 1,
    type: 'conducteur',
    animal: '1',
    bagage: '0',
    TrajetPublisher: {
      name: 'Thomas D.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      carImage: '/assets/images/c4.jpg',
      profilImage: '/assets/images/conducteur.png',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Stephane P',
        age: 34,
        image: '/assets/images/reviewer2.png',
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      },
      {
        name: 'Erwan D',
        age: 54,
        image: '/assets/images/reviewer1.png',
        trajetDate: '17/09/2022',
        comment: 'Très sympa',
        rate: 4,
      }]
    }
  },
  {
    id: 5,
    from: 'Paris',
    to: 'Dijon',
    date: fDate(new Date('8/08/2023')),
    price: 30,
    nbPassenger: 0,
    availablePlace: 3,
    type: 'conducteur',
    animal: '1',
    bagage: '0',
    TrajetPublisher: {
      name: 'Thomas D.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      carImage: '/assets/images/c4.jpg',
      profilImage: '/assets/images/conducteur.png',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Stephane P',
        age: 34,
        image: '/assets/images/reviewer1.png',
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      },
      {
        name: 'Erwan D',
        age: 54,
        image: '/assets/images/reviewer2.png',
        trajetDate: '17/09/2022',
        comment: 'Très sympa',
        rate: 4,
      }]
    }
  },
  {
    id: 6,
    from: 'Marseille',
    to: 'Dijon',
    date: fDate(new Date('8/08/2023')),
    price: 20,
    nbPassenger: 2,
    availablePlace: 1,
    type: 'passenger',
    animal: '1',
    bagage: '0',
    TrajetPublisher: {
      name: 'Elodie J.',
      age: 28,
      rating: 4,
      carName: 'Citroen c4',
      carImage: '/assets/images/c4.jpg',
      profilImage: '/assets/images/passenger.png',
      phoneNumber: '+331144556699',
      review: [{
        name: 'Thomas D',
        image: '/assets/images/reviewer1.png',
        age: 34,
        trajetDate: '17/09/2022',
        comment: 'excellent partenaire de voyage',
        rate: 4,
      }]
    }
  },
];
