const historyData = [
  {
    label: 1,
    title: "Founding and Initial Development",
    content:
      "Nano was created in 2014 by Colin LeMahieu, who aimed to address inefficiencies in Bitcoin and other blockchain-based cryptocurrencies. Originally, the project was called RaiBlocks (XRB), and it launched with a faucet distribution method to make the coin accessible to early adopters.",
  },
  {
    label: 2,
    title: "Rebranding to Nano (2018)",
    content:
      "In early 2018, RaiBlocks was rebranded as Nano to better reflect its focus on simplicity, speed, and efficiency. This rebranding aimed to create a more user-friendly image and to convey the network's capabilities as a lightweight digital currency.",
  },
  {
    label: 3,
    title: "Growth and Adoption",
    content:
      "Nano gained significant attention due to its unique architecture, which offered instant and feeless transactions. However, challenges like the BitGrail exchange hack, in which a large amount of Nano was lost, affected its reputation. Despite this, the Nano community continued to grow, and development progressed.",
  },
  {
    label: 4,
    title: "Recent Developments and Focus",
    content:
      "Nano has continued to evolve, focusing on increasing accessibility, efficiency, and real-world use cases for digital currency. With an active community and ongoing improvements, Nano remains one of the most eco-friendly and efficient cryptocurrencies available.",
  },
];

const nanoData = [
  {
    label: 1,
    title: "Block Lattice Architecture",
    content: [
      {
        heading: "Unique Structure",
        description:
          "The block lattice is the underlying data structure of Nano. In a block lattice, every account in the network has its own blockchain, called an 'account chain.' This means that each user's transactions are recorded on their individual account chain, allowing for quick and efficient transactions.",
      },
      {
        heading: "Asynchronous Transactions",
        description:
          "Nano's asynchronous transaction structure enables each account chain to be updated independently, which leads to faster transactions and reduces the need for global consensus on each transaction.",
      },
      {
        heading: "Send and Receive Blocks",
        description:
          "Unlike traditional cryptocurrencies that bundle transactions into blocks, Nano's transactions consist of 'send' and 'receive' blocks. A send block deducts funds from the sender's account chain, while a receive block credits the recipient’s account chain.",
      },
      {
        heading: "No Centralized Miners",
        description:
          "Due to this design, there is no need for miners. Users confirm their own transactions on their account chains, removing the need for a central mining process.",
      },
    ],
  },
  {
    label: 2,
    title: "Open Representative Voting (ORV)",
    content: [
      {
        heading: "Representative Selection",
        description:
          "Instead of miners or validators, Nano allows users to designate a 'representative' for their account. Representatives are nodes that users trust to confirm transactions on their behalf.",
      },
      {
        heading: "Voting Power",
        description:
          "Representatives validate transactions by voting, and their voting power is proportional to the amount of Nano delegated to them. The representative system makes the Nano network highly energy-efficient and scalable.",
      },
      {
        heading: "No Rewards",
        description:
          "Since representatives are not paid for validating transactions, there is little financial incentive to manipulate the network.",
      },
    ],
  },
  {
    label: 3,
    title: "Instant and Feeless Transactions",
    content: [
      {
        heading: "Transaction Speed",
        description:
          "Nano is designed to process transactions in under a second, which makes it highly suitable for microtransactions and other applications that require real-time settlement.",
      },
      {
        heading: "Zero Fees",
        description:
          "With Nano, there are no transaction fees. This is possible because representatives do not receive rewards, and the block lattice structure removes the need for resource-intensive mining. This feeless system differentiates Nano from many other cryptocurrencies.",
      },
    ],
  },
  {
    label: 4,
    title: "Security and Finality",
    content: [
      {
        heading: "Double Spending Prevention",
        description:
          "The Nano protocol addresses double-spending by requiring that each account chain be signed by the private key of the account owner, ensuring that only the rightful owner can authorize transactions.",
      },
      {
        heading: "Consensus Finality",
        description:
          "ORV ensures that transactions reach finality quickly. When a conflict arises, representatives cast votes, with the majority decision securing the network.",
      },
    ],
  },
];

export default function page() {
  return (
    <main className="bg-gradient-to-b from-accent to-accent/80 p-2 text-primary/70">
      <section className="font-medium bg-white rounded-md min-h-screen space-y-5 p-5">
        <div className="space-y-5">
          <div className="space-y-2">
            <span className="text-xl capitalize font-bold text-primary">
              What is Nano?
            </span>
            <p className="text-pretty text-xs">
              The Nano network is a decentralized, peer-to-peer digital currency
              platform designed for instant and feeless transactions. Unlike
              traditional blockchain systems like Bitcoin or Ethereum, which
              rely on Proof of Work (PoW) or Proof of Stake (PoS) and use mining
              to validate transactions, Nano employs a unique mechanism called
              the &quot;block lattice&quot; and the &quot;Open Representative
              Voting&quot; (ORV) consensus protocol.
            </p>
          </div>
          <ul className="space-y-5">
            {nanoData.map((nano, index) => (
              <li className="space-x-11" key={idx}>
                <div className="space-x-4 flex items-center">
                  <div className="size-7 bg-accent text-white rounded-full flex items-center justify-center">
                    {nano.label}
                  </div>
                  <div>
                    <span className="text-primary font-bold">{nano.title}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {nano.content.map((item, index) => (
                    <li key={index} className="text-xs">
                      <b className="text-primary">{item.heading}:</b>{" "}
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <span className="text-xl capitalize font-bold text-primary">
            Brief History of Nano
          </span>

          <ul className="space-y-5">
            {historyData.map((step) => (
              <li key={step.label} className="text-xs space-x-11">
                <div className="space-x-4 flex items-center">
                  <div className="size-7 bg-accent text-white rounded-full flex items-center justify-center">
                    {step.label}
                  </div>
                  <b className="text-primary">{step.title}:</b>
                </div>
                <p>{step.content}</p>
              </li>
            ))}

            <li className="text-xs">
              The Nano network&apos;s architecture and unique approach to
              consensus provide a practical, decentralized solution for everyday
              digital transactions, striving to make currency transfers
              accessible, fast, and secure.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
