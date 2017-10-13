
document.querySelector('button', '.start').addEventListener('click', function() {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)

	camera.position.z = 20
	camera.position.x = 20
	camera.position.y = 20

	init()
	animate()
	/*
	// document.querySelector('section').style.display = 'none'
	var section = document.querySelector('section')
	Velocity(section, {
		opacity: 0,
		duration: '1s'
	})
	setTimeout(function(){
		section.style.display = 'none'
	}, 1100)
	document.querySelector('.preloader').style.display = 'flex'
	*/
})


var camera, scene, renderer

function init() {

	var logo3d = document.querySelector('.logo-3d')
	logo3d.style.visibility = 'visible'

	// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)
	camera.position.z = 1
	camera.position.x = 4
	camera.position.y = 3

	scene = new THREE.Scene()
	scene.background = new THREE.Color(0x000000)

	var objectLoader = new THREE.ObjectLoader()
	objectLoader.load("https://dl.dropboxusercontent.com/s/y9c86x75er2qpjf/low_poly_island.json", function(obj) {

		scene.add(obj)

		var troll = scene.getObjectByName('Troll.1', true)
		var body = scene.getObjectByName('Body', true)

		body.traverse(function(node) {
			if (node.material) {

				// ...

			}
		})

		scene.traverse(function(node) {

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

		document.addEventListener('mousemove', function(event) {
			directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;

			if(directionX < 0){
				scene.position.y -= .001
				scene.position.z += .001
			} else if (directionX > 0){
				scene.position.y += .001
				scene.position.z -= .001
			}

			directionY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			if(directionY > 0){
				scene.getObjectByName('Floating_rocks').position.y += .2
				scene.getObjectByName('Floating_rocks').position.z += .1
				scene.getObjectByName('Floating_rocks').position.x += .3
			} else if (directionY < 0) {
				scene.getObjectByName('Floating_rocks').position.y -= .2
				scene.getObjectByName('Floating_rocks').position.z -= .1
				scene.getObjectByName('Floating_rocks').position.x -= .3
			}
		});

		var geometry = new THREE.SphereGeometry(20, 20, 50, 0, Math.PI * 2, 0, Math.PI)
		var load = new THREE.TextureLoader().load('https://dl.dropboxusercontent.com/s/zhdq17mpidib3oo/arches_pinetree.png')

		var material = new THREE.MeshStandardMaterial({
			emissive: 0x1a1a1a,
			emissiveIntensity: .001,
			color: 0x000000,
			map: load,
			overdraw: true,
			side: THREE.BackSide
		})


		sphere = new THREE.Mesh(geometry, material)
		scene.add(sphere)


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

				popup.classList.add('show')

				camera.position.x += 1

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
	renderer.shadowMap.enabled = true
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
