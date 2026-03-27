type CalloutType = "tip" | "warning" | "hint";

const calloutConfig: Record<
  CalloutType,
  { icon: string; label: string; className: string }
> = {
  tip: {
    icon: "💡",
    label: "初心者向けポイント",
    className: "bg-green-50 border-green-400 text-green-900",
  },
  warning: {
    icon: "⚠️",
    label: "注意",
    className: "bg-red-50 border-red-400 text-red-900",
  },
  hint: {
    icon: "🔧",
    label: "ヒント",
    className: "bg-blue-50 border-blue-400 text-blue-900",
  },
};

interface Props {
  type?: CalloutType;
  children: React.ReactNode;
}

export default function Callout({ type = "tip", children }: Props) {
  const config = calloutConfig[type];
  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg my-4 ${config.className}`}
    >
      <p className="font-bold text-sm mb-1">
        {config.icon} {config.label}
      </p>
      <div className="text-sm">{children}</div>
    </div>
  );
}
