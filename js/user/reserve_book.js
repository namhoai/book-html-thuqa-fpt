$(document).ready(function(){
    // Get Book Reserver
    $.ajax({
     type: "GET",
     url: `${window.DOMAIN_MANAGE_API}/admin/get-book-reserve-by-student/${window.userId}`,
     headers: {
         "Authorization": `Bearer ${localStorage.getItem("token")}`
     },
     dataType: 'json',
     contentType: 'application/json',
     success: function( result ) {
         debugger;
     }
   });
 });
 
 