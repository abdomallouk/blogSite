document.addEventListener('DOMContentLoaded', function () {

        const deleteButtons = document.querySelectorAll('.delete-blog');

        deleteButtons.forEach(button => {
            button.addEventListener('click', e => {
            e.preventDefault();
            e.currentTarget.parentElement.parentElement.parentElement.remove()
            
            const blogId = button.getAttribute('data-blogid');

            fetch(`/deleteBlog/${blogId}`, {
                method: 'GET',
            })
                .then(response => {
                if (response.status === 204) {
                    const cardToRemove = button.closest('.blog-content');
                    if (cardToRemove) {
                    cardToRemove.remove();
                    }
                } else {
                    console.error('Error deleting blog:', response.statusText);
                }
                })
                .catch(error => {
                console.error('Error deleting blog:', error);
                });
            });
        });
});




































// const deleteBlog = document.getElementById('deleteBlog')
// const card = document.getElementsByClassName('card')



// deleteBlog.addEventListener('click', removeCard)


// document.addEventListener('DOMContentLoaded', function () {

//     const deleteButtons = document.querySelectorAll('.delete-blog');

//     deleteButtons.forEach(button => {
//         button.addEventListener('click',e=>{
//             e.preventDefault();
//             ///fetch here 
//             e.currentTarget.parentElement.parentElement.parentElement.remove()
//         });
//     });
// });

