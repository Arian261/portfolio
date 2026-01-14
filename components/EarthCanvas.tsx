'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

// کامپوننت داخلی کره زمین
const Earth = () => {
  // اگر تکسچر ندارید، فعلاً رنگ ساده استفاده می‌کنیم تا ارور ندهد
  // بعداً می‌توانید تکسچر واقعی زمین را اضافه کنید
  return (
    <mesh>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial 
        color="#4f46e5" // رنگ آبی نئونی (Indigo)
        wireframe={true} // حالت وایرفریم برای زیبایی تکنیکال
        emissive="#1e1b4b"
      />
    </mesh>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%', position: 'absolute' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#22d3ee" />
      
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      
      {/* کنترل چرخش با موس */}
      <OrbitControls 
        enableZoom={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
        enablePan={false}
      />
    </Canvas>
  );
};

export default EarthCanvas;