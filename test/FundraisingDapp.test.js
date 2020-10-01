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
    
        it('has a contractName', async () => {
          const contractName = await fundraisingDapp.contractName()
          assert.equal(contractName, 'Fundraising Dapp')
        })
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
  })

})