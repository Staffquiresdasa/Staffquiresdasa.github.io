document.addEventListener('submit', async function (e) {
    const form = e.target;
    if (!form.classList.contains('resume-form')) return;

    e.preventDefault();

    const fileInput = form.querySelector('.fileInput');
    const file = fileInput?.files?.[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
        alert('File size should be less than 1MB.');
        return;
    }

    const spinner = form.querySelector('.spinner');
    const submitButton = form.querySelector('.submitButton');

    // Show spinner and hide button
    spinner.style.display = 'inline-block';
    submitButton.style.display = 'none';

    const reader = new FileReader();
    reader.onload = async function (event) {
        const base64File = event.target.result.split(',')[1];
        const formData = new FormData();
        formData.append('media', base64File);

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbzl7L8hUa2e7Z8ksd6idztVEEz6jGN8MC6L1wuG7ZVn5YYLJhMCieaXVnYDX_-cr3Wy/exec', {
                method: 'POST',
                body: formData
            });

            const fileUrl = await response.text();
            form.querySelector('.fileUrl').value = fileUrl;

            // Submit the form after uploading
            form.submit();
        } catch (error) {
            console.error('Upload error:', error);
            alert('There was an error uploading the file.');
        } finally {
            spinner.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
    };

    reader.readAsDataURL(file);
});
