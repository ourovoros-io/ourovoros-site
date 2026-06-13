// The two engineers are the differentiator, so the collective section is
// prominent. Bios are deliberately factual and short. Links and the precise
// wording are placeholders to confirm with each person.

export interface TeamMember {
  name: string;
  handle: string;
  portrait: "a" | "b";
  links: { label: string; href: string }[];
}

export const TEAM: TeamMember[] = [
  {
    name: "Georgios Delkos",
    handle: "georgiosdelkos",
    portrait: "a",
    links: [
      { label: "GitHub", href: "https://github.com/georgiosdelkos" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/georgios-delkos-37355a19a/",
      },
    ],
  },
  {
    name: "Camden Smallwood",
    handle: "camden-smallwood",
    portrait: "b",
    links: [
      { label: "GitHub", href: "https://github.com/ourovoros-io" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/camden-smallwood-b828aa161/",
      },
    ],
  },
];
