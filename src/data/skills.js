import {
  SiPython,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiPytorch,
  SiFastapi,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiDocker,
  SiKubernetes,
} from 'react-icons/si';
import { TbApi, TbBrain, TbServer } from 'react-icons/tb';

export const skillCategories = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    icon: TbBrain,
    color: '#FF6A00',
    skills: [
      { name: 'Python', icon: SiPython },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'Pandas', icon: SiPandas },
      { name: 'Scikit-Learn', icon: SiScikitlearn },
      { name: 'PyTorch', icon: SiPytorch },
    ],
  },
  // {
  //   id: 'backend',
  //   title: 'Backend',
  //   icon: TbServer,
  //   color: '#3B82F6',
  //   skills: [
  //     { name: 'FastAPI', icon: SiFastapi },
  //     { name: 'APIs', icon: TbApi },
  //     { name: 'SQL', icon: SiPostgresql },
  //   ],
  // },
  {
    id: 'tools',
    title: 'Tools',
    icon: SiGit,
    color: '#8B5CF6',
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
    ],
  },
  {
    id: 'learning',
    title: 'Currently Learning',
    icon: TbBrain,
    color: '#10B981',
    skills: [
      { name: 'Deep Learning', icon: TbBrain },
      { name: 'MLOps', icon: TbServer },
      { name: 'Kubernetes', icon: SiKubernetes },
    ],
  },
];
