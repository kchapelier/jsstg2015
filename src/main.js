"use strict";

var THREE = require('three'),
    GameLoop = require('migl-gameloop'),
    input = require('./game/input'),
    Victor = require('victor');

var loop = new GameLoop();

var renderer,
    camera,
    scene,
    group;

function init () {
    var container = document.getElementById('game');
    renderer = new THREE.WebGLRenderer({ antialias : true });
    renderer.setSize(800, 600);
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(70, 800 / 600, 1, 1000);
    camera.position.z = 400;

    scene = new THREE.Scene();
    group = new THREE.Group();

    var geometry = new THREE.BoxGeometry(200, 200, 200),
        material = new THREE.MeshNormalMaterial({ color: 0x00FFFF }),
        mesh = new THREE.Mesh(geometry, material);

    group.add(mesh);

    scene.add(group);
}

loop.update = function (dt) {
    input.update(dt);

    group.rotation.y += (input.currentInput.LEFT - input.currentInput.RIGHT) * dt / 100;
    group.rotation.x += (input.currentInput.UP - input.currentInput.DOWN) * dt / 100;
};

loop.render = function (dt) {
    renderer.render(scene, camera);
};

module.exports = function () {
    init();
    loop.start();
};
