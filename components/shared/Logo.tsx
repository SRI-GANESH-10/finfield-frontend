import { APP } from "@/constants/app";

const Logo = ({ className }: { className?: string }) => {
    return (
        <div>
            <img src="/logo.svg" alt="logo" className={`w-12 h-12 ${className}`} />
        </div>
    );
};

const LogoWithName = ({ className }: { className?: string }) => (
    <div className="flex items-center">
        <Logo className={className} />
        <div className="font-semibold text-lg bg-linear-to-t from-indigo-600 to-indigo-300 bg-clip-text text-transparent">
            {APP.APP_NAME}
        </div>    
    </div>
);

export { Logo, LogoWithName };