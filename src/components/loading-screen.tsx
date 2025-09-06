function LoadingScreen() {
    return (
        <div className="w-screen h-screen fixed top-0 left-0 bg-[#fefcff] flex items-center justify-center z-50">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                    radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
                    radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
            />
            <div className="animate-in zoom-in-50 duration-200 ease-in-out">
                {/* thank yu, src: https://codepen.io/CalculateQuick/pen/azvvjGv !!! */}
                <div className="ripple">
                    <div className="ripple-circle"></div>
                    <div className="ripple-circle"></div>
                    <div className="ripple-circle"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;
