import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'



const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
    75, 
    innerWidth / innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer({
    antialias: true
})
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:{
            globeTexture:{
                value:new THREE.TextureLoader().load('images.jpeg')
            }
        }
}))

scene.add(sphere)
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50), 
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader, 
        blending: THREE.AdditiveBlending, 
        // side: THREE.Backside
}))

atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere)
camera.position.z = 15

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y += 0.007
}
animate()

const starGeo = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color:0xffffff
})
const starVert = []
for(let i=0; i < 10000; i++){
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = (Math.random() - 0.5) * 2000
  starVert.push(x, y, z)
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVert, 3))
console.log(starGeo)
console.log(starMaterial)
const stars = new THREE.Points(starGeo, starMaterial)
scene.add(stars)


addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  })

  gsap.to('#welcome', {
    opacity:1,
    duration:3
  })
  gsap.to('#about', {
    opacity:1,
    duration:3,
    delay: 1
  })
  gsap.to('#projects', {
    opacity:1,
    duration:3,
    delay: 1
  })
  gsap.to('#games', {
    opacity:1,
    duration:3,
    delay: 1
  })
  gsap.to('#ibree', {
    opacity:1,
    duration:3,
    delay: 1
  })
          
  document.querySelector('#about').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#text', {
      opacity:0,
      duration:3
    })
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'about.html'
      }
    })
  })
  
  document.querySelector('#projects').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#text', {
      opacity:0,
      duration:3
    })
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'https://google.com'
      }
    })
  })
  document.querySelector('#games').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#text', {
      opacity:0,
      duration:3
    })
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'https://google.com'
      }
    })
  })
  document.querySelector('#ibree').addEventListener('click', (e)=>{
    e.preventDefault()
    gsap.to('#text', {
      opacity:0,
      duration:3
    })
    gsap.to(camera.position, {
      z:5.8,
      ease: 'power3.in',
      duration: 1.5,
      delay: 1.5,
      onComplete: () =>{
        window.location = 'https://google.com'
      }
    })
  })
  