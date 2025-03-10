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
    useCases: ['Project Management', 'Content Creation']
  },
  {
    id: 'spear',
    name: 'SPEAR Framework',
    description: 'Steps: Start, Provide, Explain, Ask, Rinse & Repeat.',
    components: ['Start', 'Provide', 'Explain', 'Ask', 'Rinse & Repeat'],
    useCases: ['Marketing', 'Strategy Development']
  },
  {
    id: 'few-shot',
    name: 'Few-Shot Prompting',
    description: 'Provides a task description followed by a few examples before posing a query.',
    components: ['Task Description', 'Examples', 'Query'],
    useCases: ['Text Classification', 'Sentiment Analysis']
  },
  {
    id: 'zero-shot',
    name: 'Zero-Shot Prompting',
    description: 'Relies solely on a task description without examples.',
    components: ['Task Description'],
    useCases: ['Translations', 'Factual Lookups']
  },
  {
    id: 'race',
    name: 'RACE Framework',
    description: 'Components: Role, Action, Context, Expectations.',
    components: ['Role', 'Action', 'Context', 'Expectations'],
    useCases: ['Technical Documentation', 'Migration Strategies']
  },
  {
    id: 'spark',
    name: 'SPARK Framework',
    description: 'Steps: Situation, Problem, Aspiration, Result, Kismet.',
    components: ['Situation', 'Problem', 'Aspiration', 'Result', 'Kismet'],
    useCases: ['Product Development', 'Marketing Strategy']
  },
  {
    id: 'six-hats',
    name: 'Six Thinking Hats Framework',
    description: 'Guides decision-making through six perspectives: facts (White), emotions (Red), risks (Black), benefits (Yellow), creativity (Green), and process control (Blue).',
    components: ['White Hat (Facts)', 'Red Hat (Emotions)', 'Black Hat (Risks)', 'Yellow Hat (Benefits)', 'Green Hat (Creativity)', 'Blue Hat (Process Control)'],
    useCases: ['Decision Making', 'Problem Solving']
  }
]; 