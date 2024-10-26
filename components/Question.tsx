import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Question({
  item,
  question,
  answer,
}: {
  item: string;
  question: string;
  answer: string;
}) {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value={`item-${item}`}>
          <AccordionTrigger className="font-bold text-primary">
            {question}
          </AccordionTrigger>
          <AccordionContent className="text-xs font-bold text-primary/70">
            {answer}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
