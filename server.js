/*const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs/promises"); // Use promises for async file handling
const path = require("path");
const typst = require("typst"); // Import the Typst package

const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

// Endpoint to generate the PDF
app.post("/generate-pdf", async (req, res) => {
  const { title, subtitle, content } = req.body;

  try {
    // Load the Typst template
    const templatePath = path.resolve(__dirname, "templates/template.typ");
    let template = await fs.readFile(templatePath, "utf8");

    // Replace placeholders with user-provided data
    template = template
      .replace("$title", title)
      .replace("$subtitle", subtitle)
      .replace("$content", content);

    // Save the filled Typst file temporarily
    const filledTemplatePath = path.resolve(__dirname, "templates/filled.typ");
    await fs.writeFile(filledTemplatePath, template);

    // Compile the Typst template into a PDF
    const outputPdfPath = path.resolve(__dirname, "output.pdf");
    await typst.compile(filledTemplatePath, outputPdfPath);

    // Send the generated PDF to the user
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="generated.pdf"',
    });
    res.sendFile(outputPdfPath);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
*/

const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const docDefaults = {
    corporate: true,
    quote: true,
    title: "New Web App",
    author: "John Doe",
    imgpath: "assets/business/business.jpg",
};

const cornerImgPath = {
    "assets/business/business.jpg": "assets/business/biz.svg",
    "assets/grow/grow.jpg": "assets/grow/grow.svg",
    "assets/healthcare/health.jpg": "assets/healthcare/health.svg",
    "assets/higheredu/edu.jpg": "assets/higheredu/edu.svg",
    "assets/industrial/industrial.jpg": "assets/industrial/industrial.svg",
    "assets/military/military.jpg": "assets/military/military.svg",
    "assets/museum/museum.jpg": "assets/museum/museum.svg",
    "assets/publicsafety/publicsafety.jpg": "assets/publicsafety/publicsafety.svg",
};

// Helper to generate session-specific file paths
function getSessionFilePath(sessionId, name, extension) {
    //return path.join(os.tmpdir(), `${sessionId}${name}.${extension}`);
    const tmpDir = path.resolve(__dirname, "tmp");
    return path.join(tmpDir, `${sessionId}${name}.${extension}`);
}
/*// Route to process the form and generate a PDF
app.post("/generate-pdf", (req, res) => {
    const docForm = { ...req.body };
    const equip = convertJsonToTypstDict(equipSpec);
    const summary = convertJsonToTypstDict(sumSpec);
    const invest = convertJsonToTypstDict(investSpec);
  
    // Convert toggles and checkboxes to booleans
    docForm.quote = req.body.quote === "on";
    docForm.summaryBool = req.body.quote === "on";

    docForm.cornerimg = cornerImgPath[docForm.imgpath];
    docForm.equip = equip;
    docForm.summary = summary;
    docForm.invest = invest;
    console.log(docForm);
  
    // Pass user input to the PDF generation function
    generatePDF(docForm)
    .then(() => {
        res.download(path.resolve(__dirname, "output.pdf"), "generated.pdf");
    })
    .catch((err) => {
        console.error("Error generating PDF:", err);
        res.status(500).send("Failed to generate PDF.");
    });
});*/

/*// Route to process the form and generate a PDF
app.post("/generate-pdf", (req, res) => {
    try {
        const docForm = { ...docDefaults, ...req.body };

        // Handle dynamic data
        docForm.quote = !!docForm.quote; // Ensure boolean conversion
        docForm.summaryBool = !!docForm.summaryBool; // Ensure boolean conversion
        docForm.cornerimg = cornerImgPath[docForm.imgpath] || "assets/default.svg";

        // Handle dynamic sections
        if (docForm.equip) {
            docForm.equip = convertJsonToTypstDict(docForm.equip);
        }

        if (docForm.summary) {
            docForm.summary = convertJsonToTypstDict(docForm.summary);
        }

        if (docForm.invest) {
            docForm.invest = convertJsonToTypstDict(docForm.invest);
        }

        console.log("Processed Data:", docForm);

        // Pass user input to the PDF generation function
        generatePDF(docForm)
            .then(() => {
                res.download(path.resolve(__dirname, "output.pdf"), "generated.pdf");
            })
            .catch((err) => {
                console.error("Error generating PDF:", err);
                res.status(500).send("Failed to generate PDF.");
            });
    } catch (err) {
        console.error("Error processing PDF generation:", err);
        res.status(500).send("Failed to process PDF generation.");
    }
});*/

/*app.post("/generate-pdf", (req, res) => {
    try {
        const docForm = { ...docDefaults, ...req.body };

        // Boolean conversion
        docForm.quote = !!docForm.quote;
        docForm.summaryBool = !!docForm.summaryBool;

        // Handle image paths
        docForm.cornerimg = cornerImgPath[docForm.imgpath] || "assets/default.svg";

        // Handle dynamic sections
        docForm.equip = Object.keys(req.body.equip || {}).length > 0 
            ? convertJsonToTypstDict(req.body.equip) 
            : "()";

        docForm.summary = req.body.summary
            ? convertJsonToTypstDict(req.body.summary)
            : "()";

        docForm.invest = Object.keys(req.body.invest || {}).length > 0 
            ? convertJsonToTypstDict(req.body.invest) 
            : "()";

        console.log("Processed Data:", docForm);

        generatePDF(docForm)
            .then(() => {
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename="generated.pdf"'
                });
                res.sendFile(path.resolve(__dirname, "output.pdf"));
            })
            .catch((err) => {
                console.error("Error generating PDF:", err);
                res.status(500).send("Failed to generate PDF.");
            });
    } catch (err) {
        console.error("Error processing PDF generation:", err);
        res.status(500).send("Failed to process PDF generation.");
    }
});*/

app.get("/", (req, res) => {
    /*const defaultData = {
        title: "Sample Title",
        author: "Sample Author",
        imgpath: "assets/business.jpg",
        equip: {
            Room1: ["Item1", "Item2"],
        },
        invest: {
            Freight: { items: ["Item A", "Item B"], price: "1000" },
        },
    };*/
    res.render("index");
});

app.get("/form", (req, res) => {
    res.render("form");
})

app.post("/generate-pdf", async (req, res) => {
    const sessionId = uuidv4(); // Use `userId` from the form or create a new one
    const filledTemplatePath = getSessionFilePath(sessionId, "filled", "typ");
    const outputPdfPath = getSessionFilePath(sessionId, "output", "pdf");
    const docForm = { ...docDefaults, ...req.body };
    const appRoot = process.cwd();

    // Boolean conversion
    docForm.quoteBool = !!docForm.quoteBool;
    docForm.summaryBool = !!docForm.summaryBool;
    docForm.lumpBool = !!docForm.lumpBool;
    docForm.off52 = !!docForm.off52;
    docForm.fac126 = !!docForm.fac126;
    docForm.gsa71 = !!docForm.gsa71;
    docForm.gsa84 = !!docForm.gsa84;
    docForm.mhec = !!docForm.mhec;
    docForm.ny = !!docForm.ny;

    // Handle image paths
    docForm.cornerimg = cornerImgPath[docForm.imgpath] || "assets/default.svg";

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

    console.log("Processed Data:", JSON.stringify(docForm, null, 2));

    /*generatePDF(docForm)
        .then(() => {
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="generated.pdf"'
            });
            res.sendFile(path.resolve(__dirname, "output.pdf"));
        })
        .catch((err) => {
            console.error("Error generating PDF:", err);
            res.status(500).send("Failed to generate PDF.");
        });*/
    try {
        // Load and process the Typst template
        const templatePath = path.resolve(__dirname, "doc.typ");
        let template = await fs.readFile(templatePath, "utf8");

        // Replace the placeholder with dynamic data
        for (const [key, value] of Object.entries(docForm)) {
            const placeholder = '$' + key + '$';
            if (typeof value === 'boolean') {
                template = template.replace(placeholder, value);
            }
            else if (typeof value === 'string') {
                if (isTypstDictionaryString(value)) {
                    template = template.replace(placeholder, removeOuterQuotesIfWrapped(value))
                } else {
                    template = template.replace(placeholder, '"' + value + '"');
                }
            }
            else {
                template = template.replace(placeholder, value);
            }
        }

        // Save the filled Typst template
        await fs.writeFile(filledTemplatePath, template);

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

        const sanitizedTitle = (docForm.title || "generated")
            .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe characters with underscores
            .substring(0, 50); // Limit length to 50 characters
        const filename = `${sanitizedTitle}.pdf`;

        // Send the PDF as a response
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${filename}"`,
        });
        res.sendFile(outputPdfPath);

        // Clean up temporary files after a delay
        setTimeout(async () => {
            try {
                await fs.unlink(filledTemplatePath);
                await fs.unlink(outputPdfPath);
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

        const sanitizedTitle = (docForm.title || "generated")
            .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace unsafe characters with underscores
            .substring(0, 50); // Limit length to 50 characters
        const filename = `${sanitizedTitle}.pdf`;

        // Send JSON file to client
        res.set({
            "Content-Type": "application/json",
            "Content-Disposition": `attachment; filename="${filename}"`,
        });
        res.sendFile(jsonPath);
    } catch (err) {
        console.error("Error generating JSON:", err);
        res.status(500).send("Failed to generate JSON.");
    }
});

/*async function generatePDF(docform) {
    try {
        // Step 1: Load the Typst template
        const templatePath = path.resolve(__dirname, "doc.typ");
        let template = fs.readFileSync(templatePath, "utf-8");

        // Step 2: Replace the placeholder with dynamic data
        for (const [key, value] of Object.entries(docform)) {
            const placeholder = '$' + key + '$';
            if (typeof value === 'boolean') {
                template = template.replace(placeholder, value);
            }
            else if (typeof value === 'string') {
                if (isTypstDictionaryString(value)) {
                    template = template.replace(placeholder, removeOuterQuotesIfWrapped(value))
                } else {
                    template = template.replace(placeholder, '"' + value + '"');
                }
            }
            else {
                template = template.replace(placeholder, value);
            }
        }

        // Step 3: Save the modified template to a temporary file
        const filledTemplatePath = path.resolve(__dirname, "filled.typ");
        fs.writeFileSync(filledTemplatePath, template);

        // Step 4: Define the output PDF file path
        const outputPdfPath = path.resolve(__dirname, "output.pdf");

        // Step 5: Compile the Typst template using a child process
        const command = `typst compile ${filledTemplatePath} ${outputPdfPath}`;
        await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error("Error generating PDF:", stderr);
                    reject(stderr);
                } else {
                    console.log("PDF generated successfully:", stdout);
                    resolve();
                }
            });
        });
    } catch (err) {
        console.error("An error occurred:", err);
    }
}*/

/*function jsObjectToTypstDictionary(obj) {
    const formatValue = (value) => {
      if (Array.isArray(value)) {
        // If it's an array, recursively format it as a tuple or nested structure
        return `(${value.map(formatValue).join(", ")})`;
      } else if (typeof value === "string") {
        // Format strings with double quotes
        return `"${value}"`;
      } else if (typeof value === "boolean") {
        // Format booleans as true/false
        return value ? "true" : "false";
      } else {
        // Handle other primitive types (numbers, null, etc.)
        return value;
      }
    };
  
    // Build the Typst dictionary
    let typstDict = "(";
    for (const [key, value] of Object.entries(obj)) {
      typstDict += `${key}: ${formatValue(value)}, `;
    }
    typstDict = typstDict.slice(0, -2) + ")"; // Remove the last comma and space, then close the dictionary
    return typstDict;
}*/

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
    return typeof value === 'string' && value.trim().startsWith('(') && value.trim().endsWith(')');
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
        }
        else if (typeof value === "string") {
            // Wrap strings in double quotes
            return `"${value}"`;
        }
        else if (typeof value === "number") {
            // Keep numbers as-is
            return `"${value}"`;
        }
        else if (typeof value === "boolean") {
            // Convert booleans to true/false strings
            return value ? "true" : "false";
        }
        else if (typeof value === "object" && value !== null) {
            // Handle nested objects
            let nestedDict = "(";
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                nestedDict += `${nestedKey}: ${formatValue(nestedValue)}, `;
            }
            return nestedDict.slice(0, -2) + ")";
        }
        else if (value === null || value === undefined) {
            // Handle null or undefined explicitly
            return `""`;
        }
        else {
            throw new Error(`Unsupported value type in JSON: ${typeof value} | Value: ${value}`);
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

/*function convertJsonToTypstDict(jsonObject) {
    const formatValue = (value) => {
        if (Array.isArray(value)) {
            // Convert arrays to Typst tuple format with parentheses
            return `(${value.map(formatValue).join(", ")})`;
        } 
        else if (typeof value === "string") {
            // Wrap strings in double quotes
            return `"${value}"`;
        } 
        else if (typeof value === "number") {
            // Keep numbers as-is
            return `"${value}"`;
        } 
        else if (typeof value === "boolean") {
            // Convert booleans to true/false strings
            return value ? "true" : "false";
        } 
        else if (typeof value === "object" && value !== null) {
            // Handle nested objects
            let nestedDict = "(";
            for (const [nestedKey, nestedValue] of Object.entries(value)) {
                nestedDict += `${nestedKey}: ${formatValue(nestedValue)}, `;
            }
            return nestedDict.slice(0, -2) + ")";
        } 
        else if (value === null || value === undefined) {
            // Handle null or undefined explicitly
            return `""`;
        } 
        else {
            throw new Error(`Unsupported value type in JSON: ${typeof value} | Value: ${value}`);
        }
    };

    let typstDict = "(";
    for (const [key, value] of Object.entries(jsonObject)) {
        // Convert key-value pairs into Typst dictionary entries
        typstDict += `"${key}": ${formatValue(value)}, `;
    }
    return typstDict.slice(0, -2) + ")"; // Remove trailing comma and space, close dictionary
}*/

/*function convertJsonToTypstDict(jsonObject) {
    const formatValue = (value) => {
      if (Array.isArray(value)) {
        // Convert arrays to Typst tuple format with parentheses
        return `(${value.map(formatValue).join(", ")})`;
      } else if (typeof value === "string") {
        // Wrap strings in double quotes
        return `"${value}"`;
      } else if (typeof value === "number") {
        // Keep numbers as-is
        return `"${value}"`;
      } else if (typeof value === "object" && value !== null) {
        // Handle nested objects (e.g., items + price)
        let nestedDict = "(";
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          nestedDict += `${nestedKey}: ${formatValue(nestedValue)}, `;
        }
        return nestedDict.slice(0, -2) + ")";
      } else {
        throw new Error("Unsupported value type in JSON");
      }
    };
  
    let typstDict = "(";
    for (const [key, value] of Object.entries(jsonObject)) {
      // Convert key-value pairs into Typst dictionary entries
      typstDict += `"${key}": ${formatValue(value)}, `;
    }
    typstDict = typstDict.slice(0, -2) + ")"; // Remove trailing comma and space, close dictionary
    return typstDict;
}*/

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});