window.addEventListener("DOMContentLoaded", async ()=>{
    let data = await fetch("./list_texts");
    let texts = await data.json();

    viewTexts(texts);
});

function viewTexts(texts){
    for(const text of texts){
        console.log(text);
    }
}