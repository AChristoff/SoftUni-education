class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = {};
        this.productsInStock = {};
        this.actionsHistory = [];
    }

    loadProducts(products) {
        for (let product of products) {
            let [productName, productQuantity, productPrice] = product.split(' ');
            if (this.budget >= productPrice) {
                this.budget -= productPrice;
                this.productsInStock[productName] = (this.productsInStock[productName] += Number(productQuantity)) || Number(productQuantity);
                this.actionsHistory.push(`Successfully loaded ${productQuantity} ${productName}`)
            } else {
                this.actionsHistory.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        }
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, products, price) {
        if (!this.menu[meal]) {
            this.menu[meal] = {products, price};
            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`;
        } else {
            return `The ${meal} is already in the our menu, try something different.`;
        }
    }

    showTheMenu() {
        let printedMenu = [];
        let menu = Object.entries(this.menu);
        if (menu.length) {
            menu.forEach(meal => {
                printedMenu.push(`${meal[0]} - $ ${meal[1].price}\n`);
            });
            return printedMenu.join('');
        } else {
            return 'Our menu is not ready yet, please come later...';
        }
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        } else {
            for (let product of this.menu[meal].products) {
                let [neededProduct, neededQuantity] = product.split(' ');
                let isProductInStock = this.productsInStock.hasOwnProperty(neededProduct);
                let isQuantityEnough = this.productsInStock[neededProduct] >= neededQuantity;
                if (isProductInStock && isQuantityEnough) {
                    this.productsInStock[neededProduct] -= neededQuantity
                } else {
                    return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
                }
            }
            this.budget += this.menu[meal].price;
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`
        }
    }
}

let kitchen = new Kitchen(105);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
console.log(kitchen.budget);
console.log(kitchen.productsInStock);
console.log(kitchen.loadProducts(['Herbs 5 50']));
console.log(kitchen.menu);
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder('Tea'));
console.log(kitchen.makeTheOrder('Pizza'));
console.log(kitchen.makeTheOrder('frozenYogurt'));
console.log(kitchen.budget);
console.log(kitchen.productsInStock);
