import * as THREE from 'three';

/**
 * Highly optimized, memoized procedural canvas textures.
 * Everything the 3D scene needs is generated once and cached in memory.
 */

const textureCache = new Map<string, THREE.CanvasTexture>();

const makeCanvas = (size = 256) => {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return { c, ctx: c.getContext('2d')! };
};

const finish = (c: HTMLCanvasElement, repeat = 1, srgb = true) => {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.anisotropy = 4;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

/** Fast value noise laid over a base fill */
function grain(ctx: CanvasRenderingContext2D, size: number, amount: number) {
  const img = ctx.getImageData(0, 0, size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * amount;
    d[i] = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
  }
  ctx.putImageData(img, 0, 0);
}

export function brickTexture(base = '#b9a68c', mortar = '#cfc7b8') {
  const key = `brick_${base}_${mortar}`;
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 256;
  const { c, ctx } = makeCanvas(size);
  ctx.fillStyle = mortar;
  ctx.fillRect(0, 0, size, size);
  const rows = 12;
  const h = size / rows;
  const w = h * 2.6;
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 ? w / 2 : 0;
    for (let x = -w; x < size + w; x += w) {
      const v = 1 + (Math.random() - 0.5) * 0.16;
      const col = new THREE.Color(base).multiplyScalar(v);
      ctx.fillStyle = `#${col.getHexString()}`;
      ctx.fillRect(x + offset + 1, r * h + 1, w - 2, h - 2);
    }
  }
  grain(ctx, size, 22);
  const tex = finish(c, 4);
  textureCache.set(key, tex);
  return tex;
}

export function brickBump() {
  const key = 'brickBump';
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 256;
  const { c, ctx } = makeCanvas(size);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  const rows = 12;
  const h = size / rows;
  const w = h * 2.6;
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 ? w / 2 : 0;
    for (let x = -w; x < size + w; x += w) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + offset + 1.5, r * h + 1.5, w - 3, h - 3);
    }
  }
  grain(ctx, size, 25);
  const tex = finish(c, 4, false);
  textureCache.set(key, tex);
  return tex;
}

export function concreteTexture(tint = '#8c8a86') {
  const key = `concrete_${tint}`;
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 256;
  const { c, ctx } = makeCanvas(size);
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = `rgba(0,0,0,${0.02 + Math.random() * 0.03})`;
    ctx.fillRect(0, Math.random() * size, size, 6 + Math.random() * 30);
  }
  for (let i = 0; i < 25; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, 1 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,.08)';
    ctx.fill();
  }
  grain(ctx, size, 18);
  const tex = finish(c, 3);
  textureCache.set(key, tex);
  return tex;
}

export function gravelTexture() {
  const key = 'gravel';
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 256;
  const { c, ctx } = makeCanvas(size);
  ctx.fillStyle = '#6b6355';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 1500; i++) {
    const v = 0.6 + Math.random() * 0.7;
    const col = new THREE.Color('#8d8371').multiplyScalar(v);
    ctx.fillStyle = `#${col.getHexString()}`;
    ctx.beginPath();
    ctx.ellipse(Math.random() * size, Math.random() * size, 1.5 + Math.random() * 2.5, 1.5 + Math.random() * 2, Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = finish(c, 14);
  textureCache.set(key, tex);
  return tex;
}

export function grassTexture() {
  const key = 'grass';
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 256;
  const { c, ctx } = makeCanvas(size);
  ctx.fillStyle = '#3d4a35';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 1200; i++) {
    const v = 0.7 + Math.random() * 0.8;
    const col = new THREE.Color('#4d5c3f').multiplyScalar(v);
    ctx.strokeStyle = `#${col.getHexString()}`;
    ctx.lineWidth = 1 + Math.random();
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (Math.random() - 0.5) * 4, y - 2 - Math.random() * 4);
    ctx.stroke();
  }
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = `rgba(255,255,255,${i % 2 ? 0.035 : 0})`;
    ctx.fillRect(0, (i * size) / 8, size, size / 8);
  }
  const tex = finish(c, 8);
  textureCache.set(key, tex);
  return tex;
}

export function timberTexture() {
  const key = 'timber';
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 256;
  const { c, ctx } = makeCanvas(size);
  ctx.fillStyle = '#6d5238';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 80; i++) {
    const v = 0.75 + Math.random() * 0.5;
    const col = new THREE.Color('#7d5f41').multiplyScalar(v);
    ctx.strokeStyle = `#${col.getHexString()}`;
    ctx.lineWidth = 0.6 + Math.random() * 2.0;
    ctx.beginPath();
    const y = Math.random() * size;
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(size / 3, y + (Math.random() - 0.5) * 10, (size * 2) / 3, y + (Math.random() - 0.5) * 10, size, y);
    ctx.stroke();
  }
  grain(ctx, size, 12);
  const tex = finish(c, 2);
  textureCache.set(key, tex);
  return tex;
}

export function waterNormal() {
  const key = 'waterNormal';
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const size = 128;
  const { c, ctx } = makeCanvas(size);
  const img = ctx.createImageData(size, size);
  const d = img.data;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const h =
        Math.sin(x * 0.16) * 0.5 +
        Math.sin(y * 0.12 + 1.4) * 0.5 +
        Math.sin((x + y) * 0.07) * 0.4;
      const dx = Math.cos(x * 0.16) * 0.5;
      const dy = Math.cos(y * 0.12 + 1.4) * 0.5;
      d[i] = 128 + dx * 60;
      d[i + 1] = 128 + dy * 60;
      d[i + 2] = 235 + h * 6;
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = finish(c, 5, false);
  textureCache.set(key, tex);
  return tex;
}

export function skyTexture(top = '#0d1218', mid = '#25303a', horizon = '#6b5a48') {
  const key = `sky_${top}_${mid}_${horizon}`;
  if (textureCache.has(key)) return textureCache.get(key)!.clone();

  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, top);
  g.addColorStop(0.62, mid);
  g.addColorStop(0.88, horizon);
  g.addColorStop(1, '#161a1d');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.mapping = THREE.EquirectangularReflectionMapping;
  textureCache.set(key, t);
  return t;
}
