import sos from "@/assets/imgs/projects/sos.svg"
import yutify from "@/assets/imgs/projects/yutify.svg"
import yutipy from "@/assets/imgs/projects/yutipy.svg"

export const projects = [
  {
    "id": 1,
    "name": "yutify",
    "description": "Simple RESTful API and full-stack web application for retrieving music info, streaming links, and user activity from various platforms.",
    "shortDescription": "RESTful API for music info.",
    "techStack": [
      "Python",
      "Flask",
      "yutipy",
      "REST API"
    ],
    "image": yutify,
    "github": "https://github.com/CheapNightbot/yutify",
    "live": "https://yutify.cheapnightbot.me"
  },
  {
    "id": 2,
    "name": "yutipy",
    "description": "A simple Python package to interact with various music platforms APIs.",
    "shortDescription": "Python package for music APIs.",
    "techStack": [
      "Python",
      "pypi"
    ],
    "image": yutipy,
    "github": "https://github.com/CheapNightbot/yutipy",
    "live": "https://yutipy.readthedocs.io"
  },
  {
    "id": 3,
    "name": "soulofswords",
    "description": "Static Website for VTuber 'soulofswords' aka SOS.",
    "shortDescription": "Static website for SOS.",
    "techStack": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "image": sos,
    "github": "https://github.com/CheapNightbot/soulofswords",
    "live": "https://soulofswords.github.io"
  }
]
