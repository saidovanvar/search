import {products} from "./main.js"

function formatPrice(price) {
    return price.toLocaleString('uz-UZ') + " so'm";
}

let box = document.getElementById("box")
let search = document.querySelector("#search");
let divHidden = document.querySelector("#divHidden");

let radio_category = document.querySelectorAll("input[name='category']"); // yoki boshqa selector

function renderCategory(products) {
    box.innerHTML = '';

    products.forEach((item) => {
        let div = document.createElement("div");
        div.innerHTML = `
         <div class="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden animate-pulse-slow" >
                  
                    <div class="absolute top-4 left-4 z-10">
                        <span class="bg-gradient-to-r ${item.gradient} text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                            ${item.category}
                        </span>
                    </div>

                    <div class="relative h-48 bg-gradient-to-br ${item.gradient} flex items-center justify-center overflow-hidden">
                        <div class="absolute inset-0 opacity-20">
                            <div class="absolute top-4 left-4 w-3 h-3 bg-white rounded-full animate-bounce"></div>
                            <div class="absolute top-8 right-8 w-2 h-2 bg-white rounded-full animate-bounce" style="animation-delay: 1s"></div>
                            <div class="absolute bottom-6 left-8 w-4 h-4 bg-white rounded-full animate-bounce" style="animation-delay: 2s"></div>
                        </div>
                        
                        <div class="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                            ${item.icon}
                        </div>
                    </div>

                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                            ${item.name}
                        </h3>

                        <p class="text-gray-600 text-sm leading-relaxed mb-6 h-12 overflow-hidden">
                            ${item.text}
                        </p>

                        <div class="flex items-center justify-between">
                            <div class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                ${formatPrice(item.money)}
                            </div>

                            <button onclick="buyProduct('${item.name}')" 
                                class="bg-gradient-to-r ${item.gradient} hover:shadow-lg text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300">
                                Sotib olish
                            </button>
                        </div>
                    </div>

                    <div class="absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"></div>
                </div>
    `
        box.appendChild(div)
    })
}

renderCategory(products)

search.addEventListener("input", e => {
    let filterSearch = products.filter(item => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    divHidden.classList.remove("hidden")
    if (search.value.length === 0) {
        divHidden.classList.add("hidden")
    }

    divHidden.innerHTML = '';
    filterSearch.forEach(filter => {
        let div = document.createElement("div");
        div.innerHTML = `
        <p class="p-4 hover:bg-blue-600 hover:text-[#fff]">${filter.name}</p>
        `
        divHidden.appendChild(div)
    })
})

radio_category.forEach((item) => {
    item.addEventListener("change", (e) => {
        let filter_product = products.filter(filter => {
            return filter.category.toLowerCase() === e.target.value.toLowerCase();
        })
        renderCategory(filter_product)
    })
})

