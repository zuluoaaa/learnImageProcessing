
function nearest(img,s) {
    let h = img.length;
    let w = img[0].length;

    let dh = h * s;
    let dw = w * s;


    let dis = [];

    for(let r=0;r<dh;r++){
        let row = [];
        for(let c=0;c<dw;c++){
            let u = c/(dw);
            let v = r/(dh);

            let u1 = u * (w);
            let v1 = v * (h);

            let u2 = parseInt(u1);
            let v2 = parseInt(v1);

            v1 = v1 - v2;
            u1 = u1 - u2;


            let bottom = u2+1 < h  ? u2+1 : u2;
            let right = v2+1 < w  ? v2+1 : v2;

            let leftTop = img[v2][u2];
            let leftBottom = img[v2][bottom];
            let rightTop = img[right][u2];
            let rightBottom = img[right][bottom];


            let val = leftTop* (1-v1) * (1-u1) + leftBottom * u1 * (1-v1) + rightTop * v1 * (1-u1) + rightBottom  * v1 * u1;
            row.push(Math.round(val))
        }
        dis.push(row);
    }
    console.log(dis)
}

function  bilinear(img,s) {
    let h = img.length;
    let w = img[0].length;

    let dh = h * s;
    let dw = w * s;

    let dis = [];

    for(let r=0;r<dh;r++){
        let row = [];
        for(let c=0;c<dw;c++){
            let u = c/(dw);
            let v = r/(dh);

            let u1 = u * (w);
            let v1 = v * (h);

            let u2 = parseInt(u1);
            let v2 = parseInt(v1);

            let node = img[v2][u2];

            row.push(node)
        }
        dis.push(row);
    }
    console.log(dis)
}

bilinear([[0,50],
    [150,200]],2)