const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

// Define a route that handles requests to download assignment files
app.get("/:folder?/:assignment", (req, res) => {
  const folder = req.params.folder;
  const assignment = req.params.assignment;
  const allowedFiles = [
    "ass1",
    "ass2",
    "ass3",
    "ass4",
    "ass5",
    "ass6",
    "ass32",
  ];

  if (allowedFiles.includes(assignment)) {
    // Determine the file path based on the folder parameter
    const filePath =
      folder === "kappa"
        ? path.join(__dirname, "files", "kappa", `${assignment}.ipynb`)
        : path.join(__dirname, "files", `${assignment}.ipynb`);

    // Send the file as a download
    res.download(filePath, `${assignment}.ipynb`, (err) => {
      if (err) {
        console.error("File download error:", err);
        res.status(500).send("Error downloading file");
      }
    });
  } else {
    res.status(404).send("Assignment not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
