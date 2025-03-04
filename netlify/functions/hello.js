exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "PromptArchi helps you design effective AI prompts using structured frameworks, guiding you to unlock the full potential of language models.",
    }),
  };
};
