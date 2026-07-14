import "dotenv/config";

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { OpenAIProvider } from "./llm/llm.client.js";

async function main(): Promise<void> {
  const rl = readline.createInterface({
    input,
    output,
  });

  const llm = new OpenAIProvider();

  console.log("AI Assistant started");
  console.log('Type "exit" to quit\n');

  while (true) {
    const userInput = await rl.question("You: ");

    if (userInput.trim().toLowerCase() === "exit") {
      break;
    }

    if (!userInput.trim()) {
      continue;
    }

    const response = await llm.chat({
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    });

    console.log(`AI: ${response.content}\n`);
  }

  rl.close();
}

main().catch((error: unknown) => {
  console.error("Fatal error:", error);
  process.exit(1);
});