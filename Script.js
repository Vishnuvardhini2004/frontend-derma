// Function to display the selected image
function previewImage() {
  const fileInput = document.getElementById('imageUpload');
  const preview = document.getElementById('preview');
  const imagePreview = document.getElementById('imagePreview');

  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

// Function to handle the image upload and submit
async function uploadImage() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];
  
  if (!file) {
    alert("Please select an image.");
    return;
  }
  
  const formData = new FormData();
  formData.append('image', file);

  try {
    // Assuming your backend is hosted on localhost:5000 or similar
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      displayResults(result);
    } else {
      alert("Error processing the image. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
}

// Function to display results after prediction
function displayResults(result) {
  const diseaseName = document.getElementById('diseaseName');
  const confidenceLevel = document.getElementById('confidenceLevel');

  diseaseName.textContent = `Detected Disease: ${result.disease}`;
  confidenceLevel.textContent = `Confidence: ${result.confidence}%`;
}

// Event listener for the file input
document.getElementById('imageUpload').addEventListener('change', previewImage);
