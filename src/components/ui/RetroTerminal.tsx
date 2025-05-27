interface RetroTerminalProps {
  title: string;
  children?: React.ReactNode;
}

const RetroTerminal = ({ title, children }: RetroTerminalProps) => {
  return (
    <div className="relative">
      <div className="w-80 border-8 border-amber-800 bg-amber-100 rounded-lg overflow-hidden shadow-lg">
        <div className="h-6 bg-amber-800 flex items-center px-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-xs text-white ml-auto">{title}</span>
        </div>
        <div className="p-4 font-mono text-amber-800 text-sm text-start">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RetroTerminal;
