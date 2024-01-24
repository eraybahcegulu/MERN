const Iyzipay = require('iyzipay');
const { v4: uuidv4 } = require('uuid');

const iyzipay = new Iyzipay({
    apiKey: process.env.PAYMENT_API_KEY,
    secretKey: process.env.PAYMENT_SECRET_KEY,
    uri: 'https://sandbox-api.iyzipay.com'
});


const paymentPremium = () => {
    const id = uuidv4();

    console.log("id:", id);
    const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: id,
        price: '1',
        paidPrice: '1',
        currency: "TRY",
        installment: '1',
        paymentChannel: "WEB",
        paymentGroup: "PRODUCT",
        paymentCard: {
            cardHolderName: 'John Doe',
            cardNumber: '5528790000000008',
            expireMonth: '12',
            expireYear: '2030',
            cvc: '123',
            registerCard: '0'
        },
        buyer: {
            id: 'BY789',
            name: 'John',
            surname: 'Doe',
            gsmNumber: '+905350000000',
            email: 'email@email.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        basketItems: [
            {
                id: 'BI101',
                name: 'Binocular',
                category1: 'Collectibles',
                category2: 'Accessories',
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: '1'
            },
        ]
    };

    iyzipay.payment.create(request, function (err, result) {
        console.log(err, result);
    });
}

module.exports = {
    paymentPremium,
};