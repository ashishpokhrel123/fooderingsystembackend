const Food = require('../../models/food');
const mongoose = require('mongoose');
const testDB = 'mongodb://localhost:27017/foodorderingsystem';

beforeAll(async () => {
    await mongoose.connect(testDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
})

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
})
describe('Test of Food Schema', () => {
    test('Should create a new food', () => {
        return Food.create({
            foodname: 'Burger'
        }).then((response) => {
            expect(response.foodname).toBe('Burger')
        })
    })
    test('Should update the food', () => {
        return Food.findOne({ 'foodname': 'Burger' })
            .then((fod) => {
                fod.foodname = 'Sandwiche'
                fod.save().then((updatedFod) => {
                    expect(updatedFod.name).toBe('Sandwiche')
                })
            })
    })
    test('Should delete the fod', () => {
        return Food.findOneAndDelete({ 'foodname': 'Sandwiche' })
            .then((response) => {
                expect(response.foodname).toBe('Sandwiche')
            })
    })
})