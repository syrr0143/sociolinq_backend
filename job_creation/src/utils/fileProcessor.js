import mammoth from "mammoth";
import XLSX from "xlsx";

class DocumentProcessor {
  async processDocument(fileBuffer, fileType) {
    try {
      switch (fileType.toLowerCase()) {
        case "excel":
          return await this.processExcel(fileBuffer);
        case "word":
          return await this.processWord(fileBuffer);
        default:
          throw new Error("Unsupported file type");
      }
    } catch (error) {
      console.error("Error processing document:", error);
      throw error;
    }
  }

  async processExcel(fileBuffer) {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(firstSheet);
  }

  async processWord(fileBuffer) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    const content = result.value;
    const lines = content.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(/\s+/).filter((header) => header.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(/\s+/).filter((value) => value.trim());
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index] || "";
        return obj;
      }, {});
    });
  }
}

export default DocumentProcessor;
