

let product = {
plainBurger: {
    name: "Гамбургер простой",
    price: 10000,
    kcall: 500,
    descr: ' Встречайте простой ГАМБУРГЕР. Он не сочный и не сытный за то дешевый',
    img: 'images/product2.jpg',
    amount: 0,
    get Summ() {
      return this.price * this.amount;
    },
    get Kcall() {
        return this.kcall * this.amount;
    }
},
freshBurger: {
    name: 'Гамбургер FRESH',
    price: 20500,
    kcall: 1000,
    descr: 'Встречайте Фрешмена FAS FOOD`а. Он набрал в себя всё самое старое.',
    img: 'images/product1.jpg',
    amount: 0,
    get Summ() {
        return this.price * this.amount;
    },
    get Kcall() {
          return this.kcall * this.amount;
    }
},
freshCombo: {
    name: 'FRESH COMBO',
    price: 31900,
    kcall: 1500,
    descr: 'FRESH и Картошка фри. Тот же самый FRESH и Фри объяденились.',
    img: 'images/product3.jpg',
    amount: 0,
    get Summ() {
        return this.price * this.amount;
    },
    get Kcall() {
          return this.kcall * this.amount;
    }
}
};


// Доп продукция

let extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 100
    },
    lettuce: {
        name: 'Салатный лист',
        price: 2000,
        kcall: 5
    },
    cheese: {
        name: 'Сыр',
        price: 3000,
        kcall: 150
    }
}


let str = '';

function createBurger() {
    let main = document.querySelector('.main');
    for (let key in product) {
        let {name: n, img, descr, price} = product[key]; //деструктуризация (теперь name называется n)
        str += ` <section class="main__product" id="${key}">
        <div class="main__product-preview">
            <div class="main__product-info">
                <img src="${img}" alt="" class="main__product-img">
                <h2 class="main__product-title">${name}
                    <span class="main__product-many">${price} сум</span>
                </h2>
            </div>
            <p class="main__product-descr">
            ${descr}
            </p>
        </div>
        <div class="main__product-extra">
            <div class="main__product-number">
                <a class="main__product-btn fa-reg minus" data-symbol="-"></a>
                <output class="main__product-num">0</output>
                <a class="main__product-btn fa-reg plus" data-symbol="+"></a>
            </div>
            <div class="main__product-price"><span>0</span> сум</div>
        </div>
        <div class="main__product-extraProduct">`
        for(let newKey in extraProduct) {
            str += `<label class="main__product-label">
            <input type="checkbox" class="main__product-checkbox" data-extra="${newKey}">
            <span class="main__product-check"></span>
                ${extraProduct[newKey].name}
        </label>`
        }
        str += `</div>
        <div class="main__product-kcall"><span>0</span> калорий</div>
    </section>`
    }
    main.innerHTML = str;
    market();
}

setTimeout(() => createBurger(),2000)


function market() {






let btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    checkExtraProduct = document.querySelectorAll('.main__product-checkbox'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn');


btnPlusOrMinus.forEach(function(btn) {
    btn.addEventListener('click', function() {
        plusOrMinus(this)
    })
})

function plusOrMinus(element) {
    // closest() - подключаеться к указаному родительскому элементу
    let parentId = element.closest('.main__product').getAttribute('id'),
        out = element.closest('.main__product').querySelector('.main__product-num'),
        price = element.closest('.main__product').querySelector('.main__product-price span'),
        kcall = element.closest('.main__product').querySelector('.main__product-kcall span');

        if(element.getAttribute('data-symbol') == '+') {
        product[parentId].amount++
        }else if(element.getAttribute('data-symbol') == '-' && product[parentId].amount > 0) {
            product[parentId].amount--
        }

        out.innerHTML = product[parentId].amount;
        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
}


for(let i = 0; i < checkExtraProduct.length;i++) {
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this);
    })
}

function addExtraProduct(el) {
    let parent = el.closest('.main__product');

        parentId = parent.getAttribute('id');
        product[parentId][el.getAttribute('data-extra')] = el.checked;

    let price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elDataInfo = el.getAttribute('data-extra');

        
        if(product[parentId][elDataInfo] == true) {
            product[parentId].price += extraProduct[elDataInfo].price;
            product[parentId].kcall += extraProduct[elDataInfo].kcall;
        }else {
            product[parentId].price -=  extraProduct[elDataInfo].price;
            product[parentId].kcall -=  extraProduct[elDataInfo].kcall;
        }

        price.innerHTML = product[parentId].Summ;
        kcall.innerHTML = product[parentId].Kcall;
        
}

let arrProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;


addCart.addEventListener('click', function() {
    for(let key in product) {
        let productObj = product[key];
        if(productObj.amount > 0) {
            arrProduct.push(productObj);
            for(let newKey in productObj) {
                if(productObj[newKey] === true) {
                    productObj.name += '\n' + extraProduct[newKey].name;
                }
            }
        }

        productObj.price = productObj.Summ;
        productObj.kcall =  productObj.Kcall;
    }
    for (let i = 0; i < arrProduct.length; i++) {
        let el = arrProduct[i];
        totalName += '\n' + el.name + '\n' // переход на след.строку
        totalPrice += el.price;
        totalKcall += el.kcall;
    }
    receiptOut.innerHTML = `Your order is \n ${totalName} \n Callories ${totalKcall} \n Fullprice is ${totalPrice} sum` ;

    receipt.style.display = 'flex';
    receipt.style.opacity = '1';
    receiptWindow.style.top = '0';

    let outNum = ducument.querySelectorAll('.main__product-num'),
        outPrice = doccumtnt.querySelectorAll('main__product-price span'),
        outKcall = document.querySelectorAll('.main__product-kcall span');
    
    for(let i = 0; i < outNum.length; i++) {
        outNum[i].innerHTML = 0;
        outPrice[i].innerHTML = 0;
        outKcall[i].innerHTML = 0;
    }
})


receiptBtn.addEventListener('click', function() {
    location.reload();
})

}


let animation = document.querySelector('.header__timer-extra')



let i = 0;
function timer () {
    if(i < 99) {
        animation.innerHTML = i++;
        setTimeout(() => timer(),100);
    }else {
        animation.innerHTML = 100;
    }
}

timer();






