export interface Framework {
  id: string;
  name: string;
  description: string;
  components: string[];
  useCases: string[];
  prompt?: string;
  examples?: string[];
}

export const frameworks: Framework[] = [
  {
    id: 'cidi',
    name: 'CIDI Framework',
    description: 'Focuses on four components: Context, Instructions, Details, and Input.',
    components: ['Context', 'Instructions', 'Details', 'Input'],
    useCases: ['Project Management', 'Content Creation'],
    prompt: 'Context: [Provide relevant background information]\nInstructions: [Specify what you want the AI to do]\nDetails: [Add any specific requirements or constraints]\nInput: [Include the actual content or data to work with]',
    examples: [
      'Context: Writing a blog post about AI safety\nInstructions: Create an outline for a 1500-word article\nDetails: Include 5 main sections with subsections\nInput: Focus on recent developments in AI regulation',
      'Context: Software development team planning\nInstructions: Generate a sprint planning template\nDetails: Two-week sprint with 6 team members\nInput: Project is a mobile app development'
    ]
  },
  {
    id: 'spear',
    name: 'SPEAR Framework',
    description: 'Steps: Start, Provide, Explain, Ask, Rinse & Repeat.',
    components: ['Start', 'Provide', 'Explain', 'Ask', 'Rinse & Repeat'],
    useCases: ['Marketing', 'Strategy Development'],
    prompt: 'Start: [Define the initial goal or objective]\nProvide: [Give necessary context and information]\nExplain: [Clarify expectations and requirements]\nAsk: [State your specific request]\nRinse & Repeat: [Indicate if iteration is needed]',
    examples: [
      'Start: Create a marketing strategy\nProvide: Target audience is tech professionals\nExplain: Need focus on LinkedIn and Twitter\nAsk: Generate a content calendar for Q1\nRinse & Repeat: Will need monthly updates',
      'Start: Develop product roadmap\nProvide: SaaS platform for HR\nExplain: 12-month timeline with quarterly goals\nAsk: List key milestones and features\nRinse & Repeat: Review and adjust quarterly'
    ]
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Prompting',
    description: 'Provides a task description followed by a few examples before posing a query.',
    components: ['Task Description', 'Examples', 'Query'],
    useCases: ['Text Classification', 'Sentiment Analysis'],
    prompt: 'Task Description: [Describe what needs to be done]\n\nExamples:\n[Example 1]\n[Example 2]\n[Example 3]\n\nQuery: [Your specific request]',
    examples: [
      'Task Description: Classify customer feedback as positive, negative, or neutral\n\nExamples:\n"Great service!" -> Positive\n"Could be better" -> Neutral\n"Never coming back" -> Negative\n\nQuery: Please classify: "Decent experience but long wait times"',
      'Task Description: Convert informal text to formal business language\n\nExamples:\n"Hey!" -> "Dear [Name]"\n"Got it done" -> "The task has been completed"\n"ASAP" -> "as soon as possible"\n\nQuery: Please convert: "Let me know when you can chat"'
    ]
  },
  {
    id: 'zero-shot',
    name: 'Zero-Shot Prompting',
    description: 'Relies solely on a task description without examples.',
    components: ['Task Description'],
    useCases: ['Translations', 'Factual Lookups'],
    prompt: 'Task Description: [Clear and detailed description of what you want the AI to do, including any specific requirements or constraints]',
    examples: [
      'Task Description: Translate the following text from English to Spanish, maintaining a formal tone and preserving any technical terminology.',
      'Task Description: Analyze this code snippet for potential security vulnerabilities, focusing on SQL injection and XSS attacks. Provide specific recommendations for improvements.'
    ]
  },
  {
    id: 'race',
    name: 'RACE Framework',
    description: 'Components: Role, Action, Context, Expectations.',
    components: ['Role', 'Action', 'Context', 'Expectations'],
    useCases: ['Technical Documentation', 'Migration Strategies'],
    prompt: 'Role: [Define who the AI should act as]\nAction: [Specify what needs to be done]\nContext: [Provide relevant background information]\nExpectations: [Detail the desired outcome]',
    examples: [
      'Role: Senior Technical Writer\nAction: Create API documentation\nContext: REST API for e-commerce platform\nExpectations: Clear, concise documentation with examples',
      'Role: DevOps Engineer\nAction: Design migration plan\nContext: Moving from on-premise to AWS\nExpectations: Detailed timeline and risk assessment'
    ]
  },
  {
    id: 'spark',
    name: 'SPARK Framework',
    description: 'Steps: Situation, Problem, Aspiration, Result, Kismet.',
    components: ['Situation', 'Problem', 'Aspiration', 'Result', 'Kismet'],
    useCases: ['Product Development', 'Marketing Strategy'],
    prompt: 'Situation: [Describe current state]\nProblem: [Identify key challenges]\nAspiration: [State desired outcome]\nResult: [Define success metrics]\nKismet: [Consider unexpected opportunities]',
    examples: [
      'Situation: E-commerce startup\nProblem: High cart abandonment\nAspiration: Increase conversion by 50%\nResult: Measure checkout completion rate\nKismet: Discover mobile app opportunity',
      'Situation: Content marketing team\nProblem: Low engagement rates\nAspiration: Double audience interaction\nResult: Track comments and shares\nKismet: Potential viral content strategy'
    ]
  },
  {
    id: 'six-hats',
    name: 'Six Thinking Hats Framework',
    description: 'Guides decision-making through six perspectives: facts (White), emotions (Red), risks (Black), benefits (Yellow), creativity (Green), and process control (Blue).',
    components: ['White Hat (Facts)', 'Red Hat (Emotions)', 'Black Hat (Risks)', 'Yellow Hat (Benefits)', 'Green Hat (Creativity)', 'Blue Hat (Process Control)'],
    useCases: ['Decision Making', 'Problem Solving'],
    prompt: 'White Hat: [List objective facts and data]\nRed Hat: [Express feelings and intuitions]\nBlack Hat: [Identify potential risks and problems]\nYellow Hat: [Highlight benefits and opportunities]\nGreen Hat: [Explore creative solutions]\nBlue Hat: [Manage the thinking process]',
    examples: [
      'White Hat: Market size is $5B, growing 12% annually\nRed Hat: Team is excited but nervous about timeline\nBlack Hat: Competition is strong, high initial costs\nYellow Hat: First-mover advantage in niche market\nGreen Hat: Innovative hybrid business model\nBlue Hat: Need to focus on market validation first',
      'White Hat: Current process takes 45 minutes\nRed Hat: Users frustrated with complexity\nBlack Hat: Risk of data loss during transition\nYellow Hat: Potential 60% time savings\nGreen Hat: AI-powered automation solution\nBlue Hat: Prioritize user testing and feedback'
    ]
  }
]; 