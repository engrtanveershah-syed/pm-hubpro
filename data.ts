import { Template, TemplateType, TemplateCategory, SubscriptionPlan } from './types';

export const categories: TemplateCategory[] = [
  'Agile', 'Waterfall', 'IT', 'Telecom', 'Construction', 'Risk Management', 'Budgeting', 'Reporting', 'Stakeholder Management'
];

export const templates: Template[] = [
  // Agile (5)
  { id: 1, name: 'Agile Project Plan', description: 'A comprehensive template for planning your agile projects, including sprints and backlogs.', type: TemplateType.EXCEL, category: 'Agile', previewImage: 'https://picsum.photos/seed/agile1/400/300', downloadUrl: '#', isPremium: false },
  { id: 2, name: 'Product Roadmap', description: 'Visualize your product strategy and features over time.', type: TemplateType.POWERPOINT, category: 'Agile', previewImage: 'https://picsum.photos/seed/agile2/400/300', downloadUrl: '#', isPremium: true },
  { id: 11, name: 'Sprint Retrospective Minutes', description: 'Document the outcomes of your agile sprint retrospectives.', type: TemplateType.WORD, category: 'Agile', previewImage: 'https://picsum.photos/seed/agile3/400/300', downloadUrl: '#', isPremium: false },
  { id: 17, name: 'User Story Map', description: 'A visual map of the user journey to help plan and prioritize features.', type: TemplateType.POWERPOINT, category: 'Agile', previewImage: 'https://picsum.photos/seed/agile4/400/300', downloadUrl: '#', isPremium: true },
  { id: 18, name: 'Burndown Chart Template', description: 'Track sprint progress against the timeline with this easy-to-use chart.', type: TemplateType.EXCEL, category: 'Agile', previewImage: 'https://picsum.photos/seed/agile5/400/300', downloadUrl: '#', isPremium: false },

  // Waterfall (5)
  { id: 3, name: 'Waterfall Project Plan', description: 'Traditional project plan with Gantt chart for sequential projects.', type: TemplateType.EXCEL, category: 'Waterfall', previewImage: 'https://picsum.photos/seed/waterfall1/400/300', downloadUrl: '#', isPremium: false },
  { id: 12, name: 'Change Request Form', description: 'A formal document to submit and track changes to a project.', type: TemplateType.PDF, category: 'Waterfall', previewImage: 'https://picsum.photos/seed/waterfall2/400/300', downloadUrl: '#', isPremium: false },
  { id: 19, name: 'Work Breakdown Structure (WBS)', description: 'Decompose your project into smaller, manageable components.', type: TemplateType.EXCEL, category: 'Waterfall', previewImage: 'https://picsum.photos/seed/waterfall3/400/300', downloadUrl: '#', isPremium: false },
  { id: 20, name: 'Project Charter', description: 'Define the scope, objectives, and participants of your project.', type: TemplateType.WORD, category: 'Waterfall', previewImage: 'https://picsum.photos/seed/waterfall4/400/300', downloadUrl: '#', isPremium: true },
  { id: 21, name: 'Lessons Learned Document', description: 'Capture key insights and experiences for future projects.', type: TemplateType.WORD, category: 'Waterfall', previewImage: 'https://picsum.photos/seed/waterfall5/400/300', downloadUrl: '#', isPremium: true },

  // IT (5)
  { id: 4, name: 'IT Service Management Report', description: 'Weekly and monthly reports for IT services.', type: TemplateType.WORD, category: 'IT', previewImage: 'https://picsum.photos/seed/it1/400/300', downloadUrl: '#', isPremium: true },
  { id: 14, name: 'IT Incident Report', description: 'Template to report and track IT incidents.', type: TemplateType.WORD, category: 'IT', previewImage: 'https://picsum.photos/seed/it2/400/300', downloadUrl: '#', isPremium: false },
  { id: 22, name: 'System Design Document', description: 'A detailed document outlining the architecture and design of a system.', type: TemplateType.WORD, category: 'IT', previewImage: 'https://picsum.photos/seed/it3/400/300', downloadUrl: '#', isPremium: true },
  { id: 23, name: 'IT Security Plan', description: 'Develop a comprehensive security plan to protect IT assets.', type: TemplateType.PDF, category: 'IT', previewImage: 'https://picsum.photos/seed/it4/400/300', downloadUrl: '#', isPremium: true },
  { id: 24, name: 'User Acceptance Testing (UAT) Plan', description: 'Plan and execute UAT to ensure software meets user needs.', type: TemplateType.EXCEL, category: 'IT', previewImage: 'https://picsum.photos/seed/it5/400/300', downloadUrl: '#', isPremium: false },

  // Telecom (5)
  { id: 5, name: 'Telecom Network Design', description: 'Template for designing and documenting telecommunication networks.', type: TemplateType.PDF, category: 'Telecom', previewImage: 'https://picsum.photos/seed/telecom1/400/300', downloadUrl: '#', isPremium: true },
  { id: 25, name: 'Site Survey Report', description: 'A template for conducting and documenting telecom site surveys.', type: TemplateType.WORD, category: 'Telecom', previewImage: 'https://picsum.photos/seed/telecom2/400/300', downloadUrl: '#', isPremium: false },
  { id: 26, name: 'Fiber Optic Network Plan', description: 'Plan the layout and implementation of fiber optic networks.', type: TemplateType.EXCEL, category: 'Telecom', previewImage: 'https://picsum.photos/seed/telecom3/400/300', downloadUrl: '#', isPremium: true },
  { id: 27, name: 'RF Planning and Optimization Report', description: 'Report on radio frequency planning and network optimization.', type: TemplateType.PDF, category: 'Telecom', previewImage: 'https://picsum.photos/seed/telecom4/400/300', downloadUrl: '#', isPremium: true },
  { id: 28, name: 'Tower Maintenance Checklist', description: 'Ensure thorough maintenance of telecom towers with this checklist.', type: TemplateType.EXCEL, category: 'Telecom', previewImage: 'https://picsum.photos/seed/telecom5/400/300', downloadUrl: '#', isPremium: false },
  
  // Construction (5)
  { id: 6, name: 'Construction Daily Log', description: 'Log daily activities, weather, and personnel on a construction site.', type: TemplateType.EXCEL, category: 'Construction', previewImage: 'https://picsum.photos/seed/construction1/400/300', downloadUrl: '#', isPremium: false },
  { id: 13, name: 'Construction Budget', description: 'Detailed budget template for construction projects.', type: TemplateType.EXCEL, category: 'Construction', previewImage: 'https://picsum.photos/seed/construction2/400/300', downloadUrl: '#', isPremium: true },
  { id: 29, name: 'Request for Information (RFI) Form', description: 'Standardized form for submitting and tracking RFIs.', type: TemplateType.PDF, category: 'Construction', previewImage: 'https://picsum.photos/seed/construction3/400/300', downloadUrl: '#', isPremium: false },
  { id: 30, name: 'Construction Schedule', description: 'A Gantt chart based schedule for construction timelines.', type: TemplateType.EXCEL, category: 'Construction', previewImage: 'https://picsum.photos/seed/construction4/400/300', downloadUrl: '#', isPremium: true },
  { id: 31, name: 'Subcontractor Agreement', description: 'A legal template for agreements between contractors and subcontractors.', type: TemplateType.WORD, category: 'Construction', previewImage: 'https://picsum.photos/seed/construction5/400/300', downloadUrl: '#', isPremium: true },

  // Risk Management (5)
  { id: 7, name: 'Risk Register', description: 'Identify, analyze, and manage project risks effectively.', type: TemplateType.EXCEL, category: 'Risk Management', previewImage: 'https://picsum.photos/seed/risk1/400/300', downloadUrl: '#', isPremium: true },
  { id: 16, name: 'Risk Assessment Matrix', description: 'A matrix to assess and prioritize project risks.', type: TemplateType.EXCEL, category: 'Risk Management', previewImage: 'https://picsum.photos/seed/risk2/400/300', downloadUrl: '#', isPremium: true },
  { id: 32, name: 'Risk Mitigation Plan', description: 'Develop strategies to lessen the impact of identified risks.', type: TemplateType.WORD, category: 'Risk Management', previewImage: 'https://picsum.photos/seed/risk3/400/300', downloadUrl: '#', isPremium: true },
  { id: 33, name: 'Risk Response Plan', description: 'A presentation template to outline risk responses to stakeholders.', type: TemplateType.POWERPOINT, category: 'Risk Management', previewImage: 'https://picsum.photos/seed/risk4/400/300', downloadUrl: '#', isPremium: false },
  { id: 34, name: 'Business Impact Analysis', description: 'Assess the potential effects of a disruption to business operations.', type: TemplateType.EXCEL, category: 'Risk Management', previewImage: 'https://picsum.photos/seed/risk5/400/300', downloadUrl: '#', isPremium: true },

  // Budgeting (5)
  { id: 8, name: 'Project Budget Tracker', description: 'Track project expenses against the budget in real-time.', type: TemplateType.EXCEL, category: 'Budgeting', previewImage: 'https://picsum.photos/seed/budget1/400/300', downloadUrl: '#', isPremium: false },
  { id: 35, name: 'Cost Benefit Analysis', description: 'Compare the costs and benefits of a project to determine its feasibility.', type: TemplateType.EXCEL, category: 'Budgeting', previewImage: 'https://picsum.photos/seed/budget2/400/300', downloadUrl: '#', isPremium: true },
  { id: 36, name: 'Budget Proposal Template', description: 'A structured template for proposing a project budget.', type: TemplateType.WORD, category: 'Budgeting', previewImage: 'https://picsum.photos/seed/budget3/400/300', downloadUrl: '#', isPremium: false },
  { id: 37, name: 'Expense Report Form', description: 'A simple form for team members to report project-related expenses.', type: TemplateType.EXCEL, category: 'Budgeting', previewImage: 'https://picsum.photos/seed/budget4/400/300', downloadUrl: '#', isPremium: false },
  { id: 38, name: 'Capital Expenditure Request', description: 'Formal request for acquiring significant assets for a project.', type: TemplateType.PDF, category: 'Budgeting', previewImage: 'https://picsum.photos/seed/budget5/400/300', downloadUrl: '#', isPremium: true },

  // Reporting (5)
  { id: 9, name: 'Monthly Project Status Report', description: 'A professional report to update stakeholders on project progress.', type: TemplateType.POWERPOINT, category: 'Reporting', previewImage: 'https://picsum.photos/seed/report1/400/300', downloadUrl: '#', isPremium: true },
  { id: 15, name: 'Annual Financial Report', description: 'A comprehensive template for yearly financial reporting.', type: TemplateType.POWERPOINT, category: 'Reporting', previewImage: 'https://picsum.photos/seed/report2/400/300', downloadUrl: '#', isPremium: true },
  { id: 39, name: 'Project Closure Report', description: 'Summarize project performance and formalize its closure.', type: TemplateType.WORD, category: 'Reporting', previewImage: 'https://picsum.photos/seed/report3/400/300', downloadUrl: '#', isPremium: true },
  { id: 40, name: 'Executive Summary Dashboard', description: 'A one-page dashboard for presenting key metrics to executives.', type: TemplateType.POWERPOINT, category: 'Reporting', previewImage: 'https://picsum.photos/seed/report4/400/300', downloadUrl: '#', isPremium: true },
  { id: 41, name: 'Weekly Progress Report', description: 'A concise report for weekly updates to the project team.', type: TemplateType.WORD, category: 'Reporting', previewImage: 'https://picsum.photos/seed/report5/400/300', downloadUrl: '#', isPremium: false },

  // Stakeholder Management (5)
  { id: 10, name: 'Stakeholder Communication Plan', description: 'Plan how and when to communicate with project stakeholders.', type: TemplateType.WORD, category: 'Stakeholder Management', previewImage: 'https://picsum.photos/seed/stakeholder1/400/300', downloadUrl: '#', isPremium: true },
  { id: 42, name: 'Stakeholder Register', description: 'A document to record and track all project stakeholders.', type: TemplateType.EXCEL, category: 'Stakeholder Management', previewImage: 'https://picsum.photos/seed/stakeholder2/400/300', downloadUrl: '#', isPremium: false },
  { id: 43, name: 'Stakeholder Analysis Matrix', description: 'Analyze stakeholder influence and interest to manage them effectively.', type: TemplateType.EXCEL, category: 'Stakeholder Management', previewImage: 'https://picsum.photos/seed/stakeholder3/400/300', downloadUrl: '#', isPremium: true },
  { id: 44, name: 'RACI Matrix', description: 'Clearly define roles and responsibilities for project tasks.', type: TemplateType.EXCEL, category: 'Stakeholder Management', previewImage: 'https://picsum.photos/seed/stakeholder4/400/300', downloadUrl: '#', isPremium: false },
  { id: 45, name: 'Project Kickoff Meeting', description: 'A presentation template to align the team at the start of a project.', type: TemplateType.POWERPOINT, category: 'Stakeholder Management', previewImage: 'https://picsum.photos/seed/stakeholder5/400/300', downloadUrl: '#', isPremium: true },
];


export const subscriptionPlans: SubscriptionPlan[] = [
  {
    tier: 'FREE',
    name: 'Basic Access',
    price: '$0',
    period: 'Forever',
    features: ['Access to 10+ free templates', 'Standard search & filter', 'Personal library for free items'],
  },
  {
    tier: 'MONTHLY',
    name: 'Pro Monthly',
    price: '$19',
    period: '/ month',
    features: ['Unlimited access to all templates', 'Advanced search & filters', 'Unlimited personal library', 'Add notes to templates', 'Cancel anytime'],
  },
  {
    tier: 'YEARLY',
    name: 'Pro Yearly',
    price: '$149',
    period: '/ year',
    features: ['All features of Pro Monthly', 'Save over 30% with annual billing', 'Priority support', 'Early access to new templates'],
  },
];
