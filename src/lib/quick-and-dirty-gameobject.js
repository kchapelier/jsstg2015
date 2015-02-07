"use strict";

var GameObject = {
    createFactory: function (baseComponents) {
        var components = arguments;

        return function gameObjectFactory (otherComponents) {
            var allComponents = [],
                i;

            for (i = 0; i < components.length; i++) {
                allComponents.push(components[i]);
            }

            for (i = 0; i < arguments.length; i++) {
                allComponents.push(arguments[i]);
            }

            return GameObject.create.apply(null, allComponents);
        };
    },
    create: function (components) {
        var initFunctions = [],
            updateFunctions = [],
            postUpdateFunctions = [],
            preRenderFunctions = [],
            renderFunctions = [],
            postRenderFunctions = [],
            component,
            key,
            i;

        var object = {
            update: function (dt) {
                for (var i = 0; i < updateFunctions.length; i++) {
                    updateFunctions[i](this, dt);
                }
            },
            postUpdate: function (dt) {
                for (var i = 0; i < postUpdateFunctions.length; i++) {
                    postUpdateFunctions[i](this, dt);
                }
            },
            preRender: function (dt) {
                for (var i = 0; i < preRenderFunctions.length; i++) {
                    preRenderFunctions[i](this, dt);
                }
            },
            render: function (dt) {
                for (var i = 0; i < renderFunctions.length; i++) {
                    renderFunctions[i](this, dt);
                }
            },
            postRender: function (dt) {
                for (var i = 0; i < postRenderFunctions.length; i++) {
                    postRenderFunctions[i](this, dt);
                }
            }
        };

        for (i = 0; i < arguments.length; i++) {
            component = arguments[i];

            for (key in component) {
                if (component.hasOwnProperty(key)) {
                    if (key === 'initialize') {
                        initFunctions.push(component[key]);
                    } else if (key === 'update') {
                        updateFunctions.push(component[key]);
                    } else if (key === 'postUpdate') {
                        postUpdateFunctions.push(component[key]);
                    } else if (key === 'preRender') {
                        preRenderFunctions.push(component[key]);
                    } else if (key === 'render') {
                        renderFunctions.push(component[key]);
                    } else if (key === 'postRender') {
                        postRenderFunctions.push(component[key]);
                    } else {
                        object[key] = component[key];
                    }
                }
            }
        }

        for (i = 0; i < initFunctions.length; i++) {
            initFunctions[i](object);
        }

        initFunctions = null;

        return object;
    }
};

module.exports = GameObject;
