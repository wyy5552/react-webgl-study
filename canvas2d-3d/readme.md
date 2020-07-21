Canvas2d 制作3d模型
从空间内的任意点A(xA，yA，zA)观察空间内的任一点G(xG，yG，zG)，它在xy平面内的投影H的坐标为

```js
    transformCoordinatePoint(x, y, z, offsetX = 0, offsetY = 0) {
        offsetX = this.canvasWidth / 2;
        offsetY = this.canvasHeight / 2;
        return {
            x: (x - this.eyesPoint.x) * this.eyesPoint.z / (this.eyesPoint.z - z) + offsetX,
            y: (y - this.eyesPoint.y) * this.eyesPoint.z / (this.eyesPoint.z - z) + offsetY
        }
    }
```
https://www.jianshu.com/p/e3ebe08dddad
