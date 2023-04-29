import path from "path";
import { merge } from "sol-merger";
import fs from "fs";

// Merge platform smart contracts
async function main() {

    // set directories
    const srcDir = path.resolve("contracts"); // source dir, contracts
    const outDir = path.resolve(`contracts/_merged`); // output dir, merged contracts
    const useOutFolders = false; // declare if folders are being used or not in output

    // prepare contracts to merge
    const contractsToMerge: {
        [key: string]: string // contractsToMerge[fileName] = directory;
    } = {
        TestContract: "",
    }

    // log merge start
    let date = new Date();
    console.log(
        "\nMerge started at",
        date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds(),
        "\n"
    );

    // loop to merge indicated contracts
    for (const [name, directory] of Object.entries(contractsToMerge)) {

        // declare src file directory incl. sub folder
        let srcFile = `${srcDir}/${directory}/${name}`;
        if (!fs.lstatSync(`${srcDir}/${directory}`).isDirectory()) {
            srcFile = `${srcDir}/${name}`;
        }

        // get sub folder for file
        const mergedContractFolder = `${outDir}${useOutFolders ? "/" + directory: ""}`;

        // check if out dir does exist and create if it does not
        if (useOutFolders && !fs.existsSync(`${outDir}/${directory}`)) fs.mkdirSync(mergedContractFolder);

        // merge contract
        let mergedContractData = await merge(`${srcFile}.sol`);

        // remove multiple SPDX license identifiers to avoid annoying warnings from compiler
        mergedContractData = mergedContractData.replaceAll("\n// SPDX-License-Identifier: MIT", "");

        // append SPDX license identifier at the top to avoid annoying warnings from compiler
        mergedContractData = "// SPDX-License-Identifier: MIT\n" + mergedContractData;

        // store merged contract in its output directory
        fs.writeFileSync(`${mergedContractFolder}/${name}__Merged.sol`, mergedContractData);

        // log merge data
        console.log(
            `${path.resolve(`${srcFile}.sol`)} merged!\n` +
            `Output: ${path.resolve(`${mergedContractFolder}/${name}__Merged.sol`)}\n`
        );

    }

    // log merge end
    date = new Date();
    console.log(
        "Merge completed at",
        date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds(),
        "\n"
    );

}

main();
