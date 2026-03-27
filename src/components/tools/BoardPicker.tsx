"use client";

import { useState } from "react";
import type { Board } from "@/types";
import { BOARDS } from "@/data/boards";
import { buildAmazonUrl } from "@/lib/site";

type Step = 1 | 2 | 3 | "result";

const GOALS = [
  { id: "beginner", label: "LEDを光らせたい・モーターを動かしたい", emoji: "💡" },
  { id: "ai", label: "AI画像認識をやりたい", emoji: "🤖" },
  { id: "iot", label: "IoTセンサーで計測したい", emoji: "📡" },
  { id: "robot", label: "ロボットを作りたい", emoji: "🦾" },
  { id: "cheap", label: "とにかく安く始めたい", emoji: "💰" },
] as const;

type GoalId = (typeof GOALS)[number]["id"];

const BUDGETS = [
  { id: "under3k", label: "3,000円以下", max: 3000 },
  { id: "3k_8k", label: "3,000〜8,000円", max: 8000 },
  { id: "8k_15k", label: "8,000〜15,000円", max: 15000 },
  { id: "over15k", label: "15,000円以上", max: 999999 },
] as const;

type BudgetId = (typeof BUDGETS)[number]["id"];

const EXPERIENCES = [
  { id: "none", label: "全くない" },
  { id: "little", label: "少しある" },
  { id: "some", label: "ある程度ある" },
  { id: "pro", label: "業務レベル" },
] as const;

type ExperienceId = (typeof EXPERIENCES)[number]["id"];

function scoreBoard(
  board: Board,
  goal: GoalId,
  budget: BudgetId,
  experience: ExperienceId
): number {
  let score = 0;
  const budgetMax =
    BUDGETS.find((b) => b.id === budget)?.max ?? 999999;

  if (board.priceNum > budgetMax) return -100;

  if (goal === "beginner") {
    if (board.id === "arduino-uno-r4") score += 50;
    if (board.difficulty === "easy") score += 20;
    if (board.difficulty === "medium") score += 5;
  }
  if (goal === "ai") {
    if (board.aiCapable) score += 50;
    if (board.id === "raspberry-pi-5") score += 20;
  }
  if (goal === "iot") {
    if (board.wifi) score += 30;
    if (board.bluetooth) score += 10;
    if (board.id === "esp32") score += 20;
  }
  if (goal === "robot") {
    if (board.gpio >= 30) score += 20;
    if (board.id === "raspberry-pi-5") score += 15;
  }
  if (goal === "cheap") {
    if (board.priceNum <= 2000) score += 50;
    else if (board.priceNum <= 4000) score += 30;
    else if (board.priceNum <= 6000) score += 10;
  }

  if (experience === "none" || experience === "little") {
    if (board.difficulty === "easy") score += 15;
    if (board.difficulty === "hard") score -= 20;
  }
  if (experience === "pro") {
    if (board.aiCapable) score += 10;
  }

  return score;
}

export default function BoardPicker() {
  const [step, setStep] = useState<Step>(1);
  const [goal, setGoal] = useState<GoalId | null>(null);
  const [budget, setBudget] = useState<BudgetId | null>(null);
  const [experience, setExperience] = useState<ExperienceId | null>(null);
  const [ranked, setRanked] = useState<Board[]>([]);

  const handleGoal = (g: GoalId) => {
    setGoal(g);
    setStep(2);
  };

  const handleBudget = (b: BudgetId) => {
    setBudget(b);
    setStep(3);
  };

  const handleExperience = (e: ExperienceId) => {
    setExperience(e);
    if (!goal || !budget) return;
    const scored = BOARDS.map((b) => ({
      board: b,
      score: scoreBoard(b, goal, budget, e),
    }))
      .sort((a, b) => b.score - a.score)
      .map((x) => x.board);
    setRanked(scored);
    setStep("result");
  };

  const reset = () => {
    setStep(1);
    setGoal(null);
    setBudget(null);
    setExperience(null);
    setRanked([]);
  };

  const best = ranked[0];

  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Q1. 何がしたいですか？
          </h2>
          <div className="flex flex-col gap-3">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => handleGoal(g.id)}
                className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-left"
              >
                <span className="text-2xl">{g.emoji}</span>
                <span className="text-slate-700 font-medium">{g.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Q2. 予算はどのくらいですか？
          </h2>
          <div className="flex flex-col gap-3">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBudget(b.id)}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-left font-medium text-slate-700"
              >
                {b.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600"
          >
            ← 戻る
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Q3. プログラミング経験は？
          </h2>
          <div className="flex flex-col gap-3">
            {EXPERIENCES.map((e) => (
              <button
                key={e.id}
                onClick={() => handleExperience(e.id)}
                className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-left font-medium text-slate-700"
              >
                {e.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="mt-4 text-sm text-slate-400 hover:text-slate-600"
          >
            ← 戻る
          </button>
        </div>
      )}

      {step === "result" && best && (
        <div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <p className="text-sm font-semibold text-blue-600 mb-1">
              あなたへのおすすめ
            </p>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {best.name}
            </h2>
            <p className="text-slate-600 mb-4">{best.description}</p>
            <div className="flex flex-wrap gap-2 text-xs mb-4">
              <span className="bg-white border rounded px-2 py-1">
                CPU: {best.cpu}
              </span>
              <span className="bg-white border rounded px-2 py-1">
                メモリ: {best.memory}
              </span>
              <span className="bg-white border rounded px-2 py-1">
                価格: {best.price}
              </span>
              {best.wifi && (
                <span className="bg-green-100 text-green-700 border rounded px-2 py-1">
                  Wi-Fi ✓
                </span>
              )}
              {best.bluetooth && (
                <span className="bg-green-100 text-green-700 border rounded px-2 py-1">
                  BT ✓
                </span>
              )}
            </div>
            <a
              href={buildAmazonUrl(best.asin)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Amazonで見る
            </a>
          </div>

          <h3 className="font-bold text-slate-700 mb-3">全ボード比較</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-2 border border-slate-200">ボード</th>
                  <th className="p-2 border border-slate-200">価格</th>
                  <th className="p-2 border border-slate-200">Wi-Fi</th>
                  <th className="p-2 border border-slate-200">難易度</th>
                  <th className="p-2 border border-slate-200">AI</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((b, i) => (
                  <tr
                    key={b.id}
                    className={i === 0 ? "bg-blue-50 font-semibold" : ""}
                  >
                    <td className="p-2 border border-slate-200">
                      {i === 0 ? "⭐ " : ""}
                      {b.name}
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      {b.price}
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      {b.wifi ? "✓" : "✗"}
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      {b.difficulty === "easy"
                        ? "やさしい"
                        : b.difficulty === "medium"
                          ? "普通"
                          : "難しい"}
                    </td>
                    <td className="p-2 border border-slate-200 text-center">
                      {b.aiCapable ? "✓" : "✗"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={reset}
            className="mt-6 text-sm text-blue-600 hover:underline"
          >
            もう一度試す
          </button>
        </div>
      )}
    </div>
  );
}
