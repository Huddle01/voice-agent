import React from "react";

const RandomDots: React.FC = () => {
    return (
        <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => {
                    const size = 1 + Math.random() * 3;
                    const posX = 10 + Math.random() * 80;
                    const posY = 10 + Math.random() * 80;
                    const delay = Math.random() * 2;
                    const duration = 1 + Math.random() * 2;
                    
                    return (
                    <div 
                        className="absolute rounded-full bg-amber-300"
                        style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${posX}%`,
                        top: `${posY}%`,
                        opacity: 0.6,
                        animation: `float ${duration}s infinite ease-in-out`,
                        animationDelay: `${delay}s`
                        }}
                    />
                    );
                })}
                </div>
    )
}

export default React.memo(RandomDots)