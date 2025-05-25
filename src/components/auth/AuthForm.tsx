interface AuthFormProps {
  title: string;
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, children }) => {
  return (
    <div
      className={`bg-white border-4 border-amber-700 shadow-[8px_8px_0px_0px_rgba(180,83,9)] h-full transition-all duration-300`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-2 text-amber-900 text-center font-bold border-b-4 border-amber-700">
        <h1 className="text-2xl tracking-wider transition-all duration-300">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default AuthForm;
