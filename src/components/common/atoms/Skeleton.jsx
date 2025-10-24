const Skeleton = ({ width = 'w-full', height = 'h-4', className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-200',
    light: 'bg-gray-100',
    dark: 'bg-gray-300',
    circle: 'rounded-full',
    text: 'rounded',
    rectangular: 'rounded-lg'
  };

  const baseClasses = 'animate-pulse';
  const variantClasses = variant === 'circle' ? variants.circle : variants.rectangular;
  const bgColor = variants[variant] || variants.default;

  return (
    <div
      className={`${baseClasses} ${bgColor} ${variantClasses} ${width} ${height} ${className}`}
    />
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="space-y-4">
      <Skeleton height="h-48" variant="rectangular" />
      <Skeleton height="h-6" width="w-3/4" />
      <Skeleton height="h-4" width="w-full" />
      <Skeleton height="h-4" width="w-5/6" />
      <div className="flex gap-2 pt-4">
        <Skeleton height="h-10" width="w-24" variant="rectangular" />
        <Skeleton height="h-10" width="w-24" variant="rectangular" />
      </div>
    </div>
  </div>
);

export const ListSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <Skeleton width="w-12" height="h-12" variant="circle" />
        <div className="flex-1 space-y-2">
          <Skeleton height="h-4" width="w-3/4" />
          <Skeleton height="h-3" width="w-1/2" />
        </div>
        <Skeleton height="h-8" width="w-20" variant="rectangular" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="p-4 border-b border-gray-200">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, index) => (
          <Skeleton key={index} height="h-4" width="w-24" />
        ))}
      </div>
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="p-4 border-b border-gray-100">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="h-4" width="w-24" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
