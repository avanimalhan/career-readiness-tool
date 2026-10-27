export type QuestionType = 'likert' | 'binary';

export interface Question {
  id: string;
  skillId: string;
  text: string;
  type: QuestionType;
  weight: number; // 1-3
}

export const QUESTIONS: Record<string, Question[]> = {
  sde: [
    // Data Structures & Algorithms (sde-dsa)
    { id: 'sde-dsa-1', skillId: 'sde-dsa', text: "How comfortable are you with implementing complex data structures like Red-Black Trees or Tries?", type: 'likert', weight: 3 },
    { id: 'sde-dsa-2', skillId: 'sde-dsa', text: "Do you understand the internal workings of a HashMap and how to handle collisions?", type: 'likert', weight: 2 },
    { id: 'sde-dsa-3', skillId: 'sde-dsa', text: "Can you implement a generic Stack or Queue from scratch?", type: 'binary', weight: 1 },

    // System Design (sde-sys)
    { id: 'sde-sys-1', skillId: 'sde-sys', text: "How comfortable are you designing a system for high availability and scalability?", type: 'likert', weight: 3 },
    { id: 'sde-sys-2', skillId: 'sde-sys', text: "Do you understand the CAP theorem and its trade-offs in distributed systems?", type: 'likert', weight: 2 },
    { id: 'sde-sys-3', skillId: 'sde-sys', text: "Have you ever designed a database schema for a real-world application?", type: 'binary', weight: 1 },

    // Language Proficiency (sde-lang)
    { id: 'sde-lang-1', skillId: 'sde-lang', text: "How deep is your understanding of memory management in your primary language?", type: 'likert', weight: 3 },
    { id: 'sde-lang-2', skillId: 'sde-lang', text: "Are you proficient with asynchronous programming and concurrency patterns?", type: 'likert', weight: 2 },
    { id: 'sde-lang-3', skillId: 'sde-lang', text: "Have you contributed to a library or framework used by others?", type: 'binary', weight: 1 },

    // Version Control & Collab (sde-git)
    { id: 'sde-git-1', skillId: 'sde-git', text: "How proficient are you with Git (rebasing, cherry-picking, conflict resolution)?", type: 'likert', weight: 2 },
    { id: 'sde-git-2', skillId: 'sde-git', text: "Do you follow a standard branching strategy (like Gitflow or Trunk-based)?", type: 'likert', weight: 1 },
    { id: 'sde-git-3', skillId: 'sde-git', text: "Have you conducted formal code reviews for other developers?", type: 'binary', weight: 2 },

    // Databases (sde-db)
    { id: 'sde-db-1', skillId: 'sde-db', text: "How comfortable are you optimizing slow-running queries using execution plans?", type: 'likert', weight: 3 },
    { id: 'sde-db-2', skillId: 'sde-db', text: "Do you understand the trade-offs between SQL and NoSQL databases?", type: 'likert', weight: 2 },
    { id: 'sde-db-3', skillId: 'sde-db', text: "Have you implemented a caching layer (like Redis) in a project?", type: 'binary', weight: 2 },
  ],
  da: [
    // SQL & Database Querying (da-sql)
    { id: 'da-sql-1', skillId: 'da-sql', text: "How proficient are you with complex SQL queries (Window Functions, CTEs)?", type: 'likert', weight: 3 },
    { id: 'da-sql-2', skillId: 'da-sql', text: "Can you optimize a slow-running query using indexing?", type: 'likert', weight: 2 },
    { id: 'da-sql-3', skillId: 'da-sql', text: "Do you know how to perform complex joins across multiple tables?", type: 'binary', weight: 2 },

    // Statistics & Math (da-stat)
    { id: 'da-stat-1', skillId: 'da-stat', text: "How well do you understand hypothesis testing and p-values?", type: 'likert', weight: 3 },
    { id: 'da-stat-2', skillId: 'da-stat', text: "Can you explain the difference between Correlation and Causation?", type: 'likert', weight: 2 },
    { id: 'da-stat-3', skillId: 'da-stat', text: "Do you use statistical distributions to model your data?", type: 'binary', weight: 1 },

    // Data Visualization (da-viz)
    { id: 'da-viz-1', skillId: 'da-viz', text: "How proficient are you in creating dashboards (Tableau, PowerBI, Plotly)?", type: 'likert', weight: 3 },
    { id: 'da-viz-2', skillId: 'da-viz', text: "Can you choose the correct chart type for different types of data stories?", type: 'likert', weight: 2 },
    { id: 'da-viz-3', skillId: 'da-viz', text: "Have you built a dashboard used by stakeholders for decision making?", type: 'binary', weight: 2 },

    // Python/Excel (da-py)
    { id: 'da-py-1', skillId: 'da-py', text: "How comfortable are you using Python/Pandas for data cleaning?", type: 'likert', weight: 3 },
    { id: 'da-py-2', skillId: 'da-py', text: "Can you automate data extraction and cleaning pipelines?", type: 'likert', weight: 2 },
    { id: 'da-py-3', skillId: 'da-py', text: "Have you used Advanced Excel features like PowerPivot or VBA?", type: 'binary', weight: 1 },

    // Business Domain (da-biz)
    { id: 'da-biz-1', skillId: 'da-biz', text: "How comfortable are you translating business questions into data problems?", type: 'likert', weight: 2 },
    { id: 'da-biz-2', skillId: 'da-biz', text: "Can you present technical findings to a non-technical audience?", type: 'likert', weight: 2 },
    { id: 'da-biz-3', skillId: 'da-biz', text: "Have you defined a key performance indicator (KPI) for a project?", type: 'binary', weight: 1 },
  ],
  pm: [
    // Product Strategy (pm-strat)
    { id: 'pm-strat-1', skillId: 'pm-strat', text: "How comfortable are you defining a product vision and long-term strategy?", type: 'likert', weight: 3 },
    { id: 'pm-strat-2', skillId: 'pm-strat', text: "Can you conduct comprehensive market and competitor research?", type: 'likert', weight: 2 },
    { id: 'pm-strat-3', skillId: 'pm-strat', text: "Have you written a full Product Requirements Document (PRD)?", type: 'binary', weight: 2 },

    // Execution & Delivery (pm-exec)
    { id: 'pm-exec-1', skillId: 'pm-exec', text: "How proficient are you at prioritizing features (e.g., RICE, MoSCoW)?", type: 'likert', weight: 3 },
    { id: 'pm-exec-2', skillId: 'pm-exec', text: "Can you manage a product backlog and run sprint planning?", type: 'likert', weight: 2 },
    { id: 'pm-exec-3', skillId: 'pm-exec', text: "Do you use a project management tool (Jira, Linear) daily?", type: 'binary', weight: 1 },

    // User Research (pm-res)
    { id: 'pm-res-1', skillId: 'pm-res', text: "How comfortable are you conducting user interviews and synthesizing feedback?", type: 'likert', weight: 3 },
    { id: 'pm-res-2', skillId: 'pm-res', text: "Can you create user personas based on data?", type: 'likert', weight: 2 },
    { id: 'pm-res-3', skillId: 'pm-res', text: "Have you run an A/B test to validate a product hypothesis?", type: 'binary', weight: 2 },

    // Product Analytics (pm-ana)
    { id: 'pm-ana-1', skillId: 'pm-ana', text: "How proficient are you with product analytics tools (Amplitude, Mixpanel)?", type: 'likert', weight: 3 },
    { id: 'pm-ana-2', skillId: 'pm-ana', text: "Can you define and track a North Star metric for a product?", type: 'likert', weight: 2 },
    { id: 'pm-ana-3', skillId: 'pm-ana', text: "Do you use SQL to extract your own data for analysis?", type: 'binary', weight: 1 },

    // Stakeholder Management (pm-stake)
    { id: 'pm-stake-1', skillId: 'pm-stake', text: "How comfortable are you negotiating priorities with Engineering and Design?", type: 'likert', weight: 2 },
    { id: 'pm-stake-2', skillId: 'pm-stake', text: "Can you present a product roadmap to senior leadership?", type: 'likert', weight: 2 },
    { id: 'pm-stake-3', skillId: 'pm-stake', text: "Have you managed external stakeholders in a product launch?", type: 'binary', weight: 1 },
  ],
  devops: [
    // Infrastructure (do-infra)
    { id: 'do-infra-1', skillId: 'do-infra', text: "How comfortable are you with Infrastructure as Code (Terraform, CloudFormation)?", type: 'likert', weight: 3 },
    { id: 'do-infra-2', skillId: 'do-infra', text: "Do you understand the nuances of VPCs, Subnets, and Security Groups?", type: 'likert', weight: 2 },
    { id: 'do-infra-3', skillId: 'do-infra', text: "Have you deployed a production workload on AWS, Azure, or GCP?", type: 'binary', weight: 2 },

    // Containers & K8s (do-cont)
    { id: 'do-cont-1', skillId: 'do-cont', text: "How proficient are you with Docker and containerization concepts?", type: 'likert', weight: 3 },
    { id: 'do-cont-2', skillId: 'do-cont', text: "Can you manage a Kubernetes cluster (Pods, Services, Deployments)?", type: 'likert', weight: 3 },
    { id: 'do-cont-3', skillId: 'do-cont', text: "Have you written a custom Helm chart for an application?", type: 'binary', weight: 2 },

    // CI/CD Pipelines (do-cicd)
    { id: 'do-cicd-1', skillId: 'do-cicd', text: "How comfortable are you building automated pipelines (GitHub Actions, Jenkins)?", type: 'likert', weight: 3 },
    { id: 'do-cicd-2', skillId: 'do-cicd', text: "Do you understand Blue-Green and Canary deployment strategies?", type: 'likert', weight: 2 },
    { id: 'do-cicd-3', skillId: 'do-cicd', text: "Have you integrated automated security scanning into a pipeline?", type: 'binary', weight: 1 },

    // Observability & Monitoring (do-obs)
    { id: 'do-obs-1', skillId: 'do-obs', text: "How proficient are you with monitoring tools (Prometheus, Grafana)?", type: 'likert', weight: 3 },
    { id: 'do-obs-2', skillId: 'do-obs', text: "Can you implement structured logging and distributed tracing?", type: 'likert', weight: 2 },
    { id: 'do-obs-3', skillId: 'do-obs', text: "Have you set up automated alerting for production incidents?", type: 'binary', weight: 2 },

    // Linux & Scripting (do-lin)
    { id: 'do-lin-1', skillId: 'do-lin', text: "How comfortable are you with the Linux CLI and shell scripting (Bash)?", type: 'likert', weight: 2 },
    { id: 'do-lin-2', skillId: 'do-lin', text: "Do you understand the TCP/IP stack and DNS resolution process?", type: 'likert', weight: 2 },
    { id: 'do-lin-3', skillId: 'do-lin', text: "Can you debug a network connectivity issue using tools like curl or dig?", type: 'binary', weight: 1 },
  ],
};
