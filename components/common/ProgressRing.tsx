// ==========================================
// FILE: components/common/ProgressRing.tsx
// Simple circular progress indicator (SVG)
// ==========================================
"use client";

interface Props { value: number; size?: number; stroke?: number; }
export function ProgressRing({ value, size = 56, stroke = 6 }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <svg width={size} height={size} className="block">
      <circle cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} stroke="#e5e7eb" fill="none" />
      <circle cx={size/2} cy={size/2} r={radius} strokeWidth={stroke} strokeLinecap="round" stroke="#3b82f6" fill="none"
        strokeDasharray={circumference} strokeDashoffset={offset} transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={12} fill="#111827" fontWeight={600}>
        {Math.round(pct)}%
      </text>
    </svg>
  );
}
