pragma solidity 0.8.18;

contract TestContract {

    mapping(address => uint256) balances;

    constructor() {}

    function notSoSafeFunction() public {
        address(msg.sender).call{value: 1 ether}("");

        balances[msg.sender] = balances[msg.sender] - 1 ether;
    }

}