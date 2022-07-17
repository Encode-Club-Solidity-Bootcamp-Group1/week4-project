// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract ApeToken is ERC721PresetMinterPauserAutoId {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(string memory baseTokenURI)
        ERC721PresetMinterPauserAutoId("ApeToken", "Ape", baseTokenURI)
    {}
}