const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const IMAGE_DIR = path.join(__dirname, 'templates/assets');
const THUMB_DIR = path.join(__dirname, 'public/assets/thumbnails');
const counterFilePath = path.join(__dirname, 'data', 'proposal_counter.txt');

const docDefaults = {
  corporate: true,
  quote: true,
  title: "New Web App",
  author: "John Doe",
  imgpath: "assets/business/business.jpg",
};

// Helper to generate session-specific file paths
function getSessionFilePath(sessionId, name, extension) {
  const tmpDir = path.resolve(__dirname, "tmp");
  return path.join(tmpDir, `${sessionId}${name}.${extension}`);
}

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/generate-pdf", async (req, res) => {
  const sessionId = uuidv4(); // Use `userId` from the form or create a new one
  const filledTemplatePath = getSessionFilePath(sessionId, "filled", "typ");
  const outputPdfPath = getSessionFilePath(sessionId, "output", "pdf");
  const docForm = { ...docDefaults, ...req.body };
  const appRoot = process.cwd();

  // Boolean conversion
  docForm.quoteBool = !!docForm.quoteBool;
  docForm.summaryBool = !!docForm.summaryBool;
  docForm.equipBool = !!docForm.equipBool;
  docForm.serviceBool = !!docForm.serviceBool;
  docForm.lumpBool = !!docForm.lumpBool;
  docForm.off52 = !!docForm.off52;
  docForm.fac126 = !!docForm.fac126;
  docForm.gsa71 = !!docForm.gsa71;
  docForm.gsa84 = !!docForm.gsa84;
  docForm.mhec = !!docForm.mhec;
  docForm.ny = !!docForm.ny;

  const match = docForm.imgpath.match(/assets\/([^/]+)\//);
  //const category = match ? match[1] : 'default';
  const category = req.body['img-category'];

  // Handle image paths
  docForm.cornerimg = `assets/${category}/${category}.svg`;
  docForm.imgcategory = category;

  // Handle dynamic sections
  if (req.body.equip && Object.keys(req.body.equip).length > 0) {
    docForm.equip = convertJsonToTypstDict(req.body.equip);
  } else {
    docForm.equip = "()";
  }
  //docForm.equip = convertJsonToTypstDict(equipSpec)

  if (req.body.summary) {
    docForm.summary = convertJsonToTypstDict(req.body.summary);
  } else {
    docForm.summary = "()";
  }

  if (req.body.invest && Object.keys(req.body.invest).length > 0) {
    docForm.invest = convertJsonToTypstDict(req.body.invest);
  } else {
    docForm.invest = "()";
  }

  if (docForm.imgpath.startsWith('templates/')) {
    docForm.imgpath = docForm.imgpath.replace(/^templates\//, '');
  }

  docForm.proposal = req.body.proposal;

  console.log("Processed Data:", JSON.stringify(docForm, null, 2));

  try {
    // Load and process the Typst template
    const templatePath = path.resolve(__dirname, "doc.typ");
    let template = await fsp.readFile(templatePath, "utf8");

    // Replace the placeholder with dynamic data
    for (const [key, value] of Object.entries(docForm)) {
      const placeholder = "$" + key + "$";
      if (typeof value === "boolean") {
        template = template.replace(placeholder, value);
      } else if (typeof value === "string") {
        if (isTypstDictionaryString(value)) {
          template = template.replace(
            placeholder,
            removeOuterQuotesIfWrapped(value),
          );
        } else {
          template = template.replace(placeholder, '"' + value + '"');
        }
      } else {
        template = template.replace(placeholder, value);
      }
    }

    // Save the filled Typst template
    await fsp.writeFile(filledTemplatePath, template);

    // Compile the Typst template into a PDF
    const command = `typst compile --root ${appRoot} ${filledTemplatePath} ${outputPdfPath}`;
    await new Promise((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error("Error generating PDF:", stderr);
          reject(stderr);
        } else {
          console.log("PDF generated successfully:", stdout);
          resolve();
        }
      });
    });

    const sanitizedTitle = `${(docForm.title || "generated")
    .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe characters with underscores
    .substring(0, 50)}`; // Limit length to 50 characters
    const filename = encodeURIComponent(`${sanitizedTitle}.pdf`);

    res.download(outputPdfPath, filename, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Failed to send PDF");
      }
    });
 
    // Clean up temporary files after a delay
    setTimeout(async () => {
      try {
        await fsp.unlink(filledTemplatePath);
        await fsp.unlink(outputPdfPath);
      } catch (err) {
        console.warn(`Error cleaning up temp files: ${err.message}`);
      }
    }, 60000); // Clean up after 60 seconds
  } catch (err) {
    console.error("Error processing PDF generation:", err);
    res.status(500).send("Failed to process PDF generation.");
  }
});

app.post("/generate-json", (req, res) => {
  const docForm = req.body;

  try {
    // Save JSON to a file
    const jsonPath = path.resolve(__dirname, "form-data.json");
    fs.writeFileSync(jsonPath, JSON.stringify(docForm, null, 2));

    const sanitizedTitle = `${(docForm.title || "generated")
    .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe characters with underscores
    .substring(0, 50)}`; // Limit length to 50 characters
    const filename = encodeURIComponent(`${sanitizedTitle}.json`);

    res.download(jsonPath, filename, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Failed to send JSON");
      }
    });
  } catch (err) {
    console.error("Error generating JSON:", err);
    res.status(500).send("Failed to generate JSON.");
  }
});

function removeOuterQuotesIfWrapped(str) {
  const regex = /^"\(.*\)"$/; // Matches strings with outer quotes and parentheses inside
  if (regex.test(str)) {
    // Remove the first and last characters (the outer quotes)
    return str.slice(1, -1);
  }
  return str; // Return the original string if the condition is not met
}

function isTypstDictionaryString(value) {
  // Check if the string starts and ends with parentheses and is dictionary-like
  return (
    typeof value === "string" &&
      value.trim().startsWith("(") &&
      value.trim().endsWith(")")
  );
}

function escapeTypstString(str) {
  return str.replace(/"/g, '\\"');
}

function convertJsonToTypstDict(jsonObject) {
  const formatValue = (value) => {
    if (Array.isArray(value)) {
      /*// Convert arrays to Typst tuple format with parentheses
            return `(${value.map(formatValue).join(", ")})`;*/
      if (value.length === 1) {
        // Ensure single-item arrays are treated as tuples with a trailing comma
        return `(${formatValue(value[0])}, )`;
      } else {
        return `(${value.map(formatValue).join(", ")})`;
      }
    } else if (typeof value === "string") {
      // Wrap strings in double quotes
      return `"${escapeTypstString(value)}"`;
    } else if (typeof value === "number") {
      // Keep numbers as-is
      return `"${value}"`;
    } else if (typeof value === "boolean") {
      // Convert booleans to true/false strings
      return value ? "true" : "false";
    } else if (typeof value === "object" && value !== null) {
      // Handle nested objects
      let nestedDict = "(";
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        nestedDict += `${nestedKey}: ${formatValue(nestedValue)}, `;
      }
      return nestedDict.slice(0, -2) + ")";
    } else if (value === null || value === undefined) {
      // Handle null or undefined explicitly
      return `""`;
    } else {
      throw new Error(
        `Unsupported value type in JSON: ${typeof value} | Value: ${value}`,
      );
    }
  };

  let typstDict = "(";
  for (const [key, value] of Object.entries(jsonObject)) {
    if (value !== undefined && value !== null) {
      typstDict += `"${key}": ${formatValue(value)}, `;
    }
  }
  return typstDict.slice(0, -2) + ")";
}

async function getNextProposalCounter() {
  try {
    const current = await fsp.readFile(counterFilePath, 'utf8');
    const next = parseInt(current, 10) + 1;
    const formatted = `DONN-${String(next).padStart(6, '0')}`;
    await fsp.writeFile(counterFilePath, next.toString());
    return formatted;
  } catch (err) {
    console.error("Failed to read or update proposal counter:", err);
    return "DONN-XXXXXX";
  }
}

// Serve static files if needed (e.g., for testing thumbnails)
app.use('/thumbnails', express.static(path.join(THUMB_DIR)));

// API route to list image paths
app.get('/api/images', async (req, res) => {
  const category = req.query.category;
  if (!category) return res.status(400).json({ error: 'Category is required.' });

  const srcDir = path.join(IMAGE_DIR, category);
  const destDir = path.join(THUMB_DIR, category);

  try {
    await fsp.mkdir(destDir, { recursive: true });

    const files = (await fsp.readdir(srcDir))
    .filter(file => /\.(jpg|jpeg)$/i.test(file));

    const thumbs = await Promise.all(files.map(async file => {
      const srcPath = path.join(srcDir, file);
      const thumbPath = path.join(destDir, file);

      // Resize only if it doesn't exist
      if (!fs.existsSync(thumbPath)) {
        await sharp(srcPath)
        .resize({
          height: 380,
          fit: sharp.fit.inside,
        }) // consistent thumbnail size
        .toFile(thumbPath);
      }

      return {
        full: `/templates/assets/${category}/${file}`,
        thumb: `/thumbnails/${category}/${file}`,
        name: file
      };
    }));

    res.json(thumbs);
  } catch (err) {
    console.error('Error generating thumbnails:', err);
    res.status(500).json({ error: 'Could not process images.' });
  }
});

app.get('/next-proposal-id', async (req, res) => {
  const proposalId = await getNextProposalCounter();
  res.json({ proposalId });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
