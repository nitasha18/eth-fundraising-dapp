pragma solidity 0.6.0;

contract FundraisingDapp {
    string public contractName;
    // uint256 public fundingPool;

    constructor() public {
        contractName = "Fundraising Dapp";
    }

    struct Campaign {
        uint256 id;
        address payable recipient;                      //address where amount would get transfered
        string name;
        string description;
        string cause;
        // bytes32 proposalHash;                            //brief about Organisation
        uint256 fundingGoal;                                //total amount for raisingthe fund
        uint256 raisedFunds;                             //funds which have been raised for the proposal
        // uint256 startTime;
        // uint256 endTime;                    //time till the fund will be open for donating
        bool completed;    
    }

    uint256 public campaignCount = 0;
    mapping (uint256 => Campaign) public campaigns; 

    event ProposalAdded(uint256 id, address payable recipient, string name, string description, string cause, uint256 fundingGoal, uint256 raisedFunds ,bool completed);
    event ProposalEnded(uint256 id, address payable recipient, address payable donor,string name, string description, string cause, uint256 fundingGoal, uint256 raisedFunds ,bool completed);


    function createCampaign(string memory _name, string memory _description, string memory _cause, uint256 _fundingGoal) public  {
        require(bytes(_name).length > 0);
        require(bytes(_description).length > 0);
        require(_fundingGoal>0);

        campaignCount++;
        
        campaigns[campaignCount] = Campaign(campaignCount, msg.sender, _name,_description,_cause, _fundingGoal, 0, false);
        
        // cam.proposalHash = sha256(abi.encodePacked(msg.sender, _description, _cause, _endTime));
        
        emit ProposalAdded(campaignCount, msg.sender, _name,_description,_cause, _fundingGoal, 0, false);
    }

    function donate(uint256 _id) public payable
    {
        Campaign memory _campaign = campaigns[_id];
        address donor = msg.sender;

        require(_campaign.id >0 && _campaign.id <= campaignCount);
        require(donor !=_campaign.recipient ,"The same address holders cannot donate");
        require(!_campaign.completed);
        // require(currentTime < cam.endTime, "The proposal should be active");
        // require(cam.raisedFunds < cam.fundingGoal, "The campaign has already raised enough funds");
        
        _campaign.recipient.transfer(msg.value);
        _campaign.raisedFunds = msg.value;
        _campaign.completed = true;
        // cam.raisedFunds += msg.value;         //amount would be added to the proposal funds
        // emit Donated(_proposalAddress, msg.sender, msg.value);
        // if(cam.raisedFunds >= cam.fundingGoal || cam.endTime <= currentTime)
        // {
            emit ProposalEnded(_id, _campaign.recipient, msg.sender, _campaign.name,_campaign.description,_campaign.cause, _campaign.fundingGoal, msg.value, true);
        // }

        campaigns[_id] = _campaign;
        // emit TotalRaisedFunds(charityPoolDonations);
    }

}