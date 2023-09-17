
const editedBlog = {
    title: "",
    content: "",
    author: "",
    imagePath: "",
};

  
function editBlog() {

    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const authorInput = document.getElementById('author');
    const imageInput = document.getElementById('image');

    const blogID = document.getElementById('blogID');
    const blogIdToEdit = blogID.getAttribute('blogId'); 


    fetch(`http://localhost:3000/blogs/${blogIdToEdit}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      editedBlog.title = data.title;
      editedBlog.content = data.content;
      editedBlog.author = data.author;
      editedBlog.imagePath = data.imagePath;
      

      if (titleInput && contentInput && authorInput && imageInput) {
        titleInput.value = editedBlog.title;
        contentInput.value = editedBlog.content;
        authorInput.value = editedBlog.author;
        imageInput.value = editedBlog.imagePath;
      }
    })
    .catch(error => {
      console.error('Error fetching blog data:', error);
    });
}

  
window.addEventListener('DOMContentLoaded', editBlog);
  