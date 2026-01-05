interface StatsCardProps {
  title: string;
  value: number;
  variant?: 'success' | 'danger' | 'warning' | 'default';
}

export default function StatsCard({
  title,
  value,
  variant = 'default',
}: StatsCardProps) {
  return (
    <div className={`stat-card ${variant}`}>
      <h6 className="text-muted uppercase text-xs tracking-wider font-bold mb-2">{title}</h6>
      <div className={`stat-value ${variant === 'success' ? 'text-portal' :
          variant === 'danger' ? 'text-danger' :
            variant === 'warning' ? 'text-warning' : 'text-foreground'
        }`}>
        {value}
      </div>
    </div>
  );
}
