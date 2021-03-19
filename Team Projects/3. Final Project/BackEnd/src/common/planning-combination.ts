// Employees sorted by their project ID
// The array represents just the project ID's of the employees for simplicity
const peopleWithProjectIds = [4, 4, 4, 6, 6, 6, 6, 7, 7, 8];
const PERC_VALUE = 50;
const FIFTY_PERC = peopleWithProjectIds.length * PERC_VALUE * 0.01;/// 2;

export const main = (peopleWithProjectIds, FIFTY_PERC) => {
    // 1. Create a matrix like this:
    /*
    [
        [4,4,4],
        [6,6,6,6],
        [7,7],
        [8]
    ]
    */
    // Positions of indexes that are the first different number- 3 (first 6), 7 (first 7), 9 (first 8)
    const startingIndexes = (arr) => {
        let positions = [];
        for (let i = 0; i < peopleWithProjectIds.length - 1; i++) {
            if (peopleWithProjectIds[i] !== peopleWithProjectIds[i + 1]) {
                positions.push(i + 1);
            }
        }
        // console.log("Positions", positions);
        return positions;
    }


    const pos = startingIndexes(peopleWithProjectIds);
    console.log("Positions:", pos);

    // arr- array of positions= pos;
    const numOfElemensToRead = (arr) => {
        const res = [];
        for (let i = 0; i < arr.length - 1; i++) {
            if (i === 0) {
                res.push(arr[0]);
            }
            res.push(Math.abs(arr[i] - arr[i + 1]));

        }

        res.push(peopleWithProjectIds.length - arr[arr.length - 1]);
        return res;
    }

    const numEl = numOfElemensToRead(pos);
    console.log("Number of elements to read each time:", numEl);



    // peopleWithProjectIds.map((empl, index) => {
    //     if (empl[index] !== empl[index + 1]) {
    //         positions.push(index);
    //         return empl;
    //     }

    //     // return peopleWithProjectIds;
    // })

    let emplMatrix = [];
    const createMatrix = (arr, i = 0, j = 0) => {
        let resultArr = [];
        let secIdx = numEl[j]
        // for (let j = 0; j < arr.length - 1; j++) {
        //     // if (arr[j] == arr[j + 1]) {
        //     //     return;
        //     // }
        //     resultArr.push(arr[j]);
        // }
        // while (arr[i] === arr[i + 1]) {
        //     resultArr.push(arr[i]);
        // }
        // return resultArr;
        //if (emplMatrix.length >= arr.length) 
        const arrCopy = [];
        arr.forEach(element => {
            arrCopy.push(element);
        });
        resultArr = arrCopy.splice(i, secIdx);
        // if (resultArr.length === 0) {
        //     return;
        // }
        if (j === numEl.length) {
            return;
        }
        //  resultArr = arr.splice(i, j);
        emplMatrix.push(resultArr);

        return createMatrix(arrCopy, i, j + 1);
    }

    createMatrix(peopleWithProjectIds);
    // console.log("PEOPLE", peopleWithProjectIds);
    // emplMatrix looks like this:
    /*
    [
        [4,4,4],
        [6,6,6,6],
        [7,7],
        [8]
    ]
    */
    console.log("MATRIX:", emplMatrix);

    // array of number_of_occurences for each number
    const occurences = numEl;
    console.log("Occurences:", occurences);


    const shuffle = (array1) => {
        // const array1 = [1, 2, 3];

        //console.log(array1.shift(array1[0]));
        const firstEl = array1.shift(array1[0]);
        array1.push(firstEl);
        // expected output: 5

        // console.log(array1);
        // expected output: Array [4, 5, 1, 2, 3]

        return array1;
    }

    // const shuffled = shuffle(occurences);
    // console.log("First Shuffle", shuffled);
    let counter = occurences.length;
    const subarrays = [];
    const allSubarrays = (arr) => {
        // const subarrays = [];
        for (let i = 1; i <= arr.length; i++) {
            subarrays.push(arr.slice(0, i));
        }

        const arrCopy = [];
        arr.forEach(element => {
            arrCopy.push(element);
        });
        const shfld = shuffle(arr);
        if (arr === arrCopy) {
            console.log("dyno");
            return;
        }
        counter--;
        while (counter > 0) {
            allSubarrays(arr);
            //return subarrays;
        }

    }

    const allSubArr = allSubarrays(occurences);
    console.log("Subarrays of Occurences:", subarrays);

    const sumArrayEl = (arr) => {
        return arr.reduce((acc, el) => acc += el, 0);
    }

    const sum = sumArrayEl([2, 7, 14]);
    console.log("test sum:", sum);


    console.log("50% =>", FIFTY_PERC);
    const maxSum = (arr) => {
        let max = 0;//sumArrayEl(arr[0]);
        for (let i = 0; i < arr.length; i++) {
            if (sumArrayEl(arr[i]) > max && sumArrayEl(arr[i]) <= FIFTY_PERC) {
                max = sumArrayEl(arr[i]);
            }
        }

        return max;
    }

    const maxSumNum = maxSum(subarrays);
    console.log("Max sum number:", maxSumNum);

    const occurencesArraysWithMaxSum = (arr) => {
        const resultArr = [];
        arr.map(el => {
            if (sumArrayEl(el) === maxSumNum) {
                resultArr.push(el)
            }
        })

        // emplMatrix.map((row, idx) => {
        //     if (row[idx].length === maxSumNum) {
        //         resultArr.push(row[idx]);
        //     }

        //     if(row[idx].length)
        // })

        return resultArr;
    }

    const occArrayWithMaxSum = occurencesArraysWithMaxSum(subarrays);
    console.log("Occurence arrays with max sum", occArrayWithMaxSum);

    //In MATRIX- see which arrays/elements/teams have length= occArrayWithMaxSum[i];
    // Take array/MATRIX element/team with num_elements= X
    const rowWithLenX = (mat, x) => {
        const res = [];
        for (let i = 0; i < mat.length; i++) {
            if (mat[i].length === x) {
                res.push(mat[i]);
            }
        }

        return res;
    }

    const rowLen4 = rowWithLenX(emplMatrix, 4);
    console.log("EMPL MATRIX ROW with len X", rowLen4);


    const shouldTakeRow = (mat) => {
        const result = [];
        for (let i = 0; i < mat.length; i++) {
            if (mat[i].length === maxSumNum) {
                result.push([mat[i]]);
            }

            for (let j = 0; j < mat.length; j++) {
                if (mat[i].length + mat[j].length === maxSumNum && mat[i].length !== maxSumNum && mat[j].length !== maxSumNum && mat[i] !== mat[j]) {
                    result.push([mat[i], mat[j]]);
                    // result.push(mat[i]);
                    // result.push(mat[j]);
                }
            }
        }

        return result;
    }

    const tryFinal = shouldTakeRow(emplMatrix);
    console.log(tryFinal);

    // return tryFinal;

    const generateCombinationOfProjectIds = (matrix3D) => {
        const matrixOfCombinationsPrID = [];
        for (let i = 0; i < matrix3D.length; i++) {
            const matrix2D = matrix3D[i];
            const midArray = [];
            for (let j = 0; j < matrix2D.length; j++) {
                const row = matrix2D[j];
                const el = matrix3D[i][j][0];
                midArray.push(el);
                // console.log("row 0", midArray);
            }
            console.log("row 0", midArray);
            matrixOfCombinationsPrID.push(midArray);
        }

        return matrixOfCombinationsPrID;
    }

    const combinationsPrID = generateCombinationOfProjectIds(tryFinal);
    console.log("Marix of combinations of project ID groups", combinationsPrID);

    return combinationsPrID;

}

