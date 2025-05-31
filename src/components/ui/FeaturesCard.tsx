import { Link } from 'react-router';
import Button from './Button';

interface FeaturesCardProps {
  delay?: number;
  isLoaded: boolean;
  title: string;
  span: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeaturesCard = ({
  isLoaded,
  delay = 100,
  title,
  span,
  subtitle,
  description,
  icon,
  link,
}: FeaturesCardProps) => {
  return (
    <div
      className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 flex flex-col h-full ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700">
        <div className="flex justify-between items-center">
          <span className="text-lg">{title}</span>
          <span className="text-xs bg-amber-100 px-2 py-1">{span}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-amber-800 mb-2 text-center">
          {subtitle}
        </h3>
        <p className="text-amber-700 mb-4 flex-grow">{description}</p>
        <Link to={link} className="mt-auto" aria-label="blog">
          <Button variant="outline" size="sm">
            LEARN MORE
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturesCard;
