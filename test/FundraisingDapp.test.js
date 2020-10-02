const { contracts_build_directory } = require("../truffle-config")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const FundraisingDapp = artifacts.require('./FundraisingDapp.sol')

contract('FundraisingDapp',([deployer, beneficiary, donor]) => {
    let fundraisingDapp
    before(async () => {
        fundraisingDapp = await FundraisingDapp.deployed()
    })

    describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await fundraisingDapp.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
    
        // it('has a contractName', async () => {
        //   const contractName = await fundraisingDapp.contractName()
        //   assert.equal(contractName, 'Fundraising Dapp')
        // })
    })
    
    describe('campaigns', async () => {
      let result, campaignCount

      before(async () => {
        result = await fundraisingDapp.createCampaign('Student Care','For students from 1st to 12th Std','Education',web3.utils.toWei('10','Ether'), {from: beneficiary})
        campaignCount = await fundraisingDapp.campaignCount()
      })
  
      it('creates campaigns', async () => {
        
        assert.equal(campaignCount, 1)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), campaignCount.toNumber(),'id is correct')
        assert.equal(event.recipient, beneficiary ,'address is correct')
        assert.equal(event.name, 'Student Care','Name is correct')
        assert.equal(event.description, 'For students from 1st to 12th Std','Description is correct')
        assert.equal(event.cause, 'Education','Cause is correct')
        assert.equal(event.fundingGoal, '10000000000000000000','Funding Goal is correct')
        assert.equal(event.raisedFunds, '0','Raised funds is correct')
        assert.equal(event.completed, false,'id is correct')

        // FAILURE
         await await fundraisingDapp.createCampaign('','For students from 1st to 12th Std','Education',web3.utils.toWei('10','Ether'), {from: beneficiary}).should.be.rejected;
         await await fundraisingDapp.createCampaign('Student Care','','Education',web3.utils.toWei('10','Ether'), {from: beneficiary}).should.be.rejected;
         await await fundraisingDapp.createCampaign('Student Care','For students from 1st to 12th Std','Education',0, {from: beneficiary}).should.be.rejected;
         await await fundraisingDapp.createCampaign('','',web3.utils.toWei('10','Ether'), {from: beneficiary}).should.be.rejected;
        
      })

      it('lists campaigns', async () => {
        const product = await fundraisingDapp.campaigns(campaignCount)
        assert.equal(product.id.toNumber(), campaignCount.toNumber(),'id is correct')
        assert.equal(product.recipient, beneficiary ,'address is correct')
        assert.equal(product.name, 'Student Care','Name is correct')
        assert.equal(product.description, 'For students from 1st to 12th Std','Description is correct')
        assert.equal(product.cause, 'Education','Cause is correct')
        assert.equal(product.fundingGoal, '10000000000000000000','Funding Goal is correct')
        assert.equal(product.raisedFunds, '0','Raised funds is correct')
        assert.equal(product.completed, false,'status is correct')
      })

      it('donate to campaign', async() => {
        //tracking the beneficiery balance
        let oldBeneficiaryBalance
        oldBeneficiaryBalance = await web3.eth.getBalance(beneficiary)
        oldBeneficiaryBalance = new web3.utils.BN(oldBeneficiaryBalance)

        //SUCCESS
        result = await fundraisingDapp.donate(campaignCount, {from: donor, value: web3.utils.toWei('10','Ether')})

        //checks log
        // console.log(result.logs)
        const event = result.logs[0].args
        assert.equal(event.id.toNumber(), campaignCount.toNumber(),'id is correct')
        assert.equal(event.recipient, beneficiary ,'recipient address is correct')
        assert.equal(event.donor, donor ,'donor address is correct')
        assert.equal(event.name, 'Student Care','Name is correct')
        assert.equal(event.description, 'For students from 1st to 12th Std','Description is correct')
        assert.equal(event.cause, 'Education','Cause is correct')
        assert.equal(event.fundingGoal, '10000000000000000000','Funding Goal is correct')
        assert.equal(event.raisedFunds, '10000000000000000000','Raised funds is correct')
        assert.equal(event.completed, true,'status is correct')

        //checking whether funds are recieved
        let newBeneficiaryBalance
        newBeneficiaryBalance = await web3.eth.getBalance(beneficiary)
        newBeneficiaryBalance = new web3.utils.BN(newBeneficiaryBalance)

        let amount
        amount = web3.utils.toWei('10','Ether')
        amount = new web3.utils.BN(amount)
        // console.log(oldBeneficiaryBalance,newBeneficiaryBalance,amount)
        const expectedBalance = oldBeneficiaryBalance.add(amount)
        assert.equal(newBeneficiaryBalance.toString(),expectedBalance.toString())


        //FAILURE
        await fundraisingDapp.donate(999999, {from: donor, value: web3.utils.toWei('10','Ether')}).should.be.rejected
        await fundraisingDapp.donate(campaignCount, {from: donor, value: web3.utils.toWei('5','Ether')}).should.be.rejected
        await fundraisingDapp.donate(campaignCount, {from: deployer, value: web3.utils.toWei('10','Ether')}).should.be.rejected
        await fundraisingDapp.donate(campaignCount, {from: donor, value: web3.utils.toWei('10','Ether')}).should.be.rejected
      })

  })

})