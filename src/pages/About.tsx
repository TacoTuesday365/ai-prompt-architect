import { Box, VStack, Heading, Text, UnorderedList, ListItem, Code } from '@chakra-ui/react'

const About = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box className="glass-container" p={8} borderRadius="xl">
        <VStack spacing={6} align="stretch">
          <Heading size="lg" color="var(--text-primary)">About AI Prompting Guide</Heading>
          
          <Text>
            AI Prompting Guide is an interactive web application designed to help users understand and implement 
            various AI prompting frameworks. With a modern, perplexity.ai-inspired interface, it provides an 
            intuitive way to learn about different prompting techniques and generate effective prompts.
          </Text>

          <Heading size="md" color="var(--text-primary)">How to Use</Heading>
          <Text>
            1. Enter your prompt in the main input field<br />
            2. Select a framework from the available options<br />
            3. Click "Generate" to create a structured prompt based on the selected framework
          </Text>

          <Heading size="md" color="var(--text-primary)">Available Frameworks</Heading>
          <UnorderedList spacing={2}>
            <ListItem>CIDI Framework - Context, Instructions, Details, and Input components</ListItem>
            <ListItem>SPEAR Framework - Start, Provide, Explain, Ask, Rinse & Repeat</ListItem>
            <ListItem>Few-Shot Prompting - Task description with examples</ListItem>
            <ListItem>Zero-Shot Prompting - Direct task description without examples</ListItem>
            <ListItem>RACE Framework - Role, Action, Context, Expectations</ListItem>
            <ListItem>SPARK Framework - Situation, Problem, Aspiration, Result, Kismet</ListItem>
            <ListItem>Six Thinking Hats - Different perspectives for problem-solving</ListItem>
          </UnorderedList>

          <Heading size="md" color="var(--text-primary)">Framework Use Cases</Heading>
          <Text>
            Each framework is suited for different types of tasks:
          </Text>
          <UnorderedList spacing={2}>
            <ListItem><strong>Content Creation</strong> - CIDI, SPEAR</ListItem>
            <ListItem><strong>Technical Documentation</strong> - RACE, Zero-Shot</ListItem>
            <ListItem><strong>Marketing Strategy</strong> - SPARK, Six Thinking Hats</ListItem>
            <ListItem><strong>Data Analysis</strong> - Few-Shot, RACE</ListItem>
          </UnorderedList>

          <Heading size="md" color="var(--text-primary)">Technical Details</Heading>
          <Text>
            Built with modern web technologies:
          </Text>
          <Code p={4} borderRadius="md" bg="whiteAlpha.100">
            React 18 • TypeScript • Chakra UI • Vite • React Router • Netlify
          </Code>
        </VStack>
      </Box>
    </VStack>
  )
}

export default About 