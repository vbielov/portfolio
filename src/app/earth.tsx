'use client'

import React, { Component } from 'react';

import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

class Earth extends Component
{
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private renderer: THREE.WebGLRenderer | null = null;
    private scene: THREE.Scene | null = null;
    private camera: THREE.OrthographicCamera | null = null;
    private orbitControls: OrbitControls | null = null;
    private animationID: number = -1;

    constructor(props: any)
    {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidMount(): void 
    {
        this.handleResize = this.handleResize.bind(this);
        window.addEventListener('resize', this.handleResize);
        this.initTHREE();
        this.handleResize();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        this.initTHREE();
        this.handleResize();
    }

    componentWillUnmount(): void
    {
        window.removeEventListener('resize', this.handleResize);
    }

    render()
    {
        return (
            <canvas ref={this.canvasRef}>
                Your browser does not support the canvas element.
            </canvas>
        );
    }

    public startDrawing(): void 
    {
        const drawLoop = () => 
        {
            this.animationID = requestAnimationFrame(drawLoop);
            // fuck you ts
            if(this.scene == null || this.camera == null || this.renderer == null || this.orbitControls == null)
            return;
        
            this.orbitControls.update();
            this.renderer.render(this.scene, this.camera);
        }

        // Remove animation loop if another is created
        if(this.animationID != -1)
            cancelAnimationFrame(this.animationID);
        drawLoop();
    }

    private handleResize(): void
    {
        const width = this.canvasRef.current?.parentElement?.clientWidth ?? 480.0;
        const height = this.canvasRef.current?.parentElement?.clientHeight ?? 480.0;

        if(this.camera != null)
        {
            const orthographicSize = 1.0;
            const aspect = width / height;
            this.camera.left    = -orthographicSize * aspect;
            this.camera.right   =  orthographicSize * aspect;
            this.camera.top     =  orthographicSize;
            this.camera.bottom  = -orthographicSize;
            this.camera.updateProjectionMatrix();
        }

        if(this.renderer != null)
            this.renderer.setSize(width, height);

        if(this.canvasRef.current != null)
            this.canvasRef.current.width = width;
    }

    private initTHREE(): void
    {
        // If renderer is not created yet & ref was assigned -> init
        if(this.canvasRef.current == null)
            return;

        // Initin stuff
        if(this.scene == null)
        {
            this.scene = new THREE.Scene();
        }

        if(this.renderer == null)
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current, antialias: true, alpha: true });

        if(this.camera == null)
        {
            this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0, 1000);
            this.camera.position.z = 100;
        }

        if(this.orbitControls == null)
        {
            this.orbitControls = new OrbitControls(this.camera, this.canvasRef.current);
            this.orbitControls.autoRotate = true;
        }
        this.orbitControls.enabled = true;

        // Creating scene
        this.scene?.clear();

        const sunPos = new THREE.Vector3(-4, 3, -2).normalize();

        const sphereGeometry = new THREE.SphereGeometry(0.75, 16, 16);

        const uniforms = {
            uColor: {
                value: new THREE.Vector3(1, 1, 1)
            },
            albedoMap: {
                value: new THREE.TextureLoader().load("earth_day_with_clouds.jpg")
            },
            emissionMap: {
                value: new THREE.TextureLoader().load("earth_night.jpg")
            },
            sunPos: {
                value: sunPos
            }
        };

        const vertexShader = `
            precision highp float;

            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;

            void main() 
            {
                vUv = uv;
                vNormal = normal;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                vPosition = vec3(gl_Position.x, gl_Position.y, gl_Position.z);
            }
        `;

        const fragmentShader = `
            precision highp float;

            varying vec3 vPosition;
            varying vec2 vUv;
            varying vec3 vNormal;

            uniform sampler2D albedoMap;
            uniform sampler2D emissionMap;
            uniform vec3 uColor;
            uniform vec3 sunPos;

            void main() 
            {
                float ambientLight = 0.05;
                float lightSmoothness = 3.0;
                float lightScale = 0.3;
                float dotProduct = dot(vPosition, sunPos * lightSmoothness) - (1.0 - lightScale);
                dotProduct = min(max(dotProduct, 0.0), 1.0);
                float lightValue = max(dotProduct, ambientLight);
                float emissionStrength = 5.0;
                float emissionOffset = 0.3;
                float nightLight = max(1.0 - lightValue - emissionOffset, 0.0) * texture2D(emissionMap, vUv).x * emissionStrength;
                lightValue += nightLight;
                gl_FragColor = texture2D(albedoMap, vUv) * vec4(lightValue, lightValue, lightValue, 1.0);
            }
        `;

        const material = new THREE.RawShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            wireframe: false
        });

        const mesh = new THREE.Mesh(sphereGeometry, material);
        this.scene.add(mesh);

        if(WebGL.isWebGLAvailable() == false) 
        {
            // TODO: Better error handling
            const warning = WebGL.getWebGLErrorMessage();
            document.body.appendChild(warning);
            return;
        }

        // Start loop of drawing object
        this.startDrawing();
    }
}

export default Earth;