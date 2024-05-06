#version 450

layout (location = 1) out VS_OUT
{
  vec2 texCoord;
} vOut;

void main() {
  vec2 xy;
  if (gl_VertexIndex == 0)
  {
	xy = vec2(-1, -1);
  }
  else if (gl_VertexIndex == 1)
  {
	xy = vec2(3, -1);
  }
  else
  {
	xy = vec2(-1, 3);
  }

  gl_Position   = vec4(xy*vec2(1,-1), 0, 1);
  vOut.texCoord = xy / 2 + 0.5;
  vOut.texCoord.y = 1 - vOut.texCoord.y;
}