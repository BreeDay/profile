// Find the latest version by visiting https://cdn.skypack.dev/three.

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, innerWidth/ innerHeight, 0.1, 1000)
const raycaster = new THREE.Raycaster()
const renderer = new THREE.WebGLRenderer()
const world = {
  plane: {
    width: 400,
    height:400,
    widthSegments: 17,
    heightSegments: 17
  }
}
renderer.setSize(innerWidth, innerHeight)
renderer.setPixelRatio(devicePixelRatio)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

// const boxGeometry = new THREE.BoxGeometry(1,1,1)
// const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00})

// const mesh = new THREE.Mesh(boxGeometry, boxMaterial)

// scene.add(mesh)

camera.position.z = 5

const planeGeometry = new THREE.PlaneGeometry(19,19,17, 17)
const PlaneMaterial = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, flatShading: THREE.FlatShading, vertexColors:true})
const PlaneMesh = new THREE.Mesh(planeGeometry, PlaneMaterial)
scene.add(PlaneMesh)

const colors = []
for(let i =0; i< PlaneMesh.geometry.attributes.position.count; i++){
  colors.push(0.5, 0.55, 0.7)
}
PlaneMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, -1, 1)
scene.add(light)

const backlight = new THREE.DirectionalLight(0xffffff, 1)
backlight.position.set(0, 0, -1)
scene.add(backlight)

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
const randomValues = []
const {array} = PlaneMesh.geometry.attributes.position
for(let i = 0; i < array.length; i++){
  if( i % 3 === 0){
  const x = array[i]
  const y = array[i +1]
  const z = array[i +2]
  array[i] = x + (Math.random() - 0.5)
  array[i + 1] = y + (Math.random() - 0.5)
  array[i +2] = z + Math.random()
  }
  randomValues.push(Math.random())
}
PlaneMesh.geometry.attributes.position.randomValues = randomValues
PlaneMesh.geometry.attributes.position.originalPosition = PlaneMesh.geometry.attributes.position.array 
console.log(PlaneMesh.geometry.attributes.position)

const mouse = {
  x: undefined,
  y: undefined
}
let frame = 0
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  frame += 0.01
  const {array, originalPosition, randomValues} = PlaneMesh.geometry.attributes.position
  for(let i = 0; i < array.length; i+=3){
    array[i] = originalPosition[i] + Math.cos(frame + randomValues[i]) * 0.009
    array[i + 1] = originalPosition[i + 1] + Math.sin(frame + randomValues[i +1]) * 0.009

  }
  PlaneMesh.geometry.attributes.position.needsUpdate = true
  // mesh.rotation.x += 0.01
  // mesh.rotation.y += 0.01
  // PlaneMesh.rotation.x += 0.01
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObject(PlaneMesh)

  if(intersects.length > 0){
    // intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a, 0)
    const {color} = intersects[0].object.geometry.attributes
    
    color.setX(intersects[0].face.a, 0)
    color.setY(intersects[0].face.a, 0)
    color.setZ(intersects[0].face.a, 1)

    color.setX(intersects[0].face.b, 0)
    color.setY(intersects[0].face.b, 0)
    color.setZ(intersects[0].face.b, 1)

    color.setX(intersects[0].face.c, 0)
    color.setY(intersects[0].face.c, 0)
    color.setZ(intersects[0].face.c, 1)

    intersects[0].object.geometry.attributes.color.needsUpdate = true

    const initialColors = {
      r:0.5,  
      g:0.55,
      b:0.7
    }

    const hoverColors = {
      r:.4,  
      g:.4,
      b:.9
    }
    gsap.to(hoverColors, {
      r:initialColors.r,  
      g:initialColors.g,
      b:initialColors.b,
      duration: 1,
      onUpdate: () =>{
        color.setX(intersects[0].face.a, hoverColors.r)
        color.setY(intersects[0].face.a, hoverColors.g)
        color.setZ(intersects[0].face.a, hoverColors.b)
    
        color.setX(intersects[0].face.b, hoverColors.r)
        color.setY(intersects[0].face.b, hoverColors.g)
        color.setZ(intersects[0].face.b, hoverColors.b)
    
        color.setX(intersects[0].face.c, hoverColors.r)
        color.setY(intersects[0].face.c, hoverColors.g)
        color.setZ(intersects[0].face.c, hoverColors.b)
      }
    })
  }
  stars.rotation.x += 0.001
}

animate()



addEventListener('mousemove', (event) =>
{
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

gsap.to('#welcome', {
  opacity:1,
  duration:3
})

gsap.to('#enter', {
  opacity:1,
  duration:5,
  delay: 1
})

document.querySelector('#enter').addEventListener('click', (e)=>{
  e.preventDefault()
  gsap.to('#text', {
    opacity:0
  })
  gsap.to(camera.position, {
    z:3,
    ease: 'power3.inOut',
    duration: 1.5
  })
  gsap.to(camera.rotation, {
    x:1.57,
    ease: 'power3.inOut',
    duration: 1.5
  })
  gsap.to(camera.position, {
    y:3000,
    ease: 'power3.in',
    duration: 1.5,
    delay: 1.5,
    onComplete: () =>{
      window.location = 'menu.html'
    }
  })
})

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(innerWidth, innerHeight)
})