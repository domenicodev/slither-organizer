import fs from "fs";
import path from "path";

// Adjust audit logs and show only relevant lines
function main() {

    // set logs path
    const logsPath = path.resolve(`output`);

    // load file names in dir
    const fileNames = fs.readdirSync(logsPath);

    // loop file contents
    for (let fileName of fileNames) {

        // skip organized directory and others
        if (fs.lstatSync(`${logsPath}/${fileName}`).isDirectory()) continue;

        // get content as JSON
        const fileContent = JSON.parse(fs.readFileSync(`${logsPath}/${fileName}`, { encoding: "utf8" }));

        // initialize organized logs (with custom keywords)
        const organizedLogs: { [key: string]: any } = {
            "default": {} // fallback
        };

        // keywords to exclude in logs, leave empty for none
        const excludedKeywords: Array<string> = [
            
        ];

        // loop elements (detectors)
        upperLoop:
        for (let logElement of fileContent.results.detectors) {

            // load log content
            let logContent = logElement.description;

            // skip if in excludedKeywords
            if (excludedKeywords.length) {
                for (let excludedKeyword of excludedKeywords) {
                    if (logContent.indexOf(excludedKeyword) !== -1) {
                        continue upperLoop;
                    }
                }
            }

            // loop to organize 
            let organizeIn = "default"; // log object to save this log in
            for (let logKey of Object.keys(organizedLogs)) {
                if (logContent.toLowerCase().indexOf(logKey) >= 0) {
                    organizeIn = logKey;
                }
            }

            // organize in severity/impact
            if (undefined === organizedLogs[organizeIn][logElement.impact]) {
                organizedLogs[organizeIn][logElement.impact] = [];
            }

            organizedLogs[organizeIn][logElement.impact].push(logContent);

        }

        // create organized dir if not existent
        if (!fs.existsSync(`${logsPath}/organized`)) {
            fs.mkdirSync(`${logsPath}/organized`);
        }

        // store file
        fs.writeFileSync(`${logsPath}/organized/${fileName}`, JSON.stringify(organizedLogs));


    }

}

main();

