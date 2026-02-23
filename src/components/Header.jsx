import { useRef } from 'react';

export default function Header({ onTripleTap }) {
    const tapTimes = useRef([]);

    const handleLogoTap = () => {
        const now = Date.now();
        // Add current tap time
        tapTimes.current.push(now);

        // Keep only taps within the last 3 seconds
        tapTimes.current = tapTimes.current.filter(time => now - time < 3000);

        // Check if there are 3 taps within the window
        if (tapTimes.current.length >= 3) {
            tapTimes.current = []; // Reset after trigger
            onTripleTap();
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#1A1A1A]/90 border-b border-[#333] px-4 py-3 shadow-lg">
            <div className="flex items-center justify-between mx-auto max-w-2xl">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleLogoTap}
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-surface-dark overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer touch-manipulation"
                        aria-label="Thow Kwang Logo - Tap 3 times for Admin"
                    >
                        <img
                            src="/logo.png"
                            alt="Thow Kwang Museum Logo"
                            className="h-full w-full object-contain p-0.5 opacity-90"
                        />
                    </button>
                    <div>
                        <h1 className="font-display text-lg font-bold leading-tight text-white tracking-wide">
                            Digital Heritage
                        </h1>
                        <p className="text-xs text-primary font-medium tracking-wider uppercase">
                            Thow Kwang Collection
                        </p>
                    </div>
                </div>
                <button className="text-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">search</span>
                </button>
            </div>
        </header>
    );
}
