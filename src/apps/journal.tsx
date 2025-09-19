import { AppWindowIframe } from "@/components/app-iframe";

export default function Journal() {
    const info = {
        id: "1b166866-80b5-5a9f-a272-2c559186fe0c",
        name: "Journal",
        source: "https://github.com/CheapNightbot/Journal",
        live: "https://journal.cheapnightbot.me"
    }

    return <AppWindowIframe info={info} />;
}
