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
    let sortMethod = $(".sortMethod").val();

    if (sortMethod == "bubble") {
        bubbleSort(numOfElmt);
    }
    else if (sortMethod == "insertion") {
        insertionSort(numOfElmt);
    }
    else if (sortMethod == "selection") {
        selectionSort(numOfElmt);
    }
    else if (sortMethod == "merge") {
        mergeSort(numOfElmt);
    }
    else if (sortMethod == "quick") {
        quickSort(numOfElmt);
    }
});

// helper functions

function getHeight(index) {

    return Number($("#" + index).height());
}

function getHeights(numElmt) {

    let heights = [];

    for (let i = 0; i < numElmt; i++) {
        heights.push(getHeight(i));
    }

    return heights;
}

function swap(swaps) {

    let speed = ($(".speed").val() - 101) * -1;

    for (let i = 0; i < swaps.length + 1; i++) {

        setTimeout(function () {

            if (i < swaps.length) {
                // set color back of the previous comparison
                if (i > 0) {

                    $("#" + swaps[i - 1].index2).css("background-color", "#696969");
                    $("#" + swaps[i - 1].index1).css("background-color", "#696969");
                }

                // set color to red if heights need to be changed, black otherwise
                let color = (swaps[i].right) ? "black" : "red";

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

    let heights = getHeights(numElmt);
    let swaps = [];

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
                const s = new Pair(true, j, j + 1);
                swaps.push(s);
            }
        }
    }
    swap(swaps);
}

// insertion sort

function insertionSort(numElmt) {

    let heights = getHeights(numElmt);
    let swaps = [];

    for (let i = 1; i < numElmt; i++) {
        let mark = i - 1;
        let addHeight = heights[i];

        while ((mark >= 0) && (addHeight < heights[mark])) {
            const s = new Pair(false, mark + 1, mark, heights[mark + 1], heights[mark]);
            swaps.push(s);

            let tmp = heights[mark + 1];
            heights[mark + 1] = heights[mark];
            heights[mark] = tmp;

            mark--;
        }
        const s = new Pair(true, mark, mark + 1);
        swaps.push(s);
    }
    swap(swaps);
}

// selection sort

function selectionSort(numElmt) {

    let heights = getHeights(numElmt);
    let swaps = [];

    for (let i = 0; i < numElmt - 1; i++) {
        let mark = i;

        for (let j = i + 1; j < numElmt; j++) {
            const s = new Pair(true, mark, j);
            swaps.push(s);

            if (heights[mark] > heights[j]) {
                mark = j;
            }
        }
        const s = new Pair(false, mark, i, heights[mark], heights[i]);
        swaps.push(s);

        let tmp = heights[mark];
        heights[mark] = heights[i];
        heights[i] = tmp;
    }
    swap(swaps);
}

// merge sort

function mergeSort(numElmt) {
    let heights = getHeights(numElmt);
    let swaps = [];

    mSort(heights, 0, numElmt - 1, swaps);
    swap(swaps);
}

function mSort(heights, start, end, swaps) {

    if (start < end) {
        const mid = Math.floor(start + (end - start) / 2);
        mSort(heights, start, mid, swaps);
        mSort(heights, mid + 1, end, swaps);

        merge(heights, start, mid, end, swaps);
    }
}

// merge for mergeSort

function merge(heights, start, mid, end, swaps) {

    let sorted = [];
    const startSave = start;
    const midSave = mid;

    for (let i = start; i <= end; i++) {

        if ((start <= midSave) && (mid + 1 <= end)) { // if none of the sides are empty

            if (heights[start] <= heights[mid + 1]) {
                const s = new Pair(true, start, mid + 1);
                swaps.push(s);

                sorted.push(heights[start]);
                start++;
            }
            else {
                const s = new Pair(true, start, mid + 1);
                swaps.push(s);

                sorted.push(heights[mid + 1]);
                mid++;
            }
        }
        else if (start <= midSave) { // if first half isn't empty
            const s = new Pair(true, start);
            swaps.push(s);

            sorted.push(heights[start]);
            start++;
        }
        else {
            const s = new Pair(true, mid);
            swaps.push(s);

            sorted.push(heights[mid + 1]);
            mid++;
        }
    }

    // replace elements of original array with sorted
    for (let i = startSave; i <= end; i++) {
        heights[i] = sorted.shift();

        const s = new Pair(false, i, -1, 0, heights[i]); // set index2 to non-existent
        swaps.push(s);
    }
}

// quick sort

function quickSort(numElmt) {
    let heights = getHeights(numElmt);
    let swaps = [];

    qSort(heights, 0, numElmt - 1, swaps);

    swap(swaps);
}

function qSort(heights, left, right, swaps) {

    if (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        // pivot = middle value of the first, last and middle variables of heights array
        let pivot = Math.max(Math.min(heights[left], heights[mid]), Math.min(Math.max(heights[left], heights[mid]), heights[right]));

        let locPivot = quickSwap(heights, left, right, heights.indexOf(pivot), swaps);

        qSort(heights, left, locPivot - 1, swaps);
        qSort(heights, locPivot + 1, right, swaps);
    }
}

// swaps for quickSort
function quickSwap(heights, left, right, pivot, swaps) {

    let pivotVal = heights[pivot];
    let rightSave = right;

    // swap pivot with the right most element
    let s = new Pair(false, right, pivot, heights[right], heights[pivot]);
    swaps.push(s);

    let tmp = heights[right];
    heights[right] = heights[pivot];
    heights[pivot] = tmp;

    right--;
    while (left <= right) {

        // if left value is more and right value ir less than pivot value
        if (heights[left] > pivotVal && heights[right] <= pivotVal) {
            s = new Pair(false, right, left, heights[right], heights[left]);
            swaps.push(s);

            let tmp = heights[right];
            heights[right] = heights[left];
            heights[left] = tmp;

            left++;
            right--;
        }

        s = new Pair(true, rightSave, left);
        swaps.push(s);
        if (heights[left] <= pivotVal) {
            left++;
        }

        s = new Pair(true, rightSave, right);
        swaps.push(s);
        if (heights[right] > pivotVal) {
            right--;
        }
    }

    // swap pivot with the element at left
    s = new Pair(false, rightSave, left, heights[rightSave], heights[left]);
    swaps.push(s);

    tmp = heights[left];
    heights[left] = heights[rightSave];
    heights[rightSave] = tmp;

    return left;
}