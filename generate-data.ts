import propertyListData from "@/data/property-list.data";
import fs from "fs";

const dataGenerateFolder = './data/generated/';

(()=>{
    if (!fs.existsSync(dataGenerateFolder)){
        fs.mkdirSync(dataGenerateFolder, { recursive: true });
    }

    fs.writeFile(`${dataGenerateFolder}/property-list.json`, JSON.stringify(propertyListData), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to file ${dataGenerateFolder}:`, err);
        } else {
            console.log(`File updated: ${dataGenerateFolder}`);
        }
    });
})();
