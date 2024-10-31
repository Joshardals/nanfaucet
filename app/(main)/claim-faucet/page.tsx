export default function page() {
  return (
    <main className="bg-gradient-to-b from-accent to-accent/80 p-2 text-primary/70 md:max-w-lg md:mx-auto">
      <section className="font-medium bg-white rounded-md min-h-screen space-y-5">
        <div className="p-5 space-y-2 h-[fit-content]">
          <span className="text-xl capitalize font-bold text-primary">
            how to receive nano faucet!
          </span>

          <ul className="space-y-5">
            <Step label={1} content="Sign up with a dedicated nano address" />
            <Step
              label={2}
              content="Qualify to receive airdrop by referring friends to join the nano ecosystem(minimum of 10 users to validate referrals)"
            />
            <Step
              label={3}
              content="To receive a Nano airdrop, validate ownership of your Nano address by completing a verified Nano transaction. This requires sending a minimum-value transaction from your Nano address."
            />
          </ul>
        </div>

        <div className="border border-primary/20" />
      </section>
    </main>
  );
}

function Step({ label, content }: { label: number; content: string }) {
  return (
    <li className="flex items-center space-x-4">
      <div>
        <div className="size-7 bg-accent text-white rounded-full flex items-center justify-center">
          {label}
        </div>
      </div>

      <span className="text-xs">{content}</span>
    </li>
  );
}
