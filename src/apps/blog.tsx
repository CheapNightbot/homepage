import { AppWindowIframe } from "@/components/app-iframe";

export default function Blog() {
    const info = {
        id: "7d7cb976-b629-560e-b427-0d2f33602908",
        name: "Blog",
        source: "https://github.com/CheapNightbot/Blog",
        live: "https://blog.cheapnightbot.me"
    }

    return <AppWindowIframe info={info} />;
}
