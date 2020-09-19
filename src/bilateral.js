const cv = require("opencv4nodejs");
let img = cv.imread("./images/Lenna.png")
function bilateralFilter(imgMat,imgOutMat,r,sigma_d,sigma_r){
    let i,j,m,n;
    let gaussian_d_coeff = -0.5 / (sigma_d * sigma_d);
    let gaussian_r_coeff = -0.5 / (sigma_r * sigma_r);

    const arr1 = [];
    const arr2 = [];

    for (i = -r; i <= r; i++)
    {
        let temp = [];
        for (j = -r; j <= r; j++)
        {
            temp.push(Math.exp((i * i + j * j) * gaussian_d_coeff));
        }
        arr1.push(temp)
    }


    for (i = 0; i < 256; i++)
    {
        arr2[i] = Math.exp(i * i * gaussian_r_coeff);
    }



    const nx = imgMat.rows,
        ny =   imgMat.cols;

    for (i = 0; i < nx; i++){
        for (j = 0; j < ny; j++){
            let currentNode = imgMat.at(i,j);


            let weight_sum=0, pixcel_sum=0;
            let wsY=0,psY=0,
                wsZ=0,psZ=0;


            for (m = -r; m <= r; m++){
                for (n = -r; n <= r; n++){
                    if (m*m + n*n > r*r) continue;
                    let x_tmp = j + n;
                    let y_tmp = i + m;

                    x_tmp = x_tmp < 0 ? 0 : x_tmp;
                    x_tmp = x_tmp > ny - 1 ? ny - 1 : x_tmp;   // 边界处理，replicate  
                    y_tmp = y_tmp < 0 ? 0 : y_tmp;
                    y_tmp = y_tmp > nx - 1 ? nx - 1 : y_tmp;

                    let targetNode = imgMat.at(y_tmp,x_tmp);

                    let pixcelDifX = Math.abs(targetNode.x - currentNode.x);
                    let weight_tmp_x = arr1[m + r][n + r] * arr2[pixcelDifX];

                    pixcel_sum += targetNode.x * weight_tmp_x;
                    weight_sum += weight_tmp_x;


                    let pixcelDifY = Math.abs(currentNode.y - targetNode.y);
                    let weight_tmp_y = arr1[m + r][n + r] * arr2[pixcelDifY];
                    psY += targetNode.y * weight_tmp_y;
                    wsY += weight_tmp_y;


                    let pixcelDifZ = Math.abs(currentNode.z - targetNode.z);
                    let weight_tmp_Z = arr1[m + r][n + r] * arr2[pixcelDifZ];
                    psZ += targetNode.z * weight_tmp_Z;
                    wsZ += weight_tmp_Z;

                }
            }


            pixcel_sum = Math.round( pixcel_sum / weight_sum);
            psY =  Math.round(psY/wsY);
            psZ =  Math.round(psZ/wsZ);

            imgOutMat.set(i,j,[pixcel_sum,psY,psZ]);

        }
    }

    return imgOutMat;
}


let r = 5;
let sigma_d = 10;
let sigma_r = 10;

let output = bilateralFilter(img,img.copy(),r,sigma_d,sigma_r);
cv.imshow("origin",img)
cv.imshow("demo",output)
cv.waitKey();





