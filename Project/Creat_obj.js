

"use strict";

function main() {
    // canvas cho phép lập trình các hình ảnh động, 2D, 3D, ... độ rộng, chiều cao
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({ canvas });
    // set thuộc tính cho camera
    const feildOfView = 40;
    const aspect = 2;
    const near = 0.1;
    const far = 1000000000000000;
    const camera = new THREE.PerspectiveCamera(feildOfView, aspect, near, far);
    camera.position.z = 40000;
    camera.position.y = 20000;
    // khai báo bối cảnh 
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // màu hex
    // khai báo ánh sáng và các thuộc tính 
    // {
    //     const color = 0xFFFFFF;
    //     const intensity = 1;
    //     const light = new THREE.DirectionalLight(color, intensity);
    //     light.position.set(600, -4, 0);
    //     scene.add(light);
    // }
    // trình điều khiển 
    var controls = new THREE.OrbitControls(camera);
    var loader = new THREE.TextureLoader();
    //tạo object 
    var planet = [];
    var dem = 1;
    function setplanet(radius, widthSegments, heightSegments, x, y, url) {
        const meshGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
        var meshtexture = new loader.load(url);
        var meshMaterial = new THREE.MeshBasicMaterial({ map: meshtexture });
        var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
        mesh.position.x = x;
        mesh.position.y = y;
        scene.add(mesh);
        planet[dem] = mesh;
        dem++;
    };
    // pointspeed 
    const radius = 1;
    const widthSegments = 1;
    const heightSegments = 1;
    const pointspeedGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
    var pointspeedMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    var pointspeed = [];
    for (var i = 1; i <= 9; i++) {
        pointspeed[i] = new THREE.Mesh(pointspeedGeometry, pointspeedMaterial);
        pointspeed[i].position.x = 600;
        pointspeed[i].position.y = -4;
        scene.add(pointspeed[i]);
    }

    // mercury - 1
    setplanet(70, 70, 70, 2500, -4, './Object/texture/mercury_texture_map_used_by_solar_walk_2_by_bob3studios_dcklc0u-pre.jpg');

    //venus -2 
    setplanet(90, 90, 90, 3500, -4, './Object/texture/46k-venus-color-map-3d-model.jpg');
   
    // earth - 3 
    setplanet(110, 110, 110, 5000, -4, './Object/texture/zikyujf176yo-Earth/Albedo.jpg');

    //moon
    {
        const radius = 30;
        const widthSegments = 30;
        const heightSegments = 30;
        const moonGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
        var moontexture = new loader.load('./Object/texture/moon_texture_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1258985_o.png');
        var moonMaterial = new THREE.MeshBasicMaterial({ map: moontexture });
        var moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.x = 200;
        moon.position.y = -4;
        scene.add(moon);
        planet[3].add(moon);
    }
    //mars -4 
    setplanet(95, 95, 95, 6500, -4, './Object/texture/mars_texture_map_used_by_solar_walk_2_by_bob3studios_dckiu8c-pre.jpg');

    //jupiter - 5 
    setplanet(900, 900, 900, 9500, -4, './Object/texture/PIA07782_hires.jpg');

    // Saturn - 6
    {
        setplanet(700, 700, 700, 14000, -4, './Object/texture/saturn_1981_2004_texture_map_by_askaniy_dczarq1-pre.jpg');
        //ring 
        const ringinnerradius = 800;
        const ringouterradius = 1300;
        const ringsegments = 50;
        const RingGeometry = new THREE.RingBufferGeometry(ringinnerradius, ringouterradius, ringsegments);
        var ringtexture = new loader.load('./Object/texture/cassini_saturn_map_by_snowfall_the_cat_dd1nipp-fullview.jpg');
        var ringMaterial = new THREE.MeshBasicMaterial({ map: ringtexture });
        var saturnRing = new THREE.Mesh(RingGeometry, ringMaterial);
        saturnRing.position.x = 0;
        saturnRing.position.y = 0;
        saturnRing.rotation.x = THREE.Math.degToRad(-90);
        scene.add(saturnRing);
        planet[6].add(saturnRing);
    }
    //uranus - 7
    setplanet(400, 400, 400, 19000, -4, './Object/texture/dbzj71k-8fe30215-2794-4bca-bcee-0bd1fa3d1850.png');

    // neptune - 8
    setplanet(400, 400, 400, 21000, -4, './Object/texture/2k_neptune.jpg');

    // pluto - 9
    setplanet(100, 100, 100, 22000, -4, './Object/texture/Pluto_Made.png');

    // sun 
    setplanet(2000, 2000, 2000, 600, -4, './Object/texture/8k_sun.jpg');


    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }



    pointspeed[1].add(planet[1]);
    pointspeed[2].add(planet[2]);
    pointspeed[3].add(planet[3]);
    pointspeed[4].add(planet[4]);
    pointspeed[5].add(planet[5]);
    pointspeed[6].add(planet[6]);
    pointspeed[7].add(planet[7]);
    pointspeed[8].add(planet[8]);
    pointspeed[9].add(planet[9]);


    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        pointspeed[1].rotation.y += 0.004;
        pointspeed[2].rotation.y += 0.002;
        pointspeed[3].rotation.y += 0.003;
        pointspeed[4].rotation.y += 0.007;  
        pointspeed[5].rotation.y += 0.008;
        pointspeed[6].rotation.y += 0.006;
        pointspeed[7].rotation.y += 0.009;
        pointspeed[8].rotation.y += 0.008;
        pointspeed[9].rotation.y += 0.01;
        planet[1].rotation.y += 0.05;
        planet[2].rotation.y += 0.05;
        planet[3].rotation.y += 0.05;
        planet[4].rotation.y += 0.07;
        planet[5].rotation.y += 0.03;
        planet[6].rotation.y += 0.04;
        planet[7].rotation.y += 0.04;
        planet[8].rotation.y += 0.04;
        planet[9].rotation.y += 0.04;
        // gọi hàm lặp lại
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();


