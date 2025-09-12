"use client";   
 
import React, { useEffect } from "react";
import { Button, Card, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../../styles/pages/auth/Register.module.css";
import { useRouter } from "next/navigation";
import { useDataProvider, useForm } from "@refinedev/core";
import Link from "next/link";
import { RESOURCES, VALIDATION_RULES, REGEX_PATTERNS, ROUTES, REDIRECTS } from "../../../constants";
import { validateEmailExists, validatePassword, validateConfirmPassword } from "../../../utils/validation";
import { createRegistrationHandler } from "../../../utils/formHandlers";
        
export default function Register() {
  const router = useRouter();
  const [form] = Form.useForm();
  const getDataProvider = useDataProvider();

  const { onFinish, mutation } = useForm({
    action: "create",
    resource: RESOURCES.USERS.CREATE,
  });

  // Create form handlers
  const formHandlers = createRegistrationHandler(router, mutation);

  useEffect(() => {
    if (mutation.isSuccess) {
      formHandlers.onSuccess();
    }
    if (mutation.isError) {
      formHandlers.onError(mutation.error);
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error, formHandlers]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Management Books System</h1>
      </div>
      <Card
        title={
          <div className={styles.cardTitle}>Register</div>
        }
        className={styles.registerCard}
      >
      <Form
        form={form}
        name="register"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        disabled={mutation.isPending}
        className={styles.registerForm}
      >
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          validateTrigger="onBlur"
          rules={[
            { required: VALIDATION_RULES.EMAIL.required, message: VALIDATION_RULES.EMAIL.message },
            { 
              pattern: REGEX_PATTERNS.EMAIL, 
              message: VALIDATION_RULES.EMAIL.message 
            },
            {
              validator: async (_rule, value) => validateEmailExists(getDataProvider, value),
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            className={styles.input}
            size="large"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: VALIDATION_RULES.PASSWORD.required, message: VALIDATION_RULES.PASSWORD.message },
            { 
              pattern: REGEX_PATTERNS.PASSWORD_MEDIUM, 
              message: VALIDATION_RULES.PASSWORD.message 
            },
            {
              validator: (_rule, value) => validatePassword(value),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            className={styles.input}
            size="large"
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator: validateConfirmPassword(getFieldValue),
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            className={styles.input}
            size="large"
            placeholder="Confirm your password"
          />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: VALIDATION_RULES.NAME.required, message: VALIDATION_RULES.NAME.message },
            { 
              pattern: REGEX_PATTERNS.NAME, 
              message: VALIDATION_RULES.NAME.message 
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            className={styles.input}
            size="large"
            placeholder="Enter your name"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.registerButton}
            size="large"
            block
            loading={mutation.isPending}
          >
            {mutation.isPending ? "Registering..." : "Register"}
          </Button>
        </Form.Item>
        </Form>
        <div className={styles.actionsContainer}>
          <Link className={styles.link} href={ROUTES.LOGIN}>Back to Login</Link>
          <Link className={styles.link} href={ROUTES.FORGOT_PASSWORD}>Forgot password</Link>
        </div>
      </Card>
    </div>

  );
}