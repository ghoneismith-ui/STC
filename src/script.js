import * as THREE from '../node_modules/three'
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls'
import { CSS2DRenderer, CSS2DObject } from '../node_modules/three/examples/jsm/renderers/CSS2DRenderer'

const container = document.getElementsByClassName('layout_3d')[0]
const button = document.getElementById("button")
const circle = document.getElementById("circle")
const step = 1.5

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
const render = new THREE.WebGLRenderer({ alpha: true })
const html_render = new CSS2DRenderer()
render.setSize(container.clientWidth, container.clientHeight)
html_render.setSize(container.clientWidth, container.clientHeight)
html_render.domElement.style.position = 'absolute'
html_render.domElement.style.top = '0px'
html_render.domElement.style.pointerEvents = 'none'
container.appendChild(render.domElement)
container.appendChild(html_render.domElement)
const controls = new OrbitControls(camera, render.domElement)
camera.position.z = 4
controls.update()

const text = document.createElement('h1')
text.textContent = "3D объект 1"
const label = new CSS2DObject(text)
label.translateY(-1)
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
const cube_edges = new THREE.LineSegments(new THREE.EdgesGeometry(cube.geometry), new THREE.LineBasicMaterial({ color: 0x000000 }))
const object_1 = new THREE.Group()
object_1.add(cube, cube_edges, label)
const object_2 = object_1.clone(true)
object_1.position.x = -step
object_2.position.x = step
object_2.children[2].element.textContent = '3D объект 2'
const objects = new THREE.Group()
objects.add(object_1, object_2)
scene.add(objects)

function init() {
    requestAnimationFrame(init)
    controls.update()
    render.render(scene, camera)
    html_render.render(scene, camera)
} init()

let isClose = false
button.addEventListener('click', (e) => {
    isClose = !isClose
    if (isClose) {
        object_1.position.x = -0.5
        object_2.position.x = 0.5
        object_1.children[0].material.color.set(0xff0000)
        circle.style.color = 'red'

    } else {
        object_1.position.x = -step
        object_2.position.x = step
        object_1.children[0].material.color.set(0x00ff00)
        circle.style.color = 'lime'
    }
})