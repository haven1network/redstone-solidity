import * as fs from "fs";
import * as path from "path";

/**
 * Writes `data` to `file`.
 *
 * @function    writeJSON
 * @param       {string}    filePath
 * @param       {T}         data
 * @returns     True if the operation was successful, false otherwise.
 */
export function writeJSON<T>(filePath: string, data: T): boolean {
    try {
        // Convert the data object to a JSON string
        const jsonData = JSON.stringify(data, null, 4);

        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Write the JSON string to the specified file
        fs.writeFileSync(filePath, jsonData, "utf-8");
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}
