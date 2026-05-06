'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, RoundedBox, Text } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-[26rem] w-full overflow-hidden">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color('#000000'), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI * 0.55} />
        <directionalLight position={[0, 4, 6]} intensity={2.4} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.9}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={8}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) {
  const band = useRef<THREE.Mesh | null>(null);
  const fixed = useRef<RapierRigidBody | null>(null);
  const j1 = useRef<RapierRigidBody | null>(null);
  const j2 = useRef<RapierRigidBody | null>(null);
  const j3 = useRef<RapierRigidBody | null>(null);
  const card = useRef<RapierRigidBody | null>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: RigidBodyProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const [bandTexture] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return new THREE.Texture();
    }

    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f5f1ea';
    ctx.fillRect(0, 6, canvas.width, canvas.height - 12);
    ctx.fillStyle = '#111111';
    ctx.font = '700 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('OKTAA', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(-4, 1);
    texture.needsUpdate = true;
    return texture;
  });
  const [lineGeometry] = useState(() => new MeshLineGeometry());
  const [lineMaterial] = useState(
    () =>
      new MeshLineMaterial({
        color: 'white',
        resolution: isMobile ? new THREE.Vector2(1000, 2000) : new THREE.Vector2(1000, 1000),
        useMap: 1,
        map: bandTexture,
        lineWidth: 1,
      } as any)
  );
  const curve = useRef(
    (() => {
      const nextCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      nextCurve.curveType = 'chordal';
      return nextCurve;
    })()
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed as any, j1 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1 as any, j2 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2 as any, j3 as any, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3 as any, card as any, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (!hovered) {
      document.body.style.cursor = 'auto';
      return;
    }

    document.body.style.cursor = dragged ? 'grabbing' : 'grab';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== 'boolean') {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) {
      return;
    }

    [j1, j2].forEach((ref) => {
      const body = ref.current as any;
      if (!body?.lerped) {
        body.lerped = new THREE.Vector3().copy(body.translation());
      }

      const clampedDistance = Math.max(
        0.1,
        Math.min(1, body.lerped.distanceTo(body.translation()))
      );

      body.lerped.lerp(
        body.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
      );
    });

    curve.current.points[0].copy((j3.current as any).translation());
    curve.current.points[1].copy((j2.current as any).lerped);
    curve.current.points[2].copy((j1.current as any).lerped);
    curve.current.points[3].copy((fixed.current as any).translation());
    lineGeometry.setPoints(curve.current.getPoints(isMobile ? 16 : 32));
    ang.copy((card.current as any).angvel());
    rot.copy((card.current as any).rotation());
    (card.current as any).setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  return (
    <>
      <group position={[-1.6, 4.4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2.05, -0.25, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[1.2, 1.7, 0.08]} />
          <group
            scale={2.35}
            position={[0, -1.45, -0.04]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              (event.target as any)?.releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              (event.target as any)?.setPointerCapture(event.pointerId);
              drag(
                new THREE.Vector3().copy(event.point).sub(vec.copy((card.current as any).translation()))
              );
            }}
          >
            <RoundedBox args={[1.65, 2.3, 0.06]} radius={0.14} smoothness={4}>
              <meshPhysicalMaterial
                color="#f5f1ea"
                clearcoat={isMobile ? 0.4 : 1}
                clearcoatRoughness={0.15}
                roughness={0.85}
                metalness={0.12}
              />
            </RoundedBox>
            <mesh position={[0, 0.84, 0.04]}>
              <boxGeometry args={[0.48, 0.16, 0.08]} />
              <meshStandardMaterial color="#1b1b1b" metalness={0.75} roughness={0.35} />
            </mesh>
            <mesh position={[0, 1.02, 0.04]}>
              <torusGeometry args={[0.18, 0.025, 18, 48]} />
              <meshStandardMaterial color="#0f0f0f" metalness={0.9} roughness={0.25} />
            </mesh>
            <Text
              position={[0, 0.38, 0.05]}
              fontSize={0.26}
              color="#111111"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.2}
            >
              OKTAA
            </Text>
            <Text
              position={[0, -0.04, 0.05]}
              fontSize={0.1}
              color="#4a4a4a"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.15}
            >
              Full Stack Developer
            </Text>
            <mesh position={[0, -0.6, 0.05]}>
              <planeGeometry args={[1.05, 0.72]} />
              <meshBasicMaterial color="#111111" transparent opacity={0.96} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <primitive object={lineGeometry} attach="geometry" />
        <primitive object={lineMaterial} attach="material" />
      </mesh>
    </>
  );
}
