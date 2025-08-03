import React from 'react';

// The main App component now handles everything.
export default function App() {
    // State to trigger the fade-out animation.
    const [isLoaded, setIsLoaded] = React.useState(false);
    // State to remove the preloader from the DOM after the animation.
    const [isMounted, setIsMounted] = React.useState(true);

    // This effect simulates a loading time.
    React.useEffect(() => {
        // After 1.5 seconds, set isLoaded to true to start the fade-out.
        const loadTimer = setTimeout(() => setIsLoaded(true), 3500);
        return () => clearTimeout(loadTimer);
    }, []);

    // This effect waits for the fade-out to finish before unmounting the component.
    React.useEffect(() => {
        if (isLoaded) {
            // The duration here should match the transition duration below (500ms).
            const unmountTimer = setTimeout(() => setIsMounted(false), 1000);
            return () => clearTimeout(unmountTimer);
        }
    }, [isLoaded]);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* We include the keyframes and custom animation classes directly here. */}
            <style>
                {`
                    @keyframes load {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.5); }
                    }
                    .animate-load { animation: load 1s infinite; }
                    .animation-delay-200 { animation-delay: 0.2s; }
                    .animation-delay-400 { animation-delay: 0.4s; }
                `}
            </style>

            {/* The preloader is only rendered if isMounted is true. */}
            {isMounted && (
                <div 
                    // These classes handle the fade-out animation.
                    // `transition-opacity` and `duration-500` create the smooth fade.
                    // The opacity changes from 100 to 0 when `isLoaded` becomes true.
                    className={`fixed top-0 left-0 w-full h-full bg-[#fcfcfa] z-50 flex justify-center items-center transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="flex">
                        <div className="w-5 h-5 rounded-full mx-2.5 bg-[#e5a1aa] animate-load"></div>
                        <div className="w-5 h-5 rounded-full mx-2.5 bg-[#e5a1aa] animate-load animation-delay-200"></div>
                        <div className="w-5 h-5 rounded-full mx-2.5 bg-[#e5a1aa] animate-load animation-delay-400"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
