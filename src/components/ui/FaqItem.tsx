import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface FaqItemProps {
  activeSection: number;
  index: number;
  item: {
    question: string;
    answer: string;
  };
}

const FaqCard = styled(Box)(() => ({
  backgroundColor: '#ffffff',
  border: '4px solid #b45309',
  boxShadow: '8px 8px 0px 0px rgba(180,83,9)',
  transition: 'all 0.5s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '10px 10px 0px 0px rgba(180,83,9)',
  },
}));

const QuestionHeader = styled(Box)(() => ({
  background: 'linear-gradient(to right, #fbbf24, #d97706)',
  padding: 16,
  color: '#78350f',
  fontWeight: 'bold',
  borderBottom: '4px solid #b45309',
}));

const AnswerContent = styled(Box)(() => ({
  padding: 16,
  backgroundColor: '#fffbeb',
}));

const FaqItem = ({ activeSection, index, item }: FaqItemProps) => {
  return (
    <FaqCard
      sx={{
        opacity: activeSection >= 3 ? 1 : 0,
        transform: activeSection >= 3 ? 'translateY(0)' : 'translateY(32px)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <QuestionHeader>
        <Typography variant="h6" component="h3" sx={{ fontSize: '1.125rem' }}>
          {item.question}
        </Typography>
      </QuestionHeader>
      <AnswerContent>
        <Typography variant="body1" sx={{ color: '#b45309', lineHeight: 1.6 }}>
          {item.answer}
        </Typography>
      </AnswerContent>
    </FaqCard>
  );
};

export default FaqItem;
