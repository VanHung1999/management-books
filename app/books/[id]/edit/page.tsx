"use client";

import { useOne, useUpdate } from "@refinedev/core";
import { useParams } from "next/navigation";
import { Input, Button, Card, Form, Typography, Space, InputNumber, Row, Col, App } from "antd";
import { ArrowLeftOutlined, SaveOutlined, BookOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Book } from "@/app/types/book";
import styles from "../../../styles/pages/books/detail/edit/EditBook.module.css";
import { RESOURCES, STATUS_TYPES, STATUS_LABELS } from "@/app/constants/bookEditConstants";
import { 
  createNotificationConfig, 
  getStatusClass, 
  getFormValidationRules, 
  getUIText, 
  getFormConfig,
  getResponsiveConfig,
  validateStatusTotal,
  calculateStatusTotal,
  getRouteHelpers,
  getRedirectHelpers,
  getBreadcrumbHelpers
} from "@/app/utils/bookEditHelpers";
import { useEditBookValidation } from "@/app/hooks/useEditBookValidation";

const { Title, Text } = Typography;
const { TextArea } = Input;



export default function EditBook() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [statusForm] = Form.useForm();
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [currentTotal, setCurrentTotal] = useState<number>(0);
  const [stateBookData, setStateBookData] = useState<Book>();
  const { notification } = App.useApp();

  // Zod validation hooks
  const { description, status } = useEditBookValidation();
  
  const { mutate: updateBook, isLoading: isUpdating } = useUpdate();
  const { data: bookData, isLoading: isBookLoading, refetch } = useOne({
    resource: RESOURCES.BOOKS,
    id: id as string,
  });

  useEffect(() => {
    if (bookData?.data) {
      setStateBookData(bookData.data as Book);
      setCurrentTotal(bookData.data.num);
      form.setFieldsValue({ description: bookData.data.description || '' });
    }
  }, [bookData, form]);

  const updateCurrentTotal = useCallback((available: number, loaned: number, disabled: number, renovated: number) => {
    setCurrentTotal(calculateStatusTotal(available, loaned, disabled, renovated));
  }, []);

  const onFinish = useCallback(async (values: { description: string }) => {
    const success = await description.handleDescriptionSubmit(
      form,
      values,
      async (validatedData) => {
        updateBook({
          resource: RESOURCES.BOOKS,
          id: id as string,
          values: { description: validatedData.description },
          successNotification: { ...createNotificationConfig.success.updateSuccessful(), type: "success" },
          errorNotification: { ...createNotificationConfig.error.updateFailed(), type: "error" },
        }, {
          onSuccess: () => {
            notification.success(createNotificationConfig.success.bookDescriptionUpdated());
            // Refetch data to get the latest information from database
            refetch();
          },
        });
      },
      (errors) => {
        console.error('Description validation errors:', errors);
        notification.error({
          message: 'Validation Error',
          description: 'Please check the description for errors'
        });
      }
    );
  }, [description, form, updateBook, id, notification, refetch]);

  const onStatusFinish = useCallback(async (values: { available: number; loaned: number; disabled: number; renovated: number }) => {
    // Additional validation: Check if total remains the same (num should not change)
    if (!stateBookData || !validateStatusTotal(currentTotal, stateBookData.num)) {
      notification.error(createNotificationConfig.error.validationError(stateBookData?.num || 0, currentTotal));
      return;
    }

    const success = await status.handleStatusSubmit(
      statusForm,
      values,
      async (validatedData) => {
        // Update book status
        updateBook({
          resource: RESOURCES.BOOKS,
          id: id as string,
          values: {
            status: {
              available: validatedData.available,
              loaned: validatedData.loaned,
              disabled: validatedData.disabled,
              renovated: validatedData.renovated
            }
          },
          successNotification: { ...createNotificationConfig.success.statusUpdateSuccessful(), type: "success" },
          errorNotification: { ...createNotificationConfig.error.statusUpdateFailed(), type: "error" },
        }, {
          onSuccess: () => {
            notification.success(createNotificationConfig.success.bookStatusUpdated());
            setIsEditingStatus(false);
            // Refetch data to get the latest information from database
            refetch();
          },
        });
      },
      (errors) => {
        console.error('Status validation errors:', errors);
        notification.error({
          message: 'Validation Error',
          description: 'Please check the status values for errors'
        });
      }
    );
  }, [status, statusForm, stateBookData, currentTotal, notification, updateBook, id, refetch]);

  if (isBookLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <BookOutlined className={styles.loadingIcon} />
          <Title level={3} className={styles.loadingTitle}>Loading...</Title>
        </div>
      </div>
    );
  }

  if (!bookData?.data) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <BookOutlined className={styles.errorIcon} />
          <Title level={3} className={styles.errorTitle}>Book not found</Title>
          <Link href={getRouteHelpers.getBooksUrl()}><Button type="primary" className={styles.errorButton}>Back to books</Button></Link>
        </div>
      </div>
    );
  }
  
  const renderStatusCard = useCallback((type: 'available' | 'loaned' | 'disabled' | 'renovated', value: number, label: string) => {
    const responsiveConfig = getResponsiveConfig.statusCards();
    
    return (
      <Col xs={responsiveConfig.xs} sm={responsiveConfig.sm}>
        <div className={`${styles.statusCard} ${styles[getStatusClass(type, 'card')]}`}>
          <div className={`${styles.statusNumber} ${styles[getStatusClass(type, 'number')]}`}>{value}</div>
          <Text className={`${styles.statusLabel} ${styles[getStatusClass(type, 'label')]}`}>{label}</Text>
        </div>
      </Col>
    );
  }, [styles]);

  const renderInputField = useCallback((name: string, label: string, max: number, onChange: (value: number | null) => void) => {
    const responsiveConfig = getResponsiveConfig.inputFields();
    const inputConfig = getFormConfig.inputNumber(name as any);
    
    return (
      <Col xs={responsiveConfig.xs} sm={responsiveConfig.sm}>
        <Form.Item label={label} name={name} rules={status.getStatusRules(name as any)}>
          <InputNumber
            className={styles.inputField}
            min={inputConfig.min}
            max={max}
            placeholder={inputConfig.placeholder}
            onChange={onChange}
          />
        </Form.Item>
      </Col>
    );
  }, [styles]);

  // Optimized callback functions for inline handlers
  const handleEditStatusClick = useCallback(() => {
    setIsEditingStatus(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditingStatus(false);
    statusForm.resetFields();
    if (stateBookData) {
      const total = stateBookData.status.available + stateBookData.status.loaned + stateBookData.status.disabled + stateBookData.status.renovated;
      setCurrentTotal(total);
    }
  }, [statusForm, stateBookData]);

  const handleAvailableChange = useCallback((value: number | null) => {
    const currentValues = statusForm.getFieldsValue();
    updateCurrentTotal(value || 0, currentValues.loaned || 0, currentValues.disabled || 0, currentValues.renovated || 0);
  }, [statusForm, updateCurrentTotal]);

  const handleDisabledChange = useCallback((value: number | null) => {
    const currentValues = statusForm.getFieldsValue();
    updateCurrentTotal(currentValues.available || 0, currentValues.loaned || 0, value || 0, currentValues.renovated || 0);
  }, [statusForm, updateCurrentTotal]);

  const handleRenovatedChange = useCallback((value: number | null) => {
    const currentValues = statusForm.getFieldsValue();
    updateCurrentTotal(currentValues.available || 0, currentValues.loaned || 0, currentValues.disabled || 0, value || 0);
  }, [statusForm, updateCurrentTotal]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <Link href={getRouteHelpers.getBookDetailUrl(id as string)}>
            <Button type="text" icon={<ArrowLeftOutlined />} className={styles.backButton}>
              Back to book detail
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Book Info Card */}
        <Card className={styles.bookInfoCard}>
          <div className={styles.bookInfoHeader}>
            <BookOutlined className={styles.bookInfoIcon} />
            <div>
              <Title level={3} className={styles.bookInfoTitle}>{stateBookData?.name}</Title>
              <Text className={styles.bookInfoSubtitle}>Author: {stateBookData?.author} • Category: {stateBookData?.category}</Text>
            </div>
          </div>
        </Card>

        {/* Status Management Card */}
        <Card 
          title={<div className={styles.cardTitle}>
            <BookOutlined className={styles.cardTitleIcon} />Book Status Management
          </div>}
          className={styles.statusManagementCard}
        >
          <div className={styles.statusInfo}>
            <Text strong className={styles.statusInfoText}>
              {getUIText.statusInfo(stateBookData?.num || 0, currentTotal)}
            </Text>
            {currentTotal !== stateBookData?.num && (
              <div className={styles.statusWarning}>
                <ExclamationCircleOutlined className={styles.statusWarningIcon} />
                <Text className={styles.statusWarningText}>
                  {getUIText.statusWarning(currentTotal, stateBookData?.num || 0)}
                </Text>
              </div>
            )}
          </div>

          {!isEditingStatus ? (
            <div>
              <Row gutter={[16, 16]} className={styles.statusCardsContainer}>
                {renderStatusCard(STATUS_TYPES.AVAILABLE, stateBookData?.status?.available || 0, STATUS_LABELS.AVAILABLE)}
                {renderStatusCard(STATUS_TYPES.LOANED, stateBookData?.status?.loaned || 0, STATUS_LABELS.LOANED)}
                {renderStatusCard(STATUS_TYPES.DISABLED, stateBookData?.status?.disabled || 0, STATUS_LABELS.DISABLED)}
                {renderStatusCard(STATUS_TYPES.RENOVATED, stateBookData?.status?.renovated || 0, STATUS_LABELS.RENOVATED)}
              </Row>
              <div className={styles.editStatusButtonContainer}>
                <Button type="primary" onClick={handleEditStatusClick} className={styles.editStatusButton}>
                  Edit Status
                </Button>
              </div>
            </div>
          ) : (
            <Form
              form={statusForm}
              layout="vertical"
              onFinish={onStatusFinish}
              className={styles.statusForm}
              initialValues={{
                available: stateBookData?.status?.available || 0,
                loaned: stateBookData?.status?.loaned || 0,
                disabled: stateBookData?.status?.disabled || 0,
                renovated: stateBookData?.status?.renovated || 0,
              }}
            >
              <Row gutter={[16, 16]} className={styles.formRow}>
                {renderInputField('available', 'Available', stateBookData?.num || 0, handleAvailableChange)}
                 <Col xs={12} sm={6}>
                   <Form.Item label="Loaned" name="loaned">
                     <InputNumber
                       className={styles.inputField}
                       value={stateBookData?.status?.loaned || 0}
                       disabled={true}
                       placeholder="Loaned (read-only)"
                     />
                   </Form.Item>
                 </Col>
                {renderInputField('disabled', 'Disabled', stateBookData?.num || 0, handleDisabledChange)}
                {renderInputField('renovated', 'Renovated', stateBookData?.num || 0, handleRenovatedChange)}
              </Row>

                <div className={styles.validationInfo}>
                 <Text className={styles.validationText} dangerouslySetInnerHTML={{
                   __html: getUIText.validationRules(stateBookData?.num || 0, currentTotal)
                 }} />
               </div>

              <Form.Item className={styles.formActions}>
                <Space size="middle" className={styles.formActionsSpace}>
                  <Button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</Button>
                  <Button type="primary" htmlType="submit" loading={isUpdating} className={styles.updateStatusButton}>
                    {isUpdating ? 'Updating...' : 'Update Status'}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Card>

        {/* Edit Form Card */}
        <Card 
          title={<div className={styles.cardTitle}>
            <BookOutlined className={styles.cardTitleIcon} />Edit book description
          </div>}
          className={styles.editFormCard}
        >
          <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ description: stateBookData?.description || '' }}>
            <Form.Item
              label="Book description"
              name="description"
              rules={description.getDescriptionRules()}
            >
              <TextArea
                {...getFormConfig.textarea()}
                className={styles.descriptionTextArea}
              />
            </Form.Item>

            <Form.Item className={styles.updateDescriptionButtonContainer}>
              <Space size="middle">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SaveOutlined />}
                  loading={isUpdating}
                  className={styles.updateDescriptionButton}
                >
                  {isUpdating ? 'Updating...' : 'Update description'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        {/* Current Description Preview */}
        {stateBookData?.description && (
          <Card title="Current description" className={styles.currentDescriptionCard}>
            <div className={styles.currentDescriptionContent}>
              <Text className={styles.currentDescriptionText}>
                {stateBookData?.description}
              </Text>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
