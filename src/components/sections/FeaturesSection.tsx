import { Link } from 'react-router';
import Container from '../ui/Container';
import Section, { Title } from '../ui/Section';
import Button from '../ui/Button';
import FeaturesCard from '../ui/FeaturesCard';

const FeaturesSection = ({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <Section id="features">
      <Container>
        <Title>WHAT WE OFFER</Title>
        <div className="grid md:grid-cols-3 gap-6">
          <FeaturesCard
            isLoaded={isLoaded}
            delay={100}
            title="Nostalgic Blogging"
            span="Core Feature"
            subtitle="Express Yourself"
            description="Create and share your thoughts with our retro-styled blogging
                platform. Enjoy a blast from the past with every post you write."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            }
            link="/blog"
          />

          <FeaturesCard
            isLoaded={isLoaded}
            delay={250}
            title="Community Hub"
            span="Popular"
            subtitle="Join Fellow Enthusiasts"
            description="Connect with like-minded retro fans. Comment on posts, share
                ideas, and relive the digital nostalgia together."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            link="/blog"
          />

          <FeaturesCard
            isLoaded={isLoaded}
            delay={400}
            title="Vintage Resources"
            span="Exclusive"
            subtitle="Digital Time Capsule"
            description="Access our collection of retro tech resources, pixel art
                galleries, and vintage design inspiration for your creative
                projects."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            link="/blog"
          />
        </div>

        <div className="text-center mt-10">
          <Link to="/blog">
            <Button variant="secondary" fullWidth={false} className="px-8">
              EXPLORE THE BLOG
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default FeaturesSection;
