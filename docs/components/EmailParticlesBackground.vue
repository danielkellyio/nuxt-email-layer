<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  type: 'envelope' | 'at' | 'dot' | 'line'
  rotation: number
  rotationSpeed: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const particles = ref<Particle[]>([])
let animationFrame: number
let ctx: CanvasRenderingContext2D | null = null

const particleCount = 50

const createParticle = (): Particle => {
  const types: Array<'envelope' | 'at' | 'dot' | 'line'> = ['envelope', 'at', 'dot', 'line']
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    size: Math.random() * 20 + 10,
    opacity: Math.random() * 0.3 + 0.1,
    type: types[Math.floor(Math.random() * types.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02
  }
}

const drawEnvelope = (x: number, y: number, size: number, rotation: number, opacity: number) => {
  if (!ctx) return
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
  ctx.lineWidth = 1.5
  ctx.beginPath()
  // Envelope body
  ctx.rect(-size / 2, -size / 2, size, size * 0.7)
  ctx.stroke()
  // Envelope flap
  ctx.beginPath()
  ctx.moveTo(-size / 2, -size / 2)
  ctx.lineTo(0, 0)
  ctx.lineTo(size / 2, -size / 2)
  ctx.stroke()
  ctx.restore()
}

const drawAt = (x: number, y: number, size: number, rotation: number, opacity: number) => {
  if (!ctx) return
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
  ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
  ctx.font = `${size}px Arial`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('@', 0, 0)
  ctx.restore()
}

const drawDot = (x: number, y: number, size: number, opacity: number) => {
  if (!ctx) return
  ctx.beginPath()
  ctx.arc(x, y, size / 4, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`
  ctx.fill()
}

const drawLine = (x: number, y: number, size: number, rotation: number, opacity: number) => {
  if (!ctx) return
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rotation)
  ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(-size / 2, 0)
  ctx.lineTo(size / 2, 0)
  ctx.stroke()
  ctx.restore()
}

const drawParticle = (particle: Particle) => {
  if (!ctx) return
  switch (particle.type) {
    case 'envelope':
      drawEnvelope(particle.x, particle.y, particle.size, particle.rotation, particle.opacity)
      break
    case 'at':
      drawAt(particle.x, particle.y, particle.size, particle.rotation, particle.opacity)
      break
    case 'dot':
      drawDot(particle.x, particle.y, particle.size, particle.opacity)
      break
    case 'line':
      drawLine(particle.x, particle.y, particle.size, particle.rotation, particle.opacity)
      break
  }
}

const updateParticle = (particle: Particle) => {
  particle.x += particle.vx
  particle.y += particle.vy
  particle.rotation += particle.rotationSpeed

  // Wrap around screen edges
  if (particle.x < -50) particle.x = window.innerWidth + 50
  if (particle.x > window.innerWidth + 50) particle.x = -50
  if (particle.y < -50) particle.y = window.innerHeight + 50
  if (particle.y > window.innerHeight + 50) particle.y = -50
}

const drawConnections = () => {
  if (!ctx) return
  const maxDistance = 150

  for (let i = 0; i < particles.value.length; i++) {
    for (let j = i + 1; j < particles.value.length; j++) {
      const dx = particles.value[i].x - particles.value[j].x
      const dy = particles.value[i].y - particles.value[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.1
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particles.value[i].x, particles.value[i].y)
        ctx.lineTo(particles.value[j].x, particles.value[j].y)
        ctx.stroke()
      }
    }
  }
}

const animate = () => {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  drawConnections()

  particles.value.forEach(particle => {
    updateParticle(particle)
    drawParticle(particle)
  })

  animationFrame = requestAnimationFrame(animate)
}

const resizeCanvas = () => {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
}

onMounted(() => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resizeCanvas()

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.value.push(createParticle())
  }

  animate()

  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <canvas
    ref="canvas"
    class="fixed inset-0 w-full h-full pointer-events-none"
    style="z-index: 0;"
  />
</template>
