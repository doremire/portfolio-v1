window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        alpha: true,
    } );
     
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);

    // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdedede); // 背景色

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(2000, 900, -1000);

    // コントローラ
    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;   //damping 
    controls.dampingFactor = 0.25;   //damping inertia
    controls.enableZoom = true;      //Zooming
    controls.autoRotate = true;       // enable rotation
    controls.maxPolarAngle = Math.PI / 2; // Limit angle of visibility
    controls.keys = {
        LEFT: 37, //left arrow
        UP: 38, // up arrow
        RIGHT: 39, // right arrow
        BOTTOM: 40 // down arrow
    };

    controls.addEventListener("change", () => {
        if (this.renderer) this.renderer.render(this.scene, camera);
    });

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = 'three/models/scene.gltf';

    // window size
    const w_height = window.innerHeight;

    let model = null;
    loader.load(
        url,
        function (gltf) {
            model = gltf.scene;
            // model.name = "model_with_cloth";
            model.scale.set(100.0, 100.0, 100.0);
            model.position.set(0, (w_height / 3 * -1), 0);
            model.position.y = 0
            model.rotation.y = -30
            scene.add(model);

            tick()
            function tick() {
                controls.update();
                model.rotation.y += 0.01;

                renderer.render(scene, camera);
                requestAnimationFrame(tick);
            }

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {
                    child.castShadow = true;
                    // child.receiveShadow = true;
                }

            })

            // model["test"] = 100;
        },
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;



    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 1; // 光の強さ
    light.position.set(3, 10, 1);
    // light.castShadow = true;
    // シーンに追加

    scene.add(light);
    renderer.shadowMap.enabled = true;

    const spotLight = new THREE.SpotLight(0xffffff, 2, 2000, 1, 1);
    spotLight.position.y = 1000
    spotLight.castShadow = true;
    scene.add(spotLight);

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    // 床を作成
    const meshFloor = new THREE.Mesh(
        new THREE.BoxGeometry(5000, 0.1, 5000),
        new THREE.MeshStandardMaterial({ color: 0xc0c0c0 }));
    // 影を受け付ける
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    //環境光源(アンビエントライト)：すべてを均等に照らす、影のない、全体を明るくするライト
    // const ambient = new THREE.AmbientLight(0xf8f8ff, 0.7);
    // ambient.castShadow = true;
    // scene.add(ambient); //シーンにアンビエントライトを追加

    
    // 初回実行
    tick();

    function tick() {

        controls.update();
        
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }
}