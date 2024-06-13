AFRAME.registerComponent('ball_thrown',{
    init:function(){
        this.throw_ball()
    },
    throw_ball:function(){
        window.addEventListener('keydown',(e)=>{
            if(e.key === 'o'){
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry", {primitive: "sphere",radius: 0.4,})
                ball.setAttribute("material", "color", "blue")

                var cam = document.querySelector("#camera")
                pos = cam.getAttribute("position")

                ball.setAttribute("position", {x:pos.x,y:pos.y,z:pos.z,})

                var camera = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                camera.getWorldDirection(direction)

                ball.setAttribute("velocity", direction.multiplyScalar(-10))
                ball.setAttribute('dynamic-body',{mass:1})

                var scene = document.querySelector("#scene")
                ball.addEventListener('collide',this.removeBall)
                scene.appendChild(ball)
            }
        })
    },
    removeBall:function(e){

        console.log(e.detail.target.el);
        console.log(e.detail.body.el);
    
        ball_el = e.detail.target.el
        elementHit = e.detail.body.el
    
        if(elementHit.id.includes("pin")) {

            elementHit.setAttribute('material',{opacity:0.5})
    
            var impulse = new CANNON.Vec3(Math.random()-Math.random(),0.01,-10)
            var point_vector = new CANNON.Vec3().copy(elementHit.getAttribute('position'))
            elementHit.body.applyImpulse(impulse,point_vector)
            console.log(elementHit)
            
            elementHit.removeEventListener('collide',this.throw_ball)
            
            scene.removeChild(ball_el)
          
        }
      }
})