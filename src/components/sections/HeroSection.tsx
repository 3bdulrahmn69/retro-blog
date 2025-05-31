import { Link } from 'react-router';
import Container from '../ui/Container';
import Section from '../ui/Section';
import Button from '../ui/Button';
import RetroTerminal from '../ui/RetroTerminal';

const HeroSection = ({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <Section
      id="home"
      className={`py-20 transition-all duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
      }`}
    >
      <Container>
        <div className="bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)]">
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
            <h1 className="text-2xl md:text-4xl tracking-wider">
              WELCOME TO RETRO BLOG
            </h1>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-amber-800">
                A Journey Back in Digital Time
              </h2>
              <p className="text-amber-700">
                Experience the nostalgic charm of vintage computing with our
                retro-themed blog platform. Share your thoughts with the
                aesthetic of yesteryear.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/auth/register" className="flex-1 animate-retro-glow">
                  <Button fullWidth>JOIN NOW</Button>
                </Link>
                <Link to="/blog" className="flex-1">
                  <Button fullWidth variant="secondary">
                    READ BLOG
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <RetroTerminal title="retro-terminal" size="lg">
                <p>{'>'} Welcome to Retro Blog</p>
                <p>{'>'} The year is 2025</p>
                <p>{'>'} But the aesthetic is 1995</p>
                <p>{'>'} Loading nostalgia...</p>
                <p className="mt-4 animate-pulse">
                  {'>'} Press Enter key to continue_
                </p>
              </RetroTerminal>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default HeroSection;
