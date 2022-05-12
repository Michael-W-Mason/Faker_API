const {faker} = require("@faker-js/faker")
const express = require("express");
const app = express();
const port = 8001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

class User{
    constructor(password, email, phoneNumber, lastName, firstName, _id){
        this.password = password;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.lastName = lastName;
        this.firstName = firstName;
        this.id = _id;
    }
}

class Company{
    constructor(name, address, _id){
        this.name = name;
        this.address = {
            street : address.street,
            city : address.city,
            state : address.state,
            zipcode : address.zipCode,
            country : address.country
        };
        this.id = _id;
    }
}

const generateUser = () => {
    const password = faker.internet.password();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.phoneNumber();
    const lastName = faker.name.lastName();
    const firstName = faker.name.firstName();
    const id = faker.seed();
    const user = new User(password, email, phoneNumber, lastName, firstName, id);
    return user;
}

const generateCompany = () => {
    const name = faker.company.companyName();
    const address = {
        street : faker.address.streetName(),
        city : faker.address.cityName(),
        state : faker.address.state(),
        zipCode : faker.address.zipCode(),
        country : faker.address.country()
    }
    const id = faker.seed();
    const company = new Company(name, address, id);
    return company;
}

app.get("/api/users/new", (req, res) => {
    const user = generateUser();
    res.json({user : user});
});

app.get("/api/companies/new", (req, res) => {
    const company = generateCompany();
    res.json({company : company});
});

app.get("/api/user/company", (req, res) => {
    const user = generateUser();
    const company = generateCompany();
    res.json({user : user, company : company});
});


app.listen(port, () => console.log(`listening on port ${port}`));

