"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const TEXTURES = {
  sun: "/textures/sun.jpg",
  mercury: "/textures/mercury.jpg",
  venus: "/textures/venus.jpg",
  earth: "/textures/earth.jpg",
  moon: "/textures/moon.jpg",
  mars: "/textures/mars.jpg",
  jupiter: "/textures/jupiter.jpg",
  saturn: "/textures/saturn.jpg",
  saturnRing: "/textures/saturn_ring_alpha.png",
  uranus: "/textures/uranus.jpg",
  neptune: "/textures/neptun.jpg",
};

function createGlowTexture() {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 64; canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255, 200, 150, 1)');
    g.addColorStop(0.4, 'rgba(255, 100, 50, 0.3)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

const Sun = () => {
  const texture = useLoader(TextureLoader, TEXTURES.sun);
  const glow = useMemo(() => createGlowTexture(), []);
  return (
    <group position={[0, 0, 0]}>
      <mesh><sphereGeometry args={[10, 32, 32]} /><meshBasicMaterial map={texture as any} color="#ffccaa" /></mesh>
      {glow && <sprite scale={[40, 40, 1]}><spriteMaterial map={glow} blending={THREE.AdditiveBlending} transparent opacity={0.6} /></sprite>}
      <pointLight intensity={2.5} color="#fff0dd" distance={800} decay={1} />
    </group>
  );
};

const Planet = ({ position, textureUrl, size, rotationSpeed = 0.002 }: any) => {
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, textureUrl);
  useFrame(() => { if (mesh.current) mesh.current.rotation.y += rotationSpeed; });
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshPhysicalMaterial map={texture as any} metalness={0.2} roughness={0.7} />
    </mesh>
  );
};

const Saturn = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const tex = useLoader(TextureLoader, TEXTURES.saturn);
  const ringTex = useLoader(TextureLoader, TEXTURES.saturnRing);
  useFrame(() => { if (mesh.current) mesh.current.rotation.y += 0.002; });
  return (
    <group position={position} rotation={[0.4, 0, 0.2]}>
      <mesh ref={mesh}><sphereGeometry args={[5, 32, 32]} /><meshPhysicalMaterial map={tex as any} roughness={0.6} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[6, 10, 64]} /><meshBasicMaterial map={ringTex as any} side={THREE.DoubleSide} transparent opacity={0.9} /></mesh>
    </group>
  );
};

const SceneContent = () => {
  return (
    <>
       <Sun />
       <Planet position={[10, 0, -20]} size={1.5} textureUrl={TEXTURES.mercury} />
       <Planet position={[-12, 5, -60]} size={3} textureUrl={TEXTURES.venus} />
       <group position={[15, -5, -100]}>
          <Planet position={[0,0,0]} size={3.2} textureUrl={TEXTURES.earth} rotationSpeed={0.005} />
          <Planet position={[5,2,0]} size={0.8} textureUrl={TEXTURES.moon} />
       </group>
       <Planet position={[-8, 4, -140]} size={2.5} textureUrl={TEXTURES.mars} />
       <Planet position={[15, -8, -190]} size={7} textureUrl={TEXTURES.jupiter} />
       <Saturn position={[-20, 5, -240]} />
       <Planet position={[10, 10, -280]} size={5} textureUrl={TEXTURES.uranus} />
       <Planet position={[-10, -5, -320]} size={4.8} textureUrl={TEXTURES.neptune} />
    </>
  )
}

const SyncCamera = ({ viewMode }: { viewMode: 'default' | 'pharmacy' | 'webDev' | 'seo' | 'uiUx' | 'mobile' | 'ai' | 'imageEditing' | 'video' | 'vault' }) => {
  useFrame(({ camera, mouse }) => {
    
    if (viewMode === 'pharmacy') {
        const targetX = -12; const targetY = 12; const targetZ = -225;
        const lookX = -20; const lookY = 5; const lookZ = -240;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'webDev') {
        const targetX = 14; const targetY = 2; const targetZ = -16;
        const lookX = 10; const lookY = 0; const lookZ = -20;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'seo') {
        const targetX = 12; const targetY = -3; const targetZ = -92;
        const lookX = 15; const lookY = -5; const lookZ = -100;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'uiUx') {
        const targetX = -8; const targetY = 6; const targetZ = -54; 
        const lookX = -12; const lookY = 5; const lookZ = -60;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'mobile' || viewMode === 'ai') {
        const targetX = -4; const targetY = 6; const targetZ = -132; 
        const lookX = -8; const lookY = 4; const lookZ = -140;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'imageEditing') {
        const targetX = -15; const targetY = 8; const targetZ = -230; 
        const lookX = -20; const lookY = 5; const lookZ = -240; 
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'video') {
        const targetX = 15; const targetY = -8; const targetZ = -180; 
        const lookX = 15; const lookY = -8; const lookZ = -190;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }
    if (viewMode === 'vault') {
        const targetX = -10; const targetY = -5; const targetZ = -310;
        const lookX = -10; const lookY = -5; const lookZ = -320;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
        camera.lookAt(lookX, lookY, lookZ);
        return;
    }

    const isMobile = window.innerWidth < 768;
    const scrollY = window.scrollY;
    const maxH = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, scrollY / (maxH || 1)));
    const WAYPOINTS = [
        { cam: [0, 20, 60], look: [0, 0, 0] },
        { cam: [8, 2, -15], look: [10, 0, -20] }, 
        { cam: [-8, 4, -55], look: [-12, 5, -60] },
        { cam: [10, -2, -90], look: [15, -5, -100] },
        { cam: [18, -4, -95], look: [19, -5, -100] }, 
        { cam: [-6, 6, -135], look: [-8, 4, -140] },
        { cam: [12, -6, -180], look: [15, -8, -190] },
        { cam: [-15, 8, -230], look: [-20, 5, -240] },
        { cam: [8, 8, -270], look: [10, 10, -280] },
        { cam: [-8, -4, -310], look: [-10, -5, -320] },
    ];
    const segmentCount = WAYPOINTS.length - 1;
    const currentSegment = Math.min(Math.floor(p * segmentCount), segmentCount - 1);
    const segmentProgress = (p * segmentCount) - currentSegment;
    const start = WAYPOINTS[currentSegment];
    const end = WAYPOINTS[currentSegment + 1];
    let tX = THREE.MathUtils.lerp(start.cam[0], end.cam[0], segmentProgress);
    let tY = THREE.MathUtils.lerp(start.cam[1], end.cam[1], segmentProgress);
    let tZ = THREE.MathUtils.lerp(start.cam[2], end.cam[2], segmentProgress);
    const lX = THREE.MathUtils.lerp(start.look[0], end.look[0], segmentProgress);
    const lY = THREE.MathUtils.lerp(start.look[1], end.look[1], segmentProgress);
    const lZ = THREE.MathUtils.lerp(start.look[2], end.look[2], segmentProgress);
    if (isMobile) { tX = tX * 0.5; tZ = tZ + 10; }
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tX + (mouse.x * (isMobile ? 0.5 : 2)), 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, tY + (mouse.y * (isMobile ? 0.5 : 2)), 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tZ, 0.05);
    camera.lookAt(lX, lY, lZ);
  });
  return null;
};

export default function SolarSystem({ viewMode = 'default' }: { viewMode?: 'default' | 'pharmacy' | 'webDev' | 'seo' | 'uiUx' | 'mobile' | 'ai' | 'imageEditing' | 'video' | 'vault' }) {
  return (
    <div className="fixed inset-0 w-full h-full"> 
      <Canvas camera={{ position: [0, 20, 60], fov: 50 }} dpr={1} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
        <ambientLight intensity={0.4} color="#ccccff" /> 
        <pointLight position={[50, 50, 50]} intensity={1} color="#ffffff" />
        <Stars radius={300} depth={100} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <Suspense fallback={null}><SceneContent /></Suspense>
        <SyncCamera viewMode={viewMode} />
      </Canvas>
    </div>
  );
}