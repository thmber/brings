let basket = [];
let ordered = [];
let total = 0;
let totalTotal = 0;
let left = 0;
let middle = 1;
let right = 2;
let basketIsOpen = false;

///////////////////// Image + Restaurant - slider /////////////////////////////

function moveLeftPicture(){
         if (left > 5) {
            left = 0;
        }
        moveImageLeft();
        moveContentLeft();
        left++;
}


function moveContentLeft(){
        let contentLeft = document.getElementById(`c${left}`);   
        contentLeft.style.opacity = "0";
        contentLeft.style.transform = `translateX(100%)`;
        setTimeout(() => {
        contentLeft.style.opacity = "1";
        }, 475);
}


function moveImageLeft(){
        let imageLeft =  document.getElementById(`r${left}`);   
        imageLeft.style.opacity = "0";
        imageLeft.style.transform = `translateX(100%)`;
        setTimeout(() => {
        imageLeft.style.opacity = "1";
        }, 475);
}


function moveMiddlepicture(){
        if (middle > 5) {
            middle = 0;
        }   
        let imageMiddle = document.getElementById(`r${(middle)}`);
        imageMiddle.style.transform = `translateX(-100%)`;
        let contentMiddle = document.getElementById(`c${(middle)}`);
        contentMiddle.style.transform = `translateX(-100%)`;
        middle++;
}


function moveRightPicture(){
        if (right > 5) {
            right = 0;
        }
        let imageRight = document.getElementById(`r${right}`);
        imageRight.style.transform = `translateX(0)`;
        let contentRight = document.getElementById(`c${right}`);
        contentRight.style.transform = `translateX(0)`;
        right++;
}


function nextImage(){
        moveLeftPicture();
        moveMiddlepicture();
        moveRightPicture();  
}   

/////////////////////////////////// order-Button pushed ///////////////////////////////////////


function order(){
    let button = document.getElementById('order-text');
    button.innerHTML = '';
    animateBike();
    setTimeout(() => {
        document.getElementById('basket-all').style.opacity = "0";
        document.getElementById('dish-box').style.opacity = "0";
        button.innerHTML = "Danke für die Bestellung!";
        setTimeout(() => {
            basket = [];
            emptyBasket();
        }, 1500);
    }, 1150);
}


function animateBike(){
    let bike = document.getElementById('order-bike');
    bike.src = "icon/brinx-icon-justbike.png";
    bike.style.transform = "translateX(400%)";
}


function buttonOnClick(index, active){
    let plusButton = document.getElementById(`plusButton${index}_${active}`);
    plusButton.src = "icon/plus-darker.png";
    setTimeout(() => {
        plusButton.src = "icon/plus.png";
    }, 175);
}


function showBasket(){
    if (!basketIsOpen) {
        openBasket();
        basketIsOpen = true;
    }
    else{
        closeBasket();
        basketIsOpen = false;
    }
}


function closeBasket(){
    let basket = document.getElementById('basket-box');
    basket.style.transform = "translateX(35vw)"
    document.getElementById('slide-container').classList.remove('slide-container-shown');
    document.getElementById('header-box').classList.remove('header-box-shown');
    document.getElementById('restaurant-box').classList.remove('margin-shown');
}


function openBasket(){
    let basket = document.getElementById('basket-box');
    basket.style.transform = "translateX(0)"
    document.getElementById('slide-container').classList.add('slide-container-shown');
    document.getElementById('arrow').style.transform = "rotateY(360deg)"
    document.getElementById('arrow').classList.add('right-arrow-shown');
    document.getElementById('header-box').classList.add('header-box-shown');
    document.getElementById('restaurant-box').classList.add('margin-shown');
}

function alreadyInBasket(){
    for (let i = 0; i < basket.length; i++) {
        if (basket[0]['name'].includes("Strawberry Glaze")) {
            onlyAddAmount();   
        }        
        else{
            addToBasket();
        }
    }
}


function addToBasket(index, active){
    buttonOnClick(index,active);
    if (basket.length === 0) {
        pushtoBasket(index, active);
        showBasket();
        generateBasket();
    }
    else{
        for (let i = 0; i < basket.length; i++) {
            let names = basket[i]['name'];
            if (names.includes(`${restaurantData[active]['name'][index]}`) === true) {
                basket[i]['amount']++;
                renderBasket();
                return;
            } 
        }   
        pushtoBasket(index, active);
        renderBasket();
    }
}


function pushtoBasket(index, active){
    let name = restaurantData[active]['name'][index];
    let price = restaurantData[active]['price'][index];
    ordered = [{"name": name, "price": price, "amount": 1}];
    basket.push(ordered[0]);
}

function start(){
    emptyBasket();
    for (let i = 0; i < 6; i++) {
        renderDishes(i);
        renderHeadline(i);
    }    
}


function emptyBasket(){
        if (basket.length < 1) {
        let content = document.getElementById('basket-content');
        content.innerHTML = `
        <div class="empty-basket">
            Dein Warenkorb ist noch leer
        </div>
        `;
    }
}


function renderDishes(active){
    let content = document.getElementById(`content${active}`);
    content.innerHTML = '';
    for (let i = 0; i < restaurantData[active].name.length; i++) {
        const restaurant = restaurantData[active];
        const name = restaurant['name'];
        const description = restaurant['description'];
        const price = restaurant['price'];
        generateDishes(name, description, price, i, active);
    }
}


function renderBasket(){
    let content = document.getElementById('dish-box');
    content.innerHTML = '';
    for (let i = 0; i < basket.length; i++) {
        const name = basket[i]['name'];
        const price = basket[i]['price'];
        const amount = basket[i]['amount'];
        generateNewBasketDish(name, price, amount, i);
    }
    calculateTotal();
    generateTotal();
}


function generateTotal(){
    let content = document.getElementById('basket-all');
    content.innerHTML = `
            <div class="sum">
                    <p>Zwischensumme:</p><p>${total.toFixed(2)} €</p>
            </div>
            <div class="sum order-cost">
                    <p>zzgl. Lieferkosten</p><p>3.50 €</p>
            </div>
            <div class="sum-all">
                    <p>Gesamt:</p><p>${totalTotal.toFixed(2)} Euro</p>
            </div>
    `;
    total=0;
}


function calculateTotal(){
    for (let  i = 0;  i < basket.length;  i++) {
       total = total + ((basket[i]['amount'] * basket[i]['price']));
    }
    totalTotal = (total + 3.5);
   
}


function getAmountPrice(amount, price){
    return (amount * price).toFixed(2);
}


function plus(index){
    let plusButton = document.getElementById(`plus${index}`);
    plusButton.src = "icon/plus-darker.png";
    setTimeout(() => {
        plusButton.src = "icon/plus.png";
        basket[index]['amount']++;
        renderBasket();
    }, 175);
}


function minus(index){
    let minusButton = document.getElementById(`minus${index}`);
    minusButton.src = "icon/minus-darker.png";
    setTimeout(() => {
        minusButton.src = "icon/minus.png";
        basket[index]['amount']--;
        if (basket[index]['amount'] == 0) {
            basket.splice(index, 1);
            if (basket.length == 0) {
                emptyBasket();
                return;
            }
        }
        renderBasket();
    }, 175);
}


function deleteDish(index){
    let deleteButton = document.getElementById(`deleteDish${index}`);
    deleteButton.src = "icon/delete-darker.png";
    setTimeout(() => {
        deleteButton.src = "icon/delete.png";
        basket.splice(index, 1);
        if (basket.length == 0) {
            emptyBasket();
            return;
        }
        renderBasket();
    }, 175);

}


/////////////////////////////////////// html generating functions ///////////////////////////


function generateNewBasketDish(name, price, amount, i){
    let dish = document.getElementById('dish-box');
    dish.innerHTML +=`
            <div class="basket-dish" id="basket-dish">
                <div class="basket-description">
                    <span class="bold">${amount}</span>
                    <span>x ${name}</span>
                    <span class="bold">${getAmountPrice(amount, price)}€</span>
                </div>
                <div class="basket-icons">
                    <img src="icon/plus.png" id="plus${i}" onclick="plus(${i})">
                    <img src="icon/minus.png" id="minus${i}" onclick="minus(${i})">
                    <img src="icon/delete.png" id="deleteDish${i}" onclick="deleteDish(${i})">
                </div>
            </div>
    `;
}


function generateBasket(){
    let content = document.getElementById('basket-content');
    content.innerHTML = `
            <div class="dish-box" id="dish-box">
                <div class="basket-dish" id="basket-dish">
                <div class="basket-description">
                    <span class="bold">${basket[0]['amount']}</span>
                    <span>x ${basket[0]['name']}</span>
                    <span class="bold">${basket[0]['price'].toFixed(2)}€</span>
                </div>
                <div class="basket-icons">
                    <img id="plus0" src="icon/plus.png" onclick="plus(0)">
                    <img id="minus0" src="icon/minus.png" onclick="minus(0)">
                    <img id="deleteDish0" src="icon/delete.png" onclick="deleteDish(0)">
                </div>
            </div>  
            </div>
            <div class="all-container">
            <div class="basket-all" id="basket-all">
                <div class="sum">
                    <p>Zwischensumme:</p><p>${basket[0]['price'].toFixed(2)} €</p>
                </div>
                <div class="sum order-cost">
                    <p>zzgl. Lieferkosten</p><p>3.50 €</p>
                </div>
                <div class="sum-all">
                    <p>Gesamt:</p><p>${basket[0]['price'].toFixed(2)} Euro</p>
                </div>
            </div>
            <div class="order-button" onclick="order()" id="order-button">
                <img class="order-icon" src="icon/brinx-icon.png" id="order-bike">
                <span id="order-text">bestellen</span>
            </div>
        </div>
    `;
}


function generateDishes(name, description, price, index, active){
    let content = document.getElementById(`content${active}`);
    content.innerHTML += `
             <div class="dish">
                <div class="dish-and-price">
                    <div>
                    <div class="dish-title" id="dish${index}_${active}">
                        ${name[index]}
                    </div>    
                    <div class="dish-description">
                        ${description[index]}
                    </div>
                    </div>
                    <div class="dish-price" id="price${index}_${active}">
                        ${price[index].toFixed(2)} €
                    </div>
                </div>
                <div class="add-dish">
                    <img onclick="addToBasket(${index}, ${active})" src="icon/plus.png" id="plusButton${index}_${active}" alt="">
                </div>
            </div>
    `;
}


function renderHeadline(active){
    let headline = document.getElementById(`headline-content${active}`);
    headline.innerHTML = `
                <h1>${restaurantData[active]['title']}
                    <div class="heart-plane">
                        <img class="icons-unimp" src="icon/present.png">
                        <img class="icons-unimp" src="icon/camera.svg">
                        <img class="icons-unimp" src="icon/leaf.svg">
                        <img src="icon/plane-icon.png">
                        <img src="icon/heart.png">  
                    </div>
                </h1>
                <div class="stars">
                    <img src="icon/star-symbol-icon.svg">   
                    <img src="icon/star-symbol-icon.svg">
                    <img src="icon/star-symbol-icon.svg">   
                    <img src="icon/star-symbol-icon.svg">
                    <img src="icon/star-symbol-icon.svg">   
                    <span>(${restaurantData[active]['ratings']} Bewertungen)</span>
                </div>
    `;
}
