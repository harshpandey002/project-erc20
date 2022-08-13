// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HKPtoken is ERC20, ERC20Burnable, Ownable  {

    uint public tokenPrice;
    uint public maxSupply;
    
    constructor() ERC20("HKPtoken", "HKP") {
        tokenPrice = 2000000000000000;
        maxSupply = 150000000000000000000;
    }

    function mint(uint amount) public payable{
        require(totalSupply() + amount < maxSupply, "Exceeding max supply");
        require(msg.value * 10 ** decimals() / amount >= tokenPrice, "Pay Ether according to Token Price");
        _mint(msg.sender, amount);
    }

    function setTokenPrice(uint _tokenPrice) public onlyOwner{
        tokenPrice = _tokenPrice;
    }

    function setMaxSupply(uint _amount) public onlyOwner{
        maxSupply= _amount;
    }

    function withdrawEther() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function returnState() public view returns(uint _myBalance, uint _maxSupply, uint _totalSupply, uint _tokenPrice ){
        return (balanceOf(msg.sender), maxSupply, totalSupply(), tokenPrice);
    }

}