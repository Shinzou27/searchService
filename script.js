/*  Trabalho de Álgebra Linear

    Professor:  Paulo Ricardo Pinheiro Sampaio

    Alunos:     Felipe Cassiano Barbosa
                Gabriela Araujo de Abreu
                Victor Nunes Saboia
*/

//                 1  2  3  4  5  6  7  8  9  10
var testMatrix = [[0, 1, 0, 0, 1, 0, 0, 1, 0, 0],// 1
                  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],// 2 
                  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],// 3
                  [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],// 4
                  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],// 5
                  [0, 1, 1, 1, 1, 0, 0, 1, 0, 1],// 6
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 7
                  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],// 8
                  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],// 9
                  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]]//10

var testMatrix2 = [[0, 0, 1, 1],
                  [1, 0, 0, 0],
                  [1, 0, 0, 1],
                  [1, 1, 1, 0]];

var exercise5 =  [[0, 0, 1, 0],
                  [1, 0, 0, 0],
                  [1, 1, 0, 0],
                  [0, 1, 0, 0]];
            
var exercise6 =  [[0, 1, 1, 0],
                  [0, 0, 1, 0],
                  [1, 0, 0, 1],
                  [1, 0, 0, 0]]

var exercise7 =  [[0, 1, 1, 1, 0],
                  [1, 0, 0, 0, 1],
                  [0, 0, 0, 0, 1],
                  [0, 1, 0, 0, 0],
                  [0, 1, 1, 0, 0]] 

//               1  2  3  4  5  6  7  8  9  10
var exercise8= [[0, 1, 1, 0, 1, 1, 0, 0, 0, 1],// 1
                [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],// 2 
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],// 3
                [0, 1, 1, 0, 0, 1, 1, 0, 0, 1],// 4
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],// 5
                [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],// 6
                [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],// 7
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],// 8
                [0, 1, 1, 0, 0, 1, 0, 1, 0, 1],// 9
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]]//10  

document.write("----- EXERCICIO 5 -----<br>")
showResults(iteration(exercise5));
document.write("----- EXERCICIO 6 -----<br>")
showResults(iteration(exercise6));
document.write("----- EXERCICIO 7 -----<br>")
showResults(iteration(exercise7));
document.write("----- EXERCICIO 8 -----<br>")
showResults(iteration(exercise8));
function times(a, b) {
    var soma = 0;
    var matrizTimes = [];                               //   a   *   b   =   X
    if (!isNaN(a)){
        for (var n = 0; n < b.length; n++) {            // m x n   n x p   m x p
            matrizTimes[n] = [];
            for (var p = 0; p < b[0].length; p++) {
                matrizTimes[n][p] = b[n][p] * a;
            }
        } 
    }
    else {
        for (var m = 0; m < a.length; m++) {
            matrizTimes[m] = [];
            for (var p = 0; p < b[0].length; p++) {
                for (var i = 0; i < b.length; i++) {
                    soma += a[m][i] * b[i][p]; 
                }
                matrizTimes[m][p] = soma;
                soma = 0;
            }
        }
    }
    return matrizTimes;
}
function transpose(a) {
    var matrizTransposta = [];
    for (var m = 0; m < a[0].length; m++) {
        matrizTransposta[m] = [];
        for (var n = 0; n < a.length; n++) {
            matrizTransposta[m][n] = a[n][m];
        }
    }
    return matrizTransposta
}
function createVector(matrix) {
    matrix = transpose(matrix);
    var vector = [];
    var sum = 0;
    var length = matrix.length;
    for (var m = 0; m < length; m++) {
        vector[m] = [];
        for(var n = 0; n < length; n++) {
            sum += matrix[m][n];
        }
        vector[m][0] = sum;
        sum = 0;
    }
    return vector;
}
function normalizeVector(matrix) {
    var sum = 0;
    for (var m = 0; m < matrix.length; m++) {
        sum += Math.pow(matrix[m][0], 2);
    }
    result = Math.sqrt(sum);
    return result;
}
function stabilizeVector(matrix) {
    return times((1/normalizeVector(matrix)), matrix);
}
function hh(matrix, matrixColumn) {
    var Aa0 = times(matrix, matrixColumn)
    return stabilizeVector(Aa0);
}
function aa(matrix, matrixColumn) {
    var Ath1 = times(transpose(matrix), matrixColumn);
    return stabilizeVector(Ath1);
}
function iteration(matrix) {
    var a = createVector(matrix);
    for(var i = 0; i < 10; i++) {
        var h = hh(matrix, a);
        var a = aa(matrix, h);
    }
    return a;
}
function showResults(matrix) {
    for(var m = 0; m < matrix.length; m++) {
        var valor = parseFloat(matrix[m][0]).toFixed(5)
        document.write(`Site ${m+1}: \t${valor}<br>`)
    }
    document.write("<br>")
}

//console.log(sort(iteration(exercise8)))
//function sort(matrix) {
//    matrix.sort(function(a, b) {
//        return a - b;
//      });
//      return matrix;
//}