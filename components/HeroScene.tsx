'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  brickTexture, brickBump, concreteTexture, gravelTexture,
  grassTexture, timberTexture, waterNormal, skyTexture,
} from '@/lib/procedural';

/**
 * High-performance WebGL 3D Architectural Hero.
 * Loaded dynamically (ssr: false) so Three.js never delays initial page load.
 */
export default function HeroScene({
  wrapRef, onBeat, onReady,
}: {
  wrapRef: React.RefObject<HTMLDivElement>;
  onBeat: (i: number) => void;
  onReady: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 820;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = skyTexture();
    scene.fog = new THREE.FogExp2(0x1a1f24, 0.0075);

    // Environment reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 400);

    /* ---------------- Lighting ---------------- */
    const sun = new THREE.DirectionalLight(0xffdfb8, 3.2);
    sun.position.set(-35, 28, 22);
    sun.castShadow = !isMobile;
    sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
    sun.shadow.bias = -0.0002;
    sun.shadow.normalBias = 0.015;
    const sc = sun.shadow.camera;
    sc.left = -48; sc.right = 48; sc.top = 48; sc.bottom = -48; sc.near = 1; sc.far = 130;
    sc.updateProjectionMatrix();
    scene.add(sun);

    scene.add(new THREE.HemisphereLight(0x9ebdd9, 0x2b2721, 0.7));
    const bounce = new THREE.DirectionalLight(0x89a8c6, 0.55);
    bounce.position.set(26, 12, -20);
    scene.add(bounce);

    /* ---------------- Materials ---------------- */
    const texBrick = brickTexture();
    const texBrickBump = brickBump();
    const texConc = concreteTexture();
    const texGravel = gravelTexture();
    const texGrass = grassTexture();
    const texTimber = timberTexture();
    const texWater = waterNormal();

    const M = {
      brick: new THREE.MeshStandardMaterial({ map: texBrick, bumpMap: texBrickBump, bumpScale: 0.06, roughness: 0.92 }),
      render: new THREE.MeshStandardMaterial({ color: 0xeee9de, roughness: 0.82 }),
      zinc: new THREE.MeshStandardMaterial({ color: 0x272b2f, roughness: 0.38, metalness: 0.75 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x16181b, roughness: 0.55, metalness: 0.3 }),
      bronze: new THREE.MeshStandardMaterial({ color: 0xa38154, roughness: 0.28, metalness: 0.88 }),
      concrete: new THREE.MeshStandardMaterial({ map: texConc, roughness: 0.88 }),
      timber: new THREE.MeshStandardMaterial({ map: texTimber, roughness: 0.75 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0x1a282f, roughness: 0.03, metalness: 0.05, transmission: 0.65,
        thickness: 0.45, ior: 1.48, envMapIntensity: 1.8, transparent: true, opacity: 0.85,
      }),
      warm: new THREE.MeshStandardMaterial({ color: 0xffcb8f, emissive: 0xffb563, emissiveIntensity: 2.5, roughness: 0.9 }),
      fire: new THREE.MeshStandardMaterial({ color: 0xff7722, emissive: 0xff4400, emissiveIntensity: 4.0, roughness: 1 }),
      hedge: new THREE.MeshStandardMaterial({ color: 0x32422c, roughness: 0.95 }),
      foliage: new THREE.MeshStandardMaterial({ color: 0x394833, roughness: 0.95, flatShading: true }),
      water: new THREE.MeshPhysicalMaterial({
        color: 0x123640, roughness: 0.05, metalness: 0.12, normalMap: texWater,
        normalScale: new THREE.Vector2(0.35, 0.35), envMapIntensity: 1.85,
      }),
    };

    const box = (w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      mesh.castShadow = mesh.receiveShadow = true;
      return mesh;
    };

    /* ---------------- Site & Ground ---------------- */
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ map: texGrass, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const drive = new THREE.Mesh(new THREE.PlaneGeometry(14, 64), new THREE.MeshStandardMaterial({ map: texGravel, roughness: 1 }));
    drive.rotation.x = -Math.PI / 2;
    drive.position.set(2, 0.02, 32);
    drive.receiveShadow = true;
    scene.add(drive);

    const terrace = box(32, 0.3, 14, M.concrete, 0, 0.15, 12);
    scene.add(terrace);

    /* ---------------- Main House Structure ---------------- */
    const house = new THREE.Group();
    scene.add(house);

    // Ground floor volume (hand-crafted brick)
    house.add(box(22.5, 4.5, 13.5, M.brick, 0, 2.45, 0));
    // Upper floor volume (cantilevered dark zinc metal cladding)
    house.add(box(18, 4.0, 12, M.zinc, -1.6, 6.7, -0.4));
    // Architectural roof overhangs & fascia trims
    house.add(box(24, 0.44, 15, M.dark, 0, 4.8, 0));
    house.add(box(19.4, 0.44, 13.4, M.dark, -1.6, 8.75, -0.4));
    // Standing-seam roof details along zinc roof
    for (let s = -8; s <= 8; s += 1.6) {
      house.add(box(0.12, 0.25, 13.2, M.dark, -1.6 + s, 8.98, -0.4));
    }
    // Parapet coping & chimney stack
    house.add(box(19.6, 0.55, 0.45, M.dark, -1.6, 9.05, 6.1));
    house.add(box(1.6, 4.8, 1.6, M.brick, -8.5, 9.5, -2));
    house.add(box(1.8, 0.25, 1.8, M.dark, -8.5, 11.95, -2)); // Chimney cap

    // Single-storey glazed garden wing extension
    const wing = new THREE.Group();
    wing.position.set(14.5, 0, 1.2);
    wing.add(box(9.5, 3.7, 11.5, M.dark, 0, 2.0, 0));
    wing.add(box(10.4, 0.42, 12.4, M.bronze, 0, 4.05, 0));
    house.add(wing);

    // Glazed curtain wall bays with slim structural mullions & interior glow
    const glazedBay = (w: number, h: number, x: number, y: number, z: number, divisions = 3, rot = 0) => {
      const g = new THREE.Group();
      const pane = box(w, h, 0.1, M.glass, 0, 0, 0);
      g.add(pane);
      const frameT = 0.14;
      g.add(box(w + 0.35, frameT, 0.36, M.dark, 0, h / 2 + 0.1, 0));
      g.add(box(w + 0.35, frameT, 0.36, M.dark, 0, -h / 2 - 0.1, 0));
      g.add(box(frameT, h + 0.35, 0.36, M.dark, -w / 2 - 0.1, 0, 0));
      g.add(box(frameT, h + 0.35, 0.36, M.dark, w / 2 + 0.1, 0, 0));
      for (let i = 1; i < divisions; i++) {
        g.add(box(0.1, h, 0.28, M.dark, -w / 2 + (w / divisions) * i, 0, 0));
      }
      // Warm interior architectural plane read through glass
      const inner = box(w - 0.4, h - 0.4, 0.05, M.warm, 0, 0, -0.6);
      inner.castShadow = false;
      g.add(inner);
      g.position.set(x, y, z);
      g.rotation.y = rot;
      return g;
    };

    house.add(glazedBay(13.5, 3.1, -2.5, 2.45, 6.8, 4));
    house.add(glazedBay(11, 2.5, -1.6, 6.75, 5.6, 4));
    house.add(glazedBay(8, 2.8, 14.5, 2.05, 7.0, 3));
    house.add(glazedBay(9.5, 2.7, -11.3, 2.45, 0, 3, Math.PI / 2));
    house.add(glazedBay(8.5, 2.3, -10.6, 6.75, -0.4, 3, Math.PI / 2));

    // Bronze architectural louver screening on west facade
    for (let i = 0; i < 16; i++) {
      house.add(box(0.15, 4.4, 0.58, M.bronze, 19.1, 2.25, -4.5 + i * 0.72));
    }

    // Entrance: canopy, timber door, concrete steps & planters
    house.add(box(5.6, 0.36, 3.4, M.dark, -4, 4.25, 8.2));
    house.add(box(1.7, 3.0, 0.18, M.timber, -4, 1.8, 6.8));
    for (let i = 0; i < 3; i++) house.add(box(7.2, 0.18, 1.15, M.concrete, -4, 0.42 - i * 0.18, 9.3 + i * 1.15));
    house.add(box(2.2, 1.1, 2.2, M.hedge, -8.8, 0.65, 9.5));
    house.add(box(2.2, 1.1, 2.2, M.hedge, 0.8, 0.65, 9.5));

    /* ---------------- Outdoor Living & Landscaping ---------------- */
    // Swimming Pool with crisp coping & water surface
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(17, 7.5), M.water);
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(1, 0.18, 21);
    scene.add(pool);
    scene.add(box(18, 0.4, 8.5, M.concrete, 1, 0.07, 21));

    // Outdoor terrace seating & fire pit
    const firePit = box(1.8, 0.5, 1.8, M.dark, 12, 0.4, 18);
    const fireGlow = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), M.fire);
    fireGlow.position.set(12, 0.75, 18);
    scene.add(firePit);
    scene.add(fireGlow);
    const fireLight = new THREE.PointLight(0xff5500, 18, 14, 2);
    fireLight.position.set(12, 1.2, 18);
    scene.add(fireLight);

    // Realistic multi-tiered trees
    const tree = (x: number, z: number, s: number) => {
      const g = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * s, 0.28 * s, 3.6 * s, 8), M.timber);
      trunk.position.y = 1.8 * s;
      trunk.castShadow = true;
      g.add(trunk);
      for (let i = 0; i < 4; i++) {
        const clump = new THREE.Mesh(new THREE.IcosahedronGeometry((2.0 - i * 0.32) * s, 1), M.foliage);
        clump.position.set((Math.random() - 0.5) * 1.5 * s, (3.8 + i * 1.05) * s, (Math.random() - 0.5) * 1.5 * s);
        clump.castShadow = true;
        g.add(clump);
      }
      g.position.set(x, 0, z);
      g.rotation.y = Math.random() * Math.PI;
      scene.add(g);
    };
    [[-26, 6, 1.5], [-30, -10, 1.2], [28, -8, 1.35], [32, 14, 1.1], [-24, 26, 1.3], [26, 30, 1.25]].forEach(([x, z, s]) => tree(x, z, s));

    // Clipped boundary hedging
    for (let i = 0; i < 22; i++) scene.add(box(3.5, 1.6, 1.3, M.hedge, -36 + i * 3.5, 0.8, 37));

    // Illuminated driveway bollard lights
    for (let i = 0; i < 7; i++) {
      const b = box(0.24, 0.95, 0.24, M.dark, -5.6, 0.48, 12 + i * 6);
      scene.add(b);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), M.warm);
      bulb.position.set(-5.6, 1.0, 12 + i * 6);
      scene.add(bulb);
    }

    // Warm interior point lights for window glow
    [[-2.5, 2.5, 3], [14.5, 2.1, 3], [-1.6, 6.8, 1]].forEach(([x, y, z]) => {
      const p = new THREE.PointLight(0xffb563, 28, 24, 2);
      p.position.set(x, y, z);
      scene.add(p);
    });

    /* ---------------- Camera Motion & Smooth Scroll Path ---------------- */
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(30, 11, 46),
      new THREE.Vector3(9, 5.2, 34),
      new THREE.Vector3(-16, 4, 20),
      new THREE.Vector3(-34, 20, 4),
      new THREE.Vector3(-14, 34, -34),
    ]);
    const look = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5, 4),
      new THREE.Vector3(-2, 4, 2),
      new THREE.Vector3(2, 3.6, 1),
      new THREE.Vector3(4, 4.5, 0),
      new THREE.Vector3(2, 1, 2),
    ]);

    let progress = 0;
    let targetProgress = 0;
    let pointer = { x: 0, y: 0 };

    // Efficient scroll handling without layout thrashing
    let wrapTop = 0;
    let wrapHeight = 0;
    const updateBounds = () => {
      const rect = wrap.getBoundingClientRect();
      wrapTop = rect.top + window.scrollY;
      wrapHeight = wrap.offsetHeight;
    };
    updateBounds();

    const onScroll = () => {
      const scrollY = window.scrollY;
      const total = wrapHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, (scrollY - wrapTop) / total)) : 0;
      targetProgress = p;
      onBeat(Math.min(3, Math.floor(p * 4 * 0.999)));
    };
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });

    const resize = () => {
      updateBounds();
      onScroll();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // Pause animation when hero is off-screen
    let visible = true;
    const vis = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    }, { threshold: 0 });
    vis.observe(canvas);

    const clock = new THREE.Clock();
    let raf = 0;
    const tmp = new THREE.Vector3();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.1, clock.getDelta());

      // Accelerated, snappy camera progression (frame-rate independent lerp)
      const lerpSpeed = reduce ? 1 : (1 - Math.exp(-12 * dt));
      progress += (targetProgress - progress) * lerpSpeed;
      const p = Math.min(0.999, Math.max(0.001, progress));

      path.getPoint(p, tmp);
      camera.position.set(
        tmp.x + pointer.x * 1.8,
        tmp.y - pointer.y * 0.9,
        tmp.z,
      );
      look.getPoint(p, tmp);
      camera.lookAt(tmp);

      // Gentle water ripple & sunset tone drift
      texWater.offset.x += dt * 0.016;
      texWater.offset.y += dt * 0.011;
      sun.intensity = 3.2 - p * 1.1;
      renderer.toneMappingExposure = 1.08 - p * 0.12;

      renderer.render(scene, camera);
    };
    tick();
    onReady();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
      vis.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) (Array.isArray(m.material) ? m.material : [m.material]).forEach((mat) => mat.dispose());
      });
      [texBrick, texBrickBump, texConc, texGravel, texGrass, texTimber, texWater].forEach((t) => t.dispose());
      pmrem.dispose();
      renderer.dispose();
    };
  }, [onBeat, onReady]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
