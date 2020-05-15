// 绘制图片验证码
//随机线
function drawline(canvas, context) {
  context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)) // 随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
  context.lineTO(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)) // 随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
  context.lineWith = 0.5 //随机线宽度
  context.strokeStyle = 'rgba(50,50,50,0.3)' //随机线描边属性
  context.stroke() //描边，即起点描到终点
}
//随机点(所谓画点其实就是画1px像素的线)
function drawDot(canvas, context) {
  const px = Math.floor(Math.random() * canvas.width)
  const py = Math.floor(Math.random() * canvas.height)
  context.moveTo(px, py)
  context.lineTo(px + 1, py + 1)
  context.lineWidth = 0.2
  context.stroke()
}
//绘制图片
function convertCanvasToImage(canvas) {
  const image = document.createElement('img')
  image.src = canvas.toDataURL('image/png')
  return image
}
export default (nums) => {
  const canvas = document.createElement('canvas') //创建画布
  canvas.setAttribute('width', 80)
  canvas.setAttribute('height', 46)
  const context = canvas.getContext('2d') //获取画布2D上下文
  context.fillStyle = '#fff' //画布填充色
  context.fillRect(0, 0, canvas.width, canvas.height)
  //创建渐变
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0)
  gradient.addColorStop('0', 'magenta')
  gradient.addColorStop('0.5', 'blue')
  gradient.addColorStop('1', 'red')
  //清空画布
  context.fillStyle = gradient //设置字体颜色
  context.font = '25px Arail' //设置字体
  const rand = nums
  const x = []
  const y = []
  for (let i = 0; i < rand.length; i++) {
    x[i] = i * 16 + 10
    y[i] = Math.random() * 20 + 20
    context.fillText(random[i], x[i], y[i])
  }
  //画3条随机线
  for (let i = 0; i < 3; i++) {
    drawline(canvas, context);
  }
  //画30个随机点
  for (let i = 0; i < 30; i++) {
    drawDot(canvas, context)
  }
  return convertCanvasToImage(canvas)
}
