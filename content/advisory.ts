/** Keelhold Advisory page copy — approved and verbatim. Text in [brackets] is a placeholder. */

/** Show the Advisory mark at the top of the hero's right column. */
export const SHOW_HERO_MARK = true;

export const HERO = {
  eyebrow: "Keelhold Advisory",
  lines: ["Financial Advisory.", "Transaction Support.", "Investment Technology."],
  body: "We help businesses and investment firms make better-informed financial decisions, evaluate opportunities and improve the systems supporting their operations.",
  descriptors: ["Financial analysis", "Transactions", "Technology", "Automation"],
};

export const SECTION_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "clients", label: "Who we work with" },
  { id: "services", label: "Services" },
  { id: "technology", label: "Technology" },
  { id: "approach", label: "How we work" },
  { id: "legal", label: "Legal" },
] as const;

export const INTRO = {
  heading: "Financial clarity. Commercial perspective.",
  lead: "Keelhold Advisory provides financial analysis, modelling and transaction support to businesses, investors and management teams.",
  paragraphs: [
    "Our work focuses on understanding financial performance, evaluating commercial opportunities, assessing transaction risks and improving the processes that support financial decision-making.",
    "We combine structured financial analysis with practical technology-enabled solutions to help clients make informed decisions and operate more efficiently.",
  ],
};

export const CLIENTS = {
  heading: "Built around the decisions that matter.",
  items: [
    {
      title: "Independent Sponsors & Smaller Investment Firms",
      body: "Financial analysis, acquisition modelling, due diligence support, investment workflows and portfolio reporting.",
      primary: true,
    },
    {
      title: "Investors & Acquisition Entrepreneurs",
      body: "Acquisition analysis, business valuation support, financial modelling and transaction preparation.",
    },
    {
      title: "Business Owners & SMEs",
      body: "Financial forecasting, performance analysis, management reporting and finance process improvements.",
    },
    {
      title: "Accounting & Professional Services Firms",
      body: "Financial reporting automation, Excel solutions, data processing and workflow improvements.",
    },
  ],
};

export interface Practice {
  label: string;
  headline: string;
  intro: string;
  services: string[];
  deliverables: string[];
  scope?: string;
  /** Matches an option label on /contact; sent as ?type=. */
  category: string;
}

export const SERVICES = {
  heading: "Three practices. One analytical standard.",
  aside: "Select a practice to see the services it covers and the work clients typically receive.",
};

export const PRACTICES: Practice[] = [
  {
    label: "Financial Advisory",
    headline: "Understand the numbers behind your decisions.",
    intro:
      "Structured financial models and analysis that help businesses and investors evaluate performance, plan ahead and understand potential outcomes.",
    services: [
      "Financial modelling and forecasting",
      "Budgeting and financial planning",
      "Integrated financial statement modelling",
      "Cash flow forecasting",
      "Scenario and sensitivity analysis",
      "Business performance analysis",
      "Management reporting",
      "Valuation support",
    ],
    deliverables: [
      "Financial models",
      "Forecasting models",
      "Scenario analysis",
      "Financial performance reports",
      "Management reporting tools",
    ],
    category: "Financial Modelling & Analysis",
  },
  {
    label: "Transaction & Investment Support",
    headline: "Make better-informed transaction decisions.",
    intro: "Analytical and financial due diligence support for acquisitions, investments and commercial transactions.",
    services: [
      "Acquisition financial analysis",
      "Business valuation support",
      "Investment opportunity assessment",
      "Transaction modelling",
      "Acquisition scenario analysis",
      "Financial due diligence support",
      "Earnings and EBITDA analysis",
      "Working capital assessment",
      "Cash flow analysis",
      "Financial red-flag identification",
    ],
    deliverables: [
      "Acquisition models",
      "Valuation analysis",
      "Financial analysis reports",
      "Earnings and working capital analysis",
      "Transaction decision-support materials",
      "Investment memorandum preparation",
    ],
    scope:
      "Keelhold Advisory provides analytical and financial due diligence support. It does not provide statutory audit or independent assurance. Valuation and opportunity assessments are analytical support, not regulated investment advice or recommendations to buy or sell investments.",
    category: "Transaction & Acquisition Support",
  },
  {
    label: "Technology, AI & Finance Automation",
    headline: "Make financial processes more efficient.",
    intro:
      "We help businesses and investment firms improve financial reporting, automate repetitive processes and introduce practical technology solutions into their existing workflows.",
    services: [
      "Finance process automation",
      "Excel and spreadsheet automation",
      "Financial reporting automation",
      "AI-assisted document processing",
      "Financial data extraction and structuring",
      "Management reporting workflows",
      "Data consolidation",
      "Investment workflow automation",
      "Technology implementation and integration",
      "Process documentation",
    ],
    deliverables: [
      "Automated reporting tools",
      "Financial workflow solutions",
      "AI-assisted document-processing workflows",
      "Excel-based financial systems",
      "Management reporting dashboards",
      "Documented implementation processes",
    ],
    category: "AI & Finance Automation",
  },
];

export const TECHNOLOGY = {
  eyebrow: "Technology & AI capability",
  heading: "Technology that supports better investment operations.",
  body: "Through our wider technology capabilities, we explore how AI, automation and purpose-built software can improve the way smaller investment firms manage information, analyse opportunities and monitor investments.",
  applicationsLabel: "Applications for investment firms",
  applicationsNote: "Areas of capability and potential implementation, not packaged products.",
  applications: [
    {
      title: "Deal Management",
      body: "Improve deal pipeline administration, document organisation and investment opportunity tracking.",
    },
    {
      title: "Due Diligence Workflows",
      body: "Reduce manual information processing and improve the organisation of financial and commercial information.",
    },
    {
      title: "Investment Committee Processes",
      body: "Support the preparation of investment materials, structured review processes and decision documentation.",
    },
    {
      title: "Portfolio Reporting",
      body: "Improve the collection, organisation and presentation of portfolio company information.",
    },
    {
      title: "Fund Operations",
      body: "Improve routine reporting, information management and operational workflows.",
    },
  ],
  fundCorridor: {
    body: "Our associated software platform, fundCorridor, is designed to bring deal pipeline management, due diligence workflows, investment committee processes, fund operations and portfolio monitoring into a more structured operating environment.",
    rows: [
      { label: "Advisory", text: "Professional services and implementation support, scoped and priced per engagement." },
      {
        label: "fundCorridor",
        text: "A separate commercial software platform serving investment firms, including customers outside the Keelhold group.",
      },
    ],
  },
};

export const HOW_WE_WORK = {
  approachHeading: "Rigorous analysis. Practical outcomes.",
  engagementHeading: "From initial discussion to delivery.",
  approach: [
    {
      title: "Understand",
      body: "We begin by understanding the client’s objectives, available information and decision-making requirements.",
    },
    {
      title: "Analyse",
      body: "We examine the relevant financial and commercial information using structured analytical methods.",
    },
    {
      title: "Evaluate",
      body: "We identify important assumptions, potential risks, sensitivities and commercial implications.",
    },
    {
      title: "Deliver",
      body: "We provide clear analysis, models and supporting materials that help clients make informed decisions.",
    },
  ],
  engagement: [
    {
      title: "Initial Discussion",
      body: "We discuss your requirements, objectives, timelines and available information.",
    },
    {
      title: "Scope & Proposal",
      body: "We agree the scope of work, deliverables, fees and expected timetable.",
    },
    {
      title: "Analysis & Execution",
      body: "We undertake the agreed work, maintain communication and address relevant questions.",
    },
    {
      title: "Delivery",
      body: "We present the completed work, explain key findings and provide agreed supporting materials.",
    },
  ],
  engagementNote: "Engagement scope, deliverables, fees and responsibilities are agreed individually with each client.",
};

export const LEGAL = {
  heading: "Who provides these services",
  /** Placeholders to be confirmed by counsel; do not replace with a trading-name statement without sign-off. */
  provider:
    "Keelhold Advisory services are provided by [legal entity name], a company incorporated in [jurisdiction] under company number [number].",
  disclaimer: "Nothing on this page constitutes an offer, solicitation or recommendation to buy or sell any investment.",
  boundaries: [
    { provide: "Financial analysis", not: "Regulated investment advice" },
    { provide: "Valuation support", not: "A recommendation to buy or sell investments" },
    { provide: "Financial due diligence support", not: "Statutory audit or assurance" },
    { provide: "Technology implementation", not: "Regulated investment management" },
  ],
};
