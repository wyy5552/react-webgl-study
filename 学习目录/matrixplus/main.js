let canvas = document.getElementById('webgl');
let gl = canvas.getContext('webgl');

let v_shader = `
    attribute vec4 v_position;
    uniform mat4 u_xformMatrix;
    void main(){
        gl_Position = u_xformMatrix * v_position;
    }
`;
let f_shader = `
    void main(){
        gl_FragColor = vec4(1.0,0,0,1);
    }
`;


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

function initBuffer() {
    let points = new Float32Array([
        0, .3,
        .3, -.3,
        -.3, -.3
    ]);
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    let a_position = gl.getAttribLocation(gl.program, 'v_position');
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);

    return points.length / 2;
}

let mat = new Matrix4();
function draw(angle) {
    // mat.setTranslate(.5,.5,0);
    // mat.rotate(angle,0,0,1);
    mat.setRotate(angle, 0, 0, 1);
    mat.translate(.5,0,0);
    let xformMat = gl.getUniformLocation(gl.program, 'u_xformMatrix');
    gl.uniformMatrix4fv(xformMat, false, mat.elements);
}
function tick() {
    curAngle = getCurAngle(curAngle)
    draw(curAngle);
    clearGl();
    requestAnimationFrame(tick);
}

function getCurAngle(angle) {
    let speed = 90;//度/s
    let now = new Date().getTime();
    let cap = now - beginTime;
    beginTime = now;
    let capSpeed = angle + cap * speed / 1000;
    return capSpeed %= 360;
}

function clearGl(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, vertex_num);
}

initProgram();
let vertex_num = initBuffer();
gl.clearColor(0, 0, 0, 1);

let beginTime = new Date().getTime();
let curAngle = 0;
tick();




