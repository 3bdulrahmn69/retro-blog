import Container from '../ui/Container';
import Section from '../ui/Section';

const AboutSection = ({ activeSection }: { activeSection: number }) => {
  return (
    <Section id="about" className=" bg-amber-100">
      <Container>
        <div
          className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-700 ${
            activeSection >= 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
            <h2 className="text-2xl tracking-wider">ABOUT RETRO BLOG</h2>
          </div>
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-amber-800">
                Nostalgia-Driven Blogging
              </h3>
              <p className="text-amber-700">
                Retro Blog was founded in 2025 by a group of tech enthusiasts
                who missed the aesthetic charm of early computing. Our platform
                combines the visual appeal of 80s and 90s interfaces with modern
                functionality.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                  <h4 className="text-lg font-bold text-amber-800 mb-2">
                    Retro Design
                  </h4>
                  <p className="text-amber-700">
                    We embrace chunky borders, vibrant gradients, and pixelated
                    charm.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                  <h4 className="text-lg font-bold text-amber-800 mb-2">
                    Modern Tech
                  </h4>
                  <p className="text-amber-700">
                    Built with React and TypeScript for a smooth experience.
                  </p>
                </div>
                <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                  <h4 className="text-lg font-bold text-amber-800 mb-2">
                    Community Focus
                  </h4>
                  <p className="text-amber-700">
                    A platform for sharing knowledge with fellow retro
                    enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutSection;
