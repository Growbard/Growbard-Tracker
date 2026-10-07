"use client";

import * as Lucide from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

/**
 * Renders a lucide icon by its string name (so icon choices can live
 * in the data file). Falls back to a Circle if the name is unknown.
 */
export default function Icon({ name, size = 16, className, color }: IconProps) {
  const Cmp = (Lucide as unknown as Record<string, React.ElementType>)[name] ||
    Lucide.Circle;
  return <Cmp size={size} className={className} color={color} />;
}
