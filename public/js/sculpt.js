const drawCircle = (ctx, x, y, radius, fill, stroke, strokeWidth) => {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
  if (fill) {
    ctx.fillStyle = fill
    ctx.fill()
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth
    ctx.strokeStyle = stroke
    ctx.stroke()
  }
}

const canvas = document.querySelector("#jsCanvas")
const ctx = canvas.getContext("2d")

const brushViewer = document.querySelector("#brushViewer")
const viewerCtx = brushViewer.getContext("2d")

const canvasHolder = document.querySelector(".canvas-holder")
const canvasSize =
  canvasHolder.clientWidth > canvasHolder.clientHeight
    ? canvasHolder.clientHeight
    : canvasHolder.clientWidth

const viewerSize =
  brushViewer.clientWidth > brushViewer.clientHeight
    ? brushViewer.clientHeight
    : brushViewer.clientWidth

canvas.width = canvasSize
canvas.height = canvasSize

brushViewer.width = viewerSize
brushViewer.height = viewerSize

const rgb_number = Math.floor(Math.random() * 255)
const BG_COLOR = `rgb(${rgb_number}, ${rgb_number}, ${rgb_number})`
let BRUSH_SIZE = document.querySelector("#brushSize").value
let SELECTED_COLOR = document.querySelector("input[name=palette]:checked").value

ctx.fillStyle = BG_COLOR
ctx.fillRect(0, 0, canvasSize, canvasSize)

viewerCtx.fillStyle = BG_COLOR
viewerCtx.fillRect(0, 0, viewerSize, viewerSize)

drawCircle(
  viewerCtx,
  viewerSize / 2,
  viewerSize / 2,
  BRUSH_SIZE,
  SELECTED_COLOR
)

document.querySelectorAll("input[name=palette]").forEach((input) => {
  input.addEventListener("change", () => {
    SELECTED_COLOR = document.querySelector("input[name=palette]:checked").value
    viewerCtx.fillStyle = BG_COLOR
    viewerCtx.fillRect(0, 0, viewerSize, viewerSize)
    drawCircle(
      viewerCtx,
      viewerSize / 2,
      viewerSize / 2,
      BRUSH_SIZE,
      SELECTED_COLOR
    )
  })
})

document.querySelectorAll("button[name=brushSizeController]").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.dir(document.querySelector("#brushSize"))
    if (btn.classList.contains("plus")) {
      document.querySelector("#brushSize").stepUp()
    } else if (btn.classList.contains("minus")) {
      document.querySelector("#brushSize").stepDown()
    }
    BRUSH_SIZE = document.querySelector("#brushSize").value
    viewerCtx.fillStyle = BG_COLOR
    viewerCtx.fillRect(0, 0, viewerSize, viewerSize)
    drawCircle(
      viewerCtx,
      viewerSize / 2,
      viewerSize / 2,
      BRUSH_SIZE,
      SELECTED_COLOR
    )
  })
})

// canvas.addEventListener("mousemove", (e) => {
//   const rect = canvas.getBoundingClientRect()
//   const mouseX = e.clientX - rect.left
//   const mouseY = e.clientY - rect.top

//   drawCircle(ctx, mouseX, mouseY, BRUSH_SIZE, SELECTED_COLOR)
// })

// canvas.addEventListener("click", () => {
//   ctx.fillStyle = BG_COLOR
//   ctx.fillRect(0, 0, canvasSize, canvasSize)
// })

let painting = false

const startPainting = (e) => {
  painting = true
  const x = e.offsetX
  const y = e.offsetY

  drawCircle(ctx, x, y, BRUSH_SIZE, SELECTED_COLOR)
}

const stopPainting = (e) => {
  painting = false
}

const onMouseMove = (e) => {
  if (!painting) return

  const x = e.offsetX
  const y = e.offsetY

  drawCircle(ctx, x, y, BRUSH_SIZE, SELECTED_COLOR)
}

if (canvas) {
  canvas.addEventListener("mousedown", startPainting)
  canvas.addEventListener("mousemove", onMouseMove)
  canvas.addEventListener("mouseup", stopPainting)
}

const convertCanvasToImage = (canvas) => {
  const image = canvas.toDataURL()
  const link = document.createElement("a")
  link.href = image
  link.download = `${new Date().getTime()}.png`
  // link.click()
}

const handlerUpload = async () => {
  //   convertCanvasToImage()
  const image = canvas.toDataURL()
  const storageRef = await storage
    .ref()
    .child(`images/${new Date().getTime()}.png`)
  const res = await storageRef.putString(image, "data_url")
  if (res.state === "success") {
    ctx.fillStyle = BG_COLOR
    ctx.fillRect(0, 0, canvasSize, canvasSize)
    console.log("Upload success")
  }
}

document.querySelector("#submitImage").addEventListener("click", handlerUpload)
