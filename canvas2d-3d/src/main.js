class Vector3 {
    x = 0;
    y = 0;
    z = 0;
    constructor(x, y, z) {
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.z = z ? z : 0;
    }
}
class Draw {
    /**
     * 画布
     */
    canvas = null;
    /**
     * 画布应用上下文
     */
    ctx = null;
    /**
     * 观察点
     */
    eyesPoint = new Vector3();
    /**
     * 网格
     */
    mesh = [];
    /**
     * 画布宽
     */
    canvasWidth;
    /**
     * 画布高
     */
    canvasHeight;

    constructor(c,w,h) {
        this.canvas = c;
        this.ctx = c.getContext("2d");
        this.canvasWidth = w;
        this.canvasHeight = h;
    }
    /**
     * 设置观察位置
     */
    setCameraPosition(v3) {
        this.eyesPoint = v3;
    }
    /**
     * 设置网格数据
     * @param {} points 
     */
    setVertexs(points) {
        points = [
            [-50, 50, 50],
            [-50, 50, -50],
            [50, 50, -50],
            [50, 50, 50],
            [-50, -50, 50],
            [-50, -50, -50],
            [50, -50, -50],
            [50, -50, 50]
        ];
        this.mesh = points;
    }
    /**
     * 坐标系转换,从视角看对面的坐标转换
     * @param {*} x 
     * @param {*} y 
     * @param {*} z 
     * @param {*} offsetX 
     * @param {*} offsetY 
     */
    transformCoordinatePoint(x, y, z, offsetX = 0, offsetY = 0) {
        offsetX = this.canvasWidth / 2;
        offsetY = this.canvasHeight / 2;
        return {
            x: (x - this.eyesPoint.x) * this.eyesPoint.z / (this.eyesPoint.z - z) + offsetX,
            y: (y - this.eyesPoint.y) * this.eyesPoint.z / (this.eyesPoint.z - z) + offsetY
        }
    }
    /**
     * 绘制封闭方块
     * @param {*} arr 
     */
    draw(){
        let point
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        // 绘制矩形ABCD
        this.ctx.beginPath()
        point = this.transformCoordinatePoint(...this.mesh[0])
        this.ctx.moveTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[1])
        this.ctx.lineTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[2])
        this.ctx.lineTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[3])
        this.ctx.lineTo(point.x, point.y)
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.fillStyle="#ff00ff";
        this.ctx.fill();
        // 绘制矩形EFGH
        this.ctx.beginPath()
        point = this.transformCoordinatePoint(...this.mesh[4])
        this.ctx.moveTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[5])
        this.ctx.lineTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[6])
        this.ctx.lineTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[7])
        this.ctx.lineTo(point.x, point.y)
        this.ctx.closePath()
        this.ctx.fillStyle="#ff0000";
        this.ctx.fill();
        this.ctx.stroke()
        // 绘制直线AE
        this.ctx.beginPath()
        point = this.transformCoordinatePoint(...this.mesh[0])
        this.ctx.moveTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[4])
        this.ctx.lineTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[3])
        this.ctx.lineTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[7])
        this.ctx.lineTo(point.x, point.y)
        this.ctx.stroke()
        this.ctx.fillStyle="#ff00ff";
        this.ctx.fill();
        this.ctx.closePath()
        // 绘制直线BF
        this.ctx.beginPath()
        point = this.transformCoordinatePoint(...this.mesh[1])
        this.ctx.moveTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[5])
        this.ctx.lineTo(point.x, point.y)
        this.ctx.stroke()
        this.ctx.closePath()
        // 绘制直线CD
        this.ctx.beginPath()
        point = this.transformCoordinatePoint(...this.mesh[2])
        this.ctx.moveTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[6])
        this.ctx.lineTo(point.x, point.y)
        this.ctx.stroke()
        this.ctx.closePath()
        // 绘制直线DH
        this.ctx.beginPath()
        point = this.transformCoordinatePoint(...this.mesh[3])
        this.ctx.moveTo(point.x, point.y)
        point = this.transformCoordinatePoint(...this.mesh[7])
        this.ctx.lineTo(point.x, point.y)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    animationFrame () {
        let rotationAngle = 1
        window.requestAnimationFrame(() => {
            for (let key in this.mesh) {
                let point = this.mesh[key]
                // 保存x,y,z坐标
                let x = point[0]
                let y = point[1]
                let z = point[2]
                // 变换后的x坐标
                point[0] = x * Math.cos(rotationAngle / 180 * Math.PI) - z * Math.sin(rotationAngle / 180 * Math.PI)
                // 绕y轴旋转，y左边不会发生变化
                point[1] = y
                // 变换后的z坐标
                point[2] = z * Math.cos(rotationAngle / 180 * Math.PI) + x * Math.sin(rotationAngle / 180 * Math.PI)
            }
            this.draw()
            this.animationFrame()
        })
    }
}