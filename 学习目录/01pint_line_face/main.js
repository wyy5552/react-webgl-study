//绘制一个点


let canvas = document.getElementById("webgl");
let webgl = canvas.getContext("webgl");

//顶点着色器
function draw1Point() {
    let v_shader = `
void main(){
    gl_Position = vec4(0.5,0,0,1);
    gl_PointSize = 10.0;
}
`;
    //gl_Position 四位，最后一位叫做齐次坐标，用来矩阵相乘用。
    let f_shader = `
void main(){
    gl_FragColor = vec4(1,0,0,.5);
}
`;
    initShaders(webgl, v_shader, f_shader);

    webgl.clearColor(0, 0, 0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.POINT, 0, 1);

}

function draw2Point() {
    let v_shader = `
    attribute vec4 a_position;
void main(){
    gl_Position = a_position;
    gl_PointSize = 10.0;
}
`;
    //gl_Position 四位，最后一位叫做齐次坐标，用来矩阵相乘用。
    let f_shader = `
void main(){
    gl_FragColor = vec4(1,0,0,.5);
}
`;
    initShaders(webgl, v_shader, f_shader);

    webgl.clearColor(0, 0, 0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);

    let a_position = webgl.getAttribLocation(webgl.program, "a_position");

    for (let i = 0; i < 10; i++) {
        webgl.vertexAttrib3f(a_position, .5, 0.1 * i, 0)
        webgl.drawArrays(webgl.POINT, 0, 1);
    }
}


function changeColor() {
    let v_shader = `
    void main(){
        gl_Position = vec4(0.5,0,0,1);
        gl_PointSize = 10.0;
    }
    `;
    //gl_Position 四位，最后一位叫做齐次坐标，用来矩阵相乘用。
    let f_shader = `
        precision mediump float;
        uniform vec4 u_fragColor;
    void main(){
        gl_FragColor = u_fragColor;
    }
    `;
    initShaders(webgl, v_shader, f_shader);

    webgl.clearColor(0, 0, 0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);

    let u_fragColor = webgl.getUniformLocation(webgl.program, "u_fragColor")
    webgl.uniform4f(u_fragColor, 0, 0, 1, 1);
    webgl.drawArrays(webgl.POINT, 0, 1);
}


drawBufferPoints();

function drawBufferPoints() {
    let v_shader = `
    attribute vec4 a_position;
    uniform float u_cosb,u_sinb;
    void main(){
        gl_Position.x = (a_position).x * u_cosb -(a_position).y*u_sinb;
        gl_Position.y = (a_position).x * u_sinb +(a_position).y*u_cosb;
        gl_Position.z = a_position.z;
        gl_Position.w = a_position.w;
    }
    `;
    //gl_Position 四位，最后一位叫做齐次坐标，用来矩阵相乘用。
    let f_shader = `
        precision mediump float;
        uniform vec4 u_fragColor;
    void main(){
        gl_FragColor = u_fragColor;
    }
    `;
    initShaders(webgl, v_shader, f_shader);

    let n = initBuffer();

    let u_fragColor = webgl.getUniformLocation(webgl.program, "u_fragColor")
    webgl.uniform4f(u_fragColor, 1, 0, 1, 1);

    let tx = .2,ty = .5,tz = 0;
    let u_translation = webgl.getUniformLocation(webgl.program,"u_translation");
    webgl.uniform4f(u_translation,tx,ty,tz,0.0);

    var angle = 90.0;
    var radian = Math.PI * angle / 180.0;//弧度
    var cosb = Math.cos(radian);
    var sinb = Math.sin(radian);

    var u_cosb = webgl.getUniformLocation(webgl.program,'u_cosb');
    var u_sinb = webgl.getUniformLocation(webgl.program,'u_sinb');
    webgl.uniform1f(u_cosb,cosb);
    webgl.uniform1f(u_sinb,sinb);

    webgl.clearColor(0, 0, 0, 1.0);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.drawArrays(webgl.TRIANGLE_FAN, 0, n);
}

function initBuffer() {
    let gl = webgl;
    let vertexs = new Float32Array(
        [.5, .5, .5, -.5, -.5, -.5,
            ]
    );
    let n = vertexs.length / 2;
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
    let a_position = gl.getAttribLocation(gl.program, 'a_position');
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);
    return n;
}


// cuon-utils.js (c) 2012 kanda and matsuda
/**
 * Create a program object and make current
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return true, if the program object was created and successfully made current 
 */
function initShaders(gl, vshader, fshader) {
    var program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log('Failed to create program');
        return false;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
}

/**
 * Create the linked program object
 * @param gl GL context
 * @param vshader a vertex shader program (string)
 * @param fshader a fragment shader program (string)
 * @return created program object, or null if the creation has failed
 */
function createProgram(gl, vshader, fshader) {
    // Create shader object
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    if (!vertexShader || !fragmentShader) {
        return null;
    }

    // Create a program object
    var program = gl.createProgram();
    if (!program) {
        return null;
    }

    // Attach the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Link the program object
    gl.linkProgram(program);

    // Check the result of linking
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}


/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl, type, source) {
    // Create shader object
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log('unable to create shader');
        return null;
    }

    // Set the shader program
    gl.shaderSource(shader, source);

    // Compile the shader
    gl.compileShader(shader);

    // Check the result of compilation
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

/** 
 * Initialize and get the rendering for WebGL
 * @param canvas <cavnas> element
 * @param opt_debug flag to initialize the context for debugging
 * @return the rendering context for WebGL
 */
function getWebGLContext(canvas, opt_debug) {
    // Get the rendering context for WebGL
    var gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) return null;

    // if opt_debug is explicitly false, create the context for debugging
    if (arguments.length < 2 || opt_debug) {
        gl = WebGLDebugUtils.makeDebugContext(gl);
    }

    return gl;
}
