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
    gl.shaderSource(vshader,v_shader);
    gl.shaderSource(fshader,f_shader);
    gl.compileShader(vshader);
    gl.compileShader(fshader);

    let program = gl.createProgram();
    gl.attachShader(program,vshader);
    gl.attachShader(program,fshader);
    gl.linkProgram(program);
    gl.useProgram(program);
    gl.program = program;
};

function initBuffer(){
    let points = new Float32Array([
        0,.5,
        .5,-.5,
        -.5,-.5
    ]);
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
    let a_position = gl.getAttribLocation(gl.program, 'v_position');
    gl.vertexAttribPointer(a_position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_position);

    return points.length / 2;
}

function rotateMat(){
    let angle = 90;
    let radian = Math.PI * angle / 180;
    let cosb = Math.cos(radian),sinb = Math.sin(radian);
    let matArr = new Float32Array([//旋转矩阵
        cosb,sinb,0,0,
        -sinb,cosb,0,0,
        0,0,1,0,
        0,0,0,1
    ]);
    let xformMat = gl.getUniformLocation(gl.program,'u_xformMatrix');
    gl.uniformMatrix4fv(xformMat, false, matArr);
}
function transMat(){
    let tx = .5,ty = .5,tz = 0;
    let matArr = new Float32Array([//旋转矩阵
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        tx,ty,0,1
    ]);
    let xformMat = gl.getUniformLocation(gl.program,'u_xformMatrix');
    gl.uniformMatrix4fv(xformMat, false, matArr);
}

function scaleMat(){
    let sx = .5,sy =1,sz = 1;
    let matArr = new Float32Array([//旋转矩阵
        sx,0,0,0,
        0,sy,0,0,
        0,0,sz,0,
        0,0,0,1
    ]);
    let xformMat = gl.getUniformLocation(gl.program,'u_xformMatrix');
    gl.uniformMatrix4fv(xformMat, false, matArr);
}

initProgram();
let n = initBuffer();
transMat();
// rotateMat();
// scaleMat();

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);

