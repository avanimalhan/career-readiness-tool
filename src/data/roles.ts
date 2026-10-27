export interface Role {
  id: string;
  name: string;
  emoji: string;
  icon: string; // lucide-react icon name
}

export const ROLES: Role[] = [
  { id: 'sde', name: 'Software Engineer', emoji: '💻', icon: 'Code' },
  { id: 'da', name: 'Data Analyst', emoji: '📊', icon: 'BarChart3' },
  { id: 'pm', name: 'Product Manager', emoji: '🧭', icon: 'Compass' },
  { id: 'devops', name: 'DevOps Engineer', emoji: '⚙️', icon: 'Server' },
];
