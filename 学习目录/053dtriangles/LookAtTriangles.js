/**
 * Created by hushhw on 18/1/26.
 */
//LookAtTriangles.js
let canvas = document.getElementById('webgl');
let gl = canvas.getContext('webgl');

var v_shader =
    'attribute vec4 a_Position;\n' +
    'attribute vec4 a_Color;\n' +
    'uniform mat4 u_ViewMatrix;\n' +
    'varying vec4 v_Color;\n' +
    'void main() {\n' +
    'gl_Position = u_ViewMatrix * a_Position;\n' +
    'gl_PointSize = 10.0;\n' +
    'v_Color = a_Color;\n' +
    '}\n';

var f_shader =
    'precision mediump float;\n' +//!!! 需要声明浮点数精度，否则报错No precision specified for (float)
    'varying vec4 v_Color;\n' +
    'void main(){\n' +
    'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n' +
    '}\n';
function initProgram() {
    let vshader = gl.createShader(gl.VERTEX_SHADER);
    let fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vshader, v_shader);
    gl.shaderSource(fshader, f_shader);
    gl.compileShader(vshader);
    gl.compileShader(fshader);

    let program = gl.createProgram();
    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.program = program;
};
function main() {

    var canvas = document.getElementById("webgl");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return;
    }


    initProgram();

    //设置顶点位置
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
    }
    var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');

    //设置视点、视线、上方向
    var viewMatrix = new Matrix4();
    //注册键盘事件响应函数
    document.onkeydown = function (ev) {
        keydown(ev, gl, n, u_ViewMatrix, viewMatrix);
    };
    gl.clearColor(0, 0, 0, 1.0);
    draw(gl, n, u_ViewMatrix, viewMatrix);
}

var g_eyeX = 0.0, g_eyeY = .5, g_eyeZ = .7; //视点
function keydown(ev, gl, n, u_ViewMatrix, viewMatrix) {
    if (ev.keyCode == 39) {   //按下右键
        g_eyeX += 0.1;
    } else if (ev.keyCode == 37) { //按下左键
        g_eyeX -= 0.1;
    } else {
        return;
    }

    draw(gl, n, u_ViewMatrix, viewMatrix);
}

function draw(gl, n, u_ViewMatrix, viewMatrix) {
    //设置视点和视线
    viewMatrix.setLookAt(g_eyeX, g_eyeY, g_eyeZ, 0, 0, 0, 0, 1, 0);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.enableVertexAttribArray(a_Position);
    //将视图矩阵传递给u_ViewMatrix变量
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
    gl.clear(gl.COlOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
    drawCube();
}
function drawCube() {
    var cubePoints = new Float32Array(
        [
            -1, -1, 0,
            1, -1, 0,
            1, 1, 0,

            1, -1, 0,
            1, 1, 0,
            -1, 1, 0,
        
            1, 1, 0,
            -1, 1, 0,
            -1, 1, -1,

            -1, 1, -1,
            -1, 1, 0,
            -1, 1, -1,
        
            -1, 1, -1,
            -1, 1, 0,
            -1, 1, -1,

            -1, 1, 0,
            -1, 1, -1,
            1, 1, -1,

            -1, 1, -1,
            1, 1, -1,
            1, -1, -1,

            1, 1, -1,
            1, -1, -1,
            -1, -1, 1,

            1, -1, -1,
            -1, -1, 1,
            -1, -1, 0,
        ]
    );
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var FSIZE = cubePoints.BYTES_PER_ELEMENT;
    //创建缓冲区对象
    var cubeBuffer = gl.createBuffer();

    //将缓冲区对象保存到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuffer);

    //向缓存对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, cubePoints, gl.STATIC_DRAW);

    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    //连接a_Postion变量与分配给它的缓冲区对象

    gl.drawArrays(gl.TRIANGLES, 0, 27);
}
function initVertexBuffers(gl) {
    return;
    var verticesColors = new Float32Array(
        [
            0, .9, -0.4, 0.0, 1.0, 0.0, // The back green one
            0.9, 0.9, -0.4, 0.4, 1.0, 0.4,
            .9, 0, -0.4, 1.0, 0.4, 0.4,

            0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow one
            -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
            0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

            0.0, 0.5, 0.0, 0.4, 0.4, 1.0,  // The front blue one
            -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
            0.5, -0.5, 0.0, 1.0, 0.4, 0.4
        ]
    );
    var n = 9; //点的个数


    //创建缓冲区对象
    var verteColorBuffer = gl.createBuffer();
    if (!verteColorBuffer) {
        console.log("Failed to create thie buffer object");
        return -1;
    }
    //将缓冲区对象保存到目标上
    gl.bindBuffer(gl.ARRAY_BUFFER, verteColorBuffer);

    //向缓存对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.enableVertexAttribArray(a_Position);
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    //将缓冲区对象分配给a_Postion变量
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
    //连接a_Postion变量与分配给它的缓冲区对象
    

    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    if (a_Color < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }

    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
    gl.enableVertexAttribArray(a_Color);

    // gl.bindBuffer(gl.ARRAY_BUFFER, null);//取消绑定的缓冲区对象

    return n;
}
