<script setup lang="ts">
import { onMounted } from 'vue';

const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
const WIDTH = 400
const HEIGHT = 400
interface Point {
  x: number,
  y: number
}
interface Branch {
  start: Point,
  length: number,
  theta: number
}
function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
}
function getEndPoint(b: Branch) {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta)
  }
}
function getLength(b: Branch) {
  return b.length + (Math.random() * 10 - 5)
}
function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b))
}
function init() {
  ctx.strokeStyle = '#fff'
  step({
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 40,
    theta: -Math.PI / 2
  })
}
const pendingTask: Function[] = []
function step(b: Branch, depth = 0) {

  const end = getEndPoint(b)
  drawBranch(b)
  if (depth < 2 || Math.random() < 0.5) {
    pendingTask.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta - 0.3 * Math.random()
    }, depth + 1))
  }
  if (depth < 2 || Math.random() < 0.5) {
    pendingTask.push(() => step({
      start: end,
      length: b.length + (Math.random() * 10 - 5),
      theta: b.theta + 0.3 * Math.random()
    }, depth + 1))
  }

}
function frame() {
  const tasks = [...pendingTask]
  pendingTask.length = 0
  tasks.forEach(fn => fn())
}
let framsCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framsCount += 1
    if (framsCount % 3 === 0)
      frame()
    startFrame()
  })
}
startFrame()
onMounted(() => {
  init()
})
</script>

<template>
  <canvas ref="el" width="400" height="400"></canvas>
</template>

<style scoped>
canvas {
  border: 1px solid #fff;
}
</style>
