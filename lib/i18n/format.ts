/**
 * Fills `{placeholder}` slots in a dictionary string. Dictionaries hold plain
 * strings (they cross the Server → Client boundary as props), so interpolation
 * happens at the call site instead of inside the dictionary.
 */
export function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
