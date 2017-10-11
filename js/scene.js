document.querySelector('button', '.start').addEventListener('click', function() {
	init()
	animate()
	document.querySelector('section').style.display = 'none'
})

var camera, scene, renderer

function init() {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)
	camera.position.z = 1
	camera.position.x = 4
	camera.position.y = 3

	scene = new THREE.Scene()
	scene.background = new THREE.Color( 0x1a1a1a );

	var objectLoader = new THREE.ObjectLoader()
	objectLoader.load("../models/low_poly_island_2.json", function(obj) {

		// console.log(scene)

		scene.add(obj)

		var troll = scene.getObjectByName('Troll.1', true)
		var body = scene.getObjectByName('Body', true)

		var ambientLight = scene.getObjectByName('AmbientLight 11')
		console.log(ambientLight);

		// console.log(body);
		// console.log(scene);

		body.traverse(function(node) {
			if (node.material) {

				// ...

			}
		})

		scene.traverse(function(node){

			if (node.material) {
				node.material.side = THREE.DoubleSide
			}

			/*
			var material = new THREE.MeshPhongMaterial({
				specular: 0xffffff,
				shininess: 1,
				side: THREE.DoubleSide,
			});


			child.material.side = THREE.DoubleSide;
			*/

		})

		scene.traverse(function(child) {

			if (child instanceof THREE.Mesh) {

				child.castShadow = true
				child.receiveShadow = true
				child.flatShading = true

			}
		})
		/*
		var geometry = new THREE.SphereGeometry(20, 20, 50, 0, Math.PI * 2, 0, Math.PI)
		var load = new THREE.TextureLoader().load('../07%20–%20Island%20Final/texture/arches_pinetree.png')

		var material = new THREE.MeshStandardMaterial({
			emissive: 0x1a1a1a,
			emissiveIntensity: .01,
			color: 0x000000,
			map: load,
			overdraw: true,
			side: THREE.BackSide,
		})

		sphere.mesh(geometry, material)
		scene.add(sphere)*/


		// ADD EVENTLISTENER TO CLICK

		var raycaster = new THREE.Raycaster()
		var mouse = new THREE.Vector2()

		document.addEventListener('mousedown', onMouseDown)

		function onMouseDown(event) {

			event.preventDefault()
			// Calculating mouse cursor position ( since 3D calculates reverse mouse position, the math has to re-reverse it )
			mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1
			mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1

			raycaster.setFromCamera(mouse, camera)

			var intersects = raycaster.intersectObjects(troll.children, true)

			if (intersects.length > 0) {

				var popup = document.querySelector('.story-popup')
				console.log(popup);

				popup.classList.add('show')

				// alert('Har du hørt om trollet som hatet internettet?')

			}

			// console.log(mouse)

		}

		console.log(scene)

	})

	renderer = new THREE.WebGLRenderer({

		antialias: true,
		alpha: false

	})

	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.shadowMapEnabled = true
	renderer.shadowMap.type = THREE.PCFSoftShadowMap

	document.body.appendChild(renderer.domElement)

	var controls = new THREE.OrbitControls(camera, renderer.domElement)

	controls.minDistance = 2
	controls.maxDistance = 20
	// controls.target.set(0, 5, 3)

	controls.minPolarAngle = Math.PI / 4
	controls.maxPolarAngle = Math.PI / 2

}


window.onresize = function() {

	renderer.setSize(window.innerWidth, window.innerHeight)
	var aspectRatio = window.innerWidth / window.innerHeight
	camera.aspect = aspectRatio
	camera.updateProjectionMatrix()

}


function animate() {

	requestAnimationFrame(animate)
	render()

}



function render() {

	// camera.lookAt(scene.position)
	renderer.render(scene, camera)

}
