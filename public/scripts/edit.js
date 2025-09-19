// Add category
const categoryName = document.getElementById("categoryName");
const categoryDescription = document.getElementById("categoryDescription");
const addCategory = document.getElementById("addCategory");
const clearCategories = document.getElementById("clearCategories");
const categoryList = document.getElementById("categoryList");
const categorizeBtn = document.getElementById("categorizeBtn");
const mainText = document.getElementById("mainText");

// Global variables
let currentText = null;

window.addEventListener("DOMContentLoaded", initialize);

addCategory.addEventListener("click", addAndUpdateCategory);

clearCategories.addEventListener("click", removeCategories);

categorizeBtn.addEventListener("click", categorizeSelection);

function initialize() {
    // Check to see if this is an existing text
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    if(!id){
        updateCategoriesList();
    } else {
        getCurrentText(id);
    }
}

async function getCurrentText(id) {
    try{
        const data = await fetch("/text/" + id);
        const text = await data.json();
        console.log(text);
        mainText.value = text[0].text;
    }catch(err){
        console.log("Unable to get text");
        console.error(err);
    }
}

function addAndUpdateCategory() {
    // Check if it exists in localstorage
    let categories = localStorage.getItem("categories");
    console.log(categories);
    if (!categories) {
        // Add a new category
        categories = [{
            "name": categoryName.value,
            "description": categoryDescription.value
        }];

        // Add to localstorage
        localStorage.setItem("categories", JSON.stringify(categories));
    } else {
        categories = JSON.parse(categories);
        let newCategory = {
            "name": categoryName.value,
            "description": categoryDescription.value
        }

        // Check for duplicates
        let isDuplicate = categories.some(c => c.name === newCategory.name && c.description === newCategory.description);
        console.log(isDuplicate);

        if (!isDuplicate) {
            categories.push(newCategory);
            localStorage.setItem("categories", JSON.stringify(categories));
        }
    }
    updateCategoriesList();
}

function updateCategoriesList() {
    // Clear existing categories
    categoryList.innerHTML = "";

    // Get categories from ls
    const categories = JSON.parse(localStorage.getItem("categories"));
    if (!categories) {
        return;
    }


    for (const cat of categories) {
        const div = document.createElement("div");
        div.innerHTML = `<input type="radio" name="category" value="${cat.name}" id="${cat.name}"><label for="${cat.name}">${cat.name}</label>`;
        categoryList.appendChild(div);
    }
}

function removeCategories() {
    // For now, only remove local storage
    localStorage.removeItem("categories");

    // TODO:
    // Remove categories from file

    updateCategoriesList();
}

function categorizeSelection() {
    console.log("heye");
}