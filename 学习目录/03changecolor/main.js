let canvas = document.getElementById('webgl');
let gl = canvas.getContext('webgl');

let v_shader = `
    attribute vec4 v_position;
    attribute vec4 a_color;
    varying vec4 v_color;
    void main(){
        gl_Position = v_position;
        gl_PointSize = 10.0;
        v_color = a_color;
    }
`;
//!!! 需要声明浮点数精度，否则报错No precision specified for (float) 
let f_shader = `
    precision mediump float;
    varying vec4 v_color;
    uniform float u_width;
    uniform float u_height;
    void main(){
        gl_FragColor = vec4(gl_FragCoord.x/u_width/10.0,0.0,gl_FragCoord.y/u_height,1.0);
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
        .0, .5,1.0,0.0,0.0,
        .3, -.3,0.0,1.0,0.0,
        -.3, -.3,0.0,0.0,1.0
    ]);

    let size = points.BYTES_PER_ELEMENT;
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    let a_position = gl.getAttribLocation(gl.program, 'v_position');
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, size * 5, 0);
    gl.enableVertexAttribArray(a_position);

    let a_color = gl.getAttribLocation(gl.program, 'a_color');
    gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, size * 5, size*2);
    gl.enableVertexAttribArray(a_color);

    let u_width = gl.getUniformLocation(gl.program, 'u_width');
    gl.uniform1f(u_width, gl.drawingBufferWidth);
    let u_height = gl.getUniformLocation(gl.program, 'u_height');
    gl.uniform1f(u_height, gl.drawingBufferHeight);
    console.log(u_width, gl.drawingBufferWidth);
    console.log(u_height, gl.drawingBufferHeight);
    return points.length / 5;
}


initProgram();
initBuffer();
let vertex_num = initBuffer();
gl.clearColor(0, 0, 0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, vertex_num);





