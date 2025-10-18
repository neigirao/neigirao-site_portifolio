import type { Experience, Skill } from '../types';
import {
  DynatraceIcon,
  GoogleAnalyticsIcon,
  AzureIcon,
  GrafanaIcon,
  LaptopIcon,
  BarChartIcon,
  DonutChartIcon,
  PercentageIcon,
  BriefcaseIcon,
  LightbulbIcon,
} from '../components/Icons';

export const experiences: Experience[] = [
  {
    period: "2023-Present",
    role: "Senior Data Analyst",
    company: "Tech Solutions Inc",
    description: [
      "Led data analytics initiatives using Azure and Power BI",
      "Implemented monitoring solutions with Dynatrace",
      "Optimized data pipelines improving efficiency by 40%",
      "Mentored junior analysts on best practices"
    ]
  },
  {
    period: "2021-2023",
    role: "Data Analyst",
    company: "Digital Metrics Co",
    description: [
      "Developed dashboards using Google Analytics and Grafana",
      "Automated reporting processes reducing manual work by 60%",
      "Collaborated with cross-functional teams on data strategy",
      "Conducted A/B testing and statistical analysis"
    ]
  },
  {
    period: "2019-2021",
    role: "Junior Analyst",
    company: "StartUp Analytics",
    description: [
      "Created data visualizations and reports for stakeholders",
      "Performed data cleaning and validation tasks",
      "Assisted in building ETL pipelines",
      "Supported senior team members in complex analyses"
    ]
  }
];

export const skills: Skill[] = [
  { name: "Dynatrace", icon: DynatraceIcon },
  { name: "Google Analytics", icon: GoogleAnalyticsIcon },
  { name: "Microsoft Azure", icon: AzureIcon },
  { name: "Grafana", icon: GrafanaIcon },
  { name: "Data Analysis", icon: BarChartIcon },
  { name: "Data Visualization", icon: DonutChartIcon },
  { name: "Statistical Analysis", icon: PercentageIcon },
  { name: "Cloud Computing", icon: LaptopIcon },
  { name: "Business Intelligence", icon: BriefcaseIcon },
  { name: "Problem Solving", icon: LightbulbIcon },
];
