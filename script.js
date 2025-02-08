document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll(".checkbox");
    const outputText = document.getElementById("outputText");
    const outputSku = document.getElementById("outputSku");
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

        // Update output boxes with selected messages and SKUs
        outputText.textContent = messages.length > 0 ? messages.join(" | ") : "לא נבחרו שירותים";
        outputSku.textContent = skuCodes.length > 0 ? skuCodes.join(" | ") : "לא נבחרו קודים";
    }

    // Attach event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updateOutput);
    });

    // Clear All Function
    clearAllButton.addEventListener("click", function() {
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        updateOutput();
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

    updateOutput(); // Ensure it starts with a default message
});
