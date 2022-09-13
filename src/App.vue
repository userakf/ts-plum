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
function drawBranch(l: Branch) {
  const { start, length, theta } = l
  const end = {
    x: start.x + length * Math.cos(theta),
    y: start.y + length * Math.sin(theta)
  }
  lineTo(start, end)
}
function init() {
  ctx.strokeStyle = '#fff'
  const branch = {
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 100,
    theta: -Math.PI / 2
  }
  drawBranch(branch)
}
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
