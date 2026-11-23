export interface Job {
  role: string;
  company: string;
  period: string;
  description?: string;
}

export interface Study {
  title: string;
  center: string;
  period: string;
  current?: boolean; // la formación actual se destaca en lima
  note?: string;
}

export const experience: Job[] = [
  {
    role: 'Desarrollador full stack (prácticas)',
    company: 'EyeSeeTea',
    period: 'Mar 2025 — Jun 2025',
    description: 'Colaboré en proyectos reales usando TypeScript y React.',
  },
  {
    role: 'Técnico de hardware (prácticas)',
    company: 'Informática NoSoloPC',
    period: 'Mar 2022 — Jun 2022',
  },
];

export const education: Study[] = [
  {
    title: 'Desarrollo de Aplicaciones Web',
    center: 'Grado Superior · IES Las Fuentezuelas, Jaén',
    period: '2025 — 2027',
    current: true,
  },
  {
    title: 'Máster en Inteligencia Artificial y Big Data',
    center: 'IMF Business School',
    period: '2025 — 2026',
    note: 'TFM: predicción horaria de la demanda eléctrica',
  },
  {
    title: 'Desarrollo de Aplicaciones Multiplataforma',
    center: 'Grado Superior · MEDAC Aventura',
    period: '2023 — 2025',
  },
  {
    title: 'Sistemas Microinformáticos y Redes',
    center: 'Grado Medio · IES Andrés de Vandelvira',
    period: '2020 — 2022',
  },
];