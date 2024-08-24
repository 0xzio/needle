## What is Space?

Today, let's talk about what Space means in PenX.

Space is the core of PenX.

So, what exactly is Space in PenX? Let's try to explain it from both technical and non-technical perspectives.

## Non-Technical Perspective

From a non-technical viewpoint, you can think of Space as a micro company or a micro DAO.

While the concepts of a micro company and a micro DAO may differ, they essentially refer to the same thing. A micro company is defined from the Web2 perspective, while a micro DAO is defined from the Web3 perspective.

There is also an important qualifier: _micro_. Why micro? This is because PenX aims to serve indie creators. Here, indie creators do not refer to just one person; it generally means a very small team, such as a team of around three people.

## Technical Perspective

From a technical standpoint, Space is a singleton smart contract.

Space consists of three core modules:

- Token
- Subscription
- Share

### Token

Each Space itself is an ERC20 token. For example, if your Space is called **Hello World**, the symbol for the Space code would be **$HELLO**. **$HELLO** is the token for this Space, and it is issued in a fair manner. The code uses a bonding curve for buying and selling. The main purpose of the token is to subscribe to a creator's membership.

### Subscription

This is PenX's membership subscription module. PenX allows for on-demand subscription payments, enabling you to subscribe for any length of time and cancel all or part of your subscription at any time, down to the second. For example, if you see a paid article and you are not familiar with the creator, you may not want to become a long-term member. To read that article, you can subscribe for just 10 minutes. If the membership costs $5 per month, you would only need to pay $0.001157 for a 10-minute subscription to read that single article.

### Share

This is the Space share management module. As mentioned, Space is a micro company. When a Space is created, the founder is automatically assigned 1,000,000 shares, and these shares will never be increased. The founder can add co-founders and transfer shares to them. Space will automatically distribute all income based on the number of shareholders.

It is important to note that shares and tokens are two different things. Tokens are the currency of the Space, and holding tokens does not mean you own the Space. Only by holding shares do you have ownership of the Space and participate in its profit distribution.

So, what are the benefits of holding tokens? There are mainly two: 1. They can be used to subscribe to membership; 2. You can buy tokens at a low price early on and potentially gain significant returns later, as the token price increases with the issuance volume, provided that more people subscribe to the Space's membership.

## Sources of Income for Space

The income for Space comes from two sources:

1. Membership subscription fees
2. Token transaction fees (1%)

## Conclusion

This article is not lengthy, and I hope the brief explanations above help you understand our design for Space.
