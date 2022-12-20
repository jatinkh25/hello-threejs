import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

import * as dat from 'dat.gui'
import './styles.scss'
import { MeshBasicMaterial } from 'three'
import { MeshMatcapMaterial } from 'three'

const color = {
  color: 0xffffff,
}

// const gui = new dat.GUI()

// gui.addColor(color, 'color').onChange((value) => {
//   cube.material.color.set(value)
// })

const scene = new THREE.Scene()

// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(5, 5, 5),
//   new THREE.MeshBasicMaterial({
//     color: '#fff',
//   })
// )

// scene.add(cube)
const texture = new THREE.TextureLoader().load('textures/brown.jpeg')

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(90, size.width / size.height)

camera.position.set(0, 0, 50)

// gui.add(cube.position, 'y', -10, 10, 0.1).name('elevation')

const loader = new FontLoader()
loader.load('fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Hello Three.js', {
    font: font,
    size: 5,
    height: 8,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  })

  textGeometry.center()

  const mesh = new THREE.Mesh(
    textGeometry,
    new MeshMatcapMaterial({
      // wireframe: true,
      matcap: texture,
    })
  )

  scene.add(mesh)
})

// const axisHelper = new THREE.AxesHelper(5)
// scene.add(axisHelper)

const torusGeometry = new THREE.TorusGeometry(4, 2, 20, 20)
const material = new THREE.MeshMatcapMaterial({ matcap: texture })

for (let i = 0; i < 150; ++i) {
  const torus = new THREE.Mesh(torusGeometry, material)

  torus.position.set(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100
  )

  torus.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  )

  const scaleVal = Math.random()
  torus.scale.set(scaleVal, scaleVal, scaleVal)
  scene.add(torus)
}

window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen()) {
      canvas.requestFullscreen()
      return
    }

    canvas.webkitRequestFullscreen()
    return
  }

  if (document.exitFullscreen) {
    document.exitFullscreen()
    return
  }

  if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen()
  }
})

const canvas = document.querySelector('canvas.webgl')
canvas.style.width = size.width
canvas.style.height = size.height

let controls = new OrbitControls(camera, canvas)
// controls.enableZoom = false
controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05

const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)

// const clock = new THREE.Clock()

function render() {
  // const time = clock.getElapsedTime()

  // cube.position.x = Math.sin(time) * 2
  // cube.position.y = Math.cos(time) * 2

  renderer.render(scene, camera)
  controls.update()
  requestAnimationFrame(render)
}

requestAnimationFrame(render)
