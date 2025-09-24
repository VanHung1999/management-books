"use client";

import { useOne } from "@refinedev/core";
import { useParams } from "next/navigation";
import { Card, Row, Col, Tag, Skeleton, Button, Space, Typography, Badge, Avatar, } from "antd";
import { ArrowLeftOutlined, BookOutlined, UserOutlined, CalendarOutlined, TagOutlined, BarcodeOutlined, FileTextOutlined, ClockCircleOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import Link from "next/link";
import LoanModal from "../../components/books/LoanModal";
import StatusCard from "../../components/books/StatusCard";
import InfoCard from "../../components/books/InfoCard";
import { Book } from "../../types/book";
import { useLoanModal } from "../../hooks/useLoanModal";
import { formatDateLong } from "../../utils/date";
import styles from "../../styles/pages/books/detail/DetailBook.module.css";

const { Title, Text, Paragraph } = Typography;

export default function BookDetail() {
  const { id } = useParams();
  const { data, isLoading } = useOne({
    resource: "books",
    id: id as string,
  });

  // Use custom hook for loan modal
  const {
    isLoansModalVisible,
    loanQuantity,
    isSubmitting,
    handleOpenLoansModalForDetail,
    handleCloseLoansModal,
    handleConfirmLoan,
    setLoanQuantity
  } = useLoanModal();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Skeleton active>
          <div className={styles.loadingSkeleton} />
        </Skeleton>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className={styles.errorContainer}>
        <div style={{ marginBottom: '32px' }}>
          <BookOutlined className={styles.errorIcon} />
          <Title level={2} className={styles.errorTitle}>Book not found</Title>
          <Text className={styles.errorText}>The book you're looking for doesn't exist or has been removed.</Text>
        </div>
        <Link href="/books">
          <Button type="primary" size="large" icon={<HomeOutlined />} className={styles.errorButton}>
            Back to Books
          </Button>
        </Link>
      </div>
    );
  }

  const book = data.data as Book;

  return (
    <div className={styles.mainContainer}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <Link href="/books">
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />}
              className={styles.backButton}
            >
              Back to Books
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.mainContent}>
        {/* Main Book Information */}
        <Card 
          className={styles.mainBookCard}
          styles={{ body: { padding: '0' } }}
        >
          <div className={styles.bookHeader}>
            <Row gutter={[40, 24]} align="middle">
              {/* Book Cover */}
              <Col xs={24} md={8}>
                <div className={styles.bookCoverContainer}>
                  <div className={styles.bookCoverWrapper}>
                    <img 
                      src={book.coverImage} 
                      alt={book.name}
                      className={styles.bookCover}
                    />
                    <Badge 
                      count={book.num} 
                      className={styles.bookBadge}
                    />
                  </div>
                </div>
              </Col>

              {/* Book Details */}
              <Col xs={24} md={16}>
                <div className={styles.bookDetails}>
                  <Title level={1} className={styles.bookTitle}>
                    {book.name}
                  </Title>
                  
                  <Space size="large" wrap className={styles.bookTags}>
                    <Tag 
                      color="white" 
                      icon={<UserOutlined />}
                      className={styles.bookTag}
                    >
                      {book.author}
                    </Tag>
                    <Tag 
                      color="white" 
                      icon={<TagOutlined />}
                      className={styles.bookTag}
                    >
                      {book.category}
                    </Tag>
                    <Tag 
                      color="white" 
                      icon={<CalendarOutlined />}
                      className={styles.bookTag}
                    >
                      {book.publishYear}
                    </Tag>
                  </Space>

                  {book.description && (
                    <Paragraph className={styles.bookDescription}>
                      {book.description}
                    </Paragraph>
                  )}
                </div>
              </Col>
            </Row>
          </div>

          {/* Book Status Grid */}
          <div className={styles.bookStatusSection}>
            <Title level={3} className={styles.statusTitle}>
              Book Status Overview
            </Title>
            <Row gutter={[20, 20]}>
              <Col xs={12} sm={6}>
                <StatusCard
                  value={book.status.available}
                  label="Available"
                  type="available"
                  styles={styles}
                />
              </Col>
              <Col xs={12} sm={6}>
                <StatusCard
                  value={book.status.loaned}
                  label="Loaned"
                  type="loaned"
                  styles={styles}
                />
              </Col>
              <Col xs={12} sm={6}>
                <StatusCard
                  value={book.status.disabled}
                  label="Disabled"
                  type="disabled"
                  styles={styles}
                />
              </Col>
              <Col xs={12} sm={6}>
                <StatusCard
                  value={book.status.renovated}
                  label="Renovated"
                  type="renovated"
                  styles={styles}
                />
              </Col>
            </Row>
          </div>
        </Card>

        {/* Additional Information */}
        <InfoCard
          title="Book Information"
          titleIcon={<BookOutlined />}
          items={[
            {
              icon: <BarcodeOutlined />,
              label: 'ISBN',
              value: book.ISBN || 'N/A',
              iconType: 'primary'
            },
            {
              icon: <FileTextOutlined />,
              label: 'Total Copies',
              value: book.num,
              iconType: 'success'
            },
            {
              icon: <ClockCircleOutlined />,
              label: 'Created',
              value: formatDateLong(book.createdAt),
              iconType: 'primary'
            },
            {
              icon: <ClockCircleOutlined />,
              label: 'Last Updated',
              value: formatDateLong(book.updatedAt),
              iconType: 'primary'
            }
          ]}
          styles={styles}
          bodyPadding="32px"
        />

        {/* Action Buttons */}
        <div className={styles.actionSection}>
          <Title level={3} className={styles.actionTitle}>
            Manage This Book
          </Title>
          <Space size="large" wrap>
              <Button 
               type="primary" 
               size="large"
               onClick={() => handleOpenLoansModalForDetail(book)}
               className={`${styles.actionButton} ${book.status.available === 0 ? styles.loanButtonDisabled : styles.loanButton}`}
               disabled={book.status.available === 0}
             >
               📚 Loans
             </Button>
            <Link href={`/books/${book.id}/edit`}>
              <Button 
                type="primary" 
                size="large"
                icon={<EditOutlined />}
                className={`${styles.actionButton} ${styles.editButton}`}
              >
                Edit Book
              </Button>
            </Link>
            <Link href="/books">
              <Button 
                size="large"
                icon={<HomeOutlined />}
                className={`${styles.actionButton} ${styles.backToListButton}`}
              >
                Back to List
              </Button>
            </Link>
          </Space>
        </div>
      </div>

      {/* Loan Modal Component */}
      <LoanModal
        isVisible={isLoansModalVisible}
        book={book}
        loanQuantity={loanQuantity}
        isSubmitting={isSubmitting}
        onClose={handleCloseLoansModal}
        onConfirm={handleConfirmLoan}
        onQuantityChange={(value) => setLoanQuantity(value || 1)}
      />


    </div>
  );
}