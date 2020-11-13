let canvas = document.getElementById('webgl');
let gl = canvas.getContext('webgl');

let v_shader = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main(){
        gl_Position =  a_Position;
        v_TexCoord = a_TexCoord;
    }
`;
let f_shader = `
#ifdef GL_ES
precision mediump float;
#endif
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    varying vec2 v_TexCoord;
    void main(){
        vec4 color0 = texture2D(u_Sampler0,v_TexCoord);
        vec4 color1 = texture2D(u_Sampler1,v_TexCoord);
        gl_FragColor = color0 * color1;
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
            -0.5, 0.5, 0, 1,
           -0.5, -0.5, 0, 0,
           0.5, 0.5, 1,1,
           0.5, -0.5, 1, 0.0,
    ]);
    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

    let size = points.BYTES_PER_ELEMENT;
    let nodeLen = 4;

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, size*nodeLen, 0);
    gl.enableVertexAttribArray(a_Position);

    let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, size*nodeLen, size*2);
    gl.enableVertexAttribArray(a_TexCoord);

    return points.length / nodeLen;
}

function loadTexture(gl, n, texture, u_Sampler, image,index){
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);//对纹理图像进行y轴反转
    //开启0号纹理单元
    if(index == 0){
        gl.activeTexture(gl.TEXTURE0);
        imgLoaded0 = true;
    }
    else {
        gl.activeTexture(gl.TEXTURE1);
        imgLoaded1 = true;
    }
    //向target绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);

    //配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    //配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    //将0号纹理传递给着色器
    gl.uniform1i(u_Sampler, index);
    
    if(imgLoaded0 && imgLoaded1){
        draw();
    }
}
let imgLoaded0 = false;
let imgLoaded1 = false;
function draw(){
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertex_num);//绘制矩形
}
function initTextures(gl, n) {
    var texture0 = gl.createTexture(); //创建纹理对象
    //获取u_Sampler的存储位置
    var u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
    var image0 = new Image();//创建一个image对象

    //注册图像加载时间的响应函数
    image0.onload = function () {
        loadTexture(gl, n, texture0, u_Sampler0, image0,0);
    };

    //浏览器开始加载图像
    image0.src = './sky.jpg';
    var texture1 = gl.createTexture(); //创建纹理对象
    //获取u_Sampler的存储位置
    var u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
    var image1 = new Image();//创建一个image对象

    //注册图像加载时间的响应函数
    image1.onload = function () {
        loadTexture(gl, n, texture1, u_Sampler1, image1,1);
    };

    //浏览器开始加载图像
    image1.src = './circle.gif';
    return true;
}

initProgram();
let vertex_num = initBuffer();

initTextures(gl,vertex_num);




