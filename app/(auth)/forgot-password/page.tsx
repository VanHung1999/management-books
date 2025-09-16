"use client";

import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Input, Modal } from "antd";
import { useDataProvider, useUpdate} from "@refinedev/core";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { forgotPasswordSchema, resetPasswordSchema, ForgotPasswordFormData, ResetPasswordFormData } from "../../../utils/validation-schemas";
import { useZodValidation } from "../../../utils/useZodValidation";
import { generateOTP } from "../../../utils/otp";
import { createAuthService, User } from "../../../utils/services";
import "../../styles/theme-variable.css";

// User type is now imported from services
import styles from '../../styles/pages/auth/ForgotPassword.module.css';

export default function ForgotPassword() {
    const [generatedOtp, setGeneratedOtp] = useState<string>("");
    const [alert, setAlert] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);
    const [status, setStatus] = useState<"enterEmail" | "verifyOtp" | "done">("enterEmail");
    const [email, setEmail] = useState<string>("");
    const [user, setUser] = useState<User | null>(null);
    const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const getDataProvider = useDataProvider();
    const router = useRouter();
    
    // Initialize auth service
    const authService = createAuthService(getDataProvider());
    
    // Zod validation hooks
    const { form, validateAndSetErrors: validateEmailForm } = useZodValidation(forgotPasswordSchema);
    const { form: otpForm, validateAndSetErrors: validateOtpForm } = useZodValidation(resetPasswordSchema);
    
    const { mutate: updateUser } = useUpdate(
      { resource: "users" ,
        mutationOptions: {
          onSuccess: (data: any) => {
            setStatus("done");
            setAlert({ type: "success", text: "Password reset link has been sent to your email. Please check your inbox and follow the instructions." });
          },
          onError: (error: any) => {
            setAlert({ type: "error", text: "Cannot reset password. Please try again." });
          }
        }
      }   
    );

    const onSubmitEmail = async (values: ForgotPasswordFormData) => {
        // Validate with Zod
        const validationResult = await validateEmailForm(values);
        if (!validationResult.success) {
            return;
        }

        // Use auth service to find user
        const userResult = await authService.findUserByEmail(values.email);
        if (!userResult.success) {
            setAlert({ type: "error", text: userResult.error || "Email has not been registered" });
            return;
        }

        // Generate OTP using service
        const otpResult = await authService.generateOTPForPasswordReset(values.email);
        if (!otpResult.success) {
            setAlert({ type: "error", text: otpResult.error || "Failed to generate OTP" });
            return;
        }

        // Set state
        setUser(userResult.data);
        setGeneratedOtp(otpResult.otp!);
        setEmail(values.email);
        setStatus("verifyOtp");
        setAlert({ type: "info", text: `OTP (demo): ${otpResult.otp}` });
    }
    
    const onSubmitOtp = async (values: ResetPasswordFormData) => {
        // Validate with Zod
        const validationResult = await validateOtpForm(values);
        if (!validationResult.success) {
            return;
        }

        // Use auth service to complete password reset
        const resetResult = await authService.completePasswordReset(
            email,
            values.otp,
            generatedOtp,
            "12345678" // In real app, this would be a generated secure password
        );

        if (!resetResult.success) {
            setAlert({ type: "error", text: resetResult.error || "Password reset failed" });
            return;
        }

        setStatus("done");
        setAlert({ type: "success", text: "OTP verified successfully! Redirecting to login..." });
        
        // Auto redirect to login immediately
        setTimeout(() => {
            router.push("/login");
        }, 1000); // 1 second delay to show success message
    }

    const handleSetNewPassword = async () => {
        if (newPassword !== confirmPassword) {
            setAlert({ type: "error", text: "Passwords do not match" });
            return;
        }

        if (newPassword.length < 6) {
            setAlert({ type: "error", text: "Password must be at least 6 characters" });
            return;
        }

        try {
            const resetResult = await authService.resetPassword(user?.id || "", newPassword);
            if (resetResult.success) {
                setShowPasswordModal(false);
                setAlert({ type: "success", text: "Password has been updated successfully! You can now log in with your new password." });
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setAlert({ type: "error", text: resetResult.error || "Failed to update password" });
            }
        } catch (error) {
            setAlert({ type: "error", text: "An error occurred while updating password" });
        }
    }
    
    // Removed auto-redirect timeout - let user decide when to navigate

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Management Books System</h1>
        </div>
      <Card
        title={
          status === "enterEmail"
            ? <div className={`${styles.cardTitle} ${styles.cardTitleEnterEmail}`}>Forgot Password</div>
            : status === "verifyOtp"
            ? <div className={`${styles.cardTitle} ${styles.cardTitleVerifyOtp}`}>Verify OTP</div>
            : <div className={`${styles.cardTitle} ${styles.cardTitleSuccess}`}>Success</div>
        }
        className={styles.forgotPasswordCard}
      >
        {alert && (
          <Alert showIcon type={alert.type} message={alert.text} className={styles.alert} />
        )}

        {status === "enterEmail" && (
          <Form form={form} onFinish={onSubmitEmail} layout="vertical" className={styles.form}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter your email" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className={styles.submitButton}>
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        )}

        {status === "verifyOtp" && (
          <Form form={otpForm} layout="vertical" onFinish={onSubmitOtp} autoComplete="off" className={styles.form}>
            <Form.Item label="Email" hidden>
              <Input value={email} disabled className={styles.input} />
            </Form.Item>
            <Form.Item 
              name="otp" 
              label="OTP" 
              rules={[
                { required: true, message: "Please enter your OTP" },
                { pattern: /^\d{6}$/, message: "OTP must be 6 digits" }
              ]}
            >
              <Input placeholder="Enter your OTP" maxLength={6} className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className={styles.submitButton}>
                Verify & Reset Password
              </Button>
            </Form.Item>
          </Form>
        )}

        {status === "done" && (
          <div>
            <h3 className={styles.successMessage}>OTP Verified Successfully!</h3>
            <p className={styles.successText}>Your OTP has been verified. Redirecting to login page...</p>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill}></div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.actionsContainer}>
          <Link className={styles.link} href="/login">Back to login</Link>
          <Link className={styles.link} href="/register">Create account</Link>
        </div>
      </Card>

      {/* Password Reset Modal */}
      <Modal
        title="Set New Password"
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowPasswordModal(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSetNewPassword}
            className={styles.submitButton}
          >
            Update Password
          </Button>
        ]}
        width={400}
        centered
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDescription}>
            Please enter your new password below:
          </p>
          
          <Form layout="vertical">
            <Form.Item label="New Password" required>
              <Input.Password
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
              />
            </Form.Item>
            
            <Form.Item label="Confirm Password" required>
              <Input.Password
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
            </Form.Item>
          </Form>
          
          <div className={styles.passwordRequirements}>
            <p>Password requirements:</p>
            <ul>
              <li>At least 6 characters long</li>
              <li>Must match confirmation</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>  
  );
}