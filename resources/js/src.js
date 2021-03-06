
(function($, window, document) {

    $(function() {
        var numOfCards = 20;
        var arr = cardsGenerator(numOfCards);
        shuffle(arr);
        initMatrix(numOfCards);
        cardAssign(arr, numOfCards);

        var clickCount = 0;
        var tryCount = 0;
        var discoverCounter = 0;
        var testEqualityFlag = false;
        var firstCardTry = [];
        var secondCardTry = [];

        $(".square").click(function () {
            if (!$(this).children(".back").is(':visible')) {
                clickCount++;
                if (testEqualityFlag) {
                    if (firstCardTry[0].getAttribute('card') !== secondCardTry[0].getAttribute('card')) {
                        firstCardTry.children(".back").hide();
                        secondCardTry.children(".back").hide();
                        firstCardTry.children(".front").show();
                        secondCardTry.children(".front").show();
                        testEqualityFlag = false;
                    }
                }

                if (clickCount == 1) {
                    firstCardTry = $(this);
                    firstCardTry.children(".front").hide();
                    firstCardTry.children(".back").show();
                    testEqualityFlag = false;
                } else if (clickCount == 2) {
                    secondCardTry = $(this);
                    secondCardTry.children(".front").hide();
                    secondCardTry.children(".back").show();
                    testEqualityFlag = true;
                    clickCount = 0;
                    tryCount++;
                    if (firstCardTry[0].getAttribute('card') == secondCardTry[0].getAttribute('card')) {
                        discoverCounter++;
                    }
                }
                updateDisCount(discoverCounter);
                updateTryCount(tryCount)

            }
        });

    });

    function initMatrix(size) {
        var e = document.getElementById("matrix-container");
        for(var i = 0; i < size/4; i++){
            var row = document.createElement("div");
            row.className = "row";
            for(var j = 0; j < 4; j++){
                var cell = document.createElement("div");
                cell.className = "square";
                cell.id = i + ""+j;
                var innerCellFront = document.createElement("div");
                innerCellFront.className = "front";
                var innerCellBack = document.createElement("div");
                innerCellBack.className = "back";
                innerCellBack.style.display = "none";
                innerCellFront.innerHTML = "CARD";
                cell.appendChild(innerCellFront);
                cell.appendChild(innerCellBack);
                // cell.innerHTML = "<h1>" + i + "" + j + "</h1>";
                row.appendChild(cell);
            }
            e.appendChild(row);
        }
    }

    function shuffle(array) {
        var m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    function cardAssign(cardsArr, numOfCards) {
        for(var i = 0; i < numOfCards/4; i++) {
            for (var j = 0; j < 4; j++) {
                var randCard = cardsArr.pop();
                var currSelect = $("#" + i + "" + j);
                currSelect.attr("card", randCard);
                currSelect.children(".back").append("<h1>" + randCard + "</h1>");
            }
        }
    }

    function updateTryCount(tries) {
        $("#try-counter").html(tries);
    }

    function updateDisCount(discoverCount) {
        $("#discover-counter").html(discoverCount);
    }

    function cardsGenerator(size) {
        var cardsArr = [];
        for (var i=1; i <= size/2; i++) {
            cardsArr.push(i);
            cardsArr.push(i);
        }
        console.log(cardsArr);
        return cardsArr;
    }

}(window.jQuery, window, document));
