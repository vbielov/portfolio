 'use client'

import React, { Component } from 'react';
import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js';
import earth_day_with_clouds from '@/public/earth_day_with_clouds.jpg'
import earth_night from '@/public/earth_night.jpg'

interface EarthProps {
    isTouchable?: boolean;
}

class Earth extends Component
{
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private renderer: THREE.WebGLRenderer | null = null;
    private scene: THREE.Scene | null = null;
    private camera: THREE.OrthographicCamera | null = null;
    private animationID: number = -1;
    private isDragging: boolean = false;
    private previousMousePosition: THREE.Vector2 = new THREE.Vector2(0, 0);
    private rotation: THREE.Vector2 = new THREE.Vector2(0, 0);
    private isTouchable: boolean = false;
    private ring: THREE.Mesh | null = null;

    constructor(props: EarthProps)
    {
        super(props);
        this.isTouchable = props.isTouchable || false;
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
        var i = 0;
        const drawLoop = () => 
        {
            this.animationID = requestAnimationFrame(drawLoop);
            if( this.scene == null || 
                this.camera == null || 
                this.renderer == null
            ) return;

            if(this.isDragging == false)
                this.rotation.y += 0.0025;

            for(var i = 0; i < this.scene.children.length; i++)
            {
                const child: THREE.Object3D = this.scene.children[i];
                child.rotation.x = this.rotation.x;
                child.rotation.y = this.rotation.y;
            }

            let material: THREE.RawShaderMaterial = this.ring?.material as THREE.RawShaderMaterial;
            let uni: { uSpin: { value: number } } = material.uniforms as { uSpin: { value: number } };
            uni.uSpin.value += 0.2;

            this.renderer.clear();
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
            this.renderer.setSize(width, height, false);

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
        {
            this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasRef.current, antialias: true, alpha: true });
            this.renderer.autoClear = false;
        }

        if(this.camera == null)
        {
            this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0, 1000);
            this.camera.position.z = 100;
        }

        // Creating scene
        this.scene?.clear();

        const sunPos = new THREE.Vector3(-4, 3, 3).normalize();

        const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);
        const circleGeomtry = new THREE.CircleGeometry(1.0, 32);

        const uniforms = {
            uColor: {
                value: new THREE.Vector3(1, 1, 1)
            },
            uAlbedoMap: {
                value: new THREE.TextureLoader().load(earth_day_with_clouds.src)
            },
            uEmissionMap: {
                value: new THREE.TextureLoader().load(earth_night.src)
            },
            uLightSource: {
                value: sunPos
            }
        };
        // uniforms.uAlbedoMap.value.minFilter = THREE.LinearFilter;
        uniforms.uAlbedoMap.value.needsUpdate = true;
        // uniforms.uEmissionMap.value.minFilter = THREE.LinearFilter;
        uniforms.uEmissionMap.value.needsUpdate = true;


        // Custom oribt controls
        const thisRef = this;

        function ToggleDragging(event: MouseEvent | TouchEvent, state: boolean)
        {
            thisRef.isDragging = state;
            
            if((event as TouchEvent).touches == undefined || (event as TouchEvent).touches.length <= 0)
                return;

            var inputX = (event as MouseEvent).offsetX == undefined ? 
            (event as TouchEvent).touches[0].clientX
            : (event as MouseEvent).offsetX;

            var inputY = (event as MouseEvent).offsetY == undefined ? 
                (event as TouchEvent).touches[0].clientY
                : (event as MouseEvent).offsetY;
            
            thisRef.previousMousePosition = new THREE.Vector2(
                inputX, inputY
            );
        }

        function UpdateDraggingMove(event: MouseEvent | TouchEvent)
        {
            var inputX = (event as MouseEvent).offsetX == undefined ? 
                (event as TouchEvent).touches[0].clientX
                : (event as MouseEvent).offsetX;

            var inputY = (event as MouseEvent).offsetY == undefined ? 
                (event as TouchEvent).touches[0].clientY
                : (event as MouseEvent).offsetY;

            var deltaMove: THREE.Vector2 = new THREE.Vector2(
                inputX-thisRef.previousMousePosition.x,
                inputY-thisRef.previousMousePosition.y
            );

            function toRadians(degree: number): number
            {
                return degree * Math.PI / 180.0;
            }

            if(thisRef.isDragging) 
            {
                if(thisRef.scene == null)
                    return;

                thisRef.rotation.x += toRadians(deltaMove.y / 1.5);
                thisRef.rotation.y += toRadians(deltaMove.x / 1.5);
            }

            thisRef.previousMousePosition = new THREE.Vector2(
                inputX, inputY
            );
        }


        if(this.isTouchable == true)
        {
            this.canvasRef.current.addEventListener('mousedown', (event: MouseEvent) => 
                ToggleDragging(event, true)
            );
            this.canvasRef.current.addEventListener("touchstart", (event: TouchEvent) => 
                ToggleDragging(event, true), {passive: true}
            );
            this.canvasRef.current.addEventListener('mouseup', (event: MouseEvent) => 
                ToggleDragging(event, false)
            );
            this.canvasRef.current.addEventListener("touchend", (event: TouchEvent) => 
            ToggleDragging(event, false), {passive: true}
            );
            this.canvasRef.current.addEventListener("touchcancel", (event: TouchEvent) => 
            ToggleDragging(event, false), {passive: true}
            );
            this.canvasRef.current.addEventListener('mousemove', UpdateDraggingMove);
            this.canvasRef.current.addEventListener("touchmove", UpdateDraggingMove, {passive: true});
        }


        const earth_vertexShader = `
            precision highp float;

            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;

            uniform mat4 modelMatrix;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            varying vec2 vUv;
            varying vec3 vNormal;

            void main() 
            {
                vUv = uv;
                vNormal = vec3(modelMatrix * vec4(normal, 0.0));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const earth_fragmentShader = `
            precision highp float;

            varying vec2 vUv;
            varying vec3 vNormal;

            uniform sampler2D uAlbedoMap;
            uniform sampler2D uEmissionMap;
            uniform vec3 uLightSource;
            
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            void main() 
            {
                float ambientLight = 0.05;
                float lightSmoothness = 3.0;
                float lightScale = 0.3;
                float dotProduct = dot(normalize(vNormal), normalize(uLightSource) * lightSmoothness) - (1.0 - lightScale);
                dotProduct = min(max(dotProduct, 0.0), 1.0);

                float lightValue = max(dotProduct, ambientLight);

                float emissionStrength = 5.0;
                float emissionOffset = 0.3;
                float nightLight = max(1.0 - lightValue - emissionOffset, 0.0) * texture2D(uEmissionMap, vUv).x * emissionStrength;

                lightValue += nightLight;

                gl_FragColor = texture2D(uAlbedoMap, vUv) * vec4(lightValue, lightValue, lightValue, 1.0);
            }
        `;

        const atmo_vertexShader = `
            precision highp float;

            attribute vec3 position;
            attribute vec3 normal;

            uniform mat4 modelMatrix;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            varying vec3 vNormal;
            varying vec3 vPos;

            void main() 
            {
                vNormal = vec3(modelMatrix * vec4(normal, 0.0));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 2.0, 1.0);
                vPos = gl_Position.xyz / gl_Position.w;
            }
        `;

        const atmo_fragmentShader = `
            precision highp float;

            uniform vec3 uLightSource;

            varying vec3 vNormal;
            varying vec3 vPos;

            float spikeFunction(float x)
            {
                return min(0.4 * x * x * x * x * x, 4.1 * (x - 1.0) * (x - 1.0)) * 5.0;
            }

            void main() 
            {
                float dst = length(vPos.xy * 1.1);
                dst = min(max(dst, 0.0), 1.0);
                
                float value = spikeFunction(dst) * 1.25;


                float dotProduct = dot(normalize(uLightSource), normalize(vNormal));
                dotProduct = min(max(dotProduct, 0.0), 1.0);
                dotProduct *= dotProduct * dotProduct;

                vec3 color = vec3(0.17, 0.38, 0.7) * 1.0;
                gl_FragColor = vec4(color.rgb, value * dotProduct);
            } 
        `;

        const ring_vertexShader = `
            precision highp float;

            attribute vec3 position;
            attribute vec3 normal;
            attribute vec2 uv;

            uniform mat4 modelMatrix;
            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            varying vec2 vUv;
            varying vec3 vNormal;

            void main() 
            {
                vUv = uv;
                vNormal = vec3(modelMatrix * vec4(normal, 0.0));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

        const ring_fragmentShader = `
            precision highp float;
            varying vec3 vNormal;
            varying vec3 vPos;
            varying vec2 vUv;
            uniform float uSpin;

            precision highp float;

            float atan2(float y, float x) {
                if (x > 0.0)
                    return atan(y / x);
                if (y >= 0.0 && x < 0.0)
                    return atan(y / x) + 3.1415;
                if (y < 0.0 && x < 0.0)
                    return atan(y / x) - 3.1415;
                if (y > 0.0 && x == 0.0)
                    return 3.1415 / 2.0;
                if (y < 0.0 && x == 0.0)
                    return -3.1415 / 2.0;
                return 0.0;
            }

            
            void main() {
                vec2 uv_o = (vUv - vec2(0.5, 0.5)) * 2.0;
                float value = length(uv_o.x * uv_o.x + uv_o.y * uv_o.y);
                if (value < 0.97) {
                    discard;
                }
                float angle = atan2(uv_o.y, uv_o.x);
                if (mod(angle * 100.0 + uSpin, 10.0) < 8.0) {
                    discard;
                }
                float range = (angle + 3.14) / (3.14 * 2.0);
                range += uSpin / 100.0;
                range = mod(range, 1.0);
                if (range > 0.9) {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
                } else {
                    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.25);
                }
                
            }
        `;

        const earth_material = new THREE.RawShaderMaterial({
            uniforms,
            vertexShader: earth_vertexShader,
            fragmentShader: earth_fragmentShader,
            wireframe: false,
            blending: THREE.AdditiveBlending,
            depthTest: true
        });
        
        const atmo_material = new THREE.RawShaderMaterial({
            uniforms,
            vertexShader: atmo_vertexShader,
            fragmentShader: atmo_fragmentShader,
            wireframe: false,
            blending: THREE.AdditiveBlending,
            depthTest: false // note it.
        });

        const ring_material = new THREE.RawShaderMaterial({
            uniforms: { uSpin: { value: 0.0 } },
            vertexShader: ring_vertexShader,
            fragmentShader: ring_fragmentShader,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            depthTest: true
        });

        
        circleGeomtry.rotateX(0.75);
        const earth_mesh = new THREE.Mesh(sphereGeometry, earth_material);
        const ring_mesh = new THREE.Mesh(circleGeomtry, ring_material);
        const atmo_mesh = new THREE.Mesh(sphereGeometry, atmo_material);
        this.ring = ring_mesh;
        
        this.scene.add(this.ring);
        this.scene.add(earth_mesh);
        this.scene.add(atmo_mesh);

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