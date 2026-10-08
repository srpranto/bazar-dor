import Link from 'next/link';

interface AuthCardWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthCardWrapper({ title, subtitle, children }: AuthCardWrapperProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-0 my-8 sm:my-14">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{title}</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">{subtitle}</p>
      </div>

      <div className="bg-white rounded-2xl border border-border/80 shadow-md p-6 sm:p-8">
        {children}
      </div>

      <div className="text-center mt-6">
        <Link
          href="/"
          className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
