export type Rocketfun = {
  version: "0.1.0"
  name: "rocketfun"
  constants: [
    {
      name: "AUTHORITY_SEED"
      type: "string"
      value: '"authority"'
    },
    {
      name: "VIRTUAL_SOL"
      type: "u64"
      value: "24 * LAMPORTS_PER_SOL"
    },
  ]
  instructions: [
    {
      name: "createAmm"
      accounts: [
        {
          name: "amm"
          isMut: true
          isSigner: false
        },
        {
          name: "admin"
          isMut: false
          isSigner: false
          docs: ["The admin of the AMM"]
        },
        {
          name: "payer"
          isMut: true
          isSigner: true
          docs: ["The account paying for all rents"]
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
          docs: ["Solana ecosystem accounts"]
        },
      ]
      args: [
        {
          name: "id"
          type: "publicKey"
        },
      ]
    },
    {
      name: "createPool"
      accounts: [
        {
          name: "amm"
          isMut: false
          isSigner: false
        },
        {
          name: "pool"
          isMut: true
          isSigner: false
        },
        {
          name: "poolAuthority"
          isMut: true
          isSigner: false
        },
        {
          name: "mintA"
          isMut: false
          isSigner: false
        },
        {
          name: "poolAccountA"
          isMut: true
          isSigner: false
        },
        {
          name: "payer"
          isMut: true
          isSigner: true
          docs: ["The account paying for all rents"]
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
          docs: ["Solana ecosystem accounts"]
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: []
    },
    {
      name: "createTokenMint"
      accounts: [
        {
          name: "payer"
          isMut: true
          isSigner: true
        },
        {
          name: "metadataAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "mintAccount"
          isMut: true
          isSigner: true
        },
        {
          name: "associatedTokenAccount"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenMetadataProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "tokenName"
          type: "string"
        },
        {
          name: "tokenSymbol"
          type: "string"
        },
        {
          name: "tokenUri"
          type: "string"
        },
      ]
    },
    {
      name: "depositLiquidity"
      accounts: [
        {
          name: "pool"
          isMut: false
          isSigner: false
        },
        {
          name: "poolAuthority"
          isMut: true
          isSigner: false
        },
        {
          name: "depositor"
          isMut: false
          isSigner: true
          docs: ["The account paying for all rents"]
        },
        {
          name: "mintA"
          isMut: false
          isSigner: false
        },
        {
          name: "poolAccountA"
          isMut: true
          isSigner: false
        },
        {
          name: "depositorAccountA"
          isMut: true
          isSigner: false
        },
        {
          name: "payer"
          isMut: true
          isSigner: true
          docs: ["The account paying for all rents"]
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
          docs: ["Solana ecosystem accounts"]
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "amountA"
          type: "u64"
        },
      ]
    },
    {
      name: "swapExactTokensForTokens"
      accounts: [
        {
          name: "amm"
          isMut: false
          isSigner: false
        },
        {
          name: "pool"
          isMut: false
          isSigner: false
        },
        {
          name: "poolAuthority"
          isMut: true
          isSigner: false
        },
        {
          name: "trader"
          isMut: true
          isSigner: true
          docs: ["The account doing the swap"]
        },
        {
          name: "mintA"
          isMut: false
          isSigner: false
        },
        {
          name: "mintACreator"
          isMut: true
          isSigner: false
        },
        {
          name: "poolAccountA"
          isMut: true
          isSigner: false
        },
        {
          name: "traderAccountA"
          isMut: true
          isSigner: false
        },
        {
          name: "treasury"
          isMut: true
          isSigner: false
        },
        {
          name: "treasuryAccountA"
          isMut: true
          isSigner: false
        },
        {
          name: "payer"
          isMut: true
          isSigner: true
          docs: ["The account paying for all rents"]
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
          docs: ["Solana ecosystem accounts"]
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "rent"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "swapA"
          type: "bool"
        },
        {
          name: "inputAmount"
          type: "u64"
        },
        {
          name: "minOutputAmount"
          type: "u64"
        },
      ]
    },
    {
      name: "proxyInitialize"
      docs: ["initilaize market in raydium"]
      accounts: [
        {
          name: "ammProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "amm"
          isMut: true
          isSigner: false
        },
        {
          name: "ammAuthority"
          isMut: false
          isSigner: false
        },
        {
          name: "ammOpenOrders"
          isMut: true
          isSigner: false
        },
        {
          name: "ammLpMint"
          isMut: true
          isSigner: false
        },
        {
          name: "ammCoinMint"
          isMut: false
          isSigner: false
        },
        {
          name: "ammPcMint"
          isMut: false
          isSigner: false
        },
        {
          name: "ammCoinVault"
          isMut: true
          isSigner: false
        },
        {
          name: "ammPcVault"
          isMut: true
          isSigner: false
        },
        {
          name: "ammTargetOrders"
          isMut: true
          isSigner: false
        },
        {
          name: "ammConfig"
          isMut: false
          isSigner: false
        },
        {
          name: "createFeeDestination"
          isMut: true
          isSigner: false
        },
        {
          name: "marketProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "market"
          isMut: false
          isSigner: false
        },
        {
          name: "userWallet"
          isMut: true
          isSigner: true
        },
        {
          name: "userTokenCoin"
          isMut: true
          isSigner: false
        },
        {
          name: "userTokenPc"
          isMut: true
          isSigner: false
        },
        {
          name: "userTokenLp"
          isMut: true
          isSigner: false
        },
        {
          name: "tokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "associatedTokenProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "systemProgram"
          isMut: false
          isSigner: false
        },
        {
          name: "sysvarRent"
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: "nonce"
          type: "u8"
        },
        {
          name: "openTime"
          type: "u64"
        },
        {
          name: "initPcAmount"
          type: "u64"
        },
        {
          name: "initCoinAmount"
          type: "u64"
        },
      ]
    },
  ]
  accounts: [
    {
      name: "amm"
      type: {
        kind: "struct"
        fields: [
          {
            name: "id"
            docs: ["The primary key of the AMM"]
            type: "publicKey"
          },
          {
            name: "admin"
            docs: ["Account that has admin authority over the AMM"]
            type: "publicKey"
          },
          {
            name: "fee"
            docs: ["The LP fee taken on each trade, in basis points"]
            type: "u16"
          },
          {
            name: "lock"
            docs: ["Bool value for lock of bonding curves"]
            type: "bool"
          },
        ]
      }
    },
    {
      name: "pool"
      type: {
        kind: "struct"
        fields: [
          {
            name: "amm"
            docs: ["Primary key of the AMM"]
            type: "publicKey"
          },
          {
            name: "mintA"
            docs: ["Mint of token A"]
            type: "publicKey"
          },
        ]
      }
    },
  ]
  errors: [
    {
      code: 6000
      name: "InvalidFee"
      msg: "Invalid fee value"
    },
    {
      code: 6001
      name: "InvalidTooMany"
      msg: "Invalid buy too many tokens"
    },
    {
      code: 6002
      name: "OutputTooSmall"
      msg: "Output is below the minimum expected"
    },
  ]
}

export const IDL: Rocketfun = {
  version: "0.1.0",
  name: "rocketfun",
  constants: [
    {
      name: "AUTHORITY_SEED",
      type: "string",
      value: '"authority"',
    },
    {
      name: "VIRTUAL_SOL",
      type: "u64",
      value: "24 * LAMPORTS_PER_SOL",
    },
  ],
  instructions: [
    {
      name: "createAmm",
      accounts: [
        {
          name: "amm",
          isMut: true,
          isSigner: false,
        },
        {
          name: "admin",
          isMut: false,
          isSigner: false,
          docs: ["The admin of the AMM"],
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["The account paying for all rents"],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
          docs: ["Solana ecosystem accounts"],
        },
      ],
      args: [
        {
          name: "id",
          type: "publicKey",
        },
      ],
    },
    {
      name: "createPool",
      accounts: [
        {
          name: "amm",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolAccountA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["The account paying for all rents"],
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["Solana ecosystem accounts"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createTokenMint",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "metadataAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAccount",
          isMut: true,
          isSigner: true,
        },
        {
          name: "associatedTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenMetadataProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "tokenName",
          type: "string",
        },
        {
          name: "tokenSymbol",
          type: "string",
        },
        {
          name: "tokenUri",
          type: "string",
        },
      ],
    },
    {
      name: "depositLiquidity",
      accounts: [
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositor",
          isMut: false,
          isSigner: true,
          docs: ["The account paying for all rents"],
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolAccountA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "depositorAccountA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["The account paying for all rents"],
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["Solana ecosystem accounts"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amountA",
          type: "u64",
        },
      ],
    },
    {
      name: "swapExactTokensForTokens",
      accounts: [
        {
          name: "amm",
          isMut: false,
          isSigner: false,
        },
        {
          name: "pool",
          isMut: false,
          isSigner: false,
        },
        {
          name: "poolAuthority",
          isMut: true,
          isSigner: false,
        },
        {
          name: "trader",
          isMut: true,
          isSigner: true,
          docs: ["The account doing the swap"],
        },
        {
          name: "mintA",
          isMut: false,
          isSigner: false,
        },
        {
          name: "mintACreator",
          isMut: true,
          isSigner: false,
        },
        {
          name: "poolAccountA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "traderAccountA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "treasuryAccountA",
          isMut: true,
          isSigner: false,
        },
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["The account paying for all rents"],
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
          docs: ["Solana ecosystem accounts"],
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "swapA",
          type: "bool",
        },
        {
          name: "inputAmount",
          type: "u64",
        },
        {
          name: "minOutputAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "proxyInitialize",
      docs: ["initilaize market in raydium"],
      accounts: [
        {
          name: "ammProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "amm",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ammAuthority",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ammOpenOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ammLpMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ammCoinMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ammPcMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "ammCoinVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ammPcVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ammTargetOrders",
          isMut: true,
          isSigner: false,
        },
        {
          name: "ammConfig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "createFeeDestination",
          isMut: true,
          isSigner: false,
        },
        {
          name: "marketProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "market",
          isMut: false,
          isSigner: false,
        },
        {
          name: "userWallet",
          isMut: true,
          isSigner: true,
        },
        {
          name: "userTokenCoin",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenPc",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userTokenLp",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "sysvarRent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "nonce",
          type: "u8",
        },
        {
          name: "openTime",
          type: "u64",
        },
        {
          name: "initPcAmount",
          type: "u64",
        },
        {
          name: "initCoinAmount",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "amm",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            docs: ["The primary key of the AMM"],
            type: "publicKey",
          },
          {
            name: "admin",
            docs: ["Account that has admin authority over the AMM"],
            type: "publicKey",
          },
          {
            name: "fee",
            docs: ["The LP fee taken on each trade, in basis points"],
            type: "u16",
          },
          {
            name: "lock",
            docs: ["Bool value for lock of bonding curves"],
            type: "bool",
          },
        ],
      },
    },
    {
      name: "pool",
      type: {
        kind: "struct",
        fields: [
          {
            name: "amm",
            docs: ["Primary key of the AMM"],
            type: "publicKey",
          },
          {
            name: "mintA",
            docs: ["Mint of token A"],
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidFee",
      msg: "Invalid fee value",
    },
    {
      code: 6001,
      name: "InvalidTooMany",
      msg: "Invalid buy too many tokens",
    },
    {
      code: 6002,
      name: "OutputTooSmall",
      msg: "Output is below the minimum expected",
    },
  ],
}
