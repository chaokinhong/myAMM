pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";



contract Pool is ERC20{
    address private owner;
    address public tokenAddress;
    uint256 public tokenRewardBalance;
    uint256 public etrRewardBalance;
    uint256 public tokenTarget;
    uint256 public etrTarget;
    uint256 public totalElectricity;
    address[] public tokenRewardList;
    address[] public etrRewardList;
    mapping(address=>uint256) public tokenRewardRecord;
    mapping(address=>uint256) public etrRewardRecord;
    mapping(address=>uint256) public tokenStakeBalance;
    mapping(address=>uint256) public etrStakeBalance;

    constructor(address token,uint256 _tokenTarget,uint256 _etrTarget) ERC20("Electron Token", "ETR") {
        tokenAddress = token;
        owner = msg.sender;
        tokenTarget = _tokenTarget;
        etrTarget = _etrTarget;
    }




    /*---------------------------------------event-------------------------------------------------------------*/
    event TokenBuy(
        address indexed buyer,
        uint256 indexed token2Sold,
        uint256 indexed token1Bought
    );
    event EtrBuy(
        address indexed buyer,
        uint256 indexed token1Sold,
        uint256 indexed token2Bought
    );
    event AddToken(
        address indexed provider,
        uint256 indexed token1Amount
    );

    event AddEtr(
        address indexed provider,
        uint256 indexed token2Amount
    );

    event RemoveToken (
        address indexed provider,
        uint256 indexed token1Amount
    );

     event RemoveEtr (
        address indexed provider,
        uint256 indexed token2Amount
    );

    event ElectricityIn (
        address indexed provider,
        uint256 indexed electricityAmount
    );

    event ElectricityOut (
        address indexed provider,
        uint256 indexed electricityAmount
    );

    event tokenRewardGiveOut (
        address indexed provider,
        uint256 amount
    );

     event etrRewardGiveOut (
        address indexed provider,
        uint256 amount
    );
/********************************notes/***************************************
view tells us that by running the function, no data will be saved/changed.
pure tells us that not only does the function not save any data to the blockchain, but it also doesn't read any data from the blockchain.




/********************************notes/****************************************/



    
    /*----------------------------private function-----------------------------*/
    function getReserve(address _tokenAddress) public view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }


    function getAmount(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) private pure returns (uint256) {
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");
        // 3% fee
        uint256 inputAmountWithFee = inputAmount * 97;
        uint256 numerator = inputAmountWithFee * outputReserve;
        uint256 denominator = (inputReserve * 100) + inputAmountWithFee;
        return numerator / denominator;
    }

    function getAmountNofee(
        uint256 inputAmount,
        uint256 inputReserve,
        uint256 outputReserve
    ) private pure returns (uint256){
        require(inputReserve > 0 && outputReserve > 0, "invalid reserves");
        uint256 k = inputReserve*outputReserve;
        uint256 new_reserve = k/(inputReserve + inputAmount);
        uint256 output_no_fee = outputReserve - new_reserve;
        return output_no_fee;
    }

    function getTokenPercentage() private view returns (uint256){
        return tokenStakeBalance[msg.sender]/getReserve(tokenAddress);
    }

    function getEtrPercentage() private  view returns (uint256){
        return etrStakeBalance[msg.sender]/getReserve(address(this));
    }

    function giveOutTokenReward() private view returns (uint256){
        return tokenRewardBalance*tokenRewardRecord[msg.sender]/(10**18);
    }

    function giveOutEtrReward() private  view returns (uint256){
        return etrRewardBalance*etrRewardRecord[msg.sender]/(10**18);
    }

    function updateCurrentStakeToken() private  view returns (uint256){
        return tokenRewardRecord[msg.sender]*getReserve(tokenAddress);
    }

    function updateCurrentStakeEtr() private  view returns (uint256){
        return etrRewardRecord[msg.sender]*getReserve(address(this));
    }

    /*------------------------liquidity----------------------------*/
    function EtrToTokenSwap(uint256 amount) external  {
        require(amount > 0 ,'not greater than 0');
        uint256 tokenReserve = getReserve(tokenAddress);
        uint256 etrReserve = getReserve(address(this));

        uint256 token_out = getAmount(amount,etrReserve,tokenReserve);
        uint256 token_virtual_out = getAmountNofee(amount,etrReserve,tokenReserve);
        uint256 reward = token_virtual_out - token_out;
        tokenRewardBalance += reward;
        IERC20(address(this)).transferFrom(msg.sender,address(this),amount);
        IERC20(tokenAddress).transfer(msg.sender,token_out);
        tokenStakeBalance[msg.sender] = updateCurrentStakeToken();
        etrStakeBalance[msg.sender] = updateCurrentStakeEtr();
        emit TokenBuy(msg.sender,amount,token_out);
        

    }

     function tokenToEtrSwap(uint256 amount) external  {
        require(amount > 0 ,'not greater than 0');
        uint256 tokenReserve = getReserve(tokenAddress);
        uint256 etrReserve = getReserve(address(this));

        uint256 etrOut = getAmount(amount,tokenReserve,etrReserve);
        uint256 etr_virtual_out = getAmountNofee(amount,tokenReserve,etrReserve);
        uint256 reward = etr_virtual_out-etrOut;
        etrRewardBalance += reward;
        IERC20(tokenAddress).transferFrom(msg.sender,address(this),amount);
        IERC20(address(this)).transfer(msg.sender,etrOut);
        tokenStakeBalance[msg.sender] = updateCurrentStakeToken();
        etrStakeBalance[msg.sender] = updateCurrentStakeEtr();
        emit EtrBuy(msg.sender,amount,etrOut);
    }


    function addTokenLiquidity(uint256 amount) external  {
        require(amount > 0 ,'not greater than 0');
        IERC20(tokenAddress).transferFrom(msg.sender,address(this),amount);
        tokenStakeBalance[msg.sender] += amount;
        tokenRewardRecord[msg.sender] = getTokenPercentage();
        emit AddToken(msg.sender, amount);
    }

    function addEtrLiquidity(uint256 amount) external  {
        require(amount > 0 ,'not greater than 0');
        IERC20(address(this)).transferFrom(msg.sender,address(this),amount);
        etrStakeBalance[msg.sender] += amount;
        etrRewardRecord[msg.sender] =  getEtrPercentage();
        emit AddEtr(msg.sender, amount);
    }


    function withdrawTokenLiquidity(uint256 amount) external {
        require(amount > 0 ,'not greater than 0');
        uint256 reward = giveOutTokenReward(); 
        tokenStakeBalance[msg.sender] -= amount;
        uint256 ratio = getTokenPercentage();
        tokenRewardRecord[msg.sender] = ratio;
        IERC20(tokenAddress).transferFrom(address(this),msg.sender,amount+reward);
        emit RemoveToken(msg.sender, amount);
    }

    function withdrawEtrLiquidity(uint256 amount) external {
        require(amount > 0 ,'not greater than 0');
        uint256 reward = giveOutEtrReward();
        etrStakeBalance[msg.sender] -= amount;
        uint256 ratio = getEtrPercentage();
        etrRewardRecord[msg.sender] = ratio;
        IERC20(address(this)).transferFrom(address(this),msg.sender,amount+reward);
        emit RemoveEtr(msg.sender, amount);
    }


    function electricityToEtr(uint256 _electricityIn) public  {
        require(_electricityIn > 0 ,'not greater than 0');
        _mint(msg.sender,_electricityIn);
        emit ElectricityIn(msg.sender,_electricityIn);
    }

    function etrToElectricity(uint256 _electricityOut) public  {
        require(_electricityOut > 0 ,'not greater than 0');
        _burn(msg.sender,_electricityOut);
        emit ElectricityOut(msg.sender,_electricityOut);
    }






    /*----------------------view---------------------------*/
    function getTokenAmount(uint256 _etrIn) public view returns (uint256){
        require(_etrIn > 0 ,'cannot be zero');
        uint256 tokenReserve = getReserve(tokenAddress);
        uint256 etrReserve = getReserve(address(this));
        return getAmount(_etrIn,etrReserve,tokenReserve);
    }

    function getEtrAmount(uint256 _tokenin) public view returns (uint256){
        require(_tokenin > 0 ,'cannot be zero');
        uint256 tokenReserve = getReserve(tokenAddress);
        uint256 etrReserve = getReserve(address(this));
        return getAmount(_tokenin,tokenReserve,etrReserve);
    }

     function getEtrAmountNofee(uint256 _tokenin) public view returns (uint256){
        require(_tokenin > 0 ,'cannot be zero');
        uint256 tokenReserve = getReserve(tokenAddress);
        uint256 etrReserve = getReserve(address(this));
        return getAmountNofee(_tokenin,tokenReserve,etrReserve);
    }

    function getTotalEtrReserve() public view returns(uint256){
        return getReserve(address(this));
    }

    function getTotalEtrSupply() public view returns(uint256){
        return totalSupply();
    }

    function getTotalTokenReserve() public view returns(uint256){
        return getReserve(tokenAddress);
    }

    function getCurrentPrice() public view returns(uint256){
        return getReserve(tokenAddress)/getReserve(address(this));
    }

    function getTokenRewardBalance() public view returns(uint256){
        return tokenRewardBalance;
    }

    function getEtrRewardBalance() public view returns(uint256){
        return etrRewardBalance;
    }

    function getTokenRewardRatio() public view returns(uint256){
        return tokenRewardRecord[msg.sender];
    }

    function getEtrRewardRatio() public view returns(uint256){
        return etrRewardRecord[msg.sender];
    }

    function getMyTokenStakeBalance() public view returns(uint256){
        return tokenStakeBalance[msg.sender];
    }

    function getMyEtrStakeBalance() public view returns(uint256){
        return etrStakeBalance[msg.sender];
    }




}
