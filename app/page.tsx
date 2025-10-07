"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_LIST = [
  "./edits/12.mp4",
  "./edits/1.mp4",
  "./edits/13.mp4",
  "./edits/3.mp4",
  "./edits/4.mp4",
  "./edits/5.mp4",
  "./edits/2.mp4",
  "./edits/6.mp4",
  "./edits/7.mp4",
  "./edits/8.mp4",
  "./edits/9.mp4",
  "./edits/10.mp4",
  "./edits/11.mp4",
  "./edits/14.mp4",
  "./edits/15.mp4",
  "./edits/16.mp4",
  "./edits/17.mp4",
  "./edits/18.mp4",
];

interface FallingItem {
  id: number;
  x: number;
  type: "text" | "image";
  delay: number;
  duration: number;
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [videos] = useState<string[]>(VIDEO_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);

  const handleStart = () => {
    setStarted(true);
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (video) {
      video.play();
    }
    if (bgVideo) {
      bgVideo.play();
    }
  };

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      const newItem: FallingItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        type: Math.random() > 0.5 ? "text" : "image",
        delay: 0,
        duration: 2 + Math.random() * 2,
      };

      setFallingItems((prev) => [...prev, newItem]);

      setTimeout(() => {
        setFallingItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, newItem.duration * 1000 + 500);
    }, 300);

    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videos.length === 0 || !started) return;

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [videos, started]);

  useEffect(() => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (!video || videos.length === 0 || !started) return;

    video.src = videos[currentIndex];
    video.load();
    video.play();

    if (bgVideo) {
      bgVideo.src = videos[currentIndex];
      bgVideo.load();
      bgVideo.play();
    }
  }, [currentIndex, videos, started]);

  if (!started) {
    return (
      <div
        className="w-screen h-screen flex items-center justify-center bg-black text-white text-4xl"
        onClick={handleStart}
        style={{ cursor: "url('./chama-cursor.png') 16 16, auto" }}
      >
        click one time and see CHAMA
      </div>
    );
  }

  return (
    <div
      className="w-screen h-screen bg-black relative overflow-hidden"
      style={{ cursor: "url('./chama-cursor.png') 64 64, auto" }}
    >
      <video
        ref={bgVideoRef}
        className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-50"
        playsInline
        muted
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        className="relative w-full h-full object-contain z-10"
        playsInline
      />

      {fallingItems.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: `${item.x}%`,
            top: "-100px",
            animation: `fall ${item.duration}s linear forwards`,
          }}
        >
          {item.type === "text" ? (
            <span className="text-white font-bold text-4xl opacity-80 drop-shadow-lg">
              CHAMA
            </span>
          ) : (
            <img
              src="/chama.png"
              alt="CHAMA"
              className="w-16 h-16 opacity-80 drop-shadow-lg"
            />
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
