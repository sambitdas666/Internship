document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validation checks
    if (name.trim() === "") {
        alert("Name is required!");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email!");
        return;
    }

    if (message.trim().length < 10) {
        alert("Message must be at least 10 characters long.");
        return;
    }

    alert("Form submitted successfully!");
    this.reset(); // Clear form after submission
});

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    const imageUpload = document.getElementById('imageUpload');
    const addImageBtn = document.getElementById('addImageBtn');
    const thumbnailPreview = document.getElementById('thumbnailPreview');
    const imageGallery = document.getElementById('imageGallery');

    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    // Add Todo Functionality
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') addTodo();
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (!todoText) return;

        const li = document.createElement('li');
        li.className = 'todo-item';

        li.innerHTML = `
                    <div class="todo-content">${todoText}</div>
                    <div class="item-actions">
                        <button class="delete-btn">Delete</button>
                    </div>
                `;

        // Add delete functionality
        li.querySelector('.delete-btn').addEventListener('click', function () {
            li.remove();
        });

        todoList.appendChild(li);
        todoInput.value = '';
    }

    // Image Gallery Functionality
    addImageBtn.addEventListener('click', function () {
        if (imageUpload.files.length > 0) {
            Array.from(imageUpload.files).forEach(file => {
                addImageToGallery(file);
            });
            imageUpload.value = '';
            thumbnailPreview.innerHTML = '';
        }
    });

    // Show thumbnails when files are selected
    imageUpload.addEventListener('change', function () {
        thumbnailPreview.innerHTML = '';
        if (this.files.length > 0) {
            Array.from(this.files).forEach(file => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.className = 'thumbnail';
                    img.src = e.target.result;
                    thumbnailPreview.appendChild(img);
                }
                reader.readAsDataURL(file);
            });
        }
    });

    function addImageToGallery(file) {
        if (!file.type.match('image.*')) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const li = document.createElement('li');
            li.className = 'gallery-item';

            const img = document.createElement('img');
            img.className = 'gallery-image';
            img.src = e.target.result;

            li.innerHTML = `
                        <div class="item-actions">
                            <button class="delete-btn">Delete</button>
                        </div>
                    `;

            li.insertBefore(img, li.firstChild);

            // Add click to view larger
            img.addEventListener('click', function () {
                modalImage.src = this.src;
                imageModal.style.display = 'flex';
            });

            // Add delete functionality
            li.querySelector('.delete-btn').addEventListener('click', function () {
                li.remove();
            });

            imageGallery.appendChild(li);
        }
        reader.readAsDataURL(file);
    }

    // Modal functionality
    closeModal.addEventListener('click', function () {
        imageModal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
});