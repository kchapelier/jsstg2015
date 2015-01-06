"use strict";

var THREE = require('three'),
    GameLoop = require('migl-gameloop');

var loop = new GameLoop();

var renderer,
    camera,
    scene,
    mesh;

function init () {
    var container = document.getElementById('game');
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, 800 / 600, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(200, 200, 200);

    var material = new THREE.MeshBasicMaterial({});

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

loop.update = function (dt) {
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
};

loop.render = function (dt) {
    renderer.render(scene, camera);
};

module.exports = function () {
    console.log('ok');
    init();
    loop.start();
};
