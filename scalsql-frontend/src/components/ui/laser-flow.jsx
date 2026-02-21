import React, { useRef, useEffect } from 'react';

const vertexShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_hOffset;
  uniform float u_vOffset;
  uniform float u_hSize;
  uniform float u_vSize;
  uniform float u_wispDensity;
  uniform float u_wispSpeed;
  uniform float u_wispIntensity;
  uniform float u_flowSpeed;
  uniform float u_flowStrength;
  uniform float u_fogIntensity;
  uniform float u_fogScale;
  uniform float u_fogFall;
  uniform float u_decay;
  uniform float u_falloff;

  // Simplex-style hash
  float hash(vec2 p) {
    p = fract(p * vec2(443.897, 441.423));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;

    float t = u_time;
    vec3 col = vec3(0.0);

    // Horizontal laser beam
    float hBeam = abs(uv.y - (0.5 + u_hOffset));
    float hGlow = exp(-hBeam * 8.0 / u_hSize) * 0.6;
    float hCore = exp(-hBeam * 50.0 / u_hSize) * 1.0;

    // Vertical laser beam
    float vBeam = abs(uv.x - (aspect * 0.5 + u_vOffset));
    float vGlow = exp(-vBeam * 8.0 / u_vSize) * 0.4;
    float vCore = exp(-vBeam * 50.0 / u_vSize) * 0.8;

    // Wisp / Plasma flow
    vec2 flowUV = uv * u_wispDensity;
    flowUV.x += t * u_flowSpeed;
    flowUV.y += sin(t * 0.3) * u_flowStrength;
    float wisp = fbm(flowUV + t * u_wispSpeed * 0.1);
    wisp = pow(wisp, u_decay) * u_wispIntensity;

    // Fog
    float fog = fbm(uv * u_fogScale * 10.0 + vec2(0.0, -t * u_fogFall));
    fog = pow(fog, 1.5) * u_fogIntensity;

    // Compose
    col += u_color * (hGlow + hCore);
    col += u_color * (vGlow + vCore);
    col += u_color * wisp * 0.3;
    col += u_color * fog * 0.2;

    // Radial falloff from center
    vec2 center = vec2(aspect * 0.5, 0.5);
    float dist = length(uv - center);
    float falloff = 1.0 - smoothstep(0.0, u_falloff, dist);
    col *= falloff;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LaserFlow({
  color = '#a855f7',
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  horizontalSizing = 0.5,
  verticalSizing = 1.5,
  wispDensity = 1.5,
  wispSpeed = 12,
  wispIntensity = 4,
  flowSpeed = 0.3,
  flowStrength = 0.2,
  fogIntensity = 0.4,
  fogScale = 0.3,
  fogFallSpeed = 0.5,
  decay = 1.1,
  falloffStart = 1.4,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    // Parse hex color to RGB 0-1
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uni = (name) => gl.getUniformLocation(program, name);
    const uTime = uni('u_time');
    const uRes = uni('u_resolution');
    const uColor = uni('u_color');
    const uHOffset = uni('u_hOffset');
    const uVOffset = uni('u_vOffset');
    const uHSize = uni('u_hSize');
    const uVSize = uni('u_vSize');
    const uWispDensity = uni('u_wispDensity');
    const uWispSpeed = uni('u_wispSpeed');
    const uWispIntensity = uni('u_wispIntensity');
    const uFlowSpeed = uni('u_flowSpeed');
    const uFlowStrength = uni('u_flowStrength');
    const uFogIntensity = uni('u_fogIntensity');
    const uFogScale = uni('u_fogScale');
    const uFogFall = uni('u_fogFall');
    const uDecay = uni('u_decay');
    const uFalloff = uni('u_falloff');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3f(uColor, r, g, b);
      gl.uniform1f(uHOffset, horizontalBeamOffset);
      gl.uniform1f(uVOffset, verticalBeamOffset);
      gl.uniform1f(uHSize, horizontalSizing);
      gl.uniform1f(uVSize, verticalSizing);
      gl.uniform1f(uWispDensity, wispDensity);
      gl.uniform1f(uWispSpeed, wispSpeed);
      gl.uniform1f(uWispIntensity, wispIntensity);
      gl.uniform1f(uFlowSpeed, flowSpeed);
      gl.uniform1f(uFlowStrength, flowStrength);
      gl.uniform1f(uFogIntensity, fogIntensity);
      gl.uniform1f(uFogScale, fogScale);
      gl.uniform1f(uFogFall, fogFallSpeed);
      gl.uniform1f(uDecay, decay);
      gl.uniform1f(uFalloff, falloffStart);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color, horizontalBeamOffset, verticalBeamOffset, horizontalSizing, verticalSizing, wispDensity, wispSpeed, wispIntensity, flowSpeed, flowStrength, fogIntensity, fogScale, fogFallSpeed, decay, falloffStart]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
