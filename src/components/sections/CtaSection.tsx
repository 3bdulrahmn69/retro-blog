import Section from '../ui/Section';
import Container from '../ui/Container';
import { Link } from 'react-router';
import Button from '../ui/Button';

const CtaSection = () => {
  return (
    <Section id="CTA">
      <Container>
        <div className="bg-amber-800 text-amber-100 p-8 shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">JOIN THE RETRO REVOLUTION</h2>
          <p className="mb-6">
            Become part of our community and share your passion for retro
            computing.
          </p>
          <Link to="/auth/register" className="animate-retro-glow">
            <Button>GET STARTED</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default CtaSection;
