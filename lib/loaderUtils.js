const loadShader = ( url ) =>{
    return new Promise((resolve, reject)=>{
        const loader = new THREE.FileLoader();
        loader.load(url,
            ( data ) => {resolve( data );},
            undefined,
            (err)=>{reject(err);}
        );
    });
};

const loadFBXModel = ( url ) =>{
    return new Promise((resolve, reject)=>{
        const loader = new THREE.FBXLoader();
        loader.load(url,
            ( data ) => {resolve( data );},
            undefined,
            (err)=>{reject(err);}
        );
    });
};

const loadGLTFModel = ( url ) =>{
    return new Promise((resolve, reject)=>{
        const loader = new THREE.GLTFLoader();
        loader.load(url,
            ( data ) => {resolve( data );},
            ( progress )=>{
                console.log(progress.loaded/progress.total);
            },
            (err)=>{reject(err);}
        );
    });
};

const loadTexture = ( url ) =>{
    return new Promise((resolve, reject)=>{
        const loader = new THREE.TextureLoader();
        loader.load(url,
            ( data ) => {resolve( data );},
            undefined,
            (err)=>{reject(err);}
        );
    });
};