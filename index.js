const json2xls = require("json2xls");
const fs = require("fs");
const exam = require("./example.json");

const example = exam.example;
const exampleArray = Object.keys(example).map((key) => example[key]);

const stretchItems = [];
exampleArray.forEach((items) => {
    items.forEach((item) => stretchItems.push(item));
});

const findOcc = (arr) => {
    let arr1 = [];
    const a = arr.map((index) => index.word === "this");
    arr.forEach((x) => {
        if (
            arr1.some((val) => {
                return val["word"] == x["word"];
            })
        ) {
            arr1.forEach((k) => {
                if (k["word"] == x["word"]) {
                    k["used_time"] += x["used_time"];
                }
            });
        } else {
            let a = {};
            a["word"] = x["word"];
            a["used_time"] = x["used_time"];
            arr1.push(a);
        }
    });

    return arr1;
};
const sumArray = findOcc(stretchItems);

sumArray.sort((a, b) => b.used_time - a.used_time); //Sorting
const result = { ...sumArray }; 

// JSON file Write
const jsonFileName = "test.json";
const jsonData = JSON.stringify(result);
fs.writeFile(`./output/${jsonFileName}`, jsonData, (err) => {
    if (err) {
        console.log("writeJSONFileSync :", err);
    }
    console.log(`${jsonFileName} is saved Successfully.`);
});

// XLS file Write
const xlsFileName = "test.xlsx";
const xlsData = json2xls(sumArray);
fs.writeFile(`./output/${xlsFileName}`, xlsData, "binary", (err) => {
    if (err) {
        console.log("writeXLSFileSync :", err);
    }
    console.log(`${xlsFileName} is saved Successfully.`);
});
