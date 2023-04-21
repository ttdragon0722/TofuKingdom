function settingUpdate() {
    const grid = $(".identity-display");
    grid.html(" ");
    let Identity = JSON.parse(
        localStorage.getItem("Identity")
    );
    console.log(Identity);
    for (let p = 0;p < Identity.length ; p++) {
        grid.append(
            `<div class="identity">
            <div class="id-table  ${Identity[p]["class"] == "公主派"? "good":Identity[p]["class"] == "中立"? "mid":"bad"}">
                <div class="index">${p+1}</div>
                <div class="id">${Identity[p]["name"]}</div>
                <div class="id-group">${Identity[p]["class"]}</div>
                ${p+1<=3? p+1==3?`<div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>`:"":`<div><button class="moveUp"><i class="fa-solid fa-circle-arrow-up"></i></button></div>
                <div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>`}
                
            </div>
            <div class="rule">
                ${Identity[p]["rule"]}
            </div>
        </div>`
        );
    }

}


$(document).ready(function () {
    const grid = $(".identity-display");

    let Identity = JSON.parse(
        localStorage.getItem("Identity")
    );
    // for (let p = 0;p < Identity.length ; p++) {
    //     grid.append(
    //         `<div class="identity">
    //         <div class="id-table  ${Identity[p]["class"] == "公主派"? "good":Identity[p]["class"] == "中立"? "mid":"bad"}">
    //             <div class="index">${p+1}</div>
    //             <div class="id">${Identity[p]["name"]}</div>
    //             <div class="id-group">${Identity[p]["class"]}</div>
    //             <div><button  class="moveUp"><i class="fa-solid fa-circle-arrow-up"></i></button></div>
    //             <div ><button class="moveDown"><i class="fa-solid fa-circle-arrow-down"></i></button></div>
    //         </div>
    //         <div class="rule">
    //             ${Identity[p]["rule"]}
    //         </div>
    //     </div>`
    //     );
    // }
    settingUpdate();


    $(document).on("click",".moveUp", function () {
        let change_index = parseInt($(this).parent().siblings(".index").html())-1;
        let this_obj = Identity[change_index];
        let temp_obj = Identity[change_index-1];

        Identity[change_index -1] = this_obj;
        Identity[change_index] = temp_obj;
        console.log(Identity);
        localStorage.setItem("Identity",JSON.stringify(Identity))
        settingUpdate();
    });
    $(document).on("click",".moveDown", function () {
        let change_index = parseInt($(this).parent().siblings(".index").html())-1;
        let this_obj = Identity[change_index];
        let temp_obj = Identity[change_index+1];

        Identity[change_index +1] = this_obj;
        Identity[change_index] = temp_obj;
        console.log(Identity);
        localStorage.setItem("Identity",JSON.stringify(Identity))
        settingUpdate();
    });
});
