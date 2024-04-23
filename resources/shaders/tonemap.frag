#version 450

layout (binding = 0) uniform sampler2D image;

layout(push_constant) uniform params_t
{
    float gamma;
    float exposure;
    bool  turned_on;
};

layout (location = 0) in vec2 uv;

layout (location = 0) out vec4 out_color;

void main() {
    vec3 hdr = texture(image, uv).rgb;

    if (turned_on) {
        vec3 ldr = vec3(1.0f) - exp(-hdr * exposure);
        out_color = vec4(pow(ldr, vec3(1.0f / gamma)), 1.0f);
    } else {
        out_color = vec4(min(hdr, vec3(1.0f)), 1.0f);
    }
}
