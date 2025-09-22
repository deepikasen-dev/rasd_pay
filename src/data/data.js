import strings from '../utils/strings';
import otherStrings from '../utils/otherStrings';


export const slides = [
  {
    id: '1',
    title: otherStrings.welcomeMessage,
    subtitle: otherStrings.description1,
    image: require('../assets/pngs/Onboarding1.png'),
  },
  {
    id: '2',
    title: otherStrings.description2,
    subtitle: otherStrings.description3,
    image: require('../assets/pngs/Onboarding2.png'),
  },
  {
    id: '3',
    title: otherStrings.description4,
    subtitle: otherStrings.description5,
    image: require('../assets/pngs/Onboarding3.png'),
  },
];

export const TABS = [
    { key: 'all', label: strings.all },
    { key: 'pending', label: strings.pending },
    { key: 'approved', label: strings.approved },
    { key: 'rejected', label: strings.rejected },
];
  
