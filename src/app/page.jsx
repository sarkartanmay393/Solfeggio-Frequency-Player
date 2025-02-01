'use client';

import { useState, useEffect } from 'react';

const solfeggioFrequencies = [
    { freq: 174, name: 'Removes Pain' },
    { freq: 285, name: 'Influences Energy Field' },
    { freq: 396, name: 'Liberates you of fear & guilt' },
    { freq: 417, name: 'Facilitates Change' },
    { freq: 432, name: 'Miracle Tone of Nature' },
    { freq: 528, name: 'Repairs DNA' },
    { freq: 639, name: 'Heals Relationships' },
    { freq: 741, name: 'Awaken Intuition' },
    { freq: 852, name: 'Attracts Soul Tribe' },
    { freq: 963, name: 'Connect with Light & Spirit' },
];

export default function FrequencyPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [frequency, setFrequency] = useState(432);
    const [audioContext, setAudioContext] = useState(null);
    const [oscillator, setOscillator] = useState(null);
    const [gainNode, setGainNode] = useState(null);

    useEffect(() => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const gain = ctx.createGain();
        gain.connect(ctx.destination);
        setAudioContext(ctx);
        setGainNode(gain);

        return () => ctx.close();
    }, []);

    const startOscillator = () => {
        if (!audioContext) return;

        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
        osc.connect(gainNode);
        osc.start();
        setOscillator(osc);
    };

    const togglePlay = async () => {
        if (isPlaying) {
            oscillator?.stop();
            setIsPlaying(false);
        } else {
            if (audioContext.state === 'suspended') {
                await audioContext.resume();
            }
            startOscillator();
            setIsPlaying(true);
        }
    };

    const handleFrequencyChange = (e) => {
        const newFreq = parseInt(e.target.value);
        setFrequency(newFreq);
        if (oscillator) {
            oscillator.frequency.setValueAtTime(newFreq, audioContext.currentTime);
        }
    };

    const findClosestFrequency = () => {
        return solfeggioFrequencies.reduce((prev, curr) =>
            Math.abs(curr.freq - frequency) < Math.abs(prev.freq - frequency) ? curr : prev
        );
    };

    const animationDuration = Math.max(0.2, 1 / (frequency / 174));
    const animationStyle = {
        animation: `pulse ${animationDuration}s infinite`,
    };

    return (
        <div className="w-screen min-h-screen p-8 text-center flex flex-col items-center justify-center" style={{ background: 'linear-gradient(45deg, #1a1a1a, #2a2a2a)' }}>
            <div className="my-4">
                <div
                    className="w-12 h-12 bg-[rgba(0,255,136,0.3)] rounded-full transition-all duration-300 ease-in-out"
                    style={{ transform: `scale(${frequency / 100})`, ...(isPlaying && animationStyle) }}
                ></div>
            </div>

            <h1 className="text-4xl mb-4 text-white" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                Solfeggio Frequency Player
            </h1>
            <p className="text-2xl text-[#00ff88] min-h-8 transition-all duration-300 ease-in-out">
                {findClosestFrequency().name}
            </p>

            <div className="max-w-[600px] my-8 mx-auto p-8 bg-white/10 rounded-[15px] backdrop-blur-[10px]">
                <button
                    onClick={togglePlay}
                    className="px-8 py-4 text-xl bg-[#00ff88] border-none rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_15px_#00ff88]"
                >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>

                <div className="my-8">
                    <input
                        type="range"
                        min="100"
                        max="1500"
                        value={frequency}
                        onChange={handleFrequencyChange}
                        className="slider w-full h-[15px] rounded-lg bg-gray-700 outline-none appearance-none"
                        style={{ accentColor: '#00ff88', border: '0.1px solid #00ff88' }}
                    />
                    <div className="mt-4 text-xl text-[#00ff88]">
                        Current Frequency: {frequency} Hz
                    </div>
                </div>

                <div className="mt-8 opacity-80 text-sm text-neutral-400">
                    <p>Slide to adjust frequency • Tap play to start</p>
                    <p>Approaching frequencies may enhance specific effects</p>
                </div>
            </div>
        </div>
    );
}