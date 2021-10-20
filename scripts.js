let scrnHeight = Math.floor($(window).height() / 1.4);
let scrnWidth = $(window).width() / 1.2;

$(".sorting").css("min-height", scrnHeight + "px"); // set the height for the sorting window


// on button click
$(".btn").on("click", function () {

    $(".sorting").empty();

    let numElmt = Math.abs($(".inputField").val()); // get number of items to sort

    // make sure numElmt is in the valid interval
    if (numElmt > 400) {
        numElmt = 400;
    }
    else if (numElmt < 2) {
        numElmt = 2;
    }

    let elmtwidth = Math.floor((scrnWidth / numElmt)); // calculate width of each element

    // make sure elmtwidth is in the valid interval
    if (elmtwidth > 20) {
        elmtwidth = 20;
    }

    for (let i = 0; i < numElmt; i++) {
        $(".sorting").append("<div class=\"elmt " + i + "\"></div>"); // add element to the "sorting" div

        let elmtHeight = Math.floor(Math.random() * (scrnHeight - 5) + 5); // generate random height in [5, scrnHeight)
        $("." + i).css("height", elmtHeight); // set the height for the element
    }

    $(".elmt").css("width", elmtwidth + "px");
});

