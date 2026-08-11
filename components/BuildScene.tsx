'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { concreteTexture, brickTexture, brickBump, gravelTexture } from '@/lib/procedural';

/** WebGL half of the build sequence, lazily loaded so three.js stays off the critical path. */
export default function BuildScene({ stage, label }: { stage: number; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(stage);

  useEffect(() => { stageRef.current = stage; }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 820;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', precision: 'mediump' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0f11);
    scene.fog = new THREE.Fog(0x0d0f11, 44, 130);

    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 300);

    const sun = new THREE.DirectionalLight(0xffe2bd, 2.4);
    sun.position.set(20, 28, 16);
    sun.castShadow = !isMobile;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -34, right: 34, top: 34, bottom: -34, near: 1, far: 90 });
    sun.shadow.camera.updateProjectionMatrix();
    scene.add(sun);
    scene.add(new THREE.HemisphereLight(0x8fa8c0, 0x1a1c1e, 0.6));

    const texConc = concreteTexture();
    const texBrick = brickTexture();
    const texBump = brickBump();
    const texGravel = gravelTexture();

    const conc = new THREE.MeshStandardMaterial({ map: texConc, roughness: 0.94 });
    const rebar = new THREE.MeshStandardMaterial({ color: 0x8a7f6d, roughness: 0.55, metalness: 0.7 });
    const brick = new THREE.MeshStandardMaterial({ map: texBrick, bumpMap: texBump, bumpScale: 0.05, roughness: 0.92 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1b1e21, roughness: 0.6, metalness: 0.25 });
    const bronze = new THREE.MeshStandardMaterial({ color: 0x9c7a4e, roughness: 0.3, metalness: 0.85 });
    const soil = new THREE.MeshStandardMaterial({ color: 0x2d2721, roughness: 1 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x1d2a30, roughness: 0.05, transmission: 0.5, thickness: 0.4, transparent: true, opacity: 0.85, envMapIntensity: 1.4 });
    const warm = new THREE.MeshStandardMaterial({ color: 0xffc98a, emissive: 0xffb15e, emissiveIntensity: 1.8, roughness: 1 });
    const green = new THREE.MeshStandardMaterial({ color: 0x36452f, roughness: 1 });

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ map: texGravel, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const groups = [new THREE.Group(), new THREE.Group(), new THREE.Group(), new THREE.Group()];
    const t = [0, 0, 0, 0];
    groups.forEach((g) => scene.add(g));

    const box = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number, g: THREE.Group) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      mesh.castShadow = mesh.receiveShadow = true;
      g.add(mesh);
      return mesh;
    };

    // 01 — groundworks
    box(16, 0.7, 12, soil, 0, -0.32, 0, groups[0]);
    box(15, 0.55, 11, conc, 0, 0.28, 0, groups[0]);
    for (let x = -6; x <= 6; x += 3) for (let z = -4; z <= 4; z += 4) box(1.7, 0.95, 1.7, conc, x, 0.05, z, groups[0]);

    // 02 — RC frame
    for (let x = -6; x <= 6; x += 3) for (let z = -4; z <= 4; z += 4) {
      box(0.55, 7.6, 0.55, conc, x, 4.3, z, groups[1]);
      box(0.08, 1.4, 0.08, rebar, x, 8.7, z, groups[1]);
    }
    [3.7, 7.7].forEach((y) => {
      box(13.4, 0.5, 0.5, conc, 0, y, -4, groups[1]);
      box(13.4, 0.5, 0.5, conc, 0, y, 4, groups[1]);
      box(13.4, 0.32, 8.8, conc, 0, y, 0, groups[1]);
    });
    [-6, 6].forEach((x) => box(0.5, 0.5, 8.8, conc, x, 3.7, 0, groups[1]));

    // 03 — envelope
    box(13.6, 7.8, 0.45, brick, 0, 4.2, 4.5, groups[2]);
    box(13.6, 7.8, 0.45, brick, 0, 4.2, -4.5, groups[2]);
    box(0.45, 7.8, 9.4, brick, -6.8, 4.2, 0, groups[2]);
    box(0.45, 7.8, 9.4, dark, 6.8, 4.2, 0, groups[2]);
    box(14.8, 0.5, 10.4, dark, 0, 8.3, 0, groups[2]);
    box(14.8, 0.75, 0.4, dark, 0, 8.7, 5.15, groups[2]);

    // 04 — fit-out
    [[0, 2.3, 8.6, 2.9], [0, 6.3, 6.4, 2.2]].forEach(([x, y, w, h]) => {
      box(w, h, 0.16, glass, x, y, 4.72, groups[3]);
      box(w - 0.6, h - 0.6, 0.06, warm, x, y, 4.2, groups[3]);
    });
    box(0.16, 2.7, 6.6, glass, -7, 2.5, 0, groups[3]);
    for (let i = 0; i < 11; i++) box(0.18, 7.6, 0.44, bronze, 7.05, 4.2, -4.2 + i * 0.9, groups[3]);
    box(16, 0.3, 4.8, conc, 0, 0.5, 7.8, groups[3]);
    [[-9, 7.4], [9, 8.2], [-10, -6]].forEach(([x, z]) => {
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 2.4, 6), dark);
      trunk.position.set(x, 1.2, z);
      groups[3].add(trunk);
      const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), green);
      c.position.set(x, 3.4, z);
      c.castShadow = true;
      groups[3].add(c);
    });

    // allow per-group fade
    groups.forEach((g) => g.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.material) {
        m.material = (m.material as THREE.Material).clone();
        (m.material as THREE.Material).transparent = true;
      }
    }));

    let theta = -0.62;
    let vTheta = 0;
    let phi = 0.46;
    let vPhi = 0;
    let dragging = false;
    let px = 0;
    let py = 0;

    const down = (e: PointerEvent) => { dragging = true; px = e.clientX; py = e.clientY; canvas.style.cursor = 'grabbing'; };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vTheta += (e.clientX - px) * 0.0055;
      vPhi += (e.clientY - py) * 0.003;
      px = e.clientX; py = e.clientY;
    };
    const up = () => { dragging = false; canvas.style.cursor = 'grab'; };
    canvas.style.cursor = 'grab';
    canvas.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    const block = (e: TouchEvent) => { if (dragging) e.preventDefault(); };
    canvas.addEventListener('touchmove', block, { passive: false });

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let visible = false;
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      groups.forEach((g, i) => {
        const target = i <= stageRef.current ? 1 : 0;
        t[i] += (target - t[i]) * (reduce ? 1 : 0.075);
        g.visible = t[i] > 0.005;
        g.scale.set(1, Math.max(0.001, t[i]), 1);
        g.position.y = (1 - t[i]) * -1.2;
        g.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.material) (m.material as THREE.Material).opacity = Math.min(1, t[i] * 1.3);
        });
      });

      theta += vTheta + (reduce ? 0 : 0.0011);
      phi = Math.max(0.14, Math.min(0.8, phi + vPhi));
      vTheta *= 0.92; vPhi *= 0.92;
      const r = 38;
      camera.position.set(Math.sin(theta) * r * Math.cos(phi), 4 + Math.sin(phi) * r * 0.62, Math.cos(theta) * r * Math.cos(phi));
      camera.lookAt(0, 3.6, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      canvas.removeEventListener('touchmove', block);
      window.removeEventListener('resize', resize);
      io.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((x) => x.dispose());
      });
      [texConc, texBrick, texBump, texGravel].forEach((x) => x.dispose());
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);


  return (
    <canvas
      ref={canvasRef}
      className="block h-[clamp(340px,54vh,560px)] w-full"
      role="img"
      aria-label={`Model of the ${label} stage of construction`}
    />
  );
}
