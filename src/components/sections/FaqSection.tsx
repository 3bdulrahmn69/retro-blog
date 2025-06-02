import { Box } from '@mui/material';
import { faqItems } from '../../lib/faqItems';
import Container from '../ui/Container';
import FaqItem from '../ui/FaqItem';
import Section, { Title } from '../ui/Section';

const FaqSection = ({ activeSection }: { activeSection: number }) => {
  return (
    <Section id="faq">
      <Container>
        <Title>FREQUENTLY ASKED QUESTIONS</Title>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              activeSection={activeSection}
              index={index}
              item={item}
            />
          ))}
        </Box>
      </Container>
    </Section>
  );
};

export default FaqSection;
