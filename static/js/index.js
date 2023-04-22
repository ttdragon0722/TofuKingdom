$(document).ready(function () {
    // init
    if (localStorage.getItem("Identity") == null) {
        let Identity = [
            {
                name:"王子",
                rule:"猜!!",
                class:"公主派"
            },
            {
                name:"公主",
                rule:"只能說實話",
                class:"公主派"
            },
            {
                name:"廚師",
                rule:"只能說實話",
                class:"公主派"
            },
            {
                name:"侍衛",
                rule:"只能說謊言",
                class:"女王派"
            },
            {
                name:"女王",
                rule:"只能說謊言",
                class:"女王派"
            },
            {
                name:"大臣",
                rule:"只能說謊言",
                class:"女王派"
            },
            {
                name:"間諜",
                rule:"實話謊言都可以說",
                class:"中立"
            },
            {
                name:"女僕",
                rule:"實話謊言都可以說",
                class:"中立"
            }
    
        ]
        localStorage.setItem("Identity",JSON.stringify(Identity))
    }
    if (localStorage.getItem("PlayerAmount") == null) {
        localStorage.setItem("PlayerAmount",3);
        $("#players").val(3);
    }

    

});