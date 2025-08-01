// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HskA is ERC20 {
    constructor() ERC20("HskA", "HSKA") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}