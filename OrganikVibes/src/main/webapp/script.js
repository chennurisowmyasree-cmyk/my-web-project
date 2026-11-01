// ============================================================
// ORGANIK VIBES - COMPLETE SCRIPT.JS
// ============================================================


// ============================================================
// GET CART
// ============================================================

function getCart() {

    try {

        const cart = localStorage.getItem("cart");

        if (!cart) {
            return [];
        }

        const parsedCart = JSON.parse(cart);

        return Array.isArray(parsedCart) ? parsedCart : [];

    } catch (error) {

        console.error("Cart loading error:", error);

        return [];
    }
}


// ============================================================
// SAVE CART
// ============================================================

function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ============================================================
// UPDATE CART COUNT
// ============================================================

function updateCartCount() {

    const cart = getCart();

    let total = 0;

    cart.forEach(function (item) {

        total += Number(item.quantity) || 0;

    });

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent = total;

    }
}


// ============================================================
// ADD TO CART
// ============================================================

function addToCart(id, name, price, image) {

    let cart = getCart();

    id = String(id);

    price = Number(price) || 0;

    const existingProduct =
        cart.find(function (item) {

            return String(item.id) === id;

        });


    if (existingProduct) {

        existingProduct.quantity =
            Number(existingProduct.quantity) + 1;

    } else {

        cart.push({

            id: id,

            name: name,

            price: price,

            image: image || "",

            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    updateProductButtons();

    displayCart();
}


// ============================================================
// INCREASE QUANTITY
// ============================================================

function increaseQuantity(id) {

    let cart = getCart();

    id = String(id);

    const product =
        cart.find(function (item) {

            return String(item.id) === id;

        });


    if (!product) {
        return;
    }


    product.quantity =
        Number(product.quantity) + 1;


    saveCart(cart);

    updateCartCount();

    updateProductButtons();

    displayCart();
}


// ============================================================
// DECREASE QUANTITY
// ============================================================

function decreaseQuantity(id) {

    let cart = getCart();

    id = String(id);

    const product =
        cart.find(function (item) {

            return String(item.id) === id;

        });


    if (!product) {
        return;
    }


    product.quantity =
        Number(product.quantity) - 1;


    if (product.quantity <= 0) {

        cart = cart.filter(function (item) {

            return String(item.id) !== id;

        });

    }


    saveCart(cart);

    updateCartCount();

    updateProductButtons();

    displayCart();
}


// ============================================================
// REMOVE FROM CART
// ============================================================

function removeFromCart(id) {

    let cart = getCart();

    id = String(id);


    cart = cart.filter(function (item) {

        return String(item.id) !== id;

    });


    saveCart(cart);

    updateCartCount();

    updateProductButtons();

    displayCart();
}


// ============================================================
// REMOVE PRODUCT
// ============================================================

function removeProduct(id) {

    removeFromCart(id);

}


// ============================================================
// CLEAR CART
// ============================================================

function clearCart() {

    const cart = getCart();

    if (cart.length === 0) {
        return;
    }


    const confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (!confirmClear) {
        return;
    }


    localStorage.removeItem("cart");

    updateCartCount();

    updateProductButtons();

    displayCart();
}


// ============================================================
// DISCOUNT
// ============================================================

function getDiscountRate(total) {

    if (total >= 5000) {
        return 50;
    }

    if (total >= 3000) {
        return 40;
    }

    if (total >= 1500) {
        return 30;
    }

    if (total >= 1000) {
        return 25;
    }

    if (total >= 800) {
        return 20;
    }

    if (total >= 600) {
        return 15;
    }

    if (total >= 400) {
        return 10;
    }

    if (total >= 200) {
        return 5;
    }

    return 0;
}


// ============================================================
// UPDATE CATEGORY PRODUCT BUTTONS
// ============================================================

function updateProductButtons() {

    const products =
        document.querySelectorAll(".product");

    const cart = getCart();


    products.forEach(function (product) {

        const id =
            product.getAttribute("data-id");


        if (!id) {
            return;
        }


        const name =
            product.getAttribute("data-name") || "";


        const price =
            product.getAttribute("data-price") || "0";


        const imageElement =
            product.querySelector("img");


        let image = "";


        if (imageElement) {

            image =
                imageElement.getAttribute("src") || "";

        }


        const buttonArea =
            product.querySelector(".cart-button");


        if (!buttonArea) {
            return;
        }


        const productInCart =
            cart.find(function (item) {

                return String(item.id) === String(id);

            });


        // PRODUCT ALREADY IN CART

        if (productInCart) {

            buttonArea.innerHTML = `

                <div class="quantity-control">

                    <button
                        type="button"
                        onclick="decreaseQuantity('${id}')">
                        −
                    </button>

                    <span>
                        ${Number(productInCart.quantity)}
                    </span>

                    <button
                        type="button"
                        onclick="increaseQuantity('${id}')">
                        +
                    </button>

                </div>

            `;

            return;
        }


        // PRODUCT NOT IN CART

        buttonArea.innerHTML = `

            <button
                type="button"
                class="add-to-cart">
                Add to Cart
            </button>

        `;


        const addButton =
            buttonArea.querySelector(".add-to-cart");


        if (addButton) {

            addButton.addEventListener(
                "click",
                function () {

                    addToCart(
                        id,
                        name,
                        price,
                        image
                    );

                }
            );

        }

    });

}


// ============================================================
// DISPLAY CART
// ============================================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");


    if (!cartItems) {
        return;
    }


    const cart = getCart();


    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>Your Cart Is Empty</h2>

                <p>
                    Add products from the Categories page.
                </p>

            </div>

        `;


        updateCartSummary();

        return;
    }


    // DISPLAY PRODUCTS

    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        const total =
            price * quantity;


        const card =
            document.createElement("div");


        card.className = "cart-card";


        card.innerHTML = `

            <img
                src="${item.image || ""}"
                alt="${item.name || "Product"}"
            >

            <h3>
                ${item.name || "Product"}
            </h3>

            <p class="cart-price">
                ₹${price.toFixed(2)}
            </p>

            <div class="cart-quantity">

                <button
                    type="button"
                    onclick="decreaseQuantity('${item.id}')">
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    type="button"
                    onclick="increaseQuantity('${item.id}')">
                    +
                </button>

            </div>

            <p class="item-total">

                Total:
                ₹${total.toFixed(2)}

            </p>

            <button
                type="button"
                class="remove-item"
                onclick="removeFromCart('${item.id}')">

                Remove

            </button>

        `;


        cartItems.appendChild(card);

    });


    updateCartSummary();

}


// ============================================================
// CART SUMMARY
// ============================================================

function updateCartSummary() {

    const cart = getCart();

    let subtotal = 0;


    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        subtotal +=
            price * quantity;

    });


    const discountRate =
        getDiscountRate(subtotal);


    const discountAmount =
        subtotal * discountRate / 100;


    const finalTotal =
        subtotal - discountAmount;


    // SUBTOTAL

    const subtotalElement =
        document.getElementById("cart-subtotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            subtotal.toFixed(2);

    }


    // DISCOUNT RATE

    const discountRateElement =
        document.getElementById("discount-rate");


    if (discountRateElement) {

        discountRateElement.textContent =
            discountRate + "%";

    }


    // DISCOUNT AMOUNT

    const discountElement =
        document.getElementById("cart-discount");


    if (discountElement) {

        discountElement.textContent =
            discountAmount.toFixed(2);

    }


    // FINAL TOTAL

    const totalElement =
        document.getElementById("cart-total");


    if (totalElement) {

        totalElement.textContent =
            finalTotal.toFixed(2);

    }

}


// ============================================================
// OLD CHECKOUT FUNCTION
// ============================================================

function checkout() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    window.location.href =
        "checkout.html";
}


// ============================================================
// PAYMENT - SHOW PAYMENT OPTIONS
// ============================================================

function showPayment() {

    const cart = getCart();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const paymentSection =
        document.getElementById(
            "payment-section"
        );


    if (!paymentSection) {

        alert(
            "Payment section not found."
        );

        return;
    }


    paymentSection.style.display =
        "block";


    paymentSection.scrollIntoView({
        behavior: "smooth"
    });

}


// ============================================================
// PAYMENT - PROCEED
// ============================================================

function proceedPayment() {

    const selectedPayment =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        );


    // NOTHING SELECTED

    if (!selectedPayment) {

        alert(
            "Please select Cash on Delivery or UPI."
        );

        return;
    }


    // ========================================================
    // CASH ON DELIVERY
    // ========================================================

    if (selectedPayment.value === "COD") {

        completeOrder();

        return;
    }


    // ========================================================
    // UPI
    // ========================================================

    if (selectedPayment.value === "UPI") {

        const paymentSection =
            document.getElementById(
                "payment-section"
            );


        const qrSection =
            document.getElementById(
                "qr-section"
            );


        if (paymentSection) {

            paymentSection.style.display =
                "none";

        }


        if (qrSection) {

            qrSection.style.display =
                "block";

        }


        generateQRCode();


        if (qrSection) {

            qrSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }

}


// ============================================================
// GENERATE UPI QR CODE
// ============================================================

function generateQRCode() {

    const qrBox =
        document.getElementById("qrcode");


    if (!qrBox) {

        alert(
            "QR code section not found."
        );

        return;
    }


    // Remove old QR

    qrBox.innerHTML = "";


    // ========================================================
    // YOUR UPI ID
    // ========================================================

    const upiID =
        "9390245737@upi";


    // ========================================================
    // GET CART TOTAL
    // ========================================================

    const totalElement =
        document.getElementById(
            "cart-total"
        );


    let amount = 1;


    if (totalElement) {

        const totalText =
            totalElement.innerText;


        amount =
            parseFloat(
                totalText.replace(
                    /[^\d.]/g,
                    ""
                )
            );


        if (
            isNaN(amount) ||
            amount <= 0
        ) {

            amount = 1;

        }

    }


    // ========================================================
    // CREATE UPI PAYMENT LINK
    // ========================================================

    const upiLink =

        "upi://pay?" +

        "pa=" +
        encodeURIComponent(upiID) +

        "&pn=" +
        encodeURIComponent(
            "Organik Vibes"
        ) +

        "&am=" +
        amount.toFixed(2) +

        "&cu=INR";


    // ========================================================
    // CREATE QR
    // ========================================================

    if (typeof QRCode === "undefined") {

        alert(
            "QR Code library is not loaded. Please add the QRCode script in cart.html."
        );

        return;
    }


    new QRCode(qrBox, {

        text: upiLink,

        width: 220,

        height: 220

    });

}


// ============================================================
// COMPLETE ORDER - CART PAYMENT
// ============================================================

function completeOrder() {

    const paymentSection =
        document.getElementById(
            "payment-section"
        );


    const qrSection =
        document.getElementById(
            "qr-section"
        );


    const thankYou =
        document.getElementById(
            "thank-you"
        );


    // HIDE PAYMENT

    if (paymentSection) {

        paymentSection.style.display =
            "none";

    }


    // HIDE QR

    if (qrSection) {

        qrSection.style.display =
            "none";

    }


    // SHOW THANK YOU

    if (thankYou) {

        thankYou.style.display =
            "block";


        thankYou.scrollIntoView({
            behavior: "smooth"
        });

    } else {

        alert(
            "Thank you for ordering from Organik Vibes!"
        );

    }


    // CLEAR CART

    localStorage.removeItem("cart");


    // UPDATE CART

    updateCartCount();

    updateProductButtons();

    displayCart();

}


// ============================================================
// CUSTOMER LOGIN
// ============================================================

function checkCustomerLogin() {

    fetch("CustomerServlet")

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "CustomerServlet error"
                );

            }

            return response.json();

        })

        .then(function (customer) {

            if (customer.loggedIn === true) {

                showLoggedInCustomer(
                    customer
                );

            } else {

                showLoggedOutCustomer();

            }

        })

        .catch(function (error) {

            console.error(
                "CustomerServlet error:",
                error
            );

        });

}


// ============================================================
// CUSTOMER LOGGED IN
// ============================================================

function showLoggedInCustomer(customer) {

    const name =
        customer.fullname ||
        customer.name ||
        "Account";


    const customerName =
        document.getElementById(
            "customerName"
        );


    if (customerName) {

        customerName.textContent =
            name;

    }


    const loginRegisterArea =
        document.getElementById(
            "loginRegisterArea"
        );


    if (loginRegisterArea) {

        loginRegisterArea.style.display =
            "none";

    }


    const customerDetails =
        document.getElementById(
            "customerDetails"
        );


    if (customerDetails) {

        customerDetails.style.display =
            "block";

    }


    const displayFullname =
        document.getElementById(
            "displayFullname"
        );


    if (displayFullname) {

        displayFullname.textContent =
            customer.fullname ||
            name;

    }


    const displayName =
        document.getElementById(
            "displayName"
        );


    if (displayName) {

        displayName.textContent =
            customer.fullname ||
            name;

    }


    const displayEmail =
        document.getElementById(
            "displayEmail"
        );


    if (displayEmail) {

        displayEmail.textContent =
            customer.email ||
            "-";

    }


    const displayMobile =
        document.getElementById(
            "displayMobile"
        );


    if (displayMobile) {

        displayMobile.textContent =
            customer.mobile ||
            "-";

    }


    const displayDob =
        document.getElementById(
            "displayDob"
        );


    if (displayDob) {

        displayDob.textContent =
            customer.dob ||
            "-";

    }


    const displayGender =
        document.getElementById(
            "displayGender"
        );


    if (displayGender) {

        displayGender.textContent =
            customer.gender ||
            "-";

    }


    const displayAddress =
        document.getElementById(
            "displayAddress"
        );


    if (displayAddress) {

        let address = "";


        if (customer.hno) {

            address +=
                customer.hno;

        }


        if (customer.area) {

            if (address !== "") {

                address += ", ";

            }

            address +=
                customer.area;

        }


        displayAddress.textContent =
            address || "-";

    }


    const displayCity =
        document.getElementById(
            "displayCity"
        );


    if (displayCity) {

        displayCity.textContent =
            customer.city ||
            "-";

    }


    const displayState =
        document.getElementById(
            "displayState"
        );


    if (displayState) {

        displayState.textContent =
            customer.state ||
            "-";

    }


    const displayPincode =
        document.getElementById(
            "displayPincode"
        );


    if (displayPincode) {

        displayPincode.textContent =
            customer.pincode ||
            "-";

    }


    const accountBenefits =
        document.getElementById(
            "accountBenefits"
        );


    if (accountBenefits) {

        accountBenefits.style.display =
            "none";

    }

}


// ============================================================
// CUSTOMER LOGGED OUT
// ============================================================

function showLoggedOutCustomer() {

    const customerName =
        document.getElementById(
            "customerName"
        );


    if (customerName) {

        customerName.textContent =
            "Account";

    }


    const loginRegisterArea =
        document.getElementById(
            "loginRegisterArea"
        );


    if (loginRegisterArea) {

        loginRegisterArea.style.display =
            "block";

    }


    const customerDetails =
        document.getElementById(
            "customerDetails"
        );


    if (customerDetails) {

        customerDetails.style.display =
            "none";

    }

}


// ============================================================
// LOGOUT
// ============================================================

function logoutCustomer() {

    window.location.href =
        "LogoutServlet";

}


// ============================================================
// EDIT PROFILE
// ============================================================

function editProfile() {

    alert(
        "Edit Profile feature will be connected next."
    );

}


// ============================================================
// REGISTRATION VALIDATION
// ============================================================

function validateRegistration() {

    const password =
        document.getElementById(
            "registerPassword"
        );


    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        );


    if (
        !password ||
        !confirmPassword
    ) {

        return true;

    }


    if (
        password.value !==
        confirmPassword.value
    ) {

        alert(
            "Passwords do not match."
        );

        return false;

    }


    return true;

}


// ============================================================
// CHECKOUT - GET CART
// ============================================================

function getCheckoutCart() {

    try {

        const cart =
            localStorage.getItem("cart");


        if (!cart) {

            return [];

        }


        const parsedCart =
            JSON.parse(cart);


        return Array.isArray(parsedCart)
            ? parsedCart
            : [];

    } catch (error) {

        console.error(
            "Checkout cart error:",
            error
        );

        return [];

    }

}


// ============================================================
// CHECKOUT DISCOUNT
// ============================================================

function getCheckoutDiscountRate(total) {

    if (total >= 5000) return 50;

    if (total >= 3000) return 40;

    if (total >= 1500) return 30;

    if (total >= 1000) return 25;

    if (total >= 800) return 20;

    if (total >= 600) return 15;

    if (total >= 400) return 10;

    if (total >= 200) return 5;

    return 0;

}


// ============================================================
// DISPLAY CHECKOUT
// ============================================================

function displayCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );


    if (!checkoutItems) {

        return;

    }


    const cart =
        getCheckoutCart();


    checkoutItems.innerHTML = "";


    // EMPTY CHECKOUT

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="empty-checkout">

                <h3>
                    Your Cart Is Empty
                </h3>

                <p>
                    Please add products before checkout.
                </p>

                <a href="categories.html">
                    Continue Shopping
                </a>

            </div>

        `;


        updateCheckoutTotals(0);

        return;

    }


    let subtotal = 0;


    // DISPLAY PRODUCTS

    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-item-info">

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "Product"}"
                >

                <div>

                    <h4>
                        ${item.name || "Product"}
                    </h4>

                    <p>

                        ₹${price.toFixed(2)}

                        ×

                        ${quantity}

                    </p>

                </div>

            </div>

            <strong>
                ₹${itemTotal.toFixed(2)}
            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    updateCheckoutTotals(
        subtotal
    );

}


// ============================================================
// UPDATE CHECKOUT TOTALS
// ============================================================

function updateCheckoutTotals(subtotal) {

    const discountRate =
        getCheckoutDiscountRate(
            subtotal
        );


    const discountAmount =
        subtotal * discountRate / 100;


    const finalTotal =
        subtotal - discountAmount;


    // SUBTOTAL

    const subtotalElement =
        document.getElementById(
            "checkout-subtotal"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            subtotal.toFixed(2);

    }


    // DISCOUNT

    const discountElement =
        document.getElementById(
            "checkout-discount"
        );


    if (discountElement) {

        discountElement.textContent =
            discountAmount.toFixed(2);

    }


    // DISCOUNT RATE

    const discountRateElement =
        document.getElementById(
            "checkout-discount-rate"
        );


    if (discountRateElement) {

        discountRateElement.textContent =
            discountRate + "%";

    }


    // FINAL TOTAL

    const totalElement =
        document.getElementById(
            "checkout-total"
        );


    if (totalElement) {

        totalElement.textContent =
            finalTotal.toFixed(2);

    }

}


// ============================================================
// PLACE ORDER - OLD CHECKOUT PAGE
// ============================================================

function placeOrder(event) {

    event.preventDefault();


    const cart =
        getCheckoutCart();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    // CUSTOMER DETAILS

    const fullnameElement =
        document.getElementById(
            "checkoutFullname"
        );


    const mobileElement =
        document.getElementById(
            "checkoutMobile"
        );


    const emailElement =
        document.getElementById(
            "checkoutEmail"
        );


    const addressElement =
        document.getElementById(
            "checkoutAddress"
        );


    const cityElement =
        document.getElementById(
            "checkoutCity"
        );


    const stateElement =
        document.getElementById(
            "checkoutState"
        );


    const pincodeElement =
        document.getElementById(
            "checkoutPincode"
        );


    const fullname =
        fullnameElement
            ? fullnameElement.value.trim()
            : "";


    const mobile =
        mobileElement
            ? mobileElement.value.trim()
            : "";


    const email =
        emailElement
            ? emailElement.value.trim()
            : "";


    const address =
        addressElement
            ? addressElement.value.trim()
            : "";


    const city =
        cityElement
            ? cityElement.value.trim()
            : "";


    const state =
        stateElement
            ? stateElement.value.trim()
            : "";


    const pincode =
        pincodeElement
            ? pincodeElement.value.trim()
            : "";


    // PAYMENT

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    if (!payment) {

        alert(
            "Please select a payment method."
        );

        return;

    }


    // MOBILE VALIDATION

    if (
        mobile &&
        !/^[0-9]{10}$/.test(mobile)
    ) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    // PINCODE VALIDATION

    if (
        pincode &&
        !/^[0-9]{6}$/.test(pincode)
    ) {

        alert(
            "Please enter a valid 6-digit pincode."
        );

        return;

    }


    // CALCULATE TOTAL

    let subtotal = 0;


    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 0;


        subtotal +=
            price * quantity;

    });


    const discountRate =
        getCheckoutDiscountRate(
            subtotal
        );


    const discountAmount =
        subtotal * discountRate / 100;


    const finalTotal =
        subtotal - discountAmount;


    // CREATE ORDER

    const order = {

        customer: {

            fullname: fullname,

            mobile: mobile,

            email: email,

            address: address,

            city: city,

            state: state,

            pincode: pincode

        },


        items: cart,


        subtotal: subtotal,


        discountRate: discountRate,


        discountAmount:
            discountAmount,


        total: finalTotal,


        paymentMethod:
            payment.value,


        orderDate:
            new Date().toISOString()

    };


    // SAVE LAST ORDER

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    alert(
        "Order placed successfully!"
    );


    // CLEAR CART

    localStorage.removeItem(
        "cart"
    );


    updateCartCount();


    // GO HOME

    window.location.href =
        "index.html";

}


// ============================================================
// INITIALIZE CHECKOUT
// ============================================================

function initializeCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );


    if (!checkoutItems) {

        return;

    }


    displayCheckout();


    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );


    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            placeOrder
        );

    }

}


// ============================================================
// PAGE LOAD
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // CART COUNT

        updateCartCount();


        // CATEGORY PRODUCTS

        updateProductButtons();


        // CART PAGE

        displayCart();


        // CUSTOMER

        checkCustomerLogin();


        // LOGOUT BUTTON

        const logoutButton =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                logoutCustomer
            );

        }


        // EDIT PROFILE BUTTON

        const editButton =
            document.getElementById(
                "editProfileBtn"
            );


        if (editButton) {

            editButton.addEventListener(
                "click",
                editProfile
            );

        }


        // REGISTRATION FORM

        const registerForm =
            document.querySelector(
                'form[action="RegisterServlet"]'
            );


        if (registerForm) {

            registerForm.addEventListener(
                "submit",
                function (event) {

                    if (
                        !validateRegistration()
                    ) {

                        event.preventDefault();

                    }

                }
            );

        }


        // CHECKOUT PAGE

        initializeCheckout();

    }
);


// ============================================================
// UPDATE CART WHEN ANOTHER TAB CHANGES IT
// ============================================================

window.addEventListener(
    "storage",
    function (event) {

        if (event.key === "cart") {

            updateCartCount();

            updateProductButtons();

            displayCart();

        }

    }
);