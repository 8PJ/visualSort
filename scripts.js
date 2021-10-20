let scrnHeight = Math.floor($(window).height() / 1.4);
let scrnWidth = $(window).width() / 1.2;

$(".sorting").css("min-height", scrnHeight + "px"); // set the height for the sorting window


let numOfElmt = 0;

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
        $(".sorting").append("<div class=\"elmt\" id=" + i + "></div>"); // add element to the "sorting" div

        let elmtHeight = Math.floor(Math.random() * (scrnHeight - 5) + 5); // generate random height in [5, scrnHeight)
        $("#" + i).css("height", elmtHeight); // set the height for the element
    }

    $(".elmt").css("width", elmtwidth + "px");

    numOfElmt = numElmt;
});


// sorting

$(".btnSort").on("click", function () {
    bubbleSort(numOfElmt);
    // // set color to red
    // $("#0").css("background-color", "red");
    // $("#1").css("background-color", "red");

    // // swap heights
    // let height2 = getHeight(1);
    // $("#1").css("height", getHeight(0) + "px");
    // $("#0").css("height", height2 + "px");

    // // swap ids
    // $("#0").prop("id", "tmp");
    // $("#1").prop("id", "0");
    // $("#tmp").prop("id", "1");

    // // set color back
    // setTimeout(function () {
    //     $("#1").css("background-color", "#31927D");
    //     $("#0").css("background-color", "#31927D");
    // }, 200);
});

// helper functions

function getHeight(index) {

    return Number($("#" + index).height());
}

function swap(index1, index2) {

    // set color to red
    $("#" + index2).css("background-color", "red");
    $("#" + index1).css("background-color", "red");

    // swap heights
    let height2 = getHeight(index2);
    $("#" + index2).css("height", getHeight(index1) + "px");
    $("#" + index1).css("height", height2 + "px");

    // swap ids
    $("#" + index1).prop("id", "tmp");
    $("#" + index2).prop("id", index1);
    $("#tmp").prop("id", index2);

    // set color back
    setTimeout(function () {
        $("#" + index2).css("background-color", "#31927D");
        $("#" + index1).css("background-color", "#31927D");
    }, 200);
}

// sorts

// bubble sort
function bubbleSort(numElmt) {

    for (let i = 0; i < numElmt - 1; i++) {
        for (let j = 0; j < numElmt - i - 1; j++) {
            if (getHeight(j) > getHeight(j + 1)) {
                swap(j, j + 1);
            }
        }
    }
}