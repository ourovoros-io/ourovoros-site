// Drives the terminal: a one-time boot banner on load, then clear-and-retype
// navigation. Each navigation echoes the section's command (typed character by
// character) and writes its output by revealing the cloned <template> children
// in sequence. A generation counter cancels any in-flight animation the moment
// a new navigation starts, so rapid clicks never interleave output.

import { SECTIONS, DEFAULT_SECTION } from "../data/nav";
import wordmark from "../data/ascii/wordmark.txt?raw";

const output = document.getElementById("term-output");
const cwdEl = document.getElementById("term-cwd");
const titleEl = document.getElementById("term-title-path");
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
const sectionById = new Map(SECTIONS.map((s) => [s.id, s]));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Generation counter. Every navigation bumps it; async loops bail when their
// captured generation is stale.
let generation = 0;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function typeInto(el: HTMLElement, text: string, speed: number, gen: number): Promise<void> {
  if (reduceMotion) {
    el.textContent = text;
    return;
  }
  el.textContent = "";
  el.classList.add("caret");
  for (let i = 0; i < text.length; i += 1) {
    if (gen !== generation) {
      el.textContent = text;
      break;
    }
    el.textContent = text.slice(0, i + 1);
    await delay(speed);
  }
  el.classList.remove("caret");
}

function scrollToEnd(): void {
  if (output) output.scrollTop = output.scrollHeight;
}

// Reveal each direct child of a fragment in order; lines flagged data-type are
// retyped so they read as freshly written.
async function revealChildren(
  target: HTMLElement,
  fragment: DocumentFragment,
  gen: number,
): Promise<void> {
  const nodes = Array.from(fragment.children) as HTMLElement[];
  for (const node of nodes) {
    if (gen !== generation) return;
    target.appendChild(node);
    node.classList.add("term-in");
    if (node.hasAttribute("data-type")) {
      await typeInto(node, node.textContent ?? "", 16, gen);
    }
    scrollToEnd();
    if (!reduceMotion) await delay(70);
  }
}

function setActive(id: string): void {
  for (const link of navLinks) {
    const isCurrent = link.dataset["nav"] === id;
    if (isCurrent) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  if (cwdEl) cwdEl.textContent = id;
  if (titleEl) titleEl.textContent = `~/${id}`;
}

function span(className: string, text: string): HTMLSpanElement {
  const el = document.createElement("span");
  el.className = className;
  el.textContent = text;
  return el;
}

// Build the "prompt + echoed command" line that precedes a section's output.
// Built with DOM methods (not innerHTML) so the section id is never interpolated
// into markup.
function promptLine(id: string): { block: HTMLDivElement; cmd: HTMLSpanElement } {
  const block = document.createElement("div");
  const line = document.createElement("div");
  line.className = "flex flex-wrap items-baseline";
  const cmd = span("cmd text-ink", "");
  line.append(
    span("text-accent", "ourovoros@io"),
    span("text-muted", ` ~/${id}`),
    span("text-faint", " % "),
    cmd,
  );
  const out = document.createElement("div");
  out.className = "mt-2 space-y-1";
  block.append(line, out);
  return { block, cmd };
}

async function navigate(id: string): Promise<void> {
  const section = sectionById.get(id);
  const template = document.querySelector<HTMLTemplateElement>(`template[data-section="${id}"]`);
  if (!section || !template || !output) return;

  const gen = (generation += 1);
  setActive(id);
  output.replaceChildren();

  // The OUROVOROS wordmark heads every view. Shown instantly (it is identity,
  // not output) with a soft fade.
  const wordmarkEl = document.createElement("pre");
  wordmarkEl.className = "term-wordmark term-in mb-5 text-accent select-none";
  wordmarkEl.setAttribute("aria-hidden", "true");
  wordmarkEl.textContent = wordmark;
  output.appendChild(wordmarkEl);

  const { block, cmd } = promptLine(id);
  output.appendChild(block);
  await typeInto(cmd, section.command, 26, gen);
  if (gen !== generation) return;

  const out = block.lastElementChild as HTMLElement;
  await revealChildren(out, template.content.cloneNode(true) as DocumentFragment, gen);
}

async function boot(): Promise<void> {
  if (!output) return;
  const gen = (generation += 1);
  const pre = document.createElement("pre");
  pre.className = "text-accent/90 leading-tight";
  output.appendChild(pre);
  const lines = [
    "ourovoros@io:~$ ./init",
    "[ ok ] mounting ~/ourovoros",
    "[ ok ] loading collective — 2 engineers online",
    "",
    wordmark,
  ];
  for (const line of lines) {
    if (gen !== generation) return;
    pre.textContent += (pre.textContent ? "\n" : "") + line;
    scrollToEnd();
    if (!reduceMotion) await delay(line ? 160 : 60);
  }
  if (!reduceMotion) await delay(420);
}

function go(id: string): void {
  const target = sectionById.has(id) ? id : DEFAULT_SECTION;
  if (history.replaceState) history.replaceState(null, "", `#${target}`);
  void navigate(target);
}

for (const link of navLinks) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    go(link.dataset["nav"] ?? DEFAULT_SECTION);
  });
}

window.addEventListener("hashchange", () => {
  go(location.hash.slice(1));
});

// On load: deep-link straight to a section, otherwise play the boot banner then
// drop into the default section.
const initial = location.hash.slice(1);
if (sectionById.has(initial)) {
  go(initial);
} else {
  void boot().then(() => go(DEFAULT_SECTION));
}
