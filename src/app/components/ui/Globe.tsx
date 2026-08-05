"use client";
import { cn } from "../../../lib/utils";
import createGlobe from "cobe";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface EarthProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  markers?: { location: [number, number]; size: number }[];
}

const defaultTradeMarkers: { location: [number, number]; size: number }[] = [
  { location: [23.8103, 90.4125], size: 0.05 }, // Dhaka, Bangladesh
  { location: [4.711, -74.0721], size: 0.05 },  // Bogota, Colombia
  { location: [9.03, 38.74], size: 0.05 },     // Addis Ababa, Ethiopia
  { location: [28.6139, 77.209], size: 0.05 },  // New Delhi, India
  { location: [5.36, -4.0083], size: 0.05 },   // Abidjan, Ivory Coast
  { location: [14.5995, 120.9842], size: 0.05 },// Manila, Philippines
  { location: [51.5074, -0.1278], size: 0.05 }, // London, UK
  { location: [40.7128, -74.006], size: 0.05 }, // New York, USA
  { location: [35.6762, 139.6503], size: 0.05 },// Tokyo, Japan
  { location: [25.2048, 55.2708], size: 0.05 }, // Dubai, UAE
  { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
  { location: [-33.8688, 151.2093], size: 0.05 },// Sydney, Australia
  { location: [-23.5505, -46.6333], size: 0.05 },// Sao Paulo, Brazil
  { location: [30.0444, 31.2357], size: 0.05 }, // Cairo, Egypt
  { location: [50.1109, 8.6821], size: 0.05 },  // Frankfurt, Germany
];

const Earth: React.FC<EarthProps> = ({
  className,
  theta = 0.25,
  dark = 1,
  scale = 1.1,
  diffuse = 1.2,
  mapSamples = 45000,
  mapBrightness = 6,
  baseColor = [0.494, 0.286, 0.702], // Amethyst #7e49b3
  markerColor = [0.92, 0.75, 1.0],   // Bright lavender accent
  glowColor = [0.55, 0.32, 0.78],     // Vibrant amethyst glow
  markers = [],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const rRef = useRef(0);

  useEffect(() => {
    let width = 0;
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    let phi = 0;
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: theta,
      dark: dark,
      scale: scale,
      diffuse: diffuse,
      mapSamples: mapSamples,
      mapBrightness: mapBrightness,
      baseColor: baseColor,
      markerColor: markerColor,
      glowColor: glowColor,
      opacity: 1,
      offset: [0, 0],
      markers: markers,
    });

    let animationFrameId: number;
    const animate = () => {
      if (!pointerInteracting.current) {
        phi += 0.004;
      }
      globe.update({ phi: phi + pointerInteractionMovement.current });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [theta, dark, scale, diffuse, mapSamples, mapBrightness, baseColor, markerColor, glowColor, markers]);

  return (
    <div
      className={cn(
        "relative flex items-center justify-center z-10 w-full max-w-[450px] mx-auto cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          aspectRatio: "1",
          contain: "layout paint size",
        }}
      />
    </div>
  );
};

export default Earth;
