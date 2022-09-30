$(document).ready(function(){

    const bookId = window.getURLParameter("bookId") || 1

    // Get Book Detail
    $.ajax({
     type: "GET",
     url: `${window.DOMAIN_BOOK_API}/get/book-by-id/${bookId}`,
     headers: {
         "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
     dataType: 'json',
     contentType: 'application/json',
     success: function( result ) {
         window.listBookUser = [result]

         $("#detailBookTitle").html(result.name)
         $("#detailBookYear").html(`Year Published: ${result.year}`)
         $("#detailBookEdition").html(`Edition: ${result.edition}`)
         $("#detailBookISBN").html(`ISBN: ${result.isbn}`)
         $("#detailBookAuthor").html(`Author: ${result.author}`)
         $("#detailBookAbstract").html(result.abstract)
         $("#detailBookCategory").html(`Category: ${result.category}`)
         

         $("#btnReserver").html(`
            <button onclick="onReserveBook(${result.id})" type="button" class="btn btn-primary mt-5" data-bs-toggle="modal"
            data-bs-target="#reserve_Form" style="background-color:#006A2D ;">Reserve</button>
         `)
     }
   });
 });
 
 