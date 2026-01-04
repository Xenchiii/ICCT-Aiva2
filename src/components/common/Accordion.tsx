import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './Accordion.css';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="accordion-wrapper">
      {items.map((item, idx) => (
        <div key={idx} className="accordion-item">
          <button className="accordion-header" onClick={() => toggle(idx)}>
            <span>{item.title}</span>
            {openIndex === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openIndex === idx && (
            <div className="accordion-content animate-fade-in">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;