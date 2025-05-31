interface FaqItemProps {
  activeSection: number;
  index: number;
  item: {
    question: string;
    answer: string;
  };
}

const FaqItem = ({ activeSection, index, item }: FaqItemProps) => {
  return (
    <div
      className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] transition-all duration-500 ${
        activeSection >= 3
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 font-bold border-b-4 border-amber-700">
        <h3 className="text-lg">{item.question}</h3>
      </div>
      <div className="p-4 bg-amber-50">
        <p className="text-amber-700">{item.answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
