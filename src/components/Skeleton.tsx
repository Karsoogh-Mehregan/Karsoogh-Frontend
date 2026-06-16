/**
 * Reusable skeleton loading primitives.
 *
 * Usage:
 *   <Skeleton.Bone width="100%" height="1.5rem" />
 *   <Skeleton.Circle size={48} />
 *   <Skeleton.Text lines={3} />
 */

interface BoneProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

function Bone({
  width = '100%',
  height = '1rem',
  borderRadius = '0.75rem',
  className = '',
}: BoneProps) {
  return (
    <div
      className={`skeleton-bone ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }}
    />
  );
}

interface CircleProps {
  size?: number;
  className?: string;
}

function Circle({ size = 40, className = '' }: CircleProps) {
  return <Bone width={size} height={size} borderRadius="50%" className={className} />;
}

interface TextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: string;
}

function Text({ lines = 3, className = '', lastLineWidth = '60%' }: TextProps) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Bone key={i} height="0.75rem" width={i === lines - 1 ? lastLineWidth : '100%'} />
      ))}
    </div>
  );
}

const Skeleton = { Bone, Circle, Text };

export default Skeleton;
