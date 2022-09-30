$(document).ready(function() {
    let contentCategories = "";
    window.categories.forEach(category => {
        contentCategories += `
            <div class="card">
                <img src="image/anh-nen-den-cho-dien-thoai.jpg" class="card-img" alt="...">
                <div class="card-img-overlay text-center">
                  <h5 class="card-title" style="margin-top: 30%;">${category.name}</h5>
                  <p class="card-text" style="margin-top: 20%;">${category.description}</p>
                  <a href="" class="btn btn-primary btn-block  p-3 ps-4 pe-4"
                    style="margin-top: 20%; background-color: #006A2D;">${category.name}</a>
                </div>
              </div>
        `
    });

    // load category
    $("#owl-carousel").html(contentCategories)
});
