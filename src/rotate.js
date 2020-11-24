

function rotate(imgVer,angle) {
    let dist = [];


    let ih = imgVer.length;
    let iw = imgVer[0].length;

    let ow = ih;
    let oh = iw;

    let rad = angle * Math.PI/180;
    let rotateVer = [
        Math.cos(rad),-Math.sin(rad),0,
        Math.sin(rad),Math.cos(rad),0,
        0,0,1
    ];
    let ori = [
        1,0,0,
        0,-1,0,
        -0.5*(iw-1),0.5*(ih-1),1
    ];

    let dec = [
        1,0,0,
        0,-1,0,
        0.5*(iw-1),0.5*(ih-1),1
    ];

    for(let r=0;r<oh;r++){
        dist.push([]);
    }

    for(let r=0;r<ih;r++){
        for(let c=0;c<iw;c++){

            let result = verMul([r,c,1],ori);
            result = verMul(result,rotateVer);
            result = verMul(result,dec);

            let x = Math.round(result[0]);
            let y = Math.round(result[1]);

            dist[x][y] =  imgVer[r][c]
        }
    }
    return dist;
}

function verMul(a,b){
    let r1= a[0]*b[0] + a[1]*b[3] + a[2]*b[6];
    let r2= a[0]*b[1] + a[1]*b[4] + a[2]*b[7];
    let r3= a[0]*b[2] + a[1]*b[5] + a[2]*b[8];


    return [(r1),(r2),(r3)];
}

console.log(rotate([
    [1,2,3],
    [4,5,6],
    [7,8,9],
],180))