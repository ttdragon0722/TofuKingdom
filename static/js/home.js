$(document).ready(function () {

    let Identity = JSON.parse(
        localStorage.getItem("Identity")
    );
    let PlayerAmount = parseInt(localStorage.getItem("PlayerAmount"));
    localStorage.removeItem("PlayerScores");

    const list = $(".qlist");
    const minus_btn = $(".minus");
    const add_btn = $(".add");
    const players = $("#players");
    players.val(PlayerAmount);
    for (let i = 0; i < Identity.length; i++) {
        list.append(`<li class=" ${Identity[i]["class"] == "公主派"? "good":Identity[i]["class"] == "中立"? "mid":"bad"}"> (${Identity[i]["class"]}) ${Identity[i]["name"]} => ${Identity[i]["rule"]} </li>`);
    }

    players.on("change", function () {
        if ($(this).val() < 4 ) {
            $(this).val(4);
        }
        
        if ($(this).val() > 8 ) {
            $(this).val(8);
        }
        characterDisplay();
        PlayerAmount = $(this).val();
        localStorage.setItem("PlayerAmount", PlayerAmount);
    });

    characterDisplay();

    minus_btn.click(function (e) {
        e.preventDefault();
        if (players.val() > 4) {
            players.val(parseInt(players.val()) - 1);
            PlayerAmount = players.val();
            localStorage.setItem("PlayerAmount", PlayerAmount);
        }
        characterDisplay();
    });

    add_btn.click(function (e) {
        e.preventDefault();
        if (players.val() < 8) {
            players.val(parseInt(players.val()) + 1);
            PlayerAmount = players.val();
            localStorage.setItem("PlayerAmount", PlayerAmount);
        }
        characterDisplay();
    });
});
