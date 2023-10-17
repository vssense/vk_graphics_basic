#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) out vec4 color;

layout (binding = 0) uniform sampler2D colorTex;

layout (location = 0 ) in VS_OUT
{
  vec2 texCoord;
} surf;

void main()
{
  vec4 colors[9] = vec4[9](
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,  0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2(-1,  1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,  0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 0,  1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1, -1)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,  0)),
    textureLodOffset(colorTex, surf.texCoord, 0, ivec2( 1,  1))
  );

  for (int channel = 0; channel < 3; ++channel)
  {
    for (int i = 0; i < 8; ++i)
    {  
      for (int j = i + 1; j < 9; ++j)
      {
        if (colors[j - 1][channel] < colors[j][channel])
        {
          float tmp = colors[j - 1][channel];
          colors[j - 1][channel] = colors[j][channel];
          colors[j][channel] = tmp;
        }
      }
    }
  }

  color = colors[4];
}
