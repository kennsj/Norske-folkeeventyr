document.querySelector('button', '.start').addEventListener('click', function() {

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)

	camera.position.z = 20
	camera.position.x = 20
	camera.position.y = 20

	init()
	animate()

	// document.querySelector('section').style.display = 'none'
	var section = document.querySelector('section')
	Velocity(section, {
		opacity: 0
	}, {
		duration: 1000
	})
	setTimeout(function() {
		section.style.display = 'none'
	}, 1100)

	// document.querySelector('.preloader').style.display = 'flex'

	var canvas = document.querySelector('canvas')

	canvas.style.display = 'none'
	canvas.style.opacity = '0'

	Velocity(canvas, {
		opacity: 1
	}, {
		duration: 1000,
		delay: 1100
	})
	setTimeout(function() {
		canvas.style.display = 'block'
	}, 1000)

	var logo3d = document.querySelector('.logo-3d')
	Velocity(logo3d, {
		opacity: 1
	}, {
		duration: 1000,
		delay: 1100
	})

	/*
	// Animate out the front page and transition to 3D scene

	var section = document.querySelector('section')
	*/

})


var camera, scene, renderer

function init() {

	// camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200)
	camera.position.z = 1
	camera.position.x = 4
	camera.position.y = 3

	scene = new THREE.Scene()
	scene.background = new THREE.Color(0x1a1a1a);

	var objectLoader = new THREE.ObjectLoader()
	//objectLoader.load("https://dl.dropboxusercontent.com/s/y9c86x75er2qpjf/low_poly_island.json", function(obj) {
	objectLoader.load('https://dl.dropboxusercontent.com/s/q15e8mph1rnfsuf/island_dark_light.json', function(obj) {

		scene.add(obj)

		var troll = scene.getObjectByName('Troll.1', true)
		var body = scene.getObjectByName('Body', true)
		var outer_sphere = scene.getObjectByName('Sphere 2', true)

		body.traverse(function(node) {
			if (node.background) {

				// node.background = new THREE.Color('rgba(255, 255, 255, 0)')
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

				outer_sphere.receiveShadow = false
				outer_sphere.castShadow = false

			}
		})

		// Animating rock / scene position in relation to mouse cursor
		document.addEventListener('mousemove', function(event) {
			directionX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
			/*
			if(directionX < 0){
				scene.position.y -= .001
				scene.position.z += .001
			} else if (directionX > 0){
				scene.position.y += .001
				scene.position.z -= .001
			}*/

			directionY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

			if (directionY > 0) {
				scene.getObjectByName('Floating_rocks').position.y += .05
				//scene.getObjectByName('Floating_rocks').position.z += .01
				//scene.getObjectByName('Floating_rocks').position.x += .3
			} else if (directionY < 0) {
				scene.getObjectByName('Floating_rocks').position.y -= .05
				//scene.getObjectByName('Floating_rocks').position.z -= .01
				//scene.getObjectByName('Floating_rocks').position.x -= .3
			}
		});


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
			sound_hover.volume = 0.05

			if (intersects.length > 0) {

				var popup = document.querySelector('.story-popup')

				Velocity(popup, {
					opacity: 1
				}, {
					duration: 100
				})

				popup.classList.add('show')

				// camera.position.x += 1
				// alert('Har du hørt om trollet som hatet internettet?')

			}

			// console.log(mouse)

		}

		// ADD ENVIRONMENTAL SOUND

		var listener = new THREE.AudioListener();
		camera.add(listener);

		var sound = new THREE.PositionalAudio(listener);

		var audioLoader = new THREE.AudioLoader();
		audioLoader.load('sounds/campfire.mp3', function(buffer) {
			sound.setBuffer(buffer);
			sound.setRefDistance(0.5);
			sound.loop = true
			sound.play();
		});

		var fire_big = scene.getObjectByName('Fire_big')
		var fire_small = scene.getObjectByName('Fire_small')

		fire_big.add(sound);
		fire_small.add(sound);

		console.log(scene)


	})

	renderer = new THREE.WebGLRenderer({

		antialias: true,
		alpha: true

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

	window.onresize = function() {

		renderer.setSize(window.innerWidth, window.innerHeight)
		var aspectRatio = window.innerWidth / window.innerHeight
		camera.aspect = aspectRatio
		camera.updateProjectionMatrix()

	}
}


function animate() {

	requestAnimationFrame(animate)
	render()

}


function render() {

	// camera.lookAt(scene.position)
	renderer.render(scene, camera)

}
