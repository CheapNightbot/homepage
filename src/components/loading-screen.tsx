import { Loader2 } from "lucide-react";

function LoadingScreen() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[#fefcff] flex items-center justify-center z-50 animate-out fade-in duration-200 ease-out">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                    radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                    radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
            />
            <div className="animate-in zoom-in duration-300 ease-in-out">
                <Loader2 size={32} className="text-secondary animate-spin" />
            </div>
        </div>
    );
}

export default LoadingScreen;
