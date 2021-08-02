

function rotate(imgVer,angle) {
    let dist = [];


    let ih = imgVer.length;
    let iw = imgVer[0].length;


    let rad = angle * Math.PI/180;
    let rotateVer = [
        Math.cos(rad),-Math.sin(rad),0,
        Math.sin(rad),Math.cos(rad),0,
        0,0,1
    ];
    let ori = [
        1,0,0,
        0,1,0,
        -0.5*(iw-1),-0.5*(ih-1),1
    ];

    let dec = [
        1,0,0,
        0,1,0,
        0.5*(iw-1),0.5*(ih-1),1
    ];


    let a1 = micMul(ori,rotateVer);
    let m1 = micMul(a1,dec);



    for(let r=0;r<ih;r++){
        for(let c=0;c<iw;c++){

            let r2 = verMul([r,c,1],m1);

            let x = (r2[0]);
            let y = (r2[1]);

            dist[x] = dist[x] || []
            dist[x][y] = imgVer[r][c]
        }
    }
    return dist;
}

function verMul(a,b){
    let r1= a[0]*b[0] + a[1]*b[3] + a[2]*b[6];
    let r2= a[0]*b[1] + a[1]*b[4] + a[2]*b[7];
    let r3= a[0]*b[2] + a[1]*b[5] + a[2]*b[8];

    return [Math.round(r1),Math.round(r2),Math.round(r3)];
}

function micMul(a,b){
    return [
        ...verMul([a[0],a[1],a[2]],b),
        ...verMul([a[3],a[4],a[5]],b),
        ...verMul([a[6],a[7],a[8]],b),
    ]
}


console.log(rotate([
    [0,0,0,0,0],
    [0,1,2,3,0],
    [0,4,5,6,0],
    [0,7,8,9,0],
    [0,0,0,0,0]
],-90))