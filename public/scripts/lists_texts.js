window.addEventListener("DOMContentLoaded", async ()=>{
    let data = await fetch("./list_texts");
    let texts = await data.json();

    viewTexts(texts);
});

function viewTexts(texts){
    // Get template
    const textTemplate = document.getElementById("aText");
    // Get div to add text to
    const list = document.getElementById("list");
    for(const text of texts){
        console.log(text.id);
        const clone = textTemplate.content.cloneNode(true);
        clone.querySelector(".title").innerText = text.title;
        clone.querySelector(".textPiece").innerText = text.text.length > 80 ? text.text.slice(0,80) + "..." : text.text;
        clone.querySelector("a").setAttribute("href", "/edit.html?id=" + text.id);
        list.appendChild(clone);
    }
}