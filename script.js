const form = document.getElementById('jobApplicationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const resumeInput = document.getElementById('resume');
const submitBtn = document.getElementById('submitBtn');

// Regular expressions for validation
const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

// Error messages
const errorMessages = {
  name: 'Name must contain only letters',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid phone number (XXX-XXX-XXXX)',
  address: 'Please enter your address',
  resume: 'Please upload a file (pdf, docx) not exceeding 5MB'
};

// Allowed file extensions and file size limit for resume upload
const allowedExtensions = ['pdf', 'docx']; // Allowed file extensions
const fileSizeLimit = 5 * 1024 * 1024; // 5MB file size limit

// Function to show error message
function showError(inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
  errorElement.classList.add('show'); // Add 'show' class to display error message
}

// Function to remove error message
function removeError(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove('show'); // Remove 'show' class to hide error message
}

// Function to validate form fields
function validateForm() {
  let isValid = true;

  // Name validation
  if (!nameRegex.test(nameInput.value.trim())) {
    showError(nameInput, errorMessages.name);
    isValid = false;
  } else {
    removeError(nameInput);
  }

  // Email validation
  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, errorMessages.email);
    isValid = false;
  } else {
    removeError(emailInput);
  }

  // Phone validation
  if (!phoneRegex.test(phoneInput.value.trim())) {
    showError(phoneInput, errorMessages.phone);
    isValid = false;
  } else {
    removeError(phoneInput);
  }

  // Address validation
  if (addressInput.value.trim() === '') {
    showError(addressInput, errorMessages.address);
    isValid = false;
  } else {
    removeError(addressInput);
  }

  // Resume validation
  const file = resumeInput.files[0];
  if (!file || !allowedExtensions.includes(file.name.split('.').pop()) || file.size > fileSizeLimit) {
    showError(resumeInput, errorMessages.resume);
    isValid = false;
  } else {
    removeError(resumeInput);
  }

  // Enable/disable submit button based on form validity
  submitBtn.disabled = !isValid;

  return isValid;
}

// Real-time validation on input change
form.addEventListener('input', validateForm);
