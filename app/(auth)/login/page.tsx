"use client";

import { Form, Input, Button, Alert, Card} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons";
import { useState, useCallback } from "react";
import Link from "next/link";
import { useLogin } from "@refinedev/core";
import styles from "../../styles/pages/auth/Login.module.css";

const Status = {
  SUCCESS: "success" as const,
  ERROR: "error" as const,
} as const;

export default function Login() {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const { mutate: login, isPending } = useLogin();

  const renderAlert = () => {
    if (!status.type) return null;
    
    const isSuccess = status.type === Status.SUCCESS;
    return (
      <Alert
        message={isSuccess ? "Success" : "Error"}
        description={status.message}
        type={status.type}
        showIcon
        className={isSuccess ? styles.successAlert : styles.errorAlert}
      />
    );
  };
  const onFinish = useCallback(async (values: any) => {
    login({
      email: values.email,
      password: values.password,
    }, {
      onSuccess: async (data) => {
        setStatus({
          type: Status.SUCCESS,
          message: '✅ Login successful! Redirecting to menu...'
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      },
      onError: (error) => {
        const errorMessage = error?.message || '❌ Login failed. Please check your credentials.';
        setStatus({
          type: Status.ERROR,
          message: errorMessage
        });
      }
    });
  }, [login]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Management Books System</h1>
      </div>
      {renderAlert()}

      <Card
        title= {
          <div className={styles.cardTitle}>Login</div>
        }
        className={styles.loginCard}
      >
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className={styles.loginForm}
          disabled={isPending}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className={styles.userIcon} />}
              placeholder="Enter your email"
              size="large"
              className={styles.input}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className={styles.lockIcon} />}
              placeholder="Enter your password"
              size="large"
              className={styles.input}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              size="large"
              className={styles.submitButton}
              block
              loading={isPending}
            >
              {isPending ? 'Loading...' : 'Log in'}
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.formFooter}>
          <Link className={styles.forgotLink} href="/forgot-password">Forgot password?</Link>
          <Link className={styles.registerLink} href="/register">Create account</Link>
        </div>
      </Card>

    </div>
  );
}
