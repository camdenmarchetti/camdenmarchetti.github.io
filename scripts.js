//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

function _argumentsToArray( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

//----------------------------------------------------------------------------

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

function vec2()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    }

    return result.splice( 0, 2 );
}

function vec3()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    }

    return result.splice( 0, 3 );
}

function vec4()
{
    var result = _argumentsToArray( arguments );

    switch ( result.length ) {
    case 0: result.push( 0.0 );
    case 1: result.push( 0.0 );
    case 2: result.push( 0.0 );
    case 3: result.push( 1.0 );
    }

    return result.splice( 0, 4 );
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec2( v[0],  0.0 ),
            vec2(  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec2(v) );  v.splice( 0, 2 );
        m.push( vec2(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat3()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec3( v[0],  0.0,  0.0 ),
            vec3(  0.0, v[0],  0.0 ),
            vec3(  0.0,  0.0, v[0] )
        ];
        break;

    default:
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );  v.splice( 0, 3 );
        m.push( vec3(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------

function mat4()
{
    var v = _argumentsToArray( arguments );

    var m = [];
    switch ( v.length ) {
    case 0:
        v[0] = 1;
    case 1:
        m = [
            vec4( v[0], 0.0,  0.0,   0.0 ),
            vec4( 0.0,  v[0], 0.0,   0.0 ),
            vec4( 0.0,  0.0,  v[0],  0.0 ),
            vec4( 0.0,  0.0,  0.0,  v[0] )
        ];
        break;

    default:
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );  v.splice( 0, 4 );
        m.push( vec4(v) );
        break;
    }

    m.matrix = true;

    return m;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if ( u.length != v.length ) { return false; }

    if ( u.matrix && v.matrix ) {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) { return false; }
            for ( var j = 0; j < u[i].length; ++j ) {
                if ( u[i][j] !== v[i][j] ) { return false; }
            }
        }
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        return false;
    }
    else {
        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i] !== v[i] ) { return false; }
        }
    }

    return true;
}

//----------------------------------------------------------------------------

function add( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "add(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "add(): trying to add matrices of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] + v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "add(): trying to add matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "add(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] + v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function subtract( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "subtract(): trying to subtract matrices" +
                " of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "subtract(): trying to subtact matrices" +
                    " of different dimensions";
            }
            result.push( [] );
            for ( var j = 0; j < u[i].length; ++j ) {
                result[i].push( u[i][j] - v[i][j] );
            }
        }

        result.matrix = true;

        return result;
    }
    else if ( u.matrix && !v.matrix || !u.matrix && v.matrix ) {
        throw "subtact(): trying to subtact  matrix and non-matrix variables";
    }
    else {
        if ( u.length != v.length ) {
            throw "subtract(): vectors are not the same length";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] - v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------

function mult( u, v )
{
    var result = [];

    if ( u.matrix && v.matrix ) {
        if ( u.length != v.length ) {
            throw "mult(): trying to add matrices of different dimensions";
        }

        for ( var i = 0; i < u.length; ++i ) {
            if ( u[i].length != v[i].length ) {
                throw "mult(): trying to add matrices of different dimensions";
            }
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( [] );

            for ( var j = 0; j < v.length; ++j ) {
                var sum = 0.0;
                for ( var k = 0; k < u.length; ++k ) {
                    sum += u[i][k] * v[k][j];
                }
                result[i].push( sum );
            }
        }

        result.matrix = true;

        return result;
    }

      if(u.matrix&& (u.length == v.length)) {
        for(var i = 0; i<v.length; i++) {
          var sum = 0.0;
          for(var j=0; j<v.length; j++) {
            sum += u[i][j]*v[j];
          }
          result.push(sum);
        }
      return result;
      }



    else {
        if ( u.length != v.length ) {
            throw "mult(): vectors are not the same dimension";
        }

        for ( var i = 0; i < u.length; ++i ) {
            result.push( u[i] * v[i] );
        }

        return result;
    }
}

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][3] = x;
    result[1][3] = y;
    result[2][3] = z;

    return result;
}

//----------------------------------------------------------------------------

function rotate( angle, axis )
{
    if ( !Array.isArray(axis) ) {
        axis = [ arguments[1], arguments[2], arguments[3] ];
    }

    var v = normalize( axis );

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos( radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( radians(angle) );

    var result = mat4(
        vec4( x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s, 0.0 ),
        vec4( x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s, 0.0 ),
        vec4( x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c,   0.0 ),
        vec4()
    );

    return result;
}

function rotateX(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var rx = mat4( 1.0,  0.0,  0.0, 0.0,
      0.0,  c,  -s, 0.0,
      0.0, s,  c, 0.0,
      0.0,  0.0,  0.0, 1.0 );
  return rx;
}
function rotateY(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var ry = mat4( c, 0.0, s, 0.0,
      0.0, 1.0,  0.0, 0.0,
      -s, 0.0,  c, 0.0,
      0.0, 0.0,  0.0, 1.0 );
  return ry;
}
function rotateZ(theta) {
  var c = Math.cos( radians(theta) );
  var s = Math.sin( radians(theta) );
  var rz = mat4( c, -s, 0.0, 0.0,
      s,  c, 0.0, 0.0,
      0.0,  0.0, 1.0, 0.0,
      0.0,  0.0, 0.0, 1.0 );
  return rz;
}


//----------------------------------------------------------------------------

function scalem( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0][0] = x;
    result[1][1] = y;
    result[2][2] = z;

    return result;
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt( eye, at, up )
{
    if ( !Array.isArray(eye) || eye.length != 3) {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( !Array.isArray(at) || at.length != 3) {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if ( !Array.isArray(up) || up.length != 3) {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( equal(eye, at) ) {
        return mat4();
    }

    var v = normalize( subtract(at, eye) );  // view direction vector
    var n = normalize( cross(v, up) );       // perpendicular vector
    var u = normalize( cross(n, v) );        // "new" up vector

    v = negate( v );

    var result = mat4(
        vec4( n, -dot(n, eye) ),
        vec4( u, -dot(u, eye) ),
        vec4( v, -dot(v, eye) ),
        vec4()
    );

    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = mat4();
    result[0][0] = 2.0 / w;
    result[1][1] = 2.0 / h;
    result[2][2] = -2.0 / d;
    result[0][3] = -(left + right) / w;
    result[1][3] = -(top + bottom) / h;
    result[2][3] = -(near + far) / d;

    return result;
}

//----------------------------------------------------------------------------

function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = -2 * near * far / d;
    result[3][2] = -1;
    result[3][3] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;

    return result;
}

//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot( u, v )
{
    if ( u.length != v.length ) {
        throw "dot(): vectors are not the same dimension";
    }

    var sum = 0.0;
    for ( var i = 0; i < u.length; ++i ) {
        sum += u[i] * v[i];
    }

    return sum;
}

//----------------------------------------------------------------------------

function negate( u )
{
    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( -u[i] );
    }

    return result;
}

//----------------------------------------------------------------------------

function cross( u, v )
{
    if ( !Array.isArray(u) || u.length < 3 ) {
        throw "cross(): first argument is not a vector of at least 3";
    }

    if ( !Array.isArray(v) || v.length < 3 ) {
        throw "cross(): second argument is not a vector of at least 3";
    }

    var result = [
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    ];

    return result;
}

//----------------------------------------------------------------------------

function length( u )
{
    return Math.sqrt( dot(u, u) );
}

//----------------------------------------------------------------------------

function normalize( u, excludeLastComponent )
{
    if ( excludeLastComponent ) {
        var last = u.pop();
    }

    var len = length( u );

    if ( !isFinite(len) ) {
        throw "normalize: vector " + u + " has zero length";
    }

    for ( var i = 0; i < u.length; ++i ) {
        u[i] /= len;
    }

    if ( excludeLastComponent ) {
        u.push( last );
    }

    return u;
}

//----------------------------------------------------------------------------

function mix( u, v, s )
{
    if ( typeof s !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }

    if ( u.length != v.length ) {
        throw "vector dimension mismatch";
    }

    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( (1.0 - s) * u[i] + s * v[i] );
    }

    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

function scale( s, u )
{
    if ( !Array.isArray(u) ) {
        throw "scale: second parameter " + u + " is not a vector";
    }

    var result = [];
    for ( var i = 0; i < u.length; ++i ) {
        result.push( s * u[i] );
    }

    return result;
}

//----------------------------------------------------------------------------
//
//
//

function flatten( v )
{
    if ( v.matrix === true ) {
        v = transpose( v );
    }

    var n = v.length;
    var elemsAreArrays = false;

    if ( Array.isArray(v[0]) ) {
        elemsAreArrays = true;
        n *= v[0].length;
    }

    var floats = new Float32Array( n );

    if ( elemsAreArrays ) {
        var idx = 0;
        for ( var i = 0; i < v.length; ++i ) {
            for ( var j = 0; j < v[i].length; ++j ) {
                floats[idx++] = v[i][j];
            }
        }
    }
    else {
        for ( var i = 0; i < v.length; ++i ) {
            floats[i] = v[i];
        }
    }

    return floats;
}

//----------------------------------------------------------------------------

var sizeof = {
    'vec2' : new Float32Array( flatten(vec2()) ).byteLength,
    'vec3' : new Float32Array( flatten(vec3()) ).byteLength,
    'vec4' : new Float32Array( flatten(vec4()) ).byteLength,
    'mat2' : new Float32Array( flatten(mat2()) ).byteLength,
    'mat3' : new Float32Array( flatten(mat3()) ).byteLength,
    'mat4' : new Float32Array( flatten(mat4()) ).byteLength
};

// new functions 5/2/2015

// printing

function printm(m)
{
    if(m.length == 2)
    for(var i=0; i<m.length; i++)
       console.log(m[i][0], m[i][1]);
    else if(m.length == 3)
    for(var i=0; i<m.length; i++)
       console.log(m[i][0], m[i][1], m[i][2]);
    else if(m.length == 4)
    for(var i=0; i<m.length; i++)
       console.log(m[i][0], m[i][1], m[i][2], m[i][3]);
}
// determinants

function det2(m)
{

     return m[0][0]*m[1][1]-m[0][1]*m[1][0];

}

function det3(m)
{
     var d = m[0][0]*m[1][1]*m[2][2]
           + m[0][1]*m[1][2]*m[2][0]
           + m[0][2]*m[2][1]*m[1][0]
           - m[2][0]*m[1][1]*m[0][2]
           - m[1][0]*m[0][1]*m[2][2]
           - m[0][0]*m[1][2]*m[2][1]
           ;
     return d;
}

function det4(m)
{
     var m0 = [
         vec3(m[1][1], m[1][2], m[1][3]),
         vec3(m[2][1], m[2][2], m[2][3]),
         vec3(m[3][1], m[3][2], m[3][3])
     ];
     var m1 = [
         vec3(m[1][0], m[1][2], m[1][3]),
         vec3(m[2][0], m[2][2], m[2][3]),
         vec3(m[3][0], m[3][2], m[3][3])
     ];
     var m2 = [
         vec3(m[1][0], m[1][1], m[1][3]),
         vec3(m[2][0], m[2][1], m[2][3]),
         vec3(m[3][0], m[3][1], m[3][3])
     ];
     var m3 = [
         vec3(m[1][0], m[1][1], m[1][2]),
         vec3(m[2][0], m[2][1], m[2][2]),
         vec3(m[3][0], m[3][1], m[3][2])
     ];
     return m[0][0]*det3(m0) - m[0][1]*det3(m1)
         + m[0][2]*det3(m2) - m[0][3]*det3(m3);

}

function det(m)
{
     if(m.matrix != true) console.log("not a matrix");
     if(m.length == 2) return det2(m);
     if(m.length == 3) return det3(m);
     if(m.length == 4) return det4(m);
}

//---------------------------------------------------------

// inverses

function inverse2(m)
{
     var a = mat2();
     var d = det2(m);
     a[0][0] = m[1][1]/d;
     a[0][1] = -m[0][1]/d;
     a[1][0] = -m[1][0]/d;
     a[1][1] = m[0][0]/d;
     a.matrix = true;
     return a;
}

function inverse3(m)
{
    var a = mat3();
    var d = det3(m);

    var a00 = [
       vec2(m[1][1], m[1][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a01 = [
       vec2(m[1][0], m[1][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a02 = [
       vec2(m[1][0], m[1][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a10 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[2][1], m[2][2])
    ];
    var a11 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[2][0], m[2][2])
    ];
    var a12 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[2][0], m[2][1])
    ];
    var a20 = [
       vec2(m[0][1], m[0][2]),
       vec2(m[1][1], m[1][2])
    ];
    var a21 = [
       vec2(m[0][0], m[0][2]),
       vec2(m[1][0], m[1][2])
    ];
    var a22 = [
       vec2(m[0][0], m[0][1]),
       vec2(m[1][0], m[1][1])
    ];

   a[0][0] = det2(a00)/d;
   a[0][1] = -det2(a10)/d;
   a[0][2] = det2(a20)/d;
   a[1][0] = -det2(a01)/d;
   a[1][1] = det2(a11)/d;
   a[1][2] = -det2(a21)/d;
   a[2][0] = det2(a02)/d;
   a[2][1] = -det2(a12)/d;
   a[2][2] = det2(a22)/d;

   return a;

}

function inverse4(m)
{
    var a = mat4();
    var d = det4(m);

    var a00 = [
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a01 = [
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a02 = [
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a03 = [
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a10 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[2][1], m[2][2], m[2][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a11 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[2][0], m[2][2], m[2][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a12 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[2][0], m[2][1], m[2][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a13 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[2][0], m[2][1], m[2][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];
    var a20 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[3][1], m[3][2], m[3][3])
    ];
    var a21 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[3][0], m[3][2], m[3][3])
    ];
    var a22 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[3][0], m[3][1], m[3][3])
    ];
    var a23 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[3][0], m[3][1], m[3][2])
    ];

    var a30 = [
       vec3(m[0][1], m[0][2], m[0][3]),
       vec3(m[1][1], m[1][2], m[1][3]),
       vec3(m[2][1], m[2][2], m[2][3])
    ];
    var a31 = [
       vec3(m[0][0], m[0][2], m[0][3]),
       vec3(m[1][0], m[1][2], m[1][3]),
       vec3(m[2][0], m[2][2], m[2][3])
    ];
    var a32 = [
       vec3(m[0][0], m[0][1], m[0][3]),
       vec3(m[1][0], m[1][1], m[1][3]),
       vec3(m[2][0], m[2][1], m[2][3])
    ];
    var a33 = [
       vec3(m[0][0], m[0][1], m[0][2]),
       vec3(m[1][0], m[1][1], m[1][2]),
       vec3(m[2][0], m[2][1], m[2][2])
    ];



   a[0][0] = det3(a00)/d;
   a[0][1] = -det3(a10)/d;
   a[0][2] = det3(a20)/d;
   a[0][3] = -det3(a30)/d;
   a[1][0] = -det3(a01)/d;
   a[1][1] = det3(a11)/d;
   a[1][2] = -det3(a21)/d;
   a[1][3] = det3(a31)/d;
   a[2][0] = det3(a02)/d;
   a[2][1] = -det3(a12)/d;
   a[2][2] = det3(a22)/d;
   a[2][3] = -det3(a32)/d;
   a[3][0] = -det3(a03)/d;
   a[3][1] = det3(a13)/d;
   a[3][2] = -det3(a23)/d;
   a[3][3] = det3(a33)/d;

   return a;
}
function inverse(m)
{
   if(m.matrix != true) console.log("not a matrix");
   if(m.length == 2) return inverse2(m);
   if(m.length == 3) return inverse3(m);
   if(m.length == 4) return inverse4(m);
}

function normalMatrix(m, flag)
{
    var a = mat4();
    a = inverse(transpose(m));
    if(flag != true) return a;
    else {
    var b = mat3();
    for(var i=0;i<3;i++) for(var j=0; j<3; j++) b[i][j] = a[i][j];
    return b;
    }

}

;/*
 * Copyright 2010, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/**
 * @fileoverview This file contains functions every webgl program will need
 * a version of one way or another.
 *
 * Instead of setting up a context manually it is recommended to
 * use. This will check for success or failure. On failure it
 * will attempt to present an approriate message to the user.
 *
 *       gl = WebGLUtils.setupWebGL(canvas);
 *
 * For animated WebGL apps use of setTimeout or setInterval are
 * discouraged. It is recommended you structure your rendering
 * loop like this.
 *
 *       function render() {
 *         window.requestAnimFrame(render, canvas);
 *
 *         // do rendering
 *         ...
 *       }
 *       render();
 *
 * This will call your rendering function up to the refresh rate
 * of your display but will stop rendering if your app is not
 * visible.
 */

WebGLUtils = function() {

/**
 * Creates the HTLM for a failure message
 * @param {string} canvasContainerId id of container of th
 *        canvas.
 * @return {string} The html.
 */
var makeFailHTML = function(msg) {
  return '' +
    '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
    '<td align="center">' +
    '<div style="display: table-cell; vertical-align: middle;">' +
    '<div style="">' + msg + '</div>' +
    '</div>' +
    '</td></tr></table>';
};

/**
 * Mesasge for getting a webgl browser
 * @type {string}
 */
var GET_A_WEBGL_BROWSER = '' +
  'This page requires a browser that supports WebGL.<br/>' +
  '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';

/**
 * Mesasge for need better hardware
 * @type {string}
 */
var OTHER_PROBLEM = '' +
  "It doesn't appear your computer can support WebGL.<br/>" +
  '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';

/**
 * Creates a webgl context. If creation fails it will
 * change the contents of the container of the <canvas>
 * tag to an error message with the correct links for WebGL.
 * @param {Element} canvas. The canvas element to create a
 *     context from.
 * @param {WebGLContextCreationAttirbutes} opt_attribs Any
 *     creation attributes you want to pass in.
 * @return {WebGLRenderingContext} The created context.
 */
var setupWebGL = function(canvas, opt_attribs) {
  function showLink(str) {
    var container = canvas.parentNode;
    if (container) {
      container.innerHTML = makeFailHTML(str);
    }
  };

  if (!window.WebGLRenderingContext) {
    showLink(GET_A_WEBGL_BROWSER);
    return null;
  }

  var context = create3DContext(canvas, opt_attribs);
  if (!context) {
    showLink(OTHER_PROBLEM);
  }
  return context;
};

/**
 * Creates a webgl context.
 * @param {!Canvas} canvas The canvas tag to get context
 *     from. If one is not passed in one will be created.
 * @return {!WebGLContext} The created context.
 */
var create3DContext = function(canvas, opt_attribs) {
  var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
  var context = null;
  for (var ii = 0; ii < names.length; ++ii) {
    try {
      context = canvas.getContext(names[ii], opt_attribs);
    } catch(e) {}
    if (context) {
      break;
    }
  }
  return context;
}

return {
  create3DContext: create3DContext,
  setupWebGL: setupWebGL
};
}();

/**
 * Provides requestAnimationFrame in a cross browser way.
 */
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
})();



;function loadDocument(path) {
    let request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send();

    if (request.readyState == 4 && request.status == 200) {
        return request.responseText;
    }
    
    return '';
}

;function initShaders(gl, vertexShader, fragmentShader) {
    let program = gl.createProgram();

    if (!vertexShader) {
        return;
    } else {
        let shader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(shader, vertexShader);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return;
        }

        gl.attachShader(program, shader);
    }

    if (!fragmentShader) {
        return;
    } else {
        let shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, fragmentShader);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            return;
        }
        
        gl.attachShader(program, shader);
    }
    
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return;
    }

    return program;
}

;const randColorFunction = (faces, points) => {
  let returnArray = new Array(faces.length);
  for (let x = 0; x < faces.length; x++) {
    returnArray[x] = vec4(Math.random(), Math.random(), Math.random(), 1);
  }

  return returnArray;
}

// Default color function - normal of each surface norm (creates rainbow-ish coloring)
const defaultColorFunction = (faces, points) => {
  let returnArray = new Array(faces.length);
  for (let x = 0; x < faces.length; x += 3) {
    let p0 = 3 * faces[x];
    let p1 = 3 * faces[x + 1];
    let p2 = 3 * faces[x + 2];

    // Get the surface normal (cross 2 edges) and normalize the vector
    let norm = normalize(cross(
      vec3(points[p1] - points[p0], points[p1 + 1] - points[p0 + 1], points[p1 + 2] - points[p0 + 2]),
      vec3(points[p2] - points[p0], points[p2 + 1] - points[p0 + 1], points[p2 + 2] - points[p0 + 2])
    ));

    // Take the absolute value of the normalized vector
    let color = vec4(Math.abs(norm[0]), Math.abs(norm[1]), Math.abs(norm[2]), 1);

    // Apply the color across the vertices of the face
    returnArray[x] = color;
    returnArray[x + 1] = color;
    returnArray[x + 2] = color;
  }

  return returnArray;
}

// Produce a uniform rainbow across the vertices of the shape
const rainbowColorFunction = (a, b) => {
  var returnArray = new Array(b - a);

  // Calculate RGB as a function of an angle.
  // The three sine waves are offset, so when each value is 1, 
  // the other two are 0 which gives the color at each vertex as 
  // if they were circumscribed by a rainbow. 
  // This is seen best with a triangle or a circle.
  let red = (angle) => Math.max(0, Math.sin(radians(angle) + Math.PI / 2));
  let green = (angle) => Math.max(0, Math.sin(radians(angle)));
  let blue = (angle) => Math.max(0, Math.sin(radians(angle) - Math.PI / 2));

  // The smallest sample where these waves meet the above property 
  // is on the domain [ 0, PI ] (inclusive). So take the current index
  // and shift it into this range, then calculate the colors.
  for (let x = a; x < b; x++) {
    let angle = 180 * x / (b - a - 1);
    returnArray[x - a] = new vec4(red(angle), green(angle), blue(angle), 1);
  }

  return returnArray;
}

// Produce a uniform color rainbow across the vertices of the shape 
// which blends back from blue to red to create a color wheel type rainbow
const blendedRainbowColorFunction = (a, b) => {
  var returnArray = new Array(b - a);

  // This took a while to hash out...
  let red = (angle) => Math.sin(3 * radians(angle) / 2 + Math.PI / 2) +
    Math.max(0, -Math.sin(3 * radians(angle) / 2) +
      Math.sin(3 * radians(angle) / 2 - Math.PI / 2));
  let green = (angle) => Math.max(0, Math.sin(3 * radians(angle) / 2));
  let blue = (angle) => Math.max(0, Math.sin(3 * radians(angle) / 2 - Math.PI / 2));

  for (let x = a; x < b; x++) {
    let angle = 180 * x / (b - a - 1);
    returnArray[x - a] = new vec4(red(angle), green(angle), blue(angle), 1);
  }

  return returnArray;
}

// Converts a provided vec4 into a function to
// color vertices of a shape the provided color
const createSolidColorFunction = (color) => {
  return (a, b) => new Array(b - a).fill(color);
}

;const PROJECTIONS = {
  Perspective: 0,
  Parallel: 1
};

const PROJ_NAMES = ["Perspective", "Parallel"];

// Default material properties
const MAT_DEFAULT = {
  ambient: vec4(1.0, 1.0, 1.0, 1.0),
  diffuse: vec4(1.0, 1.0, 1.0, 1.0),
  specular: vec4(1.0, 1.0, 1.0, 1.0),
  shininess: 50.0
};

const up = vec3(0, 1, 0);

const BUNNY = parseSMF(loadDocument('../assets/smf/bunny.smf'));
const CUBE = parseSMF(loadDocument('../assets/smf/cube.smf'));
const FISH = parseSMF(loadDocument('../assets/smf/fish.smf'));
const SPHERE = parseSMF(loadDocument('../assets/smf/sphere.smf'));
const TEAPOT = parseSMF(loadDocument('../assets/smf/teapot.smf'));

const VERT_SHADER_BASIC = loadDocument('../assets/shaders/basic.vertex');
const VERT_SHADER_PHONG = loadDocument('../assets/shaders/phong.vertex');
const VERT_SHADER_GOURAUD = loadDocument('../assets/shaders/gouraud.vertex');

const FRAG_SHADER_BASIC = loadDocument('../assets/shaders/basic.fragment');
const FRAG_SHADER_PHONG = loadDocument('../assets/shaders/phong.fragment');
const FRAG_SHADER_GOURAUD = loadDocument('../assets/shaders/gouraud.fragment');

;var webgl_webgl;

function parseSMF(fileData) {
  let returnData = [];

  fileData.match(/[^\r\n]+/g).forEach(line => {
    let chunked = line.split(',');
    returnData.push(chunked[0]);
    returnData.push(+chunked[1]);
    returnData.push(+chunked[2]);
    returnData.push(+chunked[3]);
  });

  return returnData;
}

function createCanvas1() {
  if (webgl_webgl) webgl_webgl.cleanup(webgl_webgl);
  
  webgl_webgl = StandardWebGL(document.getElementById("gl-canvas"));
  webgl_webgl.UseBasic(webgl_webgl);
  webgl_webgl.fieldDepth = [-0.4, 0.7, -0.4, 0.4, -1, 1];

  let pentagon = createPentagon(-0.3, -0.3, 0.3, -0.3, 0.6, 0.0, 0.3, 0.3, -0.3, 0.3,
    createSolidColorFunction(vec4(1.0, 0.0, 0.0, 1.0)));
  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, pentagon);

  renderShapes(webgl_webgl);
}

function createCanvas2() {
  if (webgl_webgl) webgl_webgl.cleanup(webgl_webgl);
  
  webgl_webgl = StandardWebGL(document.getElementById("gl-canvas"));
  webgl_webgl.UseBasic(webgl_webgl);
  webgl_webgl.fieldDepth = 1.25;

  let colorRed = createSolidColorFunction(new vec4(1, 0, 0, 1));
  let colorWhite = createSolidColorFunction(new vec4(1, 1, 1, 1));
  let colorBlack = createSolidColorFunction(new vec4(0, 0, 0, 1));

  // Create squares
  let sqCent = [0.0, -0.3];
  for (let sqID = 6; sqID > 0; sqID--) {
    let delta = 0.1 * sqID;

    let x0 = sqCent[0] - delta;
    let x1 = sqCent[0] + delta;
    let y0 = sqCent[1] - delta;
    let y1 = sqCent[1] + delta;

    if (sqID % 2 == 0) {
      webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createSquare(x0, y0, x1, y1, colorWhite));
    } else {
      webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createSquare(x0, y0, x1, y1, colorBlack));
    }
  }

  // Create multi-color circle
  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createEllipse(0.6, 0.7, 0.2, 0.2,
    (a, b) => {
      var returnArray = new Array(b - a);

      for (let x = a; x < b; x++) {
        returnArray[x] = new vec4(x / (b - a), 0, 0, 1);
      }

      return returnArray;
    }));

  // Create red ellipse
  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createEllipse(-0.6, 0.625, 0.2, 0.12, colorRed));

  // Create rainbow triangle
  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createTriangle(0.0, 1.0, -0.3, 0.5, 0.3, 0.5, rainbowColorFunction));

  renderShapes(webgl_webgl);
}

function createCanvas3() {
  if (webgl_webgl) webgl_webgl.cleanup(webgl_webgl);
  
  webgl_webgl = StandardWebGL(document.getElementById("gl-canvas"));
  webgl_webgl.UseBasic(webgl_webgl);
  webgl_webgl.rot[0] = 45;
  webgl_webgl.height = 0.5;

  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createMesh(CUBE, (a, b) => [
    vec4(1.0, 0.0, 0.0, 1.0), // Red
    vec4(1.0, 1.0, 0.0, 1.0), // Yellow
    vec4(1.0, 1.0, 1.0, 1.0), // White
    vec4(1.0, 0.0, 1.0, 1.0), // Magenta
    vec4(0.0, 0.0, 0.0, 1.0), // Black
    vec4(0.0, 0.0, 1.0, 1.0), // Blue
    vec4(0.0, 1.0, 1.0, 1.0), // Cyan
    vec4(0.0, 1.0, 0.0, 1.0), // Green
  ]));
  renderShapes(webgl_webgl);
}

function createCanvas4() {
  if (webgl_webgl) webgl_webgl.cleanup(webgl_webgl);
  
  webgl_webgl = StandardWebGL(document.getElementById("gl-canvas"));
  webgl_webgl.UseBasic(webgl_webgl);
  
  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createMeshUniqueVertices(BUNNY, null));
  renderShapes(webgl_webgl);
}

function createCanvas5() {
  if (webgl_webgl) webgl_webgl.cleanup(webgl_webgl);
  
  webgl_webgl = StandardWebGL(document.getElementById("gl-canvas"));
  webgl_webgl.UsePhong(webgl_webgl);

  webgl_webgl.shapes.push.apply(webgl_webgl.shapes, createMeshUniqueVertices(TEAPOT, null));
  renderShapes(webgl_webgl);
}


function roundToFixed(val, len) {
  return parseFloat((Math.round(val * Math.pow(10, len)) / Math.pow(10, len)).toFixed(len));
}

function changeModel() {
  let element = document.getElementById("modelSelection");
  let value = element.options[element.selectedIndex].value.toUpperCase();

  if (CurrentModel == value) return;

  if (value == "BUNNY") {
    webgl_webgl.shapes = createMeshUniqueVertices(BUNNY, null);
  } else if (value == "CUBE") {
    webgl_webgl.shapes = createMeshUniqueVertices(CUBE, null);
  } else if (value == "FISH") {
    webgl_webgl.shapes = createMeshUniqueVertices(FISH, null);
  } else if (value == "SPHERE") {
    webgl_webgl.shapes = createMeshUniqueVertices(SPHERE, null);
  } else if (value == "TEAPOT") {
    webgl_webgl.shapes = createMeshUniqueVertices(TEAPOT, null);
  }

  changeMaterial();

  CurrentModel = value;
  webgl_webgl.changed = true;
}

function changeMaterial() {
  let element = document.getElementById("materialSelection");
  let value = element.options[element.selectedIndex].value.toUpperCase();

  let selected = MAT_DEFAULT;
  if (value == 'GOLD') {
    selected = {
      ambient: vec4(218.0 / 255.0, 165.0 / 255.0, 32.0 / 255.0, 1.0),
      diffuse: vec4(1.0, 215.0 / 255.0, 0.0, 1.0),
      specular: vec4(238.0 / 255.0, 232.0 / 255.0, 170.0 / 255.0, 1.0),
      shininess: 5.0
    };
  } else if (value == 'COAL') {
    selected = {
      ambient: vec4(0.1, 0.1, 0.1, 1.0),
      diffuse: vec4(0.3, 0.3, 0.3, 1.0),
      specular: vec4(0.1, 0.1, 0.1, 1.0),
      shininess: 10000.0
    };
  } else if (value == 'POLISHEDSILVER') {
    selected = {
      ambient: vec4(169.0 / 255.0, 169.0 / 255.0, 169.0 / 255.0, 1.0),
      diffuse: vec4(192.0 / 255.0, 192.0 / 255.0, 192.0 / 255.0, 1.0),
      specular: vec4(211.0 / 255.0, 211.0 / 255.0, 211.0 / 255.0, 1.0),
      shininess: 20.0
    };
  } else if (value == 'REDSHINY') {
    selected = {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    };
  } else {
    return;
  }

  webgl_webgl.shapes.forEach(shape => {
    shape.material = selected;
  });
  webgl_webgl.changed = true;
}

function updateLightDirectedVal() {
  let checked = document.getElementById("directedLight").checked;
  webgl_webgl.light.directed = checked;
  document.getElementById("directedLabel").innerHTML = checked ? 'On  ' : 'Off  ';
  webgl_webgl.changed = true;
}

;function applyLightData(webgl, light) {
  if (webgl.attributes.simple) return;

  // Apply the properties for the light source to the scene

  let vecAmbient = webgl.attributes.vecAmbientL;
  let vecDiffuse = webgl.attributes.vecDiffuseL;
  let vecSpecular = webgl.attributes.vecSpecularL;
  let vecLight = webgl.attributes.vecLight;

  webgl.gl.uniform4fv(vecAmbient, flatten(light.ambient));
  webgl.gl.uniform4fv(vecDiffuse, flatten(light.diffuse));
  webgl.gl.uniform4fv(vecSpecular, flatten(light.specular));
  webgl.gl.uniform4fv(vecLight, flatten(light.source));
}

function applyMaterialData(webgl, material) {
  if (webgl.attributes.simple) return;

  // Apply the properties of the material to the scene 
  // (Allows multiple materials to be rendered in the same scene if needed)

  let vecAmbient = webgl.attributes.vecAmbientM;
  let vecDiffuse = webgl.attributes.vecDiffuseM;
  let vecSpecular = webgl.attributes.vecSpecularM;
  let floatShininess = webgl.attributes.floatShininess;

  if (material != null) {
    webgl.gl.uniform4fv(vecAmbient, flatten(material.ambient));
    webgl.gl.uniform4fv(vecDiffuse, flatten(material.diffuse));
    webgl.gl.uniform4fv(vecSpecular, flatten(material.specular));
    webgl.gl.uniform1f(floatShininess, material.shininess);
  } else {
    // Use default material
    webgl.gl.uniform4fv(vecAmbient, flatten(MAT_DEFAULT.ambient));
    webgl.gl.uniform4fv(vecDiffuse, flatten(MAT_DEFAULT.diffuse));
    webgl.gl.uniform4fv(vecSpecular, flatten(MAT_DEFAULT.specular));
    webgl.gl.uniform1f(floatShininess, MAT_DEFAULT.shininess);
  }
}

// Render the shapes provided using the attributes. 
function renderShapes(webgl) {
  let bufferData = [];
  let chunkData = [];

  // All rendering is done in chunks with a shape in each chunk.
  // If a shape is too large, it will be split across multiple chunks
  // but each chunk can only contain data for a single shape
  function setupRenderChunks() {
    chunkData = [];

    webgl.shapes.forEach(Shape => {
      // Chunk data: size of chunk, shape points, colors, normals, indices, and material data
      let chunkNode = {
        size: 0,
        points: [],
        colors: [],
        normals: [],
        indices: [],
        material: null
      };

      Shape.points.forEach(point => chunkNode.points.push(point));
      Shape.colors.forEach(color => chunkNode.colors.push(color));
      Shape.normals.forEach(normal => chunkNode.normals.push(normal));
      Shape.indices.forEach(index => chunkNode.indices.push(index));
      chunkNode.material = Shape.material;

      chunkNode.size = chunkNode.indices.length;
      chunkData.push(chunkNode);
    });

    // Setup the data to render
    webgl.bufferData = setupAttributeBuffers(webgl, chunkData[0]);
    webgl.bufferData.prepMultiBuffer(chunkData[0]);
    applyMaterialData(webgl, chunkData[0].material);

    // Delete buffers if they already exist
    if ((bufferData || []).length > 0) {
      bufferData.disablePos();
      bufferData.disableNorm();
      bufferData.disableColor();
      bufferData.deleteBuffers();
    }

    // Update the buffer data reference
    bufferData = webgl.bufferData;
  }

  function animate(time) {

    if (webgl.attributes == null) {
      return;
    }

    // Update the render chunks if there has been a major property change
    // (caused by shape changes, rendering program changes, etc)
    if (webgl.changed) {
      webgl.changed = false;
      setupRenderChunks();
    }

    webgl.gl.clear(webgl.gl.COLOR_BUFFER_BIT | webgl.gl.DEPTH_BUFFER_BIT);

    let fieldDepths = null;

    // Ensure the current WebGL configuration includes field depths, 
    // or default to a bounding box of +/- 1 in all directions. 
    // Possible field depths are single integer values, 3-length, 
    // or 6-length arrays. 
    // Single ints will be +/- the value in all directions.
    // 3-length arrays will be +/- the respective X, Y, and Z values.
    if (!webgl.fieldDepth)
      fieldDepths = [-1, 1, -1, 1, -1, 1];
    else if (webgl.fieldDepth.constructor === Array)
      if (webgl.fieldDepth.length == 3) {
        let depthX = Math.abs(webgl.fieldDepth[0]);
        let depthY = Math.abs(webgl.fieldDepth[1]);
        let depthZ = Math.abs(webgl.fieldDepth[2]);
        fieldDepths = [-depthX, depthX, -depthY, depthY, -depthZ, depthZ];
      } else
        fieldDepths = webgl.fieldDepth;
    else {
      let depth = Math.abs(webgl.fieldDepth);
      fieldDepths = [-depth, depth, -depth, depth, -depth, depth];
    }

    // Calculate the height of the camera in a better way than last assignment
    // This simplifies the eye math, as y will be the percentage of the X and Z
    // components to use, allowing height to represent the actual height of the eye
    let y = Math.sin(Math.PI / (2 * webgl.radius) * (Math.abs(webgl.height) + webgl.radius));
    let yLight = Math.sin(Math.PI / (2 * webgl.light.radius) * (Math.abs(webgl.light.height) + webgl.light.radius));

    // Calculate location of eye
    let eye = vec3(
      y * webgl.radius * Math.sin(radians(webgl.rot[0])),
      webgl.height,
      y * webgl.radius * Math.cos(radians(webgl.rot[0])));

    webgl.light.source = vec3(
      yLight * webgl.light.radius * Math.sin(radians(webgl.light.rot[0])),
      webgl.light.height,
      yLight * webgl.light.radius * Math.cos(radians(webgl.light.rot[0])));

    webgl.light.source = vec4(webgl.light.source, webgl.light.directed ? 1.0 : 0.0);

    let viewMatrix = lookAt(eye, webgl.center, up);
    let projMatrix = null;

    // If the projection is parallel default to orthographic, otherwise use perspective
    if (webgl.projection == PROJECTIONS.Parallel) {
      projMatrix = ortho(fieldDepths[0], fieldDepths[1], fieldDepths[2], fieldDepths[3], fieldDepths[4], fieldDepths[5]);
    } else {
      projMatrix = perspective(webgl.fov, webgl.aspect, fieldDepths[4], fieldDepths[5]);
    }

    // Stage the matrix translations for the shader
    webgl.gl.uniformMatrix4fv(webgl.attributes.matrixView, false, flatten(viewMatrix));

    if (!webgl.attributes.simple) {
      webgl.gl.uniformMatrix3fv(webgl.attributes.matrixNormal, false, flatten(
        [normalize(viewMatrix[0].slice(0, 3)),
          normalize(viewMatrix[1].slice(0, 3)),
          normalize(viewMatrix[2].slice(0, 3))
        ]));
    }
    webgl.gl.uniformMatrix4fv(webgl.attributes.matrixProject, false, flatten(projMatrix));
    applyLightData(webgl, webgl.light);

    chunkData.forEach(chunk => {
      // Heuristic improvement. Don't re-bind the same data if there's only one chunk
      if (chunkData.length > 1) {
        bufferData.prepMultiBuffer(chunk);
        applyMaterialData(webgl, chunk.material);
      }

      webgl.gl.drawElements(webgl.gl.TRIANGLES, chunk.size, webgl.gl.UNSIGNED_SHORT, 0);
    })

    // Request another animation frame
    window.requestAnimationFrame(animate);
  }

  setupRenderChunks();
  animate(0);
}

;// Standard webgl setup
function StandardWebGL(canvas) {
  var gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  // Initialize both shader programs
  var gouraud = initShaders(gl, VERT_SHADER_GOURAUD, FRAG_SHADER_GOURAUD);
  var phong = initShaders(gl, VERT_SHADER_PHONG, FRAG_SHADER_PHONG);
  var basic = initShaders(gl, VERT_SHADER_BASIC, FRAG_SHADER_BASIC);

  // Initialize both programs' attributes
  var attributesGouraud = getProgramAttributesComplex(gl, gouraud);
  var attributesPhong = getProgramAttributesComplex(gl, phong);
  var attributesBasic = getProgramAttributesBasic(gl, basic);

  gl.useProgram(gouraud);

  // Objects should be passed by reference allowing later
  // updates to the properties of the WebGL instance to 
  // make changing the projection configuration easier
  return {
    // Shader/program data:
    gl: gl,
    program: gouraud,
    programName: 'Gouraud',
    attributes: attributesGouraud,
    shapes: [],
    changed: false,
    fieldDepth: 2,
    fov: 45,
    aspect: canvas.width / canvas.height,
    projection: PROJECTIONS.Parallel,
    rot: [0, 0, 0],
    height: 0,
    radius: 1,
    center: vec3(0, 0, 0),
    light: {
      ambient: vec4(0.2, 0.2, 0.2, 1.0),
      diffuse: vec4(0.6, 0.6, 0.6, 1.0),
      specular: vec4(1.0, 1.0, 1.0, 1.0),
      source: vec4(0.0, 0.0, 0.0, 0.0),
      rot: [0, 0, 0],
      height: 0,
      radius: 1,
      directed: false
    },
    bufferData: null,
    cleanup: (webgl) => {
        if (webgl.bufferData != null) {
            webgl.bufferData.disablePos();
            webgl.bufferData.disableNorm();
            webgl.bufferData.disableColor();
            webgl.bufferData.deleteBuffers();
        }

        webgl.attributes = null;
        webgl.bufferData = null;
    },
    UseGouraud: (webgl) => {
      // Currently using this shader or the buffer data is missing. Can't update
      if (webgl.programName == 'Gouraud') {
        return;
      }

      // Update program data and attributes
      webgl.programName = 'Gouraud';
      webgl.gl.useProgram(gouraud);
      webgl.attributes = attributesGouraud;

      // Update the buffers
      if (webgl.bufferData != null) webgl.bufferData.updateProgram();

      // Tell the animate function to re-buffer the data for the shapes
      webgl.changed = true;
    },
    UsePhong: (webgl) => {
      // See comments in UseGouraud

      if (webgl.programName == 'Phong') {
        return;
      }

      webgl.programName = 'Phong';
      webgl.gl.useProgram(phong);
      webgl.attributes = attributesPhong;
      if (webgl.bufferData != null) webgl.bufferData.updateProgram();
      webgl.changed = true;
    },
    UseBasic: (webgl) => {
      // See comments in UseGouraud

      if (webgl.programName == 'Basic') {
        return;
      }
      
      webgl.programName = 'Basic';
      webgl.gl.useProgram(basic);
      webgl.attributes = attributesBasic;
      if (webgl.bufferData != null) webgl.bufferData.updateProgram();
      webgl.changed = true;
    },
  };
}

// Get vertex position and normal attributes, plus 
// material and lighting uniforms for a provided program
function getProgramAttributesComplex(gl, program) {
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  var vNormal = gl.getAttribLocation(program, 'vNormal');

  var uModel = gl.getUniformLocation(program, 'uModel');
  var uNormal = gl.getUniformLocation(program, 'uNormal');
  var uProject = gl.getUniformLocation(program, 'uProject');

  // Light properties
  var uLightAmbient = gl.getUniformLocation(program, 'uLightAmbient');
  var uLightDiffuse = gl.getUniformLocation(program, 'uLightDiffuse');
  var uLightSpecular = gl.getUniformLocation(program, 'uLightSpecular');
  var uLightPos = gl.getUniformLocation(program, 'uLightPos');

  // Material properties
  var uMatAmbient = gl.getUniformLocation(program, 'uMaterialAmbient');
  var uMatDiffuse = gl.getUniformLocation(program, 'uMaterialDiffuse');
  var uMatSpecular = gl.getUniformLocation(program, 'uMaterialSpecular');

  var uShiny = gl.getUniformLocation(program, 'uShiny');

  return {
    positionAttribute: vPosition,
    normalAttribute: vNormal,

    matrixView: uModel,
    matrixNormal: uNormal,
    matrixProject: uProject,

    vecAmbientL: uLightAmbient,
    vecDiffuseL: uLightDiffuse,
    vecSpecularL: uLightSpecular,
    vecLight: uLightPos,

    vecAmbientM: uMatAmbient,
    vecDiffuseM: uMatDiffuse,
    vecSpecularM: uMatSpecular,
    floatShininess: uShiny,

    simple: false
  };
}

// Get color and vertex position attributes 
// for a provided program
function getProgramAttributesBasic(gl, program) {
  var vPosition = gl.getAttribLocation(program, 'vPosition');
  var vColor = gl.getAttribLocation(program, 'vColor');

  var uModel = gl.getUniformLocation(program, 'uModel');
  var uProject = gl.getUniformLocation(program, 'uProject');

  return {
    positionAttribute: vPosition,
    colorAttribute: vColor,

    matrixView: uModel,
    matrixProject: uProject,

    simple: true
  };
}

// Setup buffers for vertices and indices
function setupAttributeBuffers(webgl, chunk) {
  var posBuffer = null;
  var normBuffer = null;
  var colorBuffer = null;
  var indexBuffer = null;

  var posAttribute = null;
  var normAttribute = null;
  var colorAttribute = null;

  // Position buffer bind and fill:
  posBuffer = webgl.gl.createBuffer();
  posAttribute = webgl.attributes.positionAttribute;
  webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, posBuffer);
  webgl.gl.bufferData(webgl.gl.ARRAY_BUFFER, flatten(chunk.points), webgl.gl.STATIC_DRAW);
  webgl.gl.vertexAttribPointer(posAttribute, 3, webgl.gl.FLOAT, false, 0, 0);
  webgl.gl.enableVertexAttribArray(posAttribute);

  if (webgl.attributes.simple) {
    // Color buffer bind and fill:
    colorBuffer = webgl.gl.createBuffer();
    colorAttribute = webgl.attributes.normalAttribute;
    webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, colorBuffer);
    webgl.gl.bufferData(webgl.gl.ARRAY_BUFFER, flatten(chunk.normals), webgl.gl.STATIC_DRAW);
    webgl.gl.vertexAttribPointer(colorAttribute, 4, webgl.gl.FLOAT, false, 0, 0);
    webgl.gl.enableVertexAttribArray(colorAttribute);
  } else {
    // Normal buffer bind and fill:
    normBuffer = webgl.gl.createBuffer();
    normAttribute = webgl.attributes.normalAttribute;
    webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, normBuffer);
    webgl.gl.bufferData(webgl.gl.ARRAY_BUFFER, flatten(chunk.normals), webgl.gl.STATIC_DRAW);
    webgl.gl.vertexAttribPointer(normAttribute, 3, webgl.gl.FLOAT, false, 0, 0);
    webgl.gl.enableVertexAttribArray(normAttribute);
  }

  // Index buffer bind and fill:
  indexBuffer = webgl.gl.createBuffer();
  webgl.gl.bindBuffer(webgl.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  webgl.gl.bufferData(webgl.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(chunk.indices), webgl.gl.DYNAMIC_DRAW);

  // Surprisingly JavaScript can maintain the references to the buffer 
  // variables when the prepMultiBuffer function call updates them. Cool.
  return {
    disablePos: () => posAttribute != null ? webgl.gl.disableVertexAttribArray(posAttribute) : (() => {})(),
    disableNorm: () => normAttribute != null ? webgl.gl.disableVertexAttribArray(normAttribute) : (() => {})(),
    disableColor: () => colorAttribute != null ? webgl.gl.disableVertexAttribArray(colorAttribute) : (() => {})(),
    prepMultiBuffer: (multiData) => {
      webgl.gl.deleteBuffer(posBuffer);

      // Position buffer bind and fill:
      posBuffer = webgl.gl.createBuffer();
      posAttribute = webgl.attributes.positionAttribute;
      webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, posBuffer);
      webgl.gl.bufferData(webgl.gl.ARRAY_BUFFER, flatten(multiData.points), webgl.gl.STATIC_DRAW);
      webgl.gl.vertexAttribPointer(posAttribute, 3, webgl.gl.FLOAT, false, 0, 0);
      webgl.gl.enableVertexAttribArray(posAttribute);

      if (webgl.attributes.simple) {
        // Normal buffer bind and fill:
        colorBuffer = webgl.gl.createBuffer();
        colorAttribute = webgl.attributes.colorAttribute;
        webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, colorBuffer);
        webgl.gl.bufferData(webgl.gl.ARRAY_BUFFER, flatten(multiData.colors), webgl.gl.STATIC_DRAW);
        webgl.gl.vertexAttribPointer(colorAttribute, 4, webgl.gl.FLOAT, false, 0, 0);
        webgl.gl.enableVertexAttribArray(colorAttribute);
      } else {
        // Normal buffer bind and fill:
        normBuffer = webgl.gl.createBuffer();
        normAttribute = webgl.attributes.normalAttribute;
        webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, normBuffer);
        webgl.gl.bufferData(webgl.gl.ARRAY_BUFFER, flatten(multiData.normals), webgl.gl.STATIC_DRAW);
        webgl.gl.vertexAttribPointer(normAttribute, 3, webgl.gl.FLOAT, false, 0, 0);
        webgl.gl.enableVertexAttribArray(normAttribute);
      }

      // Fix the index buffer
      webgl.gl.bufferData(webgl.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(multiData.indices), webgl.gl.DYNAMIC_DRAW);
    },
    deleteBuffers: () => {
      // Clean up buffers
      webgl.gl.deleteBuffer(posBuffer);

      if (webgl.attributes.simple) {
        webgl.gl.deleteBuffer(colorBuffer);
      } else {
        webgl.gl.deleteBuffer(normBuffer);
      }

      webgl.gl.deleteBuffer(indexBuffer);
    },
    updateProgram: () => {
      /* This will not rebind data!!  */

      // Create a new position buffer
      let upd_posBuffer = webgl.gl.createBuffer();
      posAttribute = webgl.attributes.positionAttribute;
      webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, upd_posBuffer);
      webgl.gl.vertexAttribPointer(posAttribute, 3, webgl.gl.FLOAT, false, 0, 0);
      webgl.gl.enableVertexAttribArray(posAttribute);

      let upd_normBuffer = null;
      let upd_colorBuffer = null;
      if (webgl.attributes.simple) {
        // Create a new color buffer
        upd_colorBuffer = webgl.gl.createBuffer();
        colorAttribute = webgl.attributes.colorAttribute;
        webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, upd_colorBuffer);
        webgl.gl.vertexAttribPointer(colorAttribute, 4, webgl.gl.FLOAT, false, 0, 0);
        webgl.gl.enableVertexAttribArray(colorAttribute);
      } else {
        // Create a new normal buffer
        upd_normBuffer = webgl.gl.createBuffer();
        normAttribute = webgl.attributes.normalAttribute;
        webgl.gl.bindBuffer(webgl.gl.ARRAY_BUFFER, upd_normBuffer);
        webgl.gl.vertexAttribPointer(normAttribute, 3, webgl.gl.FLOAT, false, 0, 0);
        webgl.gl.enableVertexAttribArray(normAttribute);
      }

      // Create a new index buffer
      let upd_indexBuffer = webgl.gl.createBuffer();
      webgl.gl.bindBuffer(webgl.gl.ELEMENT_ARRAY_BUFFER, upd_indexBuffer);

      // Remove old buffers
      webgl.gl.deleteBuffer(posBuffer);
      if (normBuffer != null) webgl.gl.deleteBuffer(normBuffer);
      if (colorBuffer != null) webgl.gl.deleteBuffer(colorBuffer);
      webgl.gl.deleteBuffer(indexBuffer);

      // Update buffer variables so other functions don't break
      indexBuffer = upd_indexBuffer;
      colorBuffer = upd_colorBuffer;
      normBuffer = upd_normBuffer;
      posBuffer = upd_posBuffer;
    }
  };
}

;// Create a basic mesh with the provided data. Vertices may be shared.
function createMesh(smfData, colorFunction) {
  let points = [];
  let norms = [];
  let indices = [];
  let avg = [0, 0, 0];
  let center = null;
  let pointCount = 0;
  let maxIndex = 0;

  for (var i = 0; i < smfData.length; i += 4) {
    if (smfData[i] == 'v') {
      let point = new vec3(smfData.slice(i + 1, i + 4));
      points.push.apply(points, point);
      norms.push.apply(norms, normalize(point));

      avg[0] += smfData[i + 1];
      avg[1] += smfData[i + 2];
      avg[2] += smfData[i + 3];

      pointCount++;
    } else if (smfData[i] == 'f') {
      indices.push(smfData[i + 1]);
      indices.push(smfData[i + 2]);
      indices.push(smfData[i + 3]);
      if (smfData[i + 1] > maxIndex) maxIndex = smfData[i + 1];
      if (smfData[i + 2] > maxIndex) maxIndex = smfData[i + 2];
      if (smfData[i + 3] > maxIndex) maxIndex = smfData[i + 3];
    } else if (smfData[i] == 'c') {
      center = [smfData[i + 1], smfData[i + 2], smfData[i + 3]];
    }
  }

  if (!indices.includes(0) && maxIndex > points.length / 3 - 1) {
    for (let x = 0; x < indices.length; x++) {
      indices[x] = indices[x] - 1;
    }
  }

  if (indices.length > 2 ** 16 - 1) {
    return _breakShape(points, indices, colorFunction);
  }

  avg[0] /= pointCount;
  avg[1] /= pointCount;
  avg[2] /= pointCount;

  return [{
    points: points,
    colors: (colorFunction || defaultColorFunction).apply(this, [indices, points]),
    normals: norms,
    indices: indices,
    center: avg,
    boundingCenter: center,
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

// Duplicate any shared vertices in the mesh to allow 
// face-specific coloring without any fragment blending
function createMeshUniqueVertices(smfData, colorFunction) {

  let smfPoints = [];
  let smfIndices = [];
  let points = [];
  let norms = [];
  let indices = [];
  let avg = [0, 0, 0];
  let center = null;
  let pointCount = 0;
  let maxIndex = 0;

  // Initial process of smf data
  for (var i = 0; i < smfData.length; i += 4) {
    if (smfData[i] == 'v') {
      smfPoints.push.apply(smfPoints, new vec3(smfData.slice(i + 1, i + 4)));
      avg[0] += smfData[i + 1];
      avg[1] += smfData[i + 2];
      avg[2] += smfData[i + 3];
      pointCount++;
    } else if (smfData[i] == 'f') {
      smfIndices.push.apply(smfIndices, smfData.slice(i + 1, i + 4));
      if (smfData[i + 1] > maxIndex) maxIndex = smfData[i + 1];
      if (smfData[i + 2] > maxIndex) maxIndex = smfData[i + 2];
      if (smfData[i + 3] > maxIndex) maxIndex = smfData[i + 3];
    } else if (smfData[i] == 'c') {
      center = [smfData[i + 1], smfData[i + 2], smfData[i + 3]];
    }
  }

  if (!smfIndices.includes(0) && maxIndex > smfPoints.length / 3 - 1) {
    for (let x = 0; x < smfIndices.length; x++) {
      smfIndices[x] = smfIndices[x] - 1;
    }
  }

  if (smfIndices.length > 2 ** 16 - 1) {
    return _breakShape(smfPoints, smfIndices, colorFunction);
  }

  // Reprocess to ensure no faces share a vertex (to allow coloring)
  smfIndices.forEach(index => {
    let point = new vec3(smfPoints.slice(3 * index, 3 * index + 3));
    points.push.apply(points, point);
    norms.push.apply(norms, normalize(point));
    indices.push(indices.length);
  });

  avg[0] /= pointCount;
  avg[1] /= pointCount;
  avg[2] /= pointCount;

  return [{
    points: points,
    colors: (colorFunction || defaultColorFunction).apply(this, [indices, points]),
    normals: norms,
    indices: indices,
    center: avg,
    boundingCenter: center,
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

// Split a shape into multiple smaller components 
// to allow for rendering of multi-part meshes 
function _breakShape(points, indices, colorFunction) {
  let sizes = [];
  let shapes = [];
  let limit = 2 ** 15 - 2;

  let counter = indices.length;
  while (counter > limit) {
    sizes.push(limit);
    counter -= limit;
  }
  if (counter > 0) sizes.push(counter);

  counter = 0;

  // Break each sub-shape and track it individually 
  sizes.forEach(size => {
    let avg = [0, 0, 0];
    let shapePoints = [];
    let shapeIndices = [];
    let shapeNorms = [];

    indices.slice(counter, counter + size).forEach(index => {
      let point = new vec3(points.slice(3 * index, 3 * index + 3));
      shapePoints.push.apply(shapePoints, point);
      shapeNorms.push.apply(shapeNorms, normalize(point));

      avg[0] += points[3 * index];
      avg[1] += points[3 * index + 1];
      avg[2] += points[3 * index + 2];
      shapeIndices.push(shapeIndices.length);
    });

    avg[0] /= shapeIndices.length;
    avg[1] /= shapeIndices.length;
    avg[2] /= shapeIndices.length;

    shapes.push({
      points: shapePoints,
      colors: (colorFunction || defaultColorFunction).apply(this, [indices, points]),
      normals: shapeNorms,
      indices: shapeIndices,
      center: avg,
      material: {
        ambient: vec4(0.6, 0.2, 0.2, 1.0),
        diffuse: vec4(0.9, 0.1, 0.1, 1.0),
        specular: vec4(0.8, 0.8, 0.8, 1.0),
        shininess: 80.0
      }
    });

    counter += size;
  });

  return shapes;
}

// Create a square between the two provided points
function createSquare(x1, y1, x2, y2, colorFunction) {
  return createRectangle(x1, y1, x1, y2, x2, y2, x2, y1, colorFunction);
}

// Create a rectangle using the four specified poitns
function createRectangle(x1, y1, x2, y2, x3, y3, x4, y4, colorFunction) {
  let points = [new vec3(x1, y1, 0), new vec3(x2, y2, 0), new vec3(x3, y3, 0), new vec3(x4, y4, 0)];
  let xAvg = (x1 + x2 + x3 + x4) / 4;
  let yAvg = (y1 + y2 + y3 + y4) / 4;

  return [{
    points: points,
    colors: (colorFunction || blendedRainbowColorFunction).apply(this, [0, points.length]),
    normals: points,
    indices: [0, 1, 2, 0, 2, 3],
    center: [xAvg, yAvg, 0],
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

// Create a regular pentagon centered at (x, y) of specified size 
function createRegularPentagon(x, y, size, olorFunction) {
  var dxUp = Math.cos(radians(18)) * size;
  var dxDown = Math.cos(radians(288)) * size * 1.5;
  var dyUp = Math.sin(radians(18)) * size;
  var dyDown = Math.sin(radians(288)) * size / 1.25;

  return createPentagon(x + dxUp, y + dyUp, x, y + size, x - dxUp, y + dyUp,
    x - dxDown, y + dyDown, x + dxDown, y + dyDown, colorFunction);
}

// Create a pentagon using the 5 specified points
function createPentagon(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, colorFunction) {
  let points = [new vec3(x1, y1, 0), new vec3(x2, y2, 0), new vec3(x3, y3, 0), new vec3(x4, y4, 0), new vec3(x5, y5, 0)];
  let xAvg = (x1 + x2 + x3 + x4 + x5) / 5;
  let yAvg = (y1 + y2 + y3 + y4 + y5) / 5;

  return [{
    points: points,
    colors: (colorFunction || blendedRainbowColorFunction).apply(this, [0, points.length]),
    normals: points,
    indices: [0, 1, 3, 0, 3, 4, 1, 2, 3],
    center: [xAvg, yAvg, 0],
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

// Create a triangle using the three vertices
function createTriangle(x1, y1, x2, y2, x3, y3, colorFunction) {
  let points = [new vec3(x1, y1, 0), new vec3(x2, y2, 0), new vec3(x3, y3, 0)];
  let xAvg = (x1 + x2 + x3) / 3;
  let yAvg = (y1 + y2 + y3) / 3;

  return [{
    points: points,
    colors: (colorFunction || blendedRainbowColorFunction).apply(this, [0, points.length]),
    normals: points,
    indices: [0, 1, 2],
    center: [xAvg, yAvg, 0],
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

// Draw an ellipse centered at (x, y)
// All triangles are pinned at the right-most vertex.
function createEllipse(x, y, a, b, colorFunction) {
  let points = new Array(360);
  let shapeIndices = []
  let xAvg = 0;
  let yAvg = 0;

  for (let index = 0; index < 360; index++) {
    points[index] = new vec3(
      x + a * Math.cos(radians(index)),
      y + b * Math.sin(radians(index)),
      0
    );

    if (index > 1) {
      shapeIndices.push(0, index - 1, index);
    }

    xAvg += x + a * Math.cos(radians(index));
    yAvg += y + b * Math.cos(radians(index));
  }

  xAvg /= 360;
  yAvg /= 360;

  return [{
    points: points,
    colors: (colorFunction || blendedRainbowColorFunction).apply(this, [0, points.length]),
    normals: points,
    indices: shapeIndices,
    center: [xAvg, yAvg, 0],
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

// Draw an ellipse centered at (x, y)
// All triangles are pinned at the center point (x, y)
function createEllipse_CenterColor(x, y, a, b, centerColor, colorFunction) {
  let points = new Array(362);
  let shapeIndices = []

  // Create first point at center of circle.
  points[0] = new vec3(x, y, 0);
  for (let index = 0; index < 360; index++) {
    points[index + 1] = new vec3(
      x + a * Math.cos(radians(index)),
      y + b * Math.sin(radians(index))
    );

    if (index > 1) {
      shapeIndices.push(0, index - 1, index);
    }
  }

  // Create last point where first outer-circle point is.
  points[361] = new vec2(x + a, y);

  let colors = (colorFunction || blendedRainbowColorFunction).apply(this, [1, points.length - 1])

  // Ensure the two circle points at (x+a, y) have the same colors
  colors.push(colors[0]);

  // Return the points and the colors array with a central color
  return [{
    points: points,
    colors: [centerColor].concat(colors),
    normals: points,
    indices: shapeIndices,
    center: [xAvg, yAvg, 0],
    material: {
      ambient: vec4(0.6, 0.2, 0.2, 1.0),
      diffuse: vec4(0.9, 0.1, 0.1, 1.0),
      specular: vec4(0.8, 0.8, 0.8, 1.0),
      shininess: 80.0
    }
  }];
}

;
//# sourceMappingURL=scripts.js.map