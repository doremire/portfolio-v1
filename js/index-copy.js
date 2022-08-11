// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {
    // サイズを指定
    // const width = 960;
    // const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
    });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(width, height);

    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width + ", " + height);


    // レンダラー：シャドウを有効にする
    renderer.shadowMap.enabled = true;

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(20, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const controls = new THREE.OrbitControls(camera, document.body);

    // 床を作成
    const meshFloor = new THREE.Mesh(
        new THREE.BoxGeometry(2000, 0.1, 2000),
        new THREE.MeshStandardMaterial({ color: 0xc0c0c0, roughness: 0.0 })
    );
    // 影を受け付ける
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    // // オブジェクトを作成
    // const meshKnot = new THREE.Mesh(
    //     new THREE.TorusKnotGeometry(3, 1, 100, 16),
    //     new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.0 })
    // );

    // GLTF形式のモデルデータを読み込む
    const loader = new THREE.GLTFLoader();
    // GLTFファイルのパスを指定
    loader.load('three/models/scene.gltf', (gltf) => {
        gltf.scene.traverse(function (child) {

            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }

        })
        // 読み込み後に3D空間に追加
        // model.position.set(0, 0, 0);
        // 影を落とす
        // model.castShadow = true;
        scene.add(gltf.scene);
    });


    // 照明を作成
    const light = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 4, 1);
    // ライトに影を有効にする
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    scene.add(light);

    const spotLightHelper = new THREE.SpotLightHelper(light);
    scene.add(spotLightHelper);

    tick();

    // 毎フレーム時に実行されるループイベントです
    function tick() {
        // レンダリング
        renderer.render(scene, camera);

        // 照明の位置を更新
        const t = Date.now() / 500;
        const r = 20.0;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 20.0 + 5.0 * Math.sin(t / 3.0);
        light.position.set(lx, ly, lz);

        requestAnimationFrame(tick);
    }
}
