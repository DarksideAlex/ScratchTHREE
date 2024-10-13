const ThreeLogo = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDIyNi43NyAyMjYuNzciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjExMy4zODUiIGN5PSIxMTMuMzg1IiByPSIxMDYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxNiIgZmlsbD0iI2JiYiIvPgogPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjYgMTgpIHNjYWxlKDAuOTUpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMTAiPgogIDxwYXRoIGQ9Im02My4wMiAyMDAuNjEtNDMuMjEzLTE3NC45NCAxNzMuMjMgNDkuODc0eiIvPgogIDxwYXRoIGQ9Im0xMDYuMzkgNTAuNjEyIDIxLjU5MSA4Ny40OTYtODYuNTY3LTI0Ljk0NXoiLz4KICA8cGF0aCBkPSJtODQuOTEgMTI1LjAzLTEwLjcyNC00My40NjUgNDMuMDA4IDEyLjM0NnoiLz4KICA8cGF0aCBkPSJtNjMuNDU4IDM4LjE1MyAxMC43MjQgNDMuNDY1LTQzLjAwOC0xMi4zNDZ6Ii8+CiAgPHBhdGggZD0ibTE0OS40NyA2Mi45MyAxMC43MjQgNDMuNDY1LTQzLjAwOC0xMi4zNDZ6Ii8+CiAgPHBhdGggZD0ibTg0LjkxNSAxMjUuMDYgMTAuNzI0IDQzLjQ2NS00My4wMDgtMTIuMzQ2eiIvPgogPC9nPgo8L3N2Zz4=";

class ScratchThree {
	constructor() {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.min.js';
		document.head.appendChild(script);
		
		this.ready = false;
		
		this.objects = {}; // Save in objects (meshs) later, using this.objects[name];
		this.geometries = {}; // Same here
		this.materials = {}; // And here!
		this.scenes = new Array(); // Seriously, what are you expecting? This one might be different, but is also way more obvious!
		
		script.onload = ()=>{
			console.log("THREE is ready!");
			
			this.renderer = new THREE.WebGLRenderer({
				canvas: Scratch.vm.renderer.canvas,
				alpha: true
			});
			
			
			
			// IMPORTANT! Always execute at the end!
			this.ready = true;
		}
    }
	
	sceneMenu() {
		return this.scenes.map((_, index) => {return {text: "Scene " + index.toString(), value: index.toString()}});
	}
		
    getInfo() {
        return {
            id: 'scratchthree',
            name: 'Scratch 3D',
			color1: '#772ded',
			color2: '#8833ff',
			color3: '#eeccff',
			menuIconURI: ThreeLogo,
            blocks: [
				{
					opcode: "resetAll",
					blockType: Scratch.BlockType.COMMAND,
					text: "reset all" // Might change to a reset [DROPDOWN:All/Objects/Materials/Scenes/Geometries] in the future!
				},
				{
                    opcode: 'check',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'THREE Version'
                },
				{
                    opcode: 'isReady',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'is THREE ready?'
                },
				{
					opcode: "scene",
					blockType: Scratch.BlockType.REPORTER,
					text: "new scene",
					disableMonitor: true
				},
				{
					opcode: "modifyScene",
					blockType: Scratch.BlockType.COMMAND,
					text: "change property [PROP] of scene [SCENE] to [VAL]",
					arguments: {
						PROP: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "background"
						},
						SCENE: {
							type: Scratch.ArgumentType.STRING,
							menu: "SCENE_MENU"
						},
						VAL: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "new THREE.Color( 0xff0000 )"
						}
					}
				},
				{
					opcode: "cameraPerspective",
					blockType: Scratch.BlockType.REPORTER,
					text: "new perspective camera with fov: [FOV] aspect ratio: [RATIO] near: [NEAR] far: [FAR]",
					arguments: {
						FOV: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 70,
						},
						RATIO: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "4/3"
						},
						NEAR: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 1,
						},
						FAR: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 1000,
						}
					}
				},
				{
					opcode: "material",
					blockType: Scratch.BlockType.REPORTER,
					text: "new material [MAT] with options: [OPT]",
					arguments: {
						MAT: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "MeshStandardMaterial",
							menu: "MATERIAL_MENU"
						},
						OPT: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "{}"
						}
					}
				},
				{
					opcode: "geometry",
					blockType: Scratch.BlockType.REPORTER,
					text: "new geometry [GEO] with options: [OPT]",
					arguments: {
						GEO: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "BoxGeometry",
							menu: "GEOMETRY_MENU"
						},
						OPT: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "{}"
						}
					}
				},
				{
					opcode: "mesh",
					blockType: Scratch.BlockType.REPORTER,
					text: "create mesh from geometry: [GEO] and material: [MAT]",
					arguments: {
						GEO: {
							type: Scratch.ArgumentType.STRING
						},
						MAT: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				{
					opcode: "xPos",
					blockType: Scratch.BlockType.REPORTER,
					text: "x position of object [OBJ]",
					arguments: {
						OBJ: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				{
					opcode: "yPos",
					blockType: Scratch.BlockType.REPORTER,
					text: "y position of object [OBJ]",
					arguments: {
						OBJ: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				{
					opcode: "zPos",
					blockType: Scratch.BlockType.REPORTER,
					text: "z position of object [OBJ]",
					arguments: {
						OBJ: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				{
					opcode: "mergeGeometry",
					blockType: Scratch.BlockType.REPORTER,
					text: "merge geometry [GEO] with mesh: [MESH]",
					arguments: {
						GEO: {
							type: Scratch.ArgumentType.STRING
						},
						MESH: {
							type: Scratch.ArgumentType.STRING
						}
					}
				},
				{
					opcode: "addToScene",
					blockType: Scratch.BlockType.COMMAND,
					text: "add object [OBJ] to scene [SCENE]",
					arguments: {
						OBJ: {
							type: Scratch.ArgumentType.STRING
						},
						SCENE: {
							type: Scratch.ArgumentType.STRING,
							menu: "SCENE_MENU"
						}
					}
				},
				{
					opcode: "setPosition",
					blockType: Scratch.BlockType.COMMAND,
					text: "Set postion of object [OBJ] to x: [X] y: [Y] z: [Z]",
					arguments: {
						OBJ: {
							type: Scratch.ArgumentType.STRING
						},
						X: {
							type: Scratch.ArgumentType.NUMBER,
						},
						Y: {
							type: Scratch.ArgumentType.NUMBER,
						},
						Z: {
							type: Scratch.ArgumentType.NUMBER,
						}
					}
				},
				{
					opcode: "render",
					blockType: Scratch.BlockType.COMMAND,
					text: "render scene [SCENE] using camera [CAM]",
					arguments: {
						CAM: {
							type: Scratch.ArgumentType.STRING
						},
						SCENE: {
							type: Scratch.ArgumentType.STRING,
							menu: "SCENE_MENU"
						}
					}
				}
            ],
			menus: {
				MATERIAL_MENU: {
					acceptReporters: true,
					items: [
						"MeshBasicMaterial",
						"MeshDepthMaterial",
						"MeshDistanceMaterial",
						"MeshLambertMaterial",
						"MeshMatcapMaterial",
						"MeshNormalMaterial",
						"MeshPhongMaterial",
						"MeshPhysicalMaterial",
						"MeshStandardMaterial",
						"MeshToonMaterial",
					]
				},
				GEOMETRY_MENU: {
					acceptReporters: true,
					items: [
						"BoxGeometry",
						"CapsuleGeometry",
						"CircleGeometry",
						"ConeGeometry",
						"CylinderGeometry",
						"DodecahedronGeometry",
						"IcosahedronGeometry",
						"OctahedronGeometry",
						"PlaneGeometry",
						"RingGeometry",
						"SphereGeometry",
						"TetrahedronGeometry",
						"TorusGeometry",
						"TorusKnotGeometry",
					]
				},
				SCENE_MENU: {
					acceptReporters: true,
					items: this.sceneMenu.bind(this)
				}
			}
        };
    }

	check() {
        return "r" + THREE.REVISION;
	}
	
	isReady() {
		return this.ready;
	}
	
	resetAll() {
		this.objects = {};
		this.geometries = {};
		this.materials = {};
		this.scenes = [];
	}
	
	scene() {
		this.scenes.push(new THREE.Scene());
		return this.scenes.length - 1;
	}
	
	modifyScene(args) {
		this.scenes[args.SCENE][args.PROP] = eval(args.VAL);
	}
	
	cameraPerspective(args) {
		var UID = this.GenerateUID();
		
		this.objects[UID] = new THREE.PerspectiveCamera( args.FOV, eval(args.RATIO), args.NEAR, args.FAR );
		return UID;
	}
	
	material(args) {
		var UID = this.GenerateUID();
		var options;
		try {
			options = eval(args.OPT);
		} catch (error) {
			options = {};
			return "Material Error: " + error;
		}
		this.materials[UID] = new THREE[args.MAT](options);
		return UID;
	}
	
	geometry(args) {
		var UID = this.GenerateUID();
		var options;
		try {
			options = eval(args.OPT);
		} catch (error) {
			options = {};
			return "Geometry Error: " + error;
		}
		this.geometries[UID] = new THREE[args.GEO](options);
		return UID;
	}
	
	mesh(args){
		var UID = this.GenerateUID();
		var geometry = this.geometries[args.GEO];
		var material = this.materials[args.MAT];
		
		this.objects[UID] =  new THREE.Mesh(geometry, material);
		return UID;
	}
	
	xPos(args) {
		return this.objects[args.OBJ].position.x;
	}
	
	yPos(args) {
		return this.objects[args.OBJ].position.y;
	}
	
	zPos(args) {
		return this.objects[args.OBJ].position.z;
	}
	
	mergeGeometry(args){
		var UID = this.GenerateUID();
		var merged = this.geometries[args.GEO];
		var mesh = this.objects[args.MESH];
		mesh.updateMatrix();
		
		this.geometries[UID] = merged.merge(mesh.geometry, mesh.matrix);
		return UID;
	}
	
	addToScene(args){
		var index = Number(args.SCENE);
		this.scenes[index].add(this.objects[args.OBJ]);
	}
	
	setPosition(args) {
		this.objects[args.OBJ].position.x = args.X;
		this.objects[args.OBJ].position.y = args.Y;
		this.objects[args.OBJ].position.z = args.Z;
	}
	
	render(args) {
		this.renderer.render(this.scenes[args.SCENE], this.objects[args.CAM]);
	}
	
	GenerateUID() {
		var timestamp = Date.now().toString(16);
		while(timestamp.length < 32){
			timestamp += timestamp + Math.round(Math.random());
		}
		return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-${timestamp.slice(12, 16)}-${timestamp.slice(16, 20)}-${timestamp.slice(20, 32)}`;
	}
}

Scratch.extensions.register(new ScratchThree());
