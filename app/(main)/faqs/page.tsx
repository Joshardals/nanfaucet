
import { QuestionBank } from "@/components/QuestionBank";

export default function page() {
  return (
    <main className="bg-gradient-to-b from-accent to-accent/80 p-2 text-primary/70">
      <section className="font-medium bg-white rounded-md min-h-screen space-y-5 p-5">
        <QuestionBank />
        {/* <h1>Hey there</h1> */}
      </section>
    </main>
  );
}
