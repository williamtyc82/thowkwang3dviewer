import { useState } from 'react';

export default function GalleryCard({ artifact }) {
    const [isViewerActive, setIsViewerActive] = useState(false);

    // When active, render the Sketchfab iframe with AR flags
    const renderViewer = () => (
        <iframe
            title={artifact.title}
            className="absolute inset-0 w-full h-full border-0"
            src={`https://sketchfab.com/models/${artifact.id}/embed?autostart=1&ui_ar=1&ui_infos=0&ui_watermark=0&ui_inspector=0`}
            allow="autoplay; fullscreen; xr-spatial-tracking"
            xr-spatial-tracking="true"
            execution-while-out-of-viewport="true"
            execution-while-not-rendered="true"
            web-share="true"
            allowFullScreen
        />
    );

    return (
        <div className="col-span-1 group relative overflow-hidden rounded-xl bg-surface-dark border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col">
            <div className="relative w-full aspect-video bg-[#151515]">
                {isViewerActive ? (
                    renderViewer()
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors cursor-pointer" onClick={() => setIsViewerActive(true)}>
                        <span className="material-symbols-outlined text-6xl text-white/20 group-hover:text-primary/40 transition-all duration-500 scale-100 group-hover:scale-110 mb-2">
                            3d_rotation
                        </span>
                        <span className="text-primary font-semibold text-sm uppercase tracking-widest px-4 py-2 border border-primary/30 rounded-full bg-black/50 backdrop-blur-sm group-hover:bg-primary group-hover:text-black transition-colors">
                            Tap to Load 3D
                        </span>
                    </div>
                )}
            </div>

            <div className="relative z-20 p-5 flex flex-col justify-between gap-4 flex-1">
                <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{artifact.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {artifact.desc}
                    </p>
                </div>
            </div>
        </div>
    );
}
