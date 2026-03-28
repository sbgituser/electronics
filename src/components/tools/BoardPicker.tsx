"use client";

import { useState } from "react";
import type { Board } from "@/types";
import { BOARDS } from "@/data/boards";
import { buildAmazonUrl } from "@/lib/site";
import { ChevronLeft, ExternalLink, RotateCcw } from "lucide-react";

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

  const stepIndicator = (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            (typeof step === "number" ? step : 4) >= s
              ? "bg-[#00838F] text-white"
              : "bg-gray-200 text-gray-500"
          }`}>
            {s}
          </div>
          {s < 3 && <div className={`w-8 h-0.5 ${(typeof step === "number" ? step : 4) > s ? "bg-[#00838F]" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      {step === 1 && (
        <div>
          {stepIndicator}
          <h2 className="text-lg font-bold text-[#1a2332] mb-4">
            Q1. 何がしたいですか？
          </h2>
          <div className="flex flex-col gap-2.5">
            {GOALS.map((g) => (
              <button
                key={g.id}
                onClick={() => handleGoal(g.id)}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#00838F] hover:bg-teal-50 transition-colors text-left"
              >
                <span className="text-2xl">{g.emoji}</span>
                <span className="text-[#1a2332] font-medium text-sm">{g.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          {stepIndicator}
          <h2 className="text-lg font-bold text-[#1a2332] mb-4">
            Q2. 予算はどのくらいですか？
          </h2>
          <div className="flex flex-col gap-2.5">
            {BUDGETS.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBudget(b.id)}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#00838F] hover:bg-teal-50 transition-colors text-left font-medium text-[#1a2332] text-sm"
              >
                {b.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-4 inline-flex items-center text-sm text-gray-400 hover:text-[#00838F] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            戻る
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          {stepIndicator}
          <h2 className="text-lg font-bold text-[#1a2332] mb-4">
            Q3. プログラミング経験は？
          </h2>
          <div className="flex flex-col gap-2.5">
            {EXPERIENCES.map((e) => (
              <button
                key={e.id}
                onClick={() => handleExperience(e.id)}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-[#00838F] hover:bg-teal-50 transition-colors text-left font-medium text-[#1a2332] text-sm"
              >
                {e.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="mt-4 inline-flex items-center text-sm text-gray-400 hover:text-[#00838F] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            戻る
          </button>
        </div>
      )}

      {step === "result" && best && (
        <div>
          <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-200 rounded-lg p-6 mb-6">
            <p className="text-sm font-semibold text-[#00838F] mb-1">
              あなたへのおすすめ
            </p>
            <h2 className="text-2xl font-bold text-[#1a2332] mb-2">
              {best.name}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{best.description}</p>
            <div className="flex flex-wrap gap-2 text-xs mb-5">
              <span className="bg-white border border-gray-200 rounded px-2.5 py-1 text-gray-600">
                CPU: {best.cpu}
              </span>
              <span className="bg-white border border-gray-200 rounded px-2.5 py-1 text-gray-600">
                メモリ: {best.memory}
              </span>
              <span className="bg-white border border-gray-200 rounded px-2.5 py-1 text-gray-600">
                価格: {best.price}
              </span>
              {best.wifi && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2.5 py-1">
                  Wi-Fi
                </span>
              )}
              {best.bluetooth && (
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 rounded px-2.5 py-1">
                  Bluetooth
                </span>
              )}
            </div>
            <a
              href={buildAmazonUrl(best.asin)}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#FF6D00] hover:bg-[#E65100] text-white font-semibold py-2.5 px-6 rounded transition-colors text-sm"
            >
              Amazonで見る
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <h3 className="font-bold text-[#1a2332] text-sm mb-3">全ボード比較</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[#F5F7FA]">
                  <th className="text-left p-2.5 border border-gray-200 font-semibold text-gray-600">ボード</th>
                  <th className="p-2.5 border border-gray-200 font-semibold text-gray-600">価格</th>
                  <th className="p-2.5 border border-gray-200 font-semibold text-gray-600">Wi-Fi</th>
                  <th className="p-2.5 border border-gray-200 font-semibold text-gray-600">難易度</th>
                  <th className="p-2.5 border border-gray-200 font-semibold text-gray-600">AI</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((b, i) => (
                  <tr
                    key={b.id}
                    className={i === 0 ? "bg-teal-50 font-semibold" : ""}
                  >
                    <td className="p-2.5 border border-gray-200 text-[#1a2332]">
                      {i === 0 && <span className="text-[#00838F] mr-1">●</span>}
                      {b.name}
                    </td>
                    <td className="p-2.5 border border-gray-200 text-center text-gray-600">
                      {b.price}
                    </td>
                    <td className="p-2.5 border border-gray-200 text-center">
                      {b.wifi ? <span className="text-emerald-600">✓</span> : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="p-2.5 border border-gray-200 text-center text-gray-600">
                      {b.difficulty === "easy"
                        ? "やさしい"
                        : b.difficulty === "medium"
                          ? "普通"
                          : "難しい"}
                    </td>
                    <td className="p-2.5 border border-gray-200 text-center">
                      {b.aiCapable ? <span className="text-emerald-600">✓</span> : <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={reset}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#00838F] hover:text-[#006064] font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            もう一度試す
          </button>
        </div>
      )}
    </div>
  );
}
