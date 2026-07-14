export type LLMRole = "user" | "assitant";

export interface LLMMessage {
  role: LLMRole;
  content: string;
}

export interface ChatInput {
  messages: LLMMessage[];
}

export interface ChatResponse {
  content: string;
}

export interface LLMProvider {
  chat(input: ChatInput): Promise<ChatResponse>;
}
