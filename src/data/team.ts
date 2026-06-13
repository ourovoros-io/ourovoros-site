// The two engineers are the differentiator, so the collective section is
// prominent. Bios are deliberately factual and short. Links and the precise
// wording are placeholders to confirm with each person.

export interface TeamMember {
  name: string;
  handle: string;
  bio: string;
  portrait: "a" | "b";
  links: { label: string; href: string }[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Georgios Delkos",
    handle: "georgiosdelkos",
    bio: "Systems and protocol engineering. Background in security review across Ethereum and other chains.",
    portrait: "a",
    links: [
      { label: "GitHub", href: "https://github.com/georgiosdelkos" },
      { label: "Org", href: "https://github.com/ourovoros-io" },
    ],
  },
  {
    name: "Camden",
    handle: "camden",
    bio: "Low-level and compiler-adjacent engineering. Builds the tooling that the rest of the work runs on.",
    portrait: "b",
    links: [{ label: "GitHub", href: "https://github.com/ourovoros-io" }],
  },
];
