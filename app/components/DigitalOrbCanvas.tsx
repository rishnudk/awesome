"use client";

import React, { useEffect, useRef } from "react";

interface OrbElement {
  x: number;
  y: number;
  z: number;
  radius: number;
  text: string;
  type: "code" | "icon" | "tag" | "dot" | "bracket";
  color: string;
  size: number;
}

export default function DigitalOrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for subtle orbital physics
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.003;
    let targetRotationY = 0.005;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseX = x * 0.00005;
      mouseY = y * 0.00005;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create 3D Orb Points
    const numPoints = 160;
    const orbRadius = Math.min(width, height) * 0.32;
    const elements: OrbElement[] = [];

    const codeTokens = [
      "<Card />",
      "{...props}",
      "motion.div",
      "flex-1",
      "#FF6A00",
      "backdrop-blur",
      "<Button />",
      "grid-cols-3",
      "shadcn/ui",
      "v0.dev",
      "0101",
      "<Grid />",
      "p-6",
      "border-white/10",
      "gap-4",
      "rounded-2xl",
      "hover:scale",
      "useState()",
      "Figma",
      "npm i",
      "Tailwind",
      "<Icon />",
      "theme.dark",
      "glass",
    ];

    const colors = [
      "#FFFFFF",
      "#E2E8F0",
      "#FF6A00",
      "#FF8533",
      "#94A3B8",
      "#CBD5E1",
      "#FFA966",
    ];

    // Fibonacci sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const isText = i % 3 === 0;
      const isCode = i % 4 === 0;
      const type = isText ? (isCode ? "code" : "tag") : i % 5 === 0 ? "bracket" : "dot";
      
      elements.push({
        x: x * orbRadius,
        y: y * orbRadius,
        z: z * orbRadius,
        radius: orbRadius,
        text: codeTokens[i % codeTokens.length],
        type,
        color: colors[i % colors.length],
        size: type === "dot" ? Math.random() * 2 + 1.5 : Math.random() * 3 + 10,
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Update rotation angles with inertia
      targetRotationX += (mouseY - targetRotationX) * 0.05;
      targetRotationY += (mouseX - targetRotationY) * 0.05;

      angleX += 0.003 + targetRotationX;
      angleY += 0.004 + targetRotationY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Render Central Glowing Core
      const radialGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        orbRadius * 1.1
      );
      radialGradient.addColorStop(0, "rgba(255, 106, 0, 0.28)");
      radialGradient.addColorStop(0.35, "rgba(255, 106, 0, 0.12)");
      radialGradient.addColorStop(0.7, "rgba(255, 106, 0, 0.03)");
      radialGradient.addColorStop(1, "transparent");

      ctx.fillStyle = radialGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, orbRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Render Technical Wireframe Rings
      ctx.strokeStyle = "rgba(255, 106, 0, 0.15)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      // Orbital Ring 1
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, orbRadius * 1.05, orbRadius * 0.4, angleY, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital Ring 2
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, orbRadius * 0.5, orbRadius * 1.1, -angleX, 0, Math.PI * 2);
      ctx.stroke();

      ctx.setLineDash([]); // Reset dash

      // Sort elements by Z for depth rendering
      const projectedElements = elements.map((elem) => {
        // Rotate around X
        let y1 = elem.y * cosX - elem.z * sinX;
        let z1 = elem.z * cosX + elem.y * sinX;

        // Rotate around Y
        let x2 = elem.x * cosY + z1 * sinY;
        let z2 = z1 * cosY - elem.x * sinY;

        // Perspective scale factor
        const perspective = 600;
        const scale = perspective / (perspective + z2);

        const px = centerX + x2 * scale;
        const py = centerY + y1 * scale;

        return {
          ...elem,
          px,
          py,
          scale,
          z2,
        };
      });

      projectedElements.sort((a, b) => a.z2 - b.z2);

      // Draw connections between nearby nodes
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedElements.length; i += 4) {
        const p1 = projectedElements[i];
        if (p1.z2 > 0) continue; // Only draw for back/mid elements

        for (let j = i + 1; j < projectedElements.length; j += 6) {
          const p2 = projectedElements[j];
          const dist = Math.hypot(p1.px - p2.px, p1.py - p2.py);
          if (dist < 70) {
            const alpha = (1 - dist / 70) * 0.18 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = p1.color === "#FF6A00" || p2.color === "#FF6A00"
              ? `rgba(255, 106, 0, ${alpha * 1.5})`
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw Elements
      projectedElements.forEach((elem) => {
        const opacity = Math.max(0.15, Math.min(1, (elem.z2 + orbRadius) / (orbRadius * 2)));

        if (elem.type === "dot") {
          ctx.beginPath();
          ctx.arc(elem.px, elem.py, elem.size * elem.scale, 0, Math.PI * 2);
          ctx.fillStyle = elem.color === "#FF6A00"
            ? `rgba(255, 106, 0, ${opacity})`
            : `rgba(255, 255, 255, ${opacity * 0.7})`;
          ctx.fill();

          if (elem.color === "#FF6A00" && opacity > 0.6) {
            ctx.shadowColor = "#FF6A00";
            ctx.shadowBlur = 8 * elem.scale;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else {
          // Text / Code symbol
          const fontSize = Math.max(9, Math.round(11 * elem.scale));
          ctx.font = `${elem.type === "code" ? "600" : "500"} ${fontSize}px var(--font-geist-mono), monospace`;
          
          const textWidth = ctx.measureText(elem.text).width;
          const padX = 6 * elem.scale;
          const padY = 3 * elem.scale;

          // Glass pill background for code tags
          if (elem.scale > 0.85) {
            ctx.fillStyle = `rgba(18, 18, 18, ${opacity * 0.85})`;
            ctx.strokeStyle = elem.color === "#FF6A00"
              ? `rgba(255, 106, 0, ${opacity * 0.6})`
              : `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.lineWidth = 1;

            const rx = elem.px - textWidth / 2 - padX;
            const ry = elem.py - fontSize / 2 - padY;
            const rw = textWidth + padX * 2;
            const rh = fontSize + padY * 2;
            const radius = 4 * elem.scale;

            ctx.beginPath();
            ctx.roundRect(rx, ry, rw, rh, radius);
            ctx.fill();
            ctx.stroke();
          }

          // Text content
          ctx.fillStyle = elem.color === "#FF6A00"
            ? `rgba(255, 106, 0, ${opacity})`
            : `rgba(240, 240, 245, ${opacity})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(elem.text, elem.px, elem.py);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] lg:h-[560px] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
}
