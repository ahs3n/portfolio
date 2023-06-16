#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

float hash(vec3 p)  // replace this by something better
{
    p  = fract( p*0.3183099+.1 );
	p *= 17.0;
    return fract( p.x*p.y*p.z*(p.x+p.y+p.z) );
}

float simple( in vec3 x )
{
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f*f*(3.0-2.0*f);
	
    return mix(mix(mix( hash(i+vec3(0,0,0)), 
                        hash(i+vec3(1,0,0)),f.x),
                   mix( hash(i+vec3(0,1,0)), 
                        hash(i+vec3(1,1,0)),f.x),f.y),
               mix(mix( hash(i+vec3(0,0,1)), 
                        hash(i+vec3(1,0,1)),f.x),
                   mix( hash(i+vec3(0,1,1)), 
                        hash(i+vec3(1,1,1)),f.x),f.y),f.z);
}
float noise(vec3 x)
{
    vec3 q = 8.0*x;
    float m = 1.0;
    float f  = 0.5000*simple( q ); q = m*q*2.01;
    f += 0.2500*simple( q ); q = m*q*2.02;
    f += 0.1250*simple( q ); q = m*q*2.03;
    f += 0.0625*simple( q ); q = m*q*2.01;
    return f;
}

void main()
{
    vec2 uv = gl_FragCoord.xy/1000.0;
    vec3 uv3 = vec3(uv.xy+0.3, u_time*0.003);
    vec3 col = uv3*noise(uv3*2.0);
    col = uv3*noise(mix(col, uv3, 0.6));

    
    col = 0.2 + 0.7*pal( col.x*3.0, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}