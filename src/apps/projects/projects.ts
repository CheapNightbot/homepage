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
    id: "9644fe7a-9534-5306-af3a-8b366ac5b4f7",
    name: "soulofswords",
    description: "Static Website for VTuber 'soulofswords' aka SOS.",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript"
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
    live: "https://yutify.cheapnightbot.me"
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
