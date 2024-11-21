document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission to allow validation
    // Clear previous error messages
    clearErrorMessages();

    let isValid = true;

    // Get form field values
    const firstNameField = document.getElementById("firstName");
    const lastNameField = document.getElementById("lastName");
    const emailField = document.getElementById("email");
    const queryFields = document.querySelectorAll('input[name="Query"]');
    const messageField = document.getElementById("Message");
    const checkBoxField = document.getElementById("checkBox");

    const firstName = firstNameField.value.trim();
    const lastName = lastNameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();
    const query = Array.from(queryFields).find((radio) => radio.checked);
    const consentChecked = checkBoxField.checked;


    if (!firstName) {
      isValid = false;
      displayError("firstNameError", "This field is required", firstNameField);
    }


    if (!lastName) {
      isValid = false;
      displayError("lastNameError", "This field is required", lastNameField);
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      isValid = false;
      displayError(
        "emailError",
        "Please enter a valid email address",
        emailField
      );
    }

    if (!query) {
      isValid = false;
      displayError("queryError", "This field is required", queryFields[0]);
    }

    if (!message) {
      isValid = false;
      displayError("messageError", "This field is required", messageField);
    }

    if (!consentChecked) {
      isValid = false;
      displayError(
        "checkBoxError",
        "To submit this form, please consent to being contacted",
        checkBoxField
      );
    }

    if (isValid) {
      document.getElementById("popupModal").style.display = "flex";
    }
  });

window.addEventListener("click", function (event) {
  const modal = document.getElementById("popupModal");
  if (event.target === modal) {
    document.getElementById("popupModal").style.display = "none";
  }
});

// Helper function to create and display error message
function displayError(elementId, message, inputField) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = "block";
  inputField.style.borderColor = "hsl(0, 66%, 54%)";
}

function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error");
  errorMessages.forEach((error) => {
    error.textContent = ""; 
    error.style.display = "none";
  });

  // Reset the border color of input fields
  const inputFields = document.querySelectorAll("input, textarea");
  inputFields.forEach((input) => {
    input.style.borderColor = ""; 
  });
}
