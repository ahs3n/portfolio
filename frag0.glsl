#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


vec3 hash( vec3 x )
{
	x = vec3( dot(x,vec3(127.1,311.7, 74.7)),
			  dot(x,vec3(269.5,183.3,246.1)),
			  dot(x,vec3(113.5,271.9,124.6)));

	return fract(sin(x)*43758.5453123);
}

vec3 voronoi( in vec3 x )
{
    vec3 p = floor( x );
    vec3 f = fract( x );

	float id = 0.0;
    vec2 res = vec2( 100.0 );
    for( int k=-1; k<=1; k++ )
    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec3 b = vec3( float(i), float(j), float(k) );
        vec3 r = vec3( b ) - f + hash( p + b );
        float d = dot( r, r );

        if( d < res.x )
        {
			id = dot( p+b, vec3(1.0,57.0,113.0 ) );
            res = vec2( d, res.x );			
        }
        else if( d < res.y )
        {
            res.y = d;
        }
    }

    return vec3( sqrt( res ), abs(id) );
}
    
void main()
{
    vec2 uv = gl_FragCoord.xy/1000.;
    vec3 uv3 = vec3(uv.xy+0.3, u_time*0.01)*2.;
    vec3 col = voronoi(uv3).zzz;    
    col = mix(vec3(1),vec3(0,.2,.5),hash(col).y);

    gl_FragColor = vec4(col,1.0);
}