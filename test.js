// 要進行抽籤的陣列
let items = ['項目1', '項目2', '項目3', '項目4', '項目5'];

// 已經抽過的陣列項目
let selectedItems = [];

// 隨機抽出一個項目
function drawItem() {
    // 如果所有項目都已經被抽過了，就回傳 null
    if (selectedItems.length === items.length) {
        return null;
    }

    // 隨機選擇一個尚未被抽過的項目
    let index;
    do {
        index = Math.floor(Math.random() * items.length);
    } while (selectedItems.includes(items[index]));

    // 將這個項目加入已經抽過的陣列
    selectedItems.push(items[index]);

    // 回傳這個項目
    return items[index];
}

// 使用範例
console.log(items);
console.log(selectedItems);
console.log(drawItem()); // 隨機抽出一個項目

console.log(items);
console.log(selectedItems);
console.log(drawItem()); // 再次隨機抽出一個項目，不會跟上一次重複

console.log(items);
console.log(selectedItems);
console.log(drawItem()); // 再次隨機抽出一個項目，不會跟前面已經抽過的重複

console.log(items);
console.log(selectedItems);
console.log(drawItem()); // 再次隨機抽出一個項目，不會跟前面已經抽過的重複

console.log(items);
console.log(selectedItems);
console.log(drawItem()); // 再次隨機抽出一個項目，不會跟前面已經抽過的重複

console.log(items);
console.log(selectedItems);
console.log(drawItem()); // 已經抽過所有項目，回傳 null