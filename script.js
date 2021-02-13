(()=> {
  /* ===== Animation properties ===== */
  const properties = {
    backgroundColor: "#232331",
    particlesColor: "rgb(255, 50, 50)",
    particlesRadius: 3,
    particlesCount: Math.floor(Math.floor((innerWidth*innerHeight)/(innerHeight+innerWidth)*2)/10),
    particlesMaxVelosity: 0.5,
    particlesLifeTime : 6,
    linesLength: 150,
    linesWidth: 0.5,
    linesColor: 'rgba(255, 50, 50)', //only rgba
  }
  /* ================================ */


  //create canvas and get context
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  // width and height for canvas
  let w = canvas.width = innerWidth
  let h = canvas.height = innerHeight

  // array for particles
  const particles = []

  // add canvas in the body
  document.querySelector("body").appendChild(canvas)

  // dynamic canvas resize
  window.onresize = () => {
    w = canvas.width = innerWidth
    h = canvas.height = innerHeight
  }

  class Particle {
    constructor() {
      this.x = Math.random() * w
      this.y = Math.random() * h
      this.velosityX = Math.random() * (properties.particlesMaxVelosity * 2) - properties.particlesMaxVelosity
      this.velosityY = Math.random() * (properties.particlesMaxVelosity * 2) - properties.particlesMaxVelosity
      this.life = Math.random() * properties.particlesLifeTime * 60
    }

    position() {
      this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX
      this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY
      this.x += this.velosityX
      this.y += this.velosityY
    }

    reDraw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, properties.particlesRadius, 0, Math.PI*2)
      ctx.closePath()
      ctx.fillStyle = properties.particlesColor
      ctx.fill()
    }

    reCalculateLife(){
      if(this.life < 1){
          this.x = Math.random()*w
          this.y = Math.random()*h
          this.velocityX = Math.random()*(properties.particlesMaxVelosity*2)-properties.particleMaxVelocity
          this.velocityY = Math.random()*(properties.particlesMaxVelosity*2)-properties.particleMaxVelocity
          this.life = Math.random()*properties.particlesLifeTime*60
      }
      this.life--
    }
  }

  function reDrawBackground() {
    ctx.fillStyle = properties.backgroundColor
    ctx.fillRect(0, 0, w, h)
  }

  function drawLines(){
    var x1, y1, x2, y2, length, opacity
    for(var i in particles){
      for(var j in particles){
        x1 = particles[i].x
        y1 = particles[i].y
        x2 = particles[j].x
        y2 = particles[j].y
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        if(length < properties.linesLength){
          opacity = 1-length / properties.linesLength
          ctx.linesWidth = properties.linesWidth
          ctx.strokeStyle = properties.linesColor.substring(0, properties.linesColor.length - 1) + "," + opacity+ ")"
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.closePath()
          ctx.stroke()
        }
      }
    }
  }

  function reDrawParticles(){
    for(var i in particles){
      particles[i].reCalculateLife()
      particles[i].position()
      particles[i].reDraw()
    }
  }
    
  function loop(){
    reDrawBackground()
    reDrawParticles()
    drawLines()
    requestAnimationFrame(loop)
  }

  function init () {
    for(let i = 0; i < properties.particlesCount; i++) {
      particles.push(new Particle)
    }
    loop()
  }

  init()
})()