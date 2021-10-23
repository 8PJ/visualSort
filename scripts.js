let scrnHeight = Math.floor($(window).height() / 1.4);
let scrnWidth = $(window).width() / 1.3;

$(".sorting").css("min-height", scrnHeight + "px"); // set the height for the sorting window


let numOfElmt = 0;

// on button click
$(".btn").on("click", function () {

    $(".sorting").empty();

    let numElmt = Math.abs($(".inputField").val()); // get number of items to sort

    // make sure numElmt is in the valid interval
    if (numElmt > 300) {
        numElmt = 300;
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
});

// helper functions

function getHeight(index) {

    return Number($("#" + index).height());
}

function swap(swaps, numElmt) {

    const speed = (numElmt < 3) ? 1000 : (numElmt < 5) ? 500 : (numElmt < 8) ? 300 : (numElmt < 10) ?
    200 : (numElmt < 15) ? 100 : (numElmt < 20) ? 50 : (numElmt < 30) ? 20 : (numElmt < 50) ? 10 : (numElmt < 100) ?
    5 : (numElmt < 200) ? 2 : 1;

    for (let i = 0; i < swaps.length + 1; i++) {

        setTimeout(function () {

            if (i < swaps.length) {

                // set color back of the previous comparison
                if (i > 0) {
                    $("#" + swaps[i - 1].index2).css("background-color", "#696969");
                    $("#" + swaps[i - 1].index1).css("background-color", "#696969");
                }

                // set color to red if height1 > height2, green otherwise
                let color = (swaps[i].right) ? "green" : "red";
                $("#" + swaps[i].index2).css("background-color", color);
                $("#" + swaps[i].index1).css("background-color", color);

                // swap heights if they aren't in right order
                if (!swaps[i].right) {
                    $("#" + swaps[i].index2).css("height", swaps[i].height1 + "px");
                    $("#" + swaps[i].index1).css("height", swaps[i].height2 + "px");
                }
            }
            else if (i == swaps.length) { // set color back of the last comparison
                $("#" + swaps[swaps.length - 1].index2).css("background-color", "#696969");
                $("#" + swaps[swaps.length - 1].index1).css("background-color", "#696969");
            }
        }, i * speed);
    }
}

// pairs to swap
class Pair {

    constructor(right, index1, index2, height1, height2) {
        this.index1 = index1;
        this.index2 = index2;
        this.height1 = height1;
        this.height2 = height2;
        this.right = right;
    }
}

// sorts

// bubble sort
function bubbleSort(numElmt) {

    let heights = [];
    let swaps = [];

    for (let i = 0; i < numElmt; i++) {
        heights.push(getHeight(i));
    }

    for (let i = 0; i < numElmt - 1; i++) {
        for (let j = 0; j < numElmt - i - 1; j++) {
            if (heights[j] > heights[j + 1]) {
                const s = new Pair(false, j, j + 1, heights[j], heights[j + 1]);
                swaps.push(s);

                let tmp = heights[j];
                heights[j] = heights[j + 1];
                heights[j + 1] = tmp;
            }
            else {
                let s = new Pair(true, j, j + 1);
                swaps.push(s);
            }
        }
    }
    swap(swaps, numElmt);
}