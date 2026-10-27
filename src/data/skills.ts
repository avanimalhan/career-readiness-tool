export interface Skill {
  id: string;
  name: string;
  importance: number; // Weight for overall score calculation
  description: string;
}

export const SKILLS: Record<string, Skill[]> = {
  sde: [
    { id: 'sde-dsa', name: 'Data Structures & Algorithms', importance: 3, description: 'The foundation of efficient problem solving and optimal code.' },
    { id: 'sde-sys', name: 'System Design', importance: 3, description: 'Ability to architect scalable, reliable, and maintainable systems.' },
    { id: 'sde-lang', name: 'Language Proficiency', importance: 2, description: 'Deep understanding of your primary language and its ecosystem.' },
    { id: 'sde-git', name: 'Version Control & Collab', importance: 1, description: 'Essential for working in professional team environments.' },
    { id: 'sde-db', name: 'Databases', importance: 2, description: 'Managing data persistence and optimizing query performance.' },
  ],
  da: [
    { id: 'da-sql', name: 'SQL & Database Querying', importance: 3, description: 'The primary tool for extracting and manipulating structured data.' },
    { id: 'da-stat', name: 'Statistics & Math', importance: 3, description: 'Ensuring data insights are mathematically sound and unbiased.' },
    { id: 'da-viz', name: 'Data Visualization', importance: 2, description: 'Communicating complex data stories through intuitive visuals.' },
    { id: 'da-py', name: 'Python/Excel', importance: 2, description: 'The core toolkit for data cleaning and exploratory analysis.' },
    { id: 'da-biz', name: 'Business Domain Knowledge', importance: 1, description: 'Translating raw data into actionable business value.' },
  ],
  pm: [
    { id: 'pm-strat', name: 'Product Strategy', importance: 3, description: 'Defining the vision and long-term direction of the product.' },
    { id: 'pm-exec', name: 'Execution & Delivery', importance: 3, description: 'Turning roadmaps into shipped features through agile management.' },
    { id: 'pm-res', name: 'User Research', importance: 2, description: 'Understanding the user’s pain points via qualitative feedback.' },
    { id: 'pm-ana', name: 'Product Analytics', importance: 2, description: 'Using data to track success and iterate on features.' },
    { id: 'pm-stake', name: 'Stakeholder Management', importance: 1, description: 'Aligning engineering, design, and business goals.' },
  ],
  devops: [
    { id: 'do-infra', name: 'Infrastructure as Code', importance: 3, description: 'Managing cloud resources programmatically for consistency.' },
    { id: 'do-cont', name: 'Containers & K8s', importance: 3, description: 'Standardizing environments and orchestrating deployments.' },
    { id: 'do-cicd', name: 'CI/CD Pipelines', importance: 2, description: 'Automating the path from code commit to production.' },
    { id: 'do-obs', name: 'Observability & Monitoring', importance: 2, description: 'Ensuring system health and rapid incident response.' },
    { id: 'do-lin', name: 'Linux & Scripting', importance: 1, description: 'The bedrock of server management and automation.' },
  ],
};
