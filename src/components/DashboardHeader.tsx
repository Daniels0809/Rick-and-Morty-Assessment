interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({
  title,
  subtitle,
}: DashboardHeaderProps) {
  return (
    <header className="mb-8 border-b border-gray-700 pb-4">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
        {title}
      </h1>
      {subtitle && (
        <p className="text-muted mt-2 text-lg font-light">{subtitle}</p>
      )}
    </header>
  );
}
