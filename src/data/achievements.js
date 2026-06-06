import { SiPython, SiPytorch, SiFastapi } from 'react-icons/si';
import { TbBrain } from 'react-icons/tb';

export const achievements = [
  {
    id: 'python-challenge',
    number: 100,
    suffix: '+',
    label: 'Days of Python',
    description: 'Continuous coding challenge',
    icon: SiPython,
  },
  {
    id: 'ml-projects',
    number: 4,
    suffix: '+',
    label: 'ML Projects Built',
    description: 'End-to-end machine learning',
    icon: TbBrain,
  },
  {
    id: 'dl-journey',
    number: null,
    suffix: '',
    displayValue: '∞',
    label: 'Deep Learning Journey',
    description: 'Always learning, never stopping',
    icon: SiPytorch,
  },
  {
    id: 'fastapi-apps',
    number: 3,
    suffix: '+',
    label: 'FastAPI Applications',
    description: 'Production-grade APIs',
    icon: SiFastapi,
  },
];
