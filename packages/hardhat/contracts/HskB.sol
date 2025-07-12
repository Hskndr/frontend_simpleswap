// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HskB is ERC20 {
    constructor() ERC20("HskB", "HSKB") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}