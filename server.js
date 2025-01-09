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
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const docDefaults = { 
    corporate: true,
    quote: true,
    title: "New Web App",
    author: "John Doe",
    imgpath: "assets/business.jpg",
};

const cornerImgPath = {
    "assets/business.jpg" : "assets/biz.svg",
    "assets/grow.jpg" : "assets/grow.svg",
    "assets/edu.jpg" : "assets/edu.svg",
};

const equipSpec = {
    "Room 1": ["Item 1","Item 2","Item 3"], 
    "Room 2": ["Item 4","Item 5","Item 6"], 
    "Room 3": ["Item 7",] 
};

const sumSpec = {
    "Objective": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur. Quod idem licet transferre in voluptatem, ut postea variari voluptas distinguique possit, augeri amplificarique non possit.",
    "Solution": ["Sol 1", "Sol 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim aeque doleamus animo, cum corpore dolemus, fieri tamen permagna accessio potest, si aliquod aeternum et infinitum impendere malum nobis opinemur."]
}

const investSpec = {
    "Product": {items: ["item 1", "item 2", "item 3"], price: 336258},
    "Install": {items: ["item 1", "item 3"], price: 74260.95},
    "Freight": {items: ["item 1", "item 2", "item 3"], price: 39625}
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

app.post("/generate-pdf", (req, res) => {
    try {
        const docForm = { ...docDefaults, ...req.body };

        // Boolean conversion
        docForm.quote = !!docForm.quote;
        docForm.summaryBool = !!docForm.summaryBool;

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
});

async function generatePDF(docform) {
  try {
    // Step 1: Load the Typst template
    const templatePath = path.resolve(__dirname, "doc.typ");
    let template = fs.readFileSync(templatePath, "utf-8");   

    // Step 2: Replace the placeholder with dynamic data
    for(const [key, value] of Object.entries(docform)) {
        const placeholder = '$' + key + '$';
        if(typeof value === 'boolean') {
            template = template.replace(placeholder, value);
        }
        else if(typeof value === 'string'){
            if(isTypstDictionaryString(value)) {
                template = template.replace(placeholder, removeOuterQuotesIfWrapped(value))
            } else {
                template = template.replace(placeholder, '"'+value+'"');
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
}

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