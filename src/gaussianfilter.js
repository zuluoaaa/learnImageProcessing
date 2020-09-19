const cv = require('opencv4nodejs')

let img = cv.imread("./images/Lenna.png")


function gaussian3_3(img){
    let ver = [
        -1,-1,-1,0,-1,1,
        0,-1,0,0,0,1,
        1,-1,1,0,1,1
    ];
    let ver2 = [
        0.094,0.118,0.094,
        0.118,0.148,0.118,
        0.094,0.118,0.094,
    ];

    let out = img.copy();

    let rows = img.rows;
    let cols = img.cols;

    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let r1,g,b;
            r1 = g = b = 0;

            let num = 0;
            for(let i=0;i<ver.length;i+=2){
                let x = r+ver[i];
                let y = c+ver[i+1];

                if(x < 0){
                    x = 0
                }else if(x >= rows){
                    x = rows - 1;
                }
                if(y<0){
                    y = 0;
                }else if(y >= cols){
                    y = cols-1;
                }
                let rgb = img.at(x,y);


                r1 += rgb.x * ver2[num];
                g += rgb.y * ver2[num];
                b += rgb.z * ver2[num];

                num++;
            }

            out.set(r,c,[r1,g,b])
        }
    }
    return out;
}

function gaussian(img,r) {

    let gaussianCoeff = -0.5 / (r * r);


    let halfW = parseInt(r/2);

    let ver2 = [];
    let ver = [];
    let sum = 0;
    for(let i=0;i<r;i++){
        for(let z=0;z<r;z++){
            let x = z-halfW;
            let y = i-halfW;

            ver.push(x);
            ver.push(y);
            let val = Math.exp((x*x + y * y)*gaussianCoeff)

            sum+=val;
            ver2.push(val);
        }
    }

    for(let i=0;i<ver2.length;i++){
        ver2[i] = ver2[i] / sum;
        ver2[i] =  ver2[i].toFixed(4)

    }


    let out = img.copy();

    let rows = img.rows;
    let cols = img.cols;

    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let r1,g,b;
            r1 = g = b = 0;

            let num = 0;
            for(let i=0;i<ver.length;i+=2){
                let x = r+ver[i];
                let y = c+ver[i+1];

                if(x < 0){
                    x = 0
                }else if(x >= rows){
                    x = rows - 1;
                }
                if(y<0){
                    y = 0;
                }else if(y >= cols){
                    y = cols-1;
                }
                let rgb = img.at(x,y);


                r1 += rgb.x * ver2[num];
                g += rgb.y * ver2[num];
                b += rgb.z * ver2[num];

                num++;
            }

            out.set(r,c,[r1,g,b])
        }
    }
    return out;
}



//let output = gaussian3_3(img);
let output = gaussian(img,9);

cv.imshow("input",img)
cv.imshow("output",output)
cv.waitKey()
