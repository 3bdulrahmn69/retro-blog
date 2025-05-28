import Button from '../ui/Button';
import Container from '../ui/Container';
import RetroTerminal from '../ui/RetroTerminal';
import Section from '../ui/Section';

interface DeveloperSectionProps {
  activeSection: number;
}

const DeveloperSection = ({ activeSection }: DeveloperSectionProps) => {
  return (
    <Section id="developer" className="bg-amber-100">
      <Container>
        <div
          className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-700 ${
            activeSection >= 5
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
            <h3 className="text-2xl tracking-wider">MEET THE DEVELOPER</h3>
          </div>
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-bold text-amber-800 mb-2">
                    Hello, I'm Abdulrahman
                  </h4>
                  <p className="text-amber-600 font-semibold mb-4">
                    Front-end Developer & Retro Enthusiast
                  </p>
                </div>

                <p className="text-amber-700">
                  I'm a passionate developer who created Retro Blog as a tribute
                  to the golden age of computing. This project combines my love
                  for vintage aesthetics with modern web technologies,
                  showcasing my skills in creating immersive user experiences.
                </p>

                <div className="bg-amber-50 p-4 border-l-4 border-amber-500">
                  <h5 className="text-lg font-bold text-amber-800 mb-2">
                    Tech Stack Used
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-sm text-amber-700">
                    <div>• React 18</div>
                    <div>• TypeScript</div>
                    <div>• Tailwind CSS</div>
                    <div>• React Router</div>
                    <div>• Vite</div>
                    <div>• Modern ES6+</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://3bdulrahmn.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="primary" size="md" fullWidth>
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                          />
                        </svg>
                        VIEW PORTFOLIO
                      </span>
                    </Button>
                  </a>

                  <a
                    href="https://github.com/3bdulrahmn69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="secondary" size="md" fullWidth>
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GITHUB
                      </span>
                    </Button>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://linkedin.com/in/3bdulrahmn69"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="secondary" size="md" fullWidth>
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LINKEDIN
                      </span>
                    </Button>
                  </a>

                  <a
                    href="mailto:abdulrahmanmoussa69@gmail.com"
                    className="flex-1"
                  >
                    <Button variant="primary" size="md" fullWidth>
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        EMAIL ME
                      </span>
                    </Button>
                  </a>
                </div>
              </div>

              <div className="flex justify-center">
                <RetroTerminal title="developer-workplace">
                  <p className="text-green-600"># Development Stats</p>
                  <p>{'>'} Projects completed: 15+</p>
                  <p>{'>'} Lines of code: 50K+</p>
                  <p>{'>'} YouTube consumed: ∞</p>
                  <p>{'>'} Retro vibes: Maximum</p>
                  <p className="mt-4 text-blue-600"># Specializations</p>
                  <p>{'>'} Front-end Development</p>
                  <p>{'>'} Responsive Design</p>
                  <p>{'>'} Modern Web Technologies</p>
                  <p className="mt-4 animate-pulse text-green-600">
                    {'>'} Building innovative solutions_
                  </p>
                </RetroTerminal>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-200">
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                <h5 className="text-lg font-bold text-amber-800 mb-2">
                  About This Project
                </h5>
                <p className="text-amber-700 mb-3">
                  Retro Blog represents my passion for combining nostalgic
                  design with modern development practices. Built during my web
                  development journey, this project showcases responsive design,
                  component architecture, and attention to user experience
                  details.
                </p>
                <p className="text-amber-700">
                  <strong>Want to see more of my work?</strong> Check out my
                  portfolio to explore other projects including e-commerce
                  platforms, productivity tools, and interactive web
                  applications.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a
                href="https://3bdulrahmn.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" className="px-8">
                  EXPLORE MY FULL PORTFOLIO
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default DeveloperSection;
