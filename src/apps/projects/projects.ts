import calculator from "@/assets/imgs/projects/calculator.svg";
import shortiepy from "@/assets/imgs/projects/shortiepy.svg";
import sos from "@/assets/imgs/projects/sos.svg";
import yutify from "@/assets/imgs/projects/yutify.svg";
import yutipy from "@/assets/imgs/projects/yutipy.svg";

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
    id: "70fe6cd1-fa0d-5613-b7fa-7c4e93a4be3c",
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
    id: "d0862ec0-db73-560e-94de-4e549b3bd3bf",
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
    id: "9644fe7a-9534-5306-af3a-8b366ac5b4f7",
    name: "soulofswords",
    description: "Static Website for VTuber 'soulofswords' aka SOS.",
    techStack: [
      "HTML",
      "CSS",
      "Tailwindcss",
      "JavaScript",
      "Svelte",
      "Sveltekit",
    ],
    image: sos,
    github: "https://github.com/CheapNightbot/soulofswords",
    live: "https://soulofswords.github.io"
  },
  {
    id: "ed7a6c09-3413-57bd-9c25-18fb72af3bda",
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
    id: "d0862ec0-db73-560e-94de-4e549b3bd3bf",
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
