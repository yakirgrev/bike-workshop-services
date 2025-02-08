document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll(".checkbox");
    const outputText = document.getElementById("outputText");
    const outputSku = document.getElementById("outputSku");
    const userNameInput = document.getElementById("userName");
    const clearAllButton = document.getElementById("clearAllButton");

    function updateOutput() {
        let messages = [];
        let skuCodes = [];

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                messages.push(checkbox.getAttribute("data-text"));
                skuCodes.push(checkbox.getAttribute("data-sku"));
            }
        });

        let userName = userNameInput.value.trim();
        let timestamp = new Date().toLocaleString("he-IL"); // Hebrew date & time format

        if (messages.length > 0) {
            let namePart = userName ? `👤 שם המכונאי: ${userName} | ` : "";
            let timestampPart = `⏳ ${timestamp} | `;
            
            outputText.textContent = `📢 שירותים: ${messages.join(", ")}`;
            outputSku.textContent = `${namePart}${timestampPart}🔢 מק"טים: ${skuCodes.join(", ")}`;
        } else {
            outputText.textContent = "לא נבחרו שירותים";
            outputSku.textContent = "לא נבחרו קודים";
        }
    }

    // Attach event listeners to all checkboxes and the name input
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateOutput);
    });

    userNameInput.addEventListener("input", updateOutput);

    // Clear All Button
    clearAllButton.addEventListener("click", function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        outputText.textContent = "לא נבחרו שירותים";
        outputSku.textContent = "לא נבחרו קודים";
    });

    // Copy Text Function
    window.copyText = function(elementId) {
        const textToCopy = document.getElementById(elementId).textContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("📋 התוכן הועתק ללוח!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    updateOutput(); // Ensure initial state is displayed
});
