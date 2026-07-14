import OpenAI from "openai";

import type {
  ChatInput,
  ChatResponse,
  LLMProvider,
} from "./llm.type.js";

import { SYSTEM_PROMPT } from "./prompts/system.prompt.js";

export class OpenAIProvider implements LLMProvider {
  private readonly client: OpenAI;
  private readonly model: string;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    this.client = new OpenAI({
      apiKey,
    });

    this.model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  }

  async chat(input: ChatInput): Promise<ChatResponse> {
    const response = await this.client.responses.create({
      model: this.model,
      instructions: SYSTEM_PROMPT,
      input: input.messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return {
      content: response.output_text,
    };
  }
}

