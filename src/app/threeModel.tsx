'use client'

import React, { Component } from 'react';

import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Example of use:
// <Model3D modelSource="earth.glb" position={[0, 0, 0]} scale={[0.75, 0.75, 0.75]} rotation={[0.6, 0, 0]} orbitControl={true}/>

interface Model3DProps 
{
    modelSource: string;
    position: number[];
    scale: number[];
    rotation: number[];
    orbitControl: boolean;
}

class Model3D extends Component<Model3DProps>
{
    // public props: Model3DProps;

    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private renderer: THREE.WebGLRenderer | null = null;
    private model: THREE.Group | null = null;
    private scene: THREE.Scene | null = null;
    private camera: THREE.OrthographicCamera | null = null;
    private orbitControls: OrbitControls | null = null;
    private animationID: number = -1;

    constructor(props: Model3DProps)
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

    componentDidUpdate(prevProps: Readonly<Model3DProps>, prevState: Readonly<{}>, snapshot?: any): void {
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
            if(this.model == null || this.scene == null || this.camera == null || this.renderer == null || this.orbitControls == null)
                return;

            this.model.position.set(this.props.position[0], this.props.position[1], this.props.position[2]);
            this.model.scale.set(this.props.scale[0], this.props.scale[1], this.props.scale[2]);
            this.model.rotation.set(this.props.rotation[0], this.props.rotation[1], this.props.rotation[2]);

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

        if(this.scene == null)
        {
            this.scene = new THREE.Scene();
        }

        if(this.renderer == null)
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current });

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
        this.orbitControls.enabled = this.props.orbitControl;

        // https://threejs.org/docs/index.html#examples/en/loaders/GLTFLoader
        const loader = new GLTFLoader();
        const thisRef = this;
        loader.load(
            // resource URL
            this.props.modelSource,
            
            // called when the resource is loaded
            function (gltf) 
            {
                thisRef.scene?.clear();

                thisRef.model = gltf.scene;
                const ambientLight = new THREE.AmbientLight(0xfafafa, 1.0); // soft white light
                const pointLight = new THREE.PointLight(0xfafafa, 100.0, 100.0);
                pointLight.position.set(0, 5, 0);

                thisRef.scene?.add(thisRef.model);
                thisRef.scene?.add(ambientLight);
                thisRef.scene?.add(pointLight);
            
                if(WebGL.isWebGLAvailable() == false) 
                {
                    // TODO: Better error handling
                    const warning = WebGL.getWebGLErrorMessage();
                    document.body.appendChild(warning);
                    return;
                }

                // Start loop of drawing object
                thisRef.startDrawing();
            },

            // called while loading is progressing
            function(xhr)
            {
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },

            // called when loading has errors
            function(error)
            {
                console.error( error );
            }
        );
    }
}

export default Model3D;