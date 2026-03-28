import { boards } from "./boards";
import { sensors } from "./sensors";
import { actuators } from "./actuators";
import { passives } from "./passives";
import { toolParts } from "./tools";
import type { Part, PartCategory } from "@/types/parts";

export const allParts: Part[] = [...boards, ...sensors, ...actuators, ...passives, ...toolParts];

export function getPartsByCategory(category: PartCategory): Part[] {
  return allParts.filter((p) => p.category === category);
}

export function getPartById(id: string): Part | undefined {
  return allParts.find((p) => p.id === id);
}
