import React from 'react';
import { Card, Typography } from 'antd';

const { Text } = Typography;

export interface StatusCardProps {
  value: number;
  label: string;
  type: 'available' | 'loaned' | 'disabled' | 'renovated';
  className?: string;
  styles?: any;
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  value, 
  label, 
  type, 
  className = '',
  styles
}) => {
  const getStatusClasses = (type: string) => {
    if (!styles) return '';
    const baseClasses = styles.statusCard;
    const typeClasses = styles[`statusCard${type.charAt(0).toUpperCase() + type.slice(1)}`];
    return `${baseClasses} ${typeClasses}`;
  };

  const getNumberClasses = (type: string) => {
    if (!styles) return '';
    const baseClasses = styles.statusNumber;
    const typeClasses = styles[`statusNumber${type.charAt(0).toUpperCase() + type.slice(1)}`];
    return `${baseClasses} ${typeClasses}`;
  };

  const getLabelClasses = (type: string) => {
    if (!styles) return '';
    const baseClasses = styles.statusLabel;
    const typeClasses = styles[`statusLabel${type.charAt(0).toUpperCase() + type.slice(1)}`];
    return `${baseClasses} ${typeClasses}`;
  };

  return (
    <Card 
      size="small" 
      className={`${getStatusClasses(type)} ${className}`}
    >
      <div className={getNumberClasses(type)}>
        {value}
      </div>
      <Text className={getLabelClasses(type)}>
        {label}
      </Text>
    </Card>
  );
};

export default StatusCard;
