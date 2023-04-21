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
                    contentEnter();

                },

                async once(data) {
                    contentEnter();
                },
            },
        ],
    });
});
