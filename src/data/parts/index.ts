import { boards } from "./boards";
import { sensors } from "./sensors";
import { actuators } from "./actuators";
import { passives } from "./passives";
import { modules } from "./modules";
import { toolParts } from "./tools";
import type { Part, PartCategory } from "@/types/parts";

export const allParts: Part[] = [
  ...boards,
  ...sensors,
  ...actuators,
  ...passives,
  ...modules,
  ...toolParts,
];

export function getPartsByCategory(category: PartCategory): Part[] {
  return allParts.filter((p) => p.category === category);
}

export function getPartById(id: string): Part | undefined {
  return allParts.find((p) => p.id === id);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const part of allParts) {
    if (part.tags) {
      for (const tag of part.tags) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet).sort();
}

export function getPartsByTag(tag: string): Part[] {
  return allParts.filter((p) => p.tags?.includes(tag));
}

export function getAllBoardIds(): string[] {
  const boardIds = new Set<string>();
  for (const part of allParts) {
    if (part.compatibleBoards) {
      for (const boardId of part.compatibleBoards) {
        boardIds.add(boardId);
      }
    }
  }
  return Array.from(boardIds).sort();
}

export function getPartsByBoard(boardId: string): Part[] {
  return allParts.filter(
    (p) => p.compatibleBoards?.includes(boardId) && p.id !== boardId
  );
}
