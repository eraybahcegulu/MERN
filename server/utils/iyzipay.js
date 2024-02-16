const Iyzipay = require('iyzipay');
const axios = require('axios');
const { generateId } = require('./uuid');

const iyzipay = new Iyzipay({
    apiKey: process.env.PAYMENT_API_KEY,
    secretKey: process.env.PAYMENT_SECRET_KEY,
    uri: 'https://sandbox-api.iyzipay.com'
});

const paymentPremium = async(userData) => {
    const id = generateId();
    const { userId, email, createdAt, lastLoginAt } = userData;
    const response = await axios.get('https://api64.ipify.org?format=json');

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
            cardHolderName: 'TestName TestSurname',
            cardNumber: '5528790000000008',
            expireMonth: '12',
            expireYear: '2030',
            cvc: '123',
            registerCard: '0'
        },
        buyer: {
            id: userId,
            name: 'Test',
            surname: 'Test',
            gsmNumber: '+905350000000',
            email: email,
            identityNumber: '74300864791',
            lastLoginDate: lastLoginAt,
            registrationDate: createdAt,
            registrationAddress: 'İzmir',
            ip: response.data.ip,
            city: 'İzmir',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'TestName TestSurname',
            city: 'İzmir',
            country: 'Turkey',
            address: 'İzmir',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'TestName TestSurname',
            city: 'İzmir',
            country: 'Turkey',
            address: 'İzmir',
            zipCode: '34742'
        },
        basketItems: [
            {
                id: 'P100',
                name: 'Premium Membership',
                category1: 'Membership',
                category2: 'Premium',
                itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
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