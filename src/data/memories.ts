import type { MemoryDefinition } from "../types/game";

export const memoryDefinitions: MemoryDefinition[] = [
  {
    id: "memory-age-1",
    title: "Age One",
    subtitle: "First splashy steps",
    body: "Zayn was tiny, curious, and full of wonder. Every new sound and movement felt like a little adventure.",
  },
  {
    id: "memory-age-2",
    title: "Age Two",
    subtitle: "Growing brave",
    body: "The giggles got louder, the smiles bigger, and the world felt even more magical with every tiny discovery.",
  },
  {
    id: "memory-age-3",
    title: "Age Three",
    subtitle: "Big feelings, big joy",
    body: "Every cuddle, bedtime story, and playful moment became a favorite memory full of warmth and love.",
  },
  {
    id: "birthday-reveal",
    title: "Birthday reveal",
    subtitle: "The surprise is here",
    body: "A bright and joyful celebration is waiting for the birthday star. The adventure has led to a happy ending.",
  },
  {
    id: "daddy-letter",
    title: "Daddy's letter",
    subtitle: "To Zayn",
    body: "You are our joy, our sunshine, and the reason we smile every day. Happy 4th birthday, little love.",
  },
];

export const memoryMap = Object.fromEntries(
  memoryDefinitions.map((memory) => [memory.id, memory]),
) as Record<string, MemoryDefinition>;
