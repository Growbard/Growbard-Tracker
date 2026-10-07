import React from "react";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-ink-200 bg-white shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  action,
  right,
}: {
  title: React.ReactNode;
  action?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-4">
      <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
      {right}
      {action}
    </div>
  );
}
