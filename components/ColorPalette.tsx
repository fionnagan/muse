interface Props {
  colors: string[];
  size?: "sm" | "md" | "lg";
  showHex?: boolean;
}

export default function ColorPalette({ colors, size = "md", showHex = false }: Props) {
  const swatchSize = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-10 h-10" : "w-8 h-8";

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((hex, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className={`${swatchSize} rounded-full border-2 border-white shadow-sm`}
            style={{ background: hex, boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }}
            title={hex}
          />
          {showHex && (
            <span className="text-[9px] font-mono text-sand-dark">{hex}</span>
          )}
        </div>
      ))}
    </div>
  );
}
