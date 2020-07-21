class Wave {
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

    lineList = [];

    constructor(c, w, h) {
        this.canvas = c;
        this.ctx = c.getContext("2d");
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.lineList = [
            new Line(20, 2, 0, 0, -200, 200, 10)
        ];
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.lineList.forEach(line => {
            line.pointList.forEach(item => {
                this.ctx.beginPath()
                this.ctx.arc(item.x + this.canvasWidth / 2, item.y + this.canvasHeight / 2, 2, 0, 2 * Math.PI)
                this.ctx.closePath()
                this.ctx.fill()
            })
        })
    }
}
class Line {
    constructor(a, b, c, d, start, end, gap) {
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.start = start
        this.end = end
        this.gap = gap
        this.pointList = []
        this.computePointList()
    }
    computePointList() {
        this.pointList = []
        for (let i = this.start; i <= this.end; i = i + this.gap) {
            let x = i
            let y = this.a * Math.sin((this.b * x + this.c) / 180 * Math.PI) + this.d
            this.pointList.push({
                x,
                y
            })
        }
    }
}