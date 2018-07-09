//this creates a UUID which I am currently not using, but may need later:
//!function(r){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.uuidv4=r()}}(function(){return function r(e,n,t){function o(f,u){if(!n[f]){if(!e[f]){var a="function"==typeof require&&require;if(!u&&a)return a(f,!0);if(i)return i(f,!0);var d=new Error("Cannot find module '"+f+"'");throw d.code="MODULE_NOT_FOUND",d}var p=n[f]={exports:{}};e[f][0].call(p.exports,function(r){var n=e[f][1][r];return o(n?n:r)},p,p.exports,r,e,n,t)}return n[f].exports}for(var i="function"==typeof require&&require,f=0;f<t.length;f++)o(t[f]);return o}({1:[function(r,e,n){function t(r,e){var n=e||0,t=o;return t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+"-"+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]+t[r[n++]]}for(var o=[],i=0;i<256;++i)o[i]=(i+256).toString(16).substr(1);e.exports=t},{}],2:[function(r,e,n){var t="undefined"!=typeof crypto&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&msCrypto.getRandomValues.bind(msCrypto);if(t){var o=new Uint8Array(16);e.exports=function(){return t(o),o}}else{var i=new Array(16);e.exports=function(){for(var r,e=0;e<16;e++)0===(3&e)&&(r=4294967296*Math.random()),i[e]=r>>>((3&e)<<3)&255;return i}}},{}],3:[function(r,e,n){function t(r,e,n){var t=e&&n||0;"string"==typeof r&&(e="binary"===r?new Array(16):null,r=null),r=r||{};var f=r.random||(r.rng||o)();if(f[6]=15&f[6]|64,f[8]=63&f[8]|128,e)for(var u=0;u<16;++u)e[t+u]=f[u];return e||i(f)}var o=r("./lib/rng"),i=r("./lib/bytesToUuid");e.exports=t},{"./lib/bytesToUuid":1,"./lib/rng":2}]},{},[3])(3)});
//console.log(uuidv4());

//navigation
document.querySelector("#nav-prep").addEventListener("click", function(){
    document.querySelector("#prep-view").style.display = "block";
    document.querySelector("#shop-view").style.display = "none";
});

document.querySelector("#nav-shop").addEventListener("click", function(){
    document.querySelector("#shop-view").style.display = "block";
    document.querySelector("#prep-view").style.display = "none";
});

//render 
const renderList = function (items, filters) {
    const filteredItems = items.filter(function (item) {
        const searchTextMatch = item.text.toLowerCase().includes(filters.searchText.toLowerCase());
        // const searchSectionMatch = item.section.includes(filters.pickSection); 
        const searchSectionMatch = filters.pickSection.includes(item.section) ; 
        const hideCompletedMatch = !filters.hideCompleted || !item.completed;
        return searchTextMatch && hideCompletedMatch && searchSectionMatch;
    });
    const itemsNotFound = filteredItems.filter(function (item) {
        return !item.completed
    });
    
    document.querySelector('#items').innerHTML = '';
    
    document.querySelector('#items').appendChild(genSumDOM(itemsNotFound))
    filteredItems.forEach(function (item) {
        document.querySelector('#items').appendChild(genItemDOM(item))
    });
    document.querySelector('#itemCount').innerHTML = "";
    document.querySelector('#itemCount').appendChild(genSumDOM(items));
}

//get items from localStorage
const getSavedItems = function(){
    const itemsJSON = localStorage.getItem('items');
    if (itemsJSON !== null){
        return JSON.parse(itemsJSON);
    }else{
        return [];
    }
}

//Save items to localStorage
const saveItems= function(items){
    localStorage.setItem('items', JSON.stringify(items))
}

//remove item from list
const removeItem = function(id){
    const x = items.findIndex(function(item){
        return item.id === id;
    })
    if(x > -1){
        items.splice(x, 1)
    }
}

//toggle the completed value for a given item
const toggleItem = function(id){
    const item = items.find(function(item){
        
        return item.id === id;
    })
    if (item !== undefined){
        item.completed = !item.completed;
    }
}

//Generate DOM for a item
const genItemDOM = function(item){
    const itemDiv = document.createElement('div');
    if (item.completed === true) itemDiv.setAttribute('class', 'list-item lined')
    else itemDiv.setAttribute('class', 'list-item');
    
    const itemConDiv = document.createElement('div');
    itemConDiv.setAttribute('class', 'list-item__container');
    itemDiv.appendChild(itemConDiv);



    //main item
    const textEl = document.createElement('label')
    textEl.setAttribute('class', 'container-cm')
    textEl.textContent = item.text.trim();
    itemConDiv.appendChild(textEl);

    //gotIt checkbox
    const gotIt = document.createElement('input');
    gotIt.setAttribute('type','checkbox');
    gotIt.checked = item.completed;
    textEl.appendChild(gotIt);
    gotIt.addEventListener('change', function(){
        toggleItem(item.id);
        saveItems(items);
        renderList(items, filters);
    })

    const gotIt2 = document.createElement('span');
    gotIt2.setAttribute('class', 'checkmark');
    textEl.appendChild(gotIt2);
    gotIt2.addEventListener('change', function(){
        toggleItem(item.id);
        saveItems(items);
        renderList(items, filters);    
    })


    //section label (subtextEl)
    const subtextEl = document.createElement('span');
    subtextEl.setAttribute('class', 'list-item__subtitle');
    subtextEl.textContent = item.section;
    itemConDiv.appendChild(subtextEl);

    //remove item button
    const button = document.createElement('button');
    button.textContent = "X";
    button.setAttribute('class', 'button x-button')
    subtextEl.appendChild(button);
    button.addEventListener('click', function(){
        removeItem(item.id);
        saveItems(items);
        renderList(items, filters);
    })

    return itemDiv;
}

//generate summary DOM
const genSumDOM = function(unretrievedItems){
    const summary = document.createElement('h3')
    summary.textContent = `${unretrievedItems.length} item`;
    if (unretrievedItems.length>1||unretrievedItems.length==0) summary.textContent+="s";
    return summary;
}

//generate summary DOM (filter)
const genSumDOMFiltered = function(unretrievedItems){
    const summary = document.createElement('h3')
    summary.textContent = `${unretrievedItems.length} item`;
    if (unretrievedItems.length>1||unretrievedItems.length==0) summary.textContent+="s";
    return summary;
}





//init
const sections = ["Frozen", "Produce", "Refrigerated", "Other", "Nonfood"]
let items = getSavedItems();

const filters = {
    searchText: '',
    hideCompleted: false,
    pickSection: sections
}

renderList(items, filters);

//Event Listeners

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value;
    renderList(items, filters);
})

document.querySelector("#filter-by").addEventListener('change', function(e){
    filters.pickSection = e.target.value;
    renderList(items, filters);
})

document.querySelector('#new-item').addEventListener('submit', function (e) {
    e.preventDefault()
    console.log(e.target.elements[0]);
    if (e.target.elements.text.value){
        items.push({
            id: Date.now().toString(), //uuidv4(),
            text: e.target.elements.text.value,
            section: e.target.elements.foodtype.value,
            completed: false
        })
   saveItems(items);
   renderList(items, filters);
    e.target.elements.text.value = '';
    }

})



document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked;
    renderList(items, filters);
})

// document.querySelector('#filter-by').addEventListener('change', function(e){
//     console.log(e.target.value)
// })

