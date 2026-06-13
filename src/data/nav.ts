// The site is a terminal. Each navigable section maps to a command the terminal
// "runs": the sidebar label is what the visitor sees, `command` is what gets
// echoed at the prompt before the section's output is written out.

export interface NavSection {
  id: string;
  label: string;
  command: string;
}

export const SECTIONS: NavSection[] = [
  { id: "whoami", label: "whoami", command: "whoami" },
  { id: "approach", label: "approach", command: "cat approach.txt" },
  { id: "tooling", label: "tooling", command: "ls --tree ~/tooling" },
  { id: "products", label: "products", command: "ls ~/products" },
  { id: "clients", label: "clients", command: "cat clients.txt" },
  { id: "team", label: "team", command: "cat team/*.md" },
  { id: "contact", label: "contact", command: "./contact.sh" },
];

export const DEFAULT_SECTION = "whoami";
