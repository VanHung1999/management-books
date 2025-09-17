import React from 'react';
import { Card, Avatar, Typography, Row, Col, Divider } from 'antd';
import { ReactNode } from 'react';

const { Text } = Typography;

export interface InfoItem {
  icon: ReactNode;
  label: string;
  value: string | number;
  iconType?: 'primary' | 'success' | 'warning' | 'error';
}

export interface InfoCardProps {
  title: string;
  titleIcon?: ReactNode;
  items: InfoItem[];
  showDivider?: boolean;
  className?: string;
  bodyPadding?: string | number;
  styles?: any;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title,
  titleIcon,
  items,
  showDivider = true,
  className = '',
  bodyPadding = '32px',
  styles
}) => {
  const getIconClasses = (iconType: string = 'primary') => {
    if (!styles) return '';
    const baseClasses = styles.infoItemIcon;
    const typeClasses = styles[`infoItemIcon${iconType.charAt(0).toUpperCase() + iconType.slice(1)}`];
    return `${baseClasses} ${typeClasses}`;
  };

  return (
    <Card 
      title={
        titleIcon ? (
          <div className={styles?.cardTitle || 'cardTitle'}>
            <Avatar 
              icon={titleIcon} 
              className={styles?.cardTitleIcon || 'cardTitleIcon'}
            />
            {title}
          </div>
        ) : title
      }
      className={`${styles?.additionalInfoCard || 'additionalInfoCard'} ${className}`}
      styles={{ body: { padding: bodyPadding } }}
    >
      <Row gutter={[32, 24]}>
        {items.map((item, index) => (
          <Col xs={24} sm={12} key={index}>
            <div className={styles?.infoItem || 'infoItem'}>
              <Avatar 
                icon={item.icon} 
                className={getIconClasses(item.iconType)}
              />
              <div>
                <Text strong className={styles?.infoItemLabel || 'infoItemLabel'}>
                  {item.label}
                </Text>
                <br />
                <Text className={styles?.infoItemValue || 'infoItemValue'}>
                  {item.value}
                </Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {showDivider && <Divider className={styles?.divider || 'divider'} />}
    </Card>
  );
};

export default InfoCard;
