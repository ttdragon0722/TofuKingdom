function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, n);
    });
}

function contentEnter() {
    let tl = gsap.timeline();
    tl.from(".app", { duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 0.2 });
}


function pageLeave() {
    let tl = gsap.timeline();
    tl.to(".app",
        {
            duration: 1.2,
            opacity: 0,
            ease: "Expo.easeInOut",
            y: "100%"
        }
    )
}

function characterDisplay() {
    const list = $(".qlist");
    const player = $("#players");
    for (let p = 1; p <= 7; p++) {

        if (p < parseInt(player.val())) {
            list.children("li").eq(p).show();
        } else {
            list.children("li").eq(p).hide();
        }
    }
}
function settingUpdate() {
    const grid = $(".identity-display");
    grid.html(" ");
    let Identity = JSON.parse(
        localStorage.getItem("Identity")
    );
    console.log(Identity);
    for (let p = 0; p < Identity.length; p++) {
        grid.append(
            `<div class="identity">
            <div class="id-table  ${Identity[p]["class"] == "公主派" ? "good" : Identity[p]["class"] == "中立" ? "mid" : "bad"}">
                <div class="index">${p + 1}</div>
                <div class="id">${Identity[p]["name"]}</div>
                <div class="id-group">${Identity[p]["class"]}</div>
                ${p + 1 <= 3 ? p + 1 == 3 ? `<div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>` : "" : `<div><button class="moveUp"><i class="fa-solid fa-circle-arrow-up"></i></button></div>
                <div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>`}
                
            </div>
            <div class="rule">
                ${Identity[p]["rule"]}
            </div>
        </div>`
        );
    }

}


$(function () {
    barba.init({
        sync: true,

        transitions: [
            {
                async leave(data) {
                    const done = this.async();

                    pageLeave();
                    await delay(1000);
                    done();
                },

                async enter(data) {
                    console.log(data);

                    if (data["trigger"].id == "back") {
                        localStorage.removeItem("PlayerScores");
                        let Identity = JSON.parse(
                            localStorage.getItem("Identity")
                        );
                        let PlayerAmount = parseInt(localStorage.getItem("PlayerAmount"));
                        const list = $(".qlist");
                        const minus_btn = $(".minus");
                        const add_btn = $(".add");
                        const players = $("#players");
                        players.val(PlayerAmount);
                        for (let i = 0; i < Identity.length; i++) {
                            list.append(`<li class=" ${Identity[i]["class"] == "公主派" ? "good" : Identity[i]["class"] == "中立" ? "mid" : "bad"}"> (${Identity[i]["class"]}) ${Identity[i]["name"]} => ${Identity[i]["rule"]} </li>`);
                        }

                        players.on("change", function () {
                            if ($(this).val() < 4) {
                                $(this).val(4);
                            }

                            if ($(this).val() > 8) {
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
                    }
                    if (data["trigger"].id == "settingBtn") {
                        const grid = $(".identity-display");
                        grid.html(" ");
                        let Identity = JSON.parse(
                            localStorage.getItem("Identity")
                        );
                        console.log(Identity);
                        for (let p = 0; p < Identity.length; p++) {
                            grid.append(
                                `<div class="identity">
            <div class="id-table  ${Identity[p]["class"] == "公主派" ? "good" : Identity[p]["class"] == "中立" ? "mid" : "bad"}">
                <div class="index">${p + 1}</div>
                <div class="id">${Identity[p]["name"]}</div>
                <div class="id-group">${Identity[p]["class"]}</div>
                ${p + 1 <= 3 ? p + 1 == 3 ? `<div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>` : "" : `<div><button class="moveUp"><i class="fa-solid fa-circle-arrow-up"></i></button></div>
                <div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>`}
                
            </div>
            <div class="rule">
                ${Identity[p]["rule"]}
            </div>
        </div>`
                            );
                        }


                        $(document).on("click", ".moveUp", function () {
                            let change_index = parseInt($(this).parent().siblings(".index").html()) - 1;
                            let this_obj = Identity[change_index];
                            let temp_obj = Identity[change_index - 1];

                            Identity[change_index - 1] = this_obj;
                            Identity[change_index] = temp_obj;
                            console.log(Identity);
                            localStorage.setItem("Identity", JSON.stringify(Identity))
                            settingUpdate();
                        });
                        $(document).on("click", ".moveDown", function () {
                            let change_index = parseInt($(this).parent().siblings(".index").html()) - 1;
                            let this_obj = Identity[change_index];
                            let temp_obj = Identity[change_index + 1];

                            Identity[change_index + 1] = this_obj;
                            Identity[change_index] = temp_obj;
                            console.log(Identity);
                            localStorage.setItem("Identity", JSON.stringify(Identity))
                            settingUpdate();
                        });
                    }
                    if (data["trigger"].id == "startBtn") {

                        const Identity = JSON.parse(localStorage.getItem("Identity"));
                        const players = localStorage.getItem("PlayerAmount");
                        let prince = 0;

                        console.log(Identity, players);

                        let selectedItems = [];
                        // 隨機抽出一個項目
                        function drawItem() {
                            // 如果所有項目都已經被抽過了，就回傳 null
                            if (selectedItems.length >= players) {
                                return null;
                            }

                            // 隨機選擇一個尚未被抽過的項目
                            let index;
                            do {
                                index = Math.floor(Math.random() * players);
                            } while (selectedItems.includes(Identity[index]));

                            // 將這個項目加入已經抽過的陣列
                            selectedItems.push(Identity[index]);
                            console.log(Identity[index]["name"]);
                            if (Identity[index]["name"] === "王子") {
                                prince = selectedItems.length - 1;
                            }

                            // 回傳這個項目
                            return Identity[index];
                        }

                        for (let dt = 0; dt < players; dt++) {
                            drawItem();
                        }

                        if (localStorage.getItem("PlayerScores") == null) {
                            scores = new Array(parseInt(players));
                            for (let i = 0; i < scores.length; i++) {
                                scores[i] = 0;
                            }
                            // localStorage.setItem("PlayerScores",);
                        } else {
                            console.log(localStorage.getItem("PlayerScores"));
                            scores = JSON.parse("[" + localStorage.getItem("PlayerScores") + "]");
                        }
                        console.log(scores);


                        $(".title").html(`${prince + 1} 號玩家是王子`);

                        $("#next").click(function (e) {
                            e.preventDefault();
                            const grid = $(this).parent().parent(".play-grid")
                            const app = $(".app");
                            gsap.to(grid, {
                                opacity: 0, duration: 0.2, onComplete: function () {
                                    grid.html(" ");
                                    console.log(selectedItems);
                                    for (let i = 0; i < selectedItems.length; i++) {
                                        grid.append(`<div class="player-box ${selectedItems[i]["name"] == "王子" ? "prince" : ""}">
                    <div class="box">
                        <div class="score">${scores[i]}</div>
                        <div class="player-name">玩家 ${i + 1}</div>
                        <div class="${selectedItems[i]["name"] == "王子" ? "prince-id bold" : `player-id ${selectedItems[i]["name"] == "公主" ? "princess" : `${selectedItems[i]["class"] == "公主派" ? "good" : ` ${selectedItems[i]["class"] == "中立" ? "mid" : "bad"}  `}`}`} ">${selectedItems[i]["name"]}</div>
                        ${selectedItems[i]["name"] == "王子" ? "" : `<div><button class="btn decide-btn">他是公主!!</button></div>`}
                    </div>
                </div>`);
                                    }
                                    grid.addClass("start");
                                    app.append(`<div class="play-func">
                <button class="id-btn btn"><i class="fa-regular fa-eye"></i>關閉身分</button>
            </div>`);
                                    gsap.to(grid, {
                                        opacity: 1, duration: 0.2
                                    })
                                }
                            });
                        });

                        let status = true;
                        $(document).on("click", ".id-btn", function () {
                            if (status) {
                                status = !status;
                                $(".id-btn").html("檢視身分");
                                $(".player-id").hide();
                            } else {
                                status = !status;
                                $(".id-btn").html("關閉身分");
                                $(".player-id").show();
                            }
                        });

                        $(document).on("click", ".decide-btn", function () {
                            gsap.from(".play-func", {
                                y: "100%", duration: 0.5
                            })
                            gsap.to(".play-func",{
                                y:0,duration:0.5
                            })

                            $(".player-id").show();
                            $(".decide-btn").hide();
                            $(".play-func").html(" ");
                            $(".play-func").css("height", "40%");
                            $(".play-func").css("padding-top", "20%");
                            $(".play-func").css("border-radius", "10% 10% 0 0");
                            $(".play-func").css("border", "solid");
                            $(".play-func").css("border-top-width", "thick");
                            $(".play-func").css("border-color", "#8f94fb");
                            $(".play-func").css("background", "rgba(255,255,255,0.75)");

                            let clicked = $(this).parent().siblings(".player-id");

                            if ($(this).parent().siblings(".player-id").html() == "公主") {
                                $(".play-func").html(`<div class="subtitle"> 王子猜對了!公主派獲勝 </div>`);

                                $(".prince").children(".box").children(".score").html(parseInt($(".prince").children(".box").children(".score").html()) + 1)
                                $(".princess").siblings(".score").html(parseInt($(".princess").siblings(".score").html()) + 1);


                                $(".good").each(function (i, v) {
                                    $(this).siblings(".score").html(parseInt($(this).siblings(".score").html()) + 1);
                                });
                            } else if (clicked.hasClass("good")) {
                                $(".play-func").html(`<div class="subtitle"> 王子猜錯了!但此局沒人勝利 :D </div>`);
                            } else if (clicked.hasClass("bad")) {

                                $(".bad").each(function (i, v) {
                                    $(this).siblings(".score").html(parseInt($(this).siblings(".score").html()) + 1);
                                });

                                $(".play-func").html(`<div class="subtitle"> 王子猜錯了!皇后派獲勝 :( </div>`);
                            } else if (clicked.hasClass("mid")) {
                                $(".mid").each(function (i, v) {
                                    $(this).siblings(".score").html(parseInt($(this).siblings(".score").html()) + 1);
                                });
                                $(".play-func").html(`<div class="subtitle"> 王子猜錯了!中立派獲勝 </div>`);
                            }

                            $(".play-func").append(
                                `
            <div class="play-end">
            
            <a href="/" id="back"><i class="fa-solid fa-house"></i></a>
            <a href="/play" id="startBtn">Replay</a>
            </div>`
                            );


                            let scores = [];

                            $(".score").each(function (i, v) {
                                scores.push(parseInt($(this).html()));
                            })

                            localStorage.setItem("PlayerScores", scores);

                        });
                    }
                    contentEnter();

                },

                async once(data) {
                    contentEnter();
                },
            },
        ],
    });
});
