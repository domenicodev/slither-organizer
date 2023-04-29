# slither-organizer
A tool to organize slither logs in JSON files, sorted by vulnerability and organized in keywords.<br/>

## **Setup**

### **Install slither**
Visit https://github.com/crytic/slither for informations about slither installation and setup


### **Create output directory**
Create a directory named 'output' in the parent directory, it will be the output directory of slither findings.

### **Analyze slither contracts and produce outputs**
To analyze contracts, run
````
yarn run analyze
````

## **Configuration**

To configure the parameters see `organize.ts` file.
<br/><br/>

### **Configure logs path**

Logs path is the path containing slither outputs, set to default as `output`.

Path can be changed by editing the variable `logsPath`.
<br/><br/>

### **Configure keywords for organized logs**

Organized logs are a set of objects that can be defined to organize logs based on keywords.

To edit or add keywords(objects of which key is a string), edit inside the `organizedLogs` object.
<br/><br/>

### **Configure excluded keywords**

Excluded keywords are a set of keywords indicating the logs to exclude based on keywords.<br/>
By setting an excluded keyword, all logs containing it will be automatically skipped.<br/>

To edit or add excluded keywords(strings), edit the `excludedKeywords` object.
<br/><br/>

## **Usage**
To organize logs, run
```
yarn run organize
``` 

## **Bonus**
The tool includes also a built-in merge functions to facilitate slither analysis on larger contracts.

To merge contracts, run
```
yarn run merge
```
