const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.get("/code", (req, res) => {
  res.send(`def download_file(url, filename):
      # Make a GET request to the URL
      response = requests.get(url)
      
      # Open a local file with write-binary mode
      with open(filename, 'wb') as file:
          file.write(response.content)
  
  download_file('https://drakes.vercel.app/ass3', 'abcd123.ipynb')`);
});

app.get("/download1", (req, res) => {
  const filePath = path.join(__dirname, "files", "kappa", `ass1.md`);
  res.download(filePath, `ass1.md`, (err) => {
    if (err) {
      console.error("File download error:", err);
      res.status(500).send("Error downloading file");
    }
  });
});

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
    "ass52",
  ];

  if (allowedFiles.includes(assignment)) {
    // Determine the file path based on the folder parameter
    const filePath =
      folder === "kappa"
        ? (folder === 'dankidank' ? path.join(
            __dirname,
            "files",
            "kappa",
            `${assignment}.ipynb` || `${assignment}.md`
          )
        : path.join(
            __dirname,
            "files",
            "dankidank",
            `${assignment}.ipynb` || `${assignment}.md`
          )): path.join(
            __dirname,
            "files", 
            `${assignment}.ipynb` || `${assignment}.md`
          )
          

    // Send the file as a download
    res.download(
      filePath,
      `${assignment}.ipynb` || `${assignment}.md`,
      (err) => {
        if (err) {
          console.error("File download error:", err);
          res.status(500).send("Error downloading file");
        }
      }
    );
  } else {
    res.status(404).send("Assignment not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
