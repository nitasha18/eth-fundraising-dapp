pragma solidity 0.6.0;

contract FundraisingDapp {
    string public contractName;

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

    function createCampaign(string memory _name, string memory _description, string memory _cause, uint256 _fundingGoal) public  {
        campaignCount++;
        campaigns[campaignCount] = Campaign(campaignCount, msg.sender, _name,_description,_cause, _fundingGoal, 0, false);
        
        // cam.proposalHash = sha256(abi.encodePacked(msg.sender, _description, _cause, _endTime));
        
        emit ProposalAdded(campaignCount, msg.sender, _name,_description,_cause, _fundingGoal, 0, false);
    }
}