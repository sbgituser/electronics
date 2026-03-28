type CalloutType = "tip" | "warning" | "hint";

const calloutConfig: Record<
  CalloutType,
  { label: string; className: string }
> = {
  tip: {
    label: "初心者向けポイント",
    className: "bg-emerald-50 border-emerald-500 text-emerald-900",
  },
  warning: {
    label: "注意",
    className: "bg-rose-50 border-rose-500 text-rose-900",
  },
  hint: {
    label: "ヒント",
    className: "bg-teal-50 border-teal-500 text-teal-900",
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
        {config.label}
      </p>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
