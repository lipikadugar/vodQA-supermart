pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Purchase.sol";

contract TestPurchase {
    Purchase purchase = Purchase(DeployedAddresses.Purchase());

    // Testing the purchase() function
    function testUserCanPurchaseAnItem() public {
        uint returnedId = purchase.buy(8);

        uint expected = 8;

        Assert.equal(returnedId, expected, "Purchase of item ID 8 should be recorded.");
    }

    // Testing retrieval of a single item's buyer
    function testGetBuyerAddressByItemId() public {
        // Expected owner is this contract
        address expected = this;

        address buyer = purchase.buyers(8);

        Assert.equal(buyer, expected, "Owner of item ID 8 should be recorded.");
    }

    // Testing retrieval of all item buyers
    function testGetBuyerAddressByItemIdInArray() public {
        // Expected owner is this contract
        address expected = this;

        // Store buyers in memory rather than contract's storage
        address[16] memory buyers = purchase.getBuyers();

        Assert.equal(buyers[8], expected, "Owner of item ID 8 should be recorded.");
    }
}
