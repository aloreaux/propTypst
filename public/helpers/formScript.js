const form = document.getElementById("pdf-form");
/** ==========================
     *  Dynamic Equipment Section
     ========================== **/
/*function addEquipSection() {
  const section = document.getElementById('equipment-section');
  const equipDiv = document.createElement('div');
  equipDiv.className = 'nested-section';
  equipDiv.innerHTML = `
    <label>Room Name: <input type="text" name="equipRoomName" placeholder="Room Name" required /></label>
    <div class="equip-items"></div>
    <button type="button" onclick="addEquipItem(this)">Add Item</button>
    <button type="button" onclick="this.parentNode.remove()">Remove Room</button>
  `;
  section.appendChild(equipDiv);
}*/
function addEquipSection() {
    const section = document.getElementById('equipment-section');
    const equipDiv = document.createElement('div');
    equipDiv.className = 'nested-section equip-room'; // Added 'equip-room' class
    equipDiv.innerHTML = `
            <label>Room Name: <input type="text" name="equipRoomName" placeholder="Room Name" required /></label>
            <div class="equip-items"></div>
            <button type="button" onclick="addEquipItem(this)">Add Item</button>
            <button type="button" onclick="this.parentNode.remove()">Remove Room</button>
        `;
    section.appendChild(equipDiv);
}

function addEquipItem(button) {
    const container = button.previousElementSibling;
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
        <label>Item: <input type="text" name="equipItem" required /></label>
        <button type="button" onclick="this.parentNode.remove()">Remove Item</button>
      `;
    container.appendChild(itemDiv);
}

/** ==========================
 *  Dynamic Summary Section
 ========================== **/
function addSummarySolution() {
    const container = document.getElementById('summary-solutions');
    const solutionDiv = document.createElement('div');
    solutionDiv.className = 'nested-section';
    solutionDiv.innerHTML = `
        <label>Solution: <input type="text" name="summarySolution" required /></label>
        <button type="button" onclick="this.parentNode.remove()">Remove Solution</button>
      `;
    container.appendChild(solutionDiv);
}

/** ==========================
 *  Dynamic Investment Section
 ========================== **/
/*function addInvestSection() {
  const section = document.getElementById('investment-section');
  const investDiv = document.createElement('div');
  investDiv.className = 'nested-section';
  investDiv.innerHTML = `
    <label>Section Name: <input type="text" name="investSectionName" required /></label>
    <div class="invest-items"></div>
    <button type="button" onclick="addInvestItem(this)">Add Item</button>
    <label>Price: <input type="text" name="investPrice" /></label>
    <button type="button" onclick="this.parentNode.remove()">Remove Section</button>
  `;
  section.appendChild(investDiv);
}*/

/*function addInvestSection() {
    const section = document.getElementById('investment-section');
    const investDiv = document.createElement('div');
    investDiv.className = 'nested-section invest-section'; // Added 'invest-section' class
    investDiv.innerHTML = `
        <label>Section Name: <input type="text" name="investSectionName" required /></label>
        <div class="invest-items"></div>
        <button type="button" onclick="addInvestItem(this)">Add Item</button>
        <label>Price: <input type="text" name="investPrice" /></label>
        <button type="button" onclick="this.parentNode.remove()">Remove Section</button>
    `;
    section.appendChild(investDiv);
}

function addInvestItem(button) {
  const container = button.previousElementSibling;
  const itemDiv = document.createElement('div');
  itemDiv.innerHTML = `
    <label>Item: <input type="text" name="investItem" required /></label>
    <button type="button" onclick="this.parentNode.remove()">Remove Item</button>
  `;
  container.appendChild(itemDiv);
}*/

let currentDragElement = null;

/** ==========================
 * Add New Investment Section
 ========================== **/
/*function addInvestSection() {
  const container = document.getElementById('investment-container');
  const investDiv = document.createElement('div');
  investDiv.className = 'nested-section invest-section';
  investDiv.setAttribute('draggable', true); // Enable drag-and-drop
  investDiv.innerHTML = `
    <label>Section Name: <input type="text" name="investSectionName" required /></label>
    <div class="invest-items"></div>
    <button type="button" onclick="addInvestItem(this)">Add Item</button>
    <label>Price: <input type="text" name="investPrice" /></label>
    <button type="button" onclick="this.parentNode.remove()">Remove Section</button>
  `;

  // Add drag-and-drop event listeners
  investDiv.addEventListener('dragstart', (e) => {
    currentDragElement = investDiv;
    investDiv.style.opacity = '0.5'; // Highlight dragging
  });

  investDiv.addEventListener('dragend', () => {
    currentDragElement.style.opacity = '1'; // Remove highlight
    currentDragElement = null;
  });

  investDiv.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
    const target = e.target.closest('.invest-section');
    if (target && target !== currentDragElement) {
      container.insertBefore(currentDragElement, target.nextSibling);
    }
  });

  container.appendChild(investDiv);
}*/

/** ==========================
* Add New Investment Section
========================== **/
function addInvestSection(name = "", items = [], price = "") {
    const container = document.getElementById("investment-container");
    if (!container) {
        console.error("Investment container not found!");
        return;
    }

    const investDiv = document.createElement("div");
    investDiv.className = "nested-section invest-section";
    investDiv.setAttribute("draggable", true); // Enable drag-and-drop
    investDiv.innerHTML = `
      <label>Section Name: <input type="text" name="investSectionName" value="${name}" required /></label>
      <div class="invest-items">
        ${items
            .map(
                (item) => `
          <div>
            <label>Item: <input type="text" name="investItem" value="${item}" size="175" required /></label>
            <button type="button" onclick="this.parentNode.remove()">Remove Item</button>
          </div>
        `
            )
            .join("")}
      </div>
      <button type="button" onclick="addInvestItem(this)">Add Item</button>
      <label>Price: <input type="text" name="investPrice" value="${price}" /></label>
      ${name !== "Freight" ? '<button type="button" onclick="this.parentNode.remove()">Remove Section</button>' : ""}
    `;

    investDiv.addEventListener("dragstart", (e) => {
        currentDragElement = investDiv;
        investDiv.style.opacity = "0.5"; // Highlight dragging
    });

    investDiv.addEventListener("dragend", () => {
        currentDragElement.style.opacity = "1"; // Remove highlight
        currentDragElement = null;
    });

    investDiv.addEventListener("dragover", (e) => {
        e.preventDefault(); // Allow dropping
        const container = document.getElementById("investment-container");
        const target = e.target.closest(".invest-section");

        if (target && target !== currentDragElement) {
            // Insert before the valid target
            container.insertBefore(currentDragElement, target);
        } else if (!target) {
            // If no target, move to the top of the container
            container.insertBefore(currentDragElement, container.firstChild);
        }
    });

    container.appendChild(investDiv);
}

/** ==========================
 * Add New Item to Investment Section
 ========================== **/
function addInvestItem(button) {
    const container = button.previousElementSibling;
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <label>Item: <input type="text" name="investItem" size="175" required /></label>
      <button type="button" onclick="this.parentNode.remove()">Remove Item</button>
    `;
    container.appendChild(itemDiv);
}

/** ==========================
 * Add New Item to Investment Section
 ========================== **/
function addInvestItem(button) {
    const container = button.previousElementSibling;
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
        <label>Item: <input type="text" name="investItem" required /></label>
        <button type="button" onclick="this.parentNode.remove()">Remove Item</button>
      `;
    container.appendChild(itemDiv);
}


document.addEventListener("DOMContentLoaded", () => {
    // Add default "Freight" section
    addInvestSection("Freight", ["SHIPPER PREPAYS FREIGHT – ADDS TO CUSTOMER INVOICE", "Due to volatility in freight charges, the shipping cost provided on this quote is an ESTIMATE only. Freight costs and the number of truckloads may change. The actual freight cost will be charged at the time of shipment OR on the final invoice."], ""); // Predefined items and empty price
});

/** Generate JSON */
document.getElementById("generate-json").addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // Filter out certain fields
    const filteredData = Array.from(formData.entries()).filter(([key, value]) => {
        // Exclude fields with specific names
        return !['investSectionName', 'investItem', 'investPrice'].includes(key);
    });

    const data = Object.fromEntries(filteredData);

    data.equip = {};
    data.summary = { Objectives: formData.get('summaryObjective'), Solutions: [] };
    data.invest = {};

    /** ==========================
     * Process Equipment Section (Dynamic)
     ========================== **/
    const equipSections = document.querySelectorAll('.equip-room');
    equipSections.forEach((section) => {
        const roomName = section.querySelector('[name="equipRoomName"]').value.trim();
        if (roomName) {
            const items = Array.from(
                section.querySelectorAll('[name="equipItem"]')
            )
                .map((item) => item.value.trim())
                .filter((item) => item);
            if (items.length > 0) {
                data.equip[roomName] = items;
            }
        }
    });

    /** ==========================
     * Process Summary Section
     ========================== **/
    document.querySelectorAll('[name="summarySolution"]').forEach((input) => {
        const solution = input.value.trim();
        if (solution) {
            data.summary.Solutions.push(solution);
        }
    });

    /** ==========================
     * Process Investment Section (Dynamic)
     ========================== **/
    const investSections = document.querySelectorAll('.invest-section');
    investSections.forEach((section) => {
        const sectionName = section.querySelector('[name="investSectionName"]').value.trim();
        if (sectionName) {
            const items = Array.from(
                section.querySelectorAll('[name="investItem"]')
            )
                .map((item) => item.value.trim())
                .filter((item) => item);

            const priceInput = section.querySelector('[name="investPrice"]');
            const price = priceInput && priceInput.value.trim() ? priceInput.value : null;

            if (items.length > 0 || price) {
                data.invest[sectionName] = {
                    items: items,
                    ...(price ? { price } : {}) // Add price only if it's non-empty
                };
            }
        }
    });

    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "form-data.json";
    link.click();
});

/** ==========================
* Form Submission
========================== **/
document.getElementById('generate-pdf').addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // Filter out certain fields
    const filteredData = Array.from(formData.entries()).filter(([key, value]) => {
        // Exclude fields with specific names
        return !['investSectionName', 'investItem', 'investPrice'].includes(key);
    });

    const data = Object.fromEntries(filteredData);

    data.equip = {};
    data.summary = { Objectives: formData.get('summaryObjective'), Solutions: [] };
    data.invest = {};

    /*const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        customer: formData.get('customer'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
        extension: formData.get('extension'),
        cell: formData.get('cell'),
        quantity: formData.get('quantity'),
        carriage: formData.get('carriage'),
        quote: formData.has('quote'),
        summaryBool: formData.has('summaryBool'),
        imgpath: formData.get('imgpath'),
        equip: {},
        summary: { Objective: formData.get('summaryObjective'), Solutions: [] },
        invest: {}
    };*/

    /** ==========================
     * Process Equipment Section (Dynamic)
     ========================== **/
    const equipSections = document.querySelectorAll('.equip-room');
    equipSections.forEach((section) => {
        const roomName = section.querySelector('[name="equipRoomName"]').value.trim();
        if (roomName) {
            const items = Array.from(
                section.querySelectorAll('[name="equipItem"]')
            )
                .map((item) => item.value.trim())
                .filter((item) => item);
            if (items.length > 0) {
                data.equip[roomName] = items;
            }
        }
    });

    /** ==========================
     * Process Summary Section
     ========================== **/
    document.querySelectorAll('[name="summarySolution"]').forEach((input) => {
        const solution = input.value.trim();
        if (solution) {
            data.summary.Solutions.push(solution);
        }
    });

    /** ==========================
     * Process Investment Section (Dynamic)
     ========================== **/
    const investSections = document.querySelectorAll('.invest-section');
    investSections.forEach((section) => {
        const sectionName = section.querySelector('[name="investSectionName"]').value.trim();
        if (sectionName) {
            const items = Array.from(
                section.querySelectorAll('[name="investItem"]')
            )
                .map((item) => item.value.trim())
                .filter((item) => item);

            const priceInput = section.querySelector('[name="investPrice"]');
            const price = priceInput && priceInput.value.trim() ? priceInput.value : null;

            if (items.length > 0 || price) {
                data.invest[sectionName] = {
                    items: items,
                    ...(price ? { price } : {}) // Add price only if it's non-empty
                };
            }
        }
    });

    console.log('Final Data Before Sending:', JSON.stringify(data, null, 2));

    try {
        const response = await fetch('/generate-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const blob = await response.blob();
            const pdfUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'generated.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(pdfUrl);
            alert('PDF generated successfully!');
        } else {
            console.error('PDF generation failed:', await response.text());
            alert('Failed to generate PDF');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while generating the PDF.');
    }
});

document.getElementById("load-json").addEventListener("click", async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);
                populateForm(jsonData);
            } catch (error) {
                console.error("Invalid JSON file", error);
                alert("Failed to load JSON file. Please check its structure.");
            }
        };
        reader.readAsText(file);
    });

    fileInput.click();
});

// Populate form with data
function populateForm(data) {
    const form = document.getElementById("pdf-form");

    // Populate basic fields
    Object.keys(data).forEach((key) => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === "checkbox") {
                field.checked = data[key];
            } else {
                field.value = data[key];
            }
        }
    });

    // Handle equipment (dynamically create missing rooms and items)
    if (data.equip && Object.keys(data.equip).length > 0) {
        const equipSection = document.getElementById("equipment-section");
        equipSection.innerHTML = ""; // Clear existing equipment
        Object.entries(data.equip).forEach(([roomName, items]) => {
            const roomDiv = document.createElement("div");
            roomDiv.className = "nested-section equip-room";
            roomDiv.innerHTML = `
                <label>Room Name: <input type="text" name="equipRoomName" value="${roomName}" placeholder="Room Name" required /></label>
                <div class="equip-items">
                    ${items
                    .map(
                        (item) => `
                        <div>
                            <label>Item: <input type="text" name="equipItem" value="${item}" required /></label>
                            <button type="button" onclick="this.parentNode.remove()">Remove Item</button>
                        </div>
                    `
                    )
                    .join("")}
                </div>
                <button type="button" onclick="addEquipItem(this)">Add Item</button>
                <button type="button" onclick="this.parentNode.remove()">Remove Room</button>
            `;
            equipSection.appendChild(roomDiv);
        });
    } else {
        const equipSection = document.getElementById("equipment-section");
        equipSection.innerHTML = `
            <button type="button" onclick="addEquipSection()">Add Room</button>
        `;
    }

    // Handle summary solutions
    if (data.summary && data.summary.Solutions) {
        const summaryContainer = document.getElementById("summary-solutions");
        summaryContainer.innerHTML = ""; // Clear existing solutions
        data.summary.Solutions.forEach((solution) => {
            const solutionDiv = document.createElement("div");
            solutionDiv.className = "nested-section";
            solutionDiv.innerHTML = `
                <label>Solution: <input type="text" name="summarySolution" value="${solution}" required /></label>
                <button type="button" onclick="this.parentNode.remove()">Remove Solution</button>
            `;
            summaryContainer.appendChild(solutionDiv);
        });
    }

    // Handle investment sections (dynamically create missing sections and items)
    if (data.invest) {
        const investContainer = document.getElementById("investment-container");
        investContainer.innerHTML = ""; // Clear existing investment sections
        Object.entries(data.invest).forEach(([sectionName, { items, price }]) => {
            addInvestSection(sectionName, items || [], price || "");
        });
    }
}