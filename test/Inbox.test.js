const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')
const provider = ganache.provider()
const web3 = new Web3(provider)
require('events').EventEmitter.defaultMaxListeners = 20;

let accounts
let inbox
const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts()

  //use one of the accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING]
    })
    .send({ from: accounts[0], gas: '1000000' })

  inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi there!')
  })

  it('can change the message', async () => {
    await inbox.methods.setMessage('Bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Bye')
  })
})



// class Car {
//   park() {
//     return 'stopped'
//   }
//
//   drive() {
//     return 'vroom'
//   }
// }
//
// let car;
//
// beforeEach(() => {
//   car = new Car()
// })
//
// describe('Car', () => {
//   it('can park', () => {
//     assert.equal(car.park(), 'stopped')
//   })
//
//   it('is able to drive', () => {
//     assert.equal(car.drive(), 'vroom')
//   })
// })
