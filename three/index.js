window.addEventListener('DOMContentLoaded', init);

function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        alpha: true,
    });


    // 初期化のために実行
    // onResize();
    // リサイズイベント発生時に実行
    // window.addEventListener('resize', onResize);
    
    // function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        
        // カメラを作成
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.set(2000, 900, -1000);
        
        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    // }
        
        // シーンを作成
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdedede); // 背景色


    // コントローラ
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    



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

    const spotLight = new THREE.SpotLight(0xffffff, 0.5, 2000, 1, 1);
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