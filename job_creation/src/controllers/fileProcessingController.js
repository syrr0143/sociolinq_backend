import DocumentProcessor from "../utils/fileProcessor.js";

const documentProcessor = new DocumentProcessor();
const processDocument = async (req, res) => {
  const { file } = req;
  const { fileType } = req.body;

  console.log("req file ", file);

  if (!file || !fileType) {
    return res.status(400).json({ error: "File and fileType are required." });
  }

  try {
    const data = await documentProcessor.processDocument(file.buffer, fileType);
    res.json({ success: true, data });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({ error: "Failed to process the document." });
  }
};

export { processDocument };
