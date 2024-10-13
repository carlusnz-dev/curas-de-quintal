import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('./models/rhyzome_plant/plant_1.gltf')
  return (
    <group {...props} dispose={null} position={[-5, -5, -10]}>
      <group scale={0.1}>
        <mesh geometry={nodes.concrete_pot_lambert3_0.geometry} material={materials.lambert3} />
        <mesh geometry={nodes.plant_lambert2_0.geometry} material={materials.lambert2} />
      </group>
    </group>
  )
}

useGLTF.preload('/plant_1.gltf')
