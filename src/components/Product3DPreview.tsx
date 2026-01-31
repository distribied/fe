import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, RoundedBox } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";
import previewImage from "@/assets/preview-image.png";

const ProductBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(previewImage);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[2, 2.5, 0.3]}
      radius={0.1}
      smoothness={4}
    >
      <meshStandardMaterial map={texture} />
    </RoundedBox>
  );
};

const Product3DPreview = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-secondary to-muted rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} />
        <Suspense fallback={null}>
          <ProductBox />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Product3DPreview;
