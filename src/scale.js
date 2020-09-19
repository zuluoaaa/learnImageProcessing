const cv = require('opencv4nodejs');

const MAX_W = 1920;
const MAX_H = 1920;

function scale(img) {
    let input = cv.imread(img,cv.IMREAD_UNCHANGED);
    let w = input.cols;
    let h = input.rows;

    if(w > MAX_W  || h > MAX_H){
        let v;
        if(h > w){
            v = MAX_H / h;
        }else{
            v = MAX_W / w;
        }

        w = Math.round(w * v);
        h = Math.round(h * v);
    }

    let output = input.resize(h,w);
    return output;
}

/*console.log(cv.IMWRITE_JPEG_QUALITY,cv.IMREAD_UNCHANGED)

let out = imageCompress("./IMG_6740.HEIC.JPG");
cv.imshow("origin",out)
cv.imwrite("./test7.jpg",out,)
cv.waitKey()*/

