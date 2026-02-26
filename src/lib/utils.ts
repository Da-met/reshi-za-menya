/**
 * Утилита для объединения CSS классов
 * Безопасная альтернатива classnames/classcat
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}