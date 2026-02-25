import calculator from "@/assets/imgs/projects/calculator.svg";
import shortiepy from "@/assets/imgs/projects/shortiepy.svg";
import sos from "@/assets/imgs/projects/sos.svg";
import window from "@/assets/imgs/projects/window.svg";
import yutify from "@/assets/imgs/projects/yutify.svg";
import yutipy from "@/assets/imgs/projects/yutipy.svg";
import homepage from "@/assets/imgs/ポテト.svg";

export interface ProjectsList {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  image: string;
  github: string;
  live: string;
}

export const projects: ProjectsList[] = [
  {
    id: "ZmDaeYiD",
    name: "Cheap Calculator ~",
    description: "A simple and stumid command-line calculator to perform basic arithmetic operations such as addition, subtraction, multiplication, and division. ♡(>ᴗ•)",
    techStack: [
      "C",
      "Makefile"
    ],
    image: calculator,
    github: "https://github.com/CheapNightbot/calc",
    live: "#"
  },
  {
    id: "Z0z5rfjF",
    name: "Doors-11",
    description: "i created better operating system, except it doesn't work... :)",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    image: window,
    github: "https://github.com/CheapNightbot/Doors-11",
    live: "https://cheapnightbot.github.io/Doors-11"
  },
  {
    id: "aR9Vaait",
    name: "homepage",
    description: "my personal website ando homepage !!! (this one you are currently on) ~",
    techStack: [
      "TypeScript",
      "React",
      "Tailwindcss",
      "Vite"
    ],
    image: homepage,
    github: "https://github.com/CheapNightbot/homepage",
    live: "https://cheapnightbot.github.io"
  },
  {
    id: "_nrkhltH",
    name: "shortiepy",
    description: "Your local URL shortener (˶˘ ³˘)♡",
    techStack: [
      "Python",
      "Flask",
      "SQLite",
    ],
    image: shortiepy,
    github: "https://github.com/CheapNightbot/shortiepy",
    live: "https://pypi.org/project/shortiepy"
  },
  {
    id: "VnPflCXp",
    name: "soulofswords",
    description: "Static Website for VTuber 'soulofswords' aka SOS.",
    techStack: [
      "Tailwindcss",
      "TypeScript",
      "Svelte",
      "Sveltekit",
      "Vite"
    ],
    image: sos,
    github: "https://github.com/CheapNightbot/soulofswords",
    live: "https://soulofswords.github.io"
  },
  {
    id: "Ku0WKl5O",
    name: "yutify",
    description: "Simple RESTful API and full-stack web application for retrieving music info, streaming links, and user activity from various platforms.",
    techStack: [
      "Python",
      "Flask",
      "yutipy",
      "REST API"
    ],
    image: yutify,
    github: "https://github.com/CheapNightbot/yutify",
    live: "#"
  },
  {
    id: "9pReTTtc",
    name: "yutipy",
    description: "A simple Python package to interact with various music platforms APIs.",
    techStack: [
      "Python",
      "pypi"
    ],
    image: yutipy,
    github: "https://github.com/CheapNightbot/yutipy",
    live: "https://yutipy.readthedocs.io"
  }
]
