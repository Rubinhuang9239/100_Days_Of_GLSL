class GrassParticle{
    mesh = null;
    raise = 1.0;
    drift = 0.0;

    create = (sample) =>{
        if(this.mesh){
            return;
        }
        this.mesh = sample.clone();
        this.mesh.rotation.set(
            Math.random() * Math.PI, 
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        this.mesh.scale.set(
            0.3 + Math.random() * 1.3,
            0.3 + Math.random() * 1.15,
            1.0
        );
        this.mesh.position.set(
            Math.random() * 160-80,
            Math.random() * 16,
            Math.random() * 640-450,
        );
        
        this.raise = Math.random() * 2.0;
        this.drift = Math.random() * 2.0 - 1.0;
    }

    update = () => {
        this.mesh.position.x += this.drift * 3.2;
        this.mesh.position.z -= 12.0;
        this.mesh.position.y += 1.25 + this.raise;
        this.mesh.rotation.x += 0.18;
        this.mesh.rotation.y += 0.09;
        this.mesh.rotation.z += 0.25;

        return this.mesh.position.z;
    }

    static generateSample = async() => {
        const grassSprite = new THREE.Mesh(
            new THREE.PlaneGeometry(20,20,1,1),
            new THREE.MeshStandardMaterial({
                map: await loadTexture('/shader_034/asset/grass.png'),
                transparent: true,
                side: THREE.DoubleSide
            })
        );
        return grassSprite;
    };
}