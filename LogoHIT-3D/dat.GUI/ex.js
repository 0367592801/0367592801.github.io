function main() {
    const canvas = document.querySelector("#c");
    var newhalcon;
    var Cube;
    // renderer 
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(innerWidth, innerHeight);
    // camera 
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    camera.position.x = 100;
    camera.position.y = 100;
    // scene 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00000);
    // ánh sáng 
    {
        const color = 0xFE5C0B;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, -4);
        scene.add(light);
    }
    {
        const color = 0xFE5C0B;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(5, 5, 5);
        scene.add(light);
    }
    
    // điều khiển 
    var bus; 
    loader2 = new THREE.GLTFLoader(); 
    loader2.load('./Object/Object/vw_bus_sketchup/scene.gltf', function(obj) {
        
        bus = obj; 
        // if(bus){
        //     bus.position.x = 10; 
        //     bus.position.y = 10; 
        //     bus.scale.x = 50; 
        //     bus.scale.y = 50; 
        // }

        scene.add("bus" + bus);
    } )
    console.log(bus); 
    const control = new THREE.OrbitControls(camera);
    loader = new THREE.OBJLoader2();
    // OBJLoader
    function loadOBJ(urlMtl, urlObj, object, x, y, z, o) {
        const objLoader = new THREE.OBJLoader2();
        objLoader.loadMtl(urlMtl, null, (materials) => {
            objLoader.setMaterials(materials);
            objLoader.load(urlObj, (event) => {
                object = event.detail.loaderRootNode;
                object.position.x = x;
                object.position.y = y;  
                object.position.z = z;
                object.rotation.x = o;
                halcon = object;
                creatGUI(halcon, 'halcon');
                //newhalcon = new THREE.Geometry().fromBufferGeometry(object.Geometry);
                scene.add(halcon);
                //scene.add(newhalcon);
            });
        });
    };
    // dat.GUI 
    var options = {
        velxBox: 0,
        velyBox: 0.01,
        velxHal: 0.01, 
        velyHal: 0,
        stopBox: function () {
            this.velxBox = 0;
            this.velyBox = 0;
        },
        stopHal: function () {
            this.velxHal = 0; 
            this.velyHal = 0;
        },
        reset: function () {
            location.reload();
        }
    };
    function creatGUI(obj, name) {
        var gui = new dat.GUI();
        var box = gui.addFolder("OBJ");
            box.add(obj.scale, "x", 0, 3).name("X").listen();
            box.add(obj.scale, "y", 0, 3).name("Y").listen();
            box.add(obj.scale, "z", 0, 3).name("Z").listen();
            //box.add(obj.material, 'wireframe').name('wireframe').listen();
            box.close();
        var velocity = gui.addFolder("Velocity");
        if(name == 'Cube')
        {
            velocity.add(options, "velxBox", -0.5, 0.5).name("VelX").listen();
            velocity.add(options, "velyBox", -0.5, 0.5).name("VelY").listen();
        }
        if(name == 'halcon')
        {
            velocity.add(options, "velxHal", -0.5, 0.5).name("VelX").listen();
            velocity.add(options, "velyHal", -0.5, 0.5).name("VelY").listen();
        }    
            velocity.close();
        // var Halcon = gui.addFolder("Halcon"); 
        //     Halcon.add(halcon.scale, "x", 0, 3).name("X").listen(); 
        //     Halcon.close();
        gui.add(options, "reset");
        if(name == 'Cube')
        {
            gui.add(options, "stopBox");
        }
        else 
        if(name == 'halcon')
        {
            gui.add(options, "stopHal");
        }
    };
    // obj 
    // Cube
    {
    const BoxGeometry = new THREE.BoxGeometry(30, 30, 30);
    const BoxTexture = new THREE.TextureLoader().load('./tải xuống.jpg');
    const BoxMaterial = new THREE.MeshBasicMaterial({ map: BoxTexture });
    var cube = new THREE.Mesh(BoxGeometry, BoxMaterial);
    cube.position.x = 0;
    cube.position.y = 0;
    // scene.add(cube);
    // call dat.gui
    // creatGUI(cube, 'Cube');
    // halcon
    var halcon;
    loadOBJ('./Object/HIT2.mtl', './Object/HIT2.obj', halcon, 30, 30, 30, THREE.Math.degToRad(-90));
    
    }
    
    // animation
    function animate() {
        cube.rotation.x += options.velxBox;
        cube.rotation.y += options.velyBox;
        if (halcon) {
            // halcon.rotation.x += options.velxHal;
            halcon.rotation.y += options.velxHal;
            halcon.rotation.z += options.velxHal;
        }
        
    }
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        control.update();
        animate();
    }
    render();
}
main();
