from langchain_community.llms import Ollama
llm = Ollama(model="llama3")
llm = LLMInvoke()
# Set a prompt for the LLaMA model to generate text based on.
prompt = "Tell me a joke"

# Use the invoke method of the LLaMA object to generate text based on the prompt.
result = llm.invoke(prompt)

# Print the generated result
print(result)
