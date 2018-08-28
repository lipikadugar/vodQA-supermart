pragma solidity ^0.4.17;

contract Purchase {
    address[16] public buyers;
    // Buying an item
    function buy(uint itemId) public returns (uint) {
        require(itemId >= 0 && itemId <= 15);

        buyers[itemId] = msg.sender;

        return itemId;
    }
    // Retrieving the adopters
    function getBuyers() public view returns (address[16]) {
        return buyers;
    }
}
