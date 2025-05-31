import { faqItems } from '../../lib/faqItems';
import Container from '../ui/Container';
import FaqItem from '../ui/FaqItem';
import Section, { Title } from '../ui/Section';

const FaqSection = ({ activeSection }: { activeSection: number }) => {
  return (
    <Section id="faq">
      <Container>
        <Title>FREQUENTLY ASKED QUESTIONS</Title>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              activeSection={activeSection}
              index={index}
              item={item}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FaqSection;
