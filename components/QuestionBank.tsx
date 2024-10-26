import { Question } from "./Question";

export function QuestionBank() {
  return (
    <div>
      <Question
        item="2"
        question="What is Nanfaucet?"
        answer="Nanswap is a cryptocurrency airdrop platform for Nano, funded by investors to distribute Nano to users globally, aiming to compete in the cryptocurrency market. With no registration required, users can easily participate in Nano airdrops and access one of the fastest transactions available, thanks to Nano's feeless network. The platform enables seamless airdrops, offering users a chance to receive Nano instantly. Try it out with our Nano Faucet to experience quick, zero-fee transactions and join the Nano movement."
      />
      <Question
        item="2"
        question="What wallets can I use?"
        answer="You can use any crypto wallet to participate. For the fastest transactions with zero network fees, we recommend a non-custodial wallet. Popular open-source wallet options for your preferred cryptocurrency can be found on our homepage."
      />
      <Question
        item="3"
        question="What is Nano(XNO)"
        answer='The Nano network is a decentralized, peer-to-peer digital currency platform designed for instant and feeless transactions. Unlike traditional blockchain systems like Bitcoin or Ethereum, which rely on Proof of Work (PoW) or Proof of Stake (PoS) and use mining to validate transactions, Nano employs a unique mechanism called the "block lattice" and the "Open Representative Voting" (ORV) consensus protocol.'
      />
      <Question
        item="4"
        question="How to receive airdrops?"
        answer="To receive the Nano airdrop, complete the minimum referral requirement by inviting friends to join the Nano network using your unique invite link. This will qualify you to receive an airdrop worth approximately $999 in Nano. Due to instances of fraud, such as users attempting to claim multiple airdrops or using watch-only addresses to impersonate others, participants are required to make a verification transaction to confirm ownership of the registered address. Once verified, users will receive their airdrop instantly."
      />
      <Question
        item="4"
        question="How long to receive airdrops?"
        answer="instantly."
      />
    </div>
  );
}
