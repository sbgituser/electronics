interface Props {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "text" }: Props) {
  return (
    <div className="my-4">
      {language !== "text" && (
        <div className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-t-lg font-mono">
          {language}
        </div>
      )}
      <pre
        className={`bg-slate-800 text-slate-100 p-4 overflow-x-auto text-sm font-mono ${language !== "text" ? "rounded-b-lg" : "rounded-lg"}`}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
