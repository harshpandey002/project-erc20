// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract HKPtoken is ERC20, ERC20Burnable {

    uint public tokenPrice;
    uint public maxSupply;
    address public owner;

    constructor() ERC20("HKPtoken", "HKP") {
         tokenPrice = 10000000000000000;
         maxSupply = 150;
         owner = msg.sender;
    }

    function mint(uint amount) public payable{
        require(totalSupply() + amount < maxSupply * 10 ** decimals(), "Exceeding max supply");
        require(msg.value * 10 ** decimals() / amount >= tokenPrice, "Pay Ether according to Token Price");
        _mint(msg.sender, amount);
    }

    function setTokenPrice(uint _tokenPrice) public {
        tokenPrice = _tokenPrice;
    }

    function setMaxSupply(uint _amount) public {
        maxSupply= _amount;
    }

    function withdrawEther() public {
        require(msg.sender == owner, "Only owner can withdraw ether");
        payable(owner).transfer(address(this).balance);
    }

}