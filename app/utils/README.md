# Utils Documentation

## Validation Utils (`validation.ts`)

Các hàm validation được tách ra để tái sử dụng và dễ test.

### Các hàm validation có sẵn:

#### `validateEmailExists(getDataProvider, value)`
- Kiểm tra email đã tồn tại trong hệ thống chưa
- Sử dụng cho form đăng ký

#### `validatePassword(value)`
- Kiểm tra password có chứa cả chữ cái và số
- Chỉ cho phép chữ cái và số

#### `validateConfirmPassword(getFieldValue)`
- Kiểm tra confirm password khớp với password
- Sử dụng cho form đăng ký

#### `validatePhoneNumber(value)`
- Kiểm tra số điện thoại hợp lệ
- Chỉ cho phép số, dấu +, -, khoảng trắng, dấu ngoặc

#### `validateISBN(value)`
- Kiểm tra ISBN hợp lệ
- Hỗ trợ ISBN-10 và ISBN-13

#### `validateURL(value)`
- Kiểm tra URL hợp lệ

#### `validateFileSize(file, maxSize)`
- Kiểm tra kích thước file
- maxSize tính bằng bytes

#### `validateFileType(file, allowedTypes)`
- Kiểm tra loại file được phép
- allowedTypes là array các MIME types

#### `validateDate(value, minDate?, maxDate?)`
- Kiểm tra ngày hợp lệ
- Có thể giới hạn min/max date

#### `validateNumber(value, min?, max?)`
- Kiểm tra số hợp lệ
- Có thể giới hạn min/max value

#### `validateRequired(value, message?)`
- Kiểm tra field bắt buộc

#### `createValidator(validatorFn, errorMessage)`
- Tạo custom validator
- validatorFn trả về boolean hoặc Promise<boolean>

### Cách sử dụng:

```typescript
import { validateEmailExists, validatePassword } from '../utils/validation';

// Trong form rules
rules={[
  { required: true, message: 'Email is required' },
  { type: 'email', message: 'Invalid email format' },
  {
    validator: async (_rule, value) => validateEmailExists(getDataProvider, value),
  },
]}
```

## Form Handlers (`formHandlers.ts`)

Các hàm xử lý form được tách ra để tái sử dụng và dễ test.

### Các hàm form handlers có sẵn:

#### `createRegistrationHandler(router, mutation)`
- Tạo handler cho form đăng ký
- Xử lý success/error cho registration

#### `createLoginHandler(setStatus)`
- Tạo handler cho form đăng nhập
- Xử lý success/error cho login

#### `createFormSubmissionHandler(onSuccess?, onError?, successMessage?, errorMessage?)`
- Tạo generic form submission handler
- Có thể custom success/error callbacks

#### `createFormResetHandler(form)`
- Tạo handler để reset form

#### `createFormValidationHandler(form)`
- Tạo handler để validate form
- Trả về Promise<boolean>

#### `transformFormData(data, transformations)`
- Transform dữ liệu form trước khi submit
- transformations là object mapping field -> transform function

#### `commonTransformations`
- Các transformation functions có sẵn:
  - `trim`: Loại bỏ khoảng trắng đầu cuối
  - `toLowerCase`: Chuyển thành chữ thường
  - `toUpperCase`: Chuyển thành chữ hoa
  - `removeSpaces`: Loại bỏ tất cả khoảng trắng
  - `formatPhone`: Chỉ giữ lại số
  - `formatCurrency`: Format tiền tệ
  - `parseNumber`: Parse thành số
  - `parseInteger`: Parse thành số nguyên
  - `formatDate`: Format ngày tháng

#### `createFieldDependencies(dependencies)`
- Tạo field dependencies cho form
- dependencies là object mapping field -> array of dependent fields

#### `commonDependencies`
- Các dependencies có sẵn:
  - `confirmPassword`: ['password']
  - `confirmEmail`: ['email']
  - `billingAddress`: ['useBillingAddress']
  - `shippingAddress`: ['useShippingAddress']

#### `createSubmissionWithLoading(submitFn, setLoading)`
- Tạo submission handler với loading state
- Tự động set loading true/false

#### `createValidationRules(rules)`
- Factory để tạo validation rules

#### `commonValidationRules`
- Các validation rules có sẵn:
  - `email`: Email validation
  - `password`: Password validation
  - `name`: Name validation
  - `phone`: Phone validation
  - `required`: Required field validation

### Cách sử dụng:

```typescript
import { createRegistrationHandler, createFormSubmissionHandler } from '../utils/formHandlers';

// Trong component
const formHandlers = createRegistrationHandler(router, mutation);

// Hoặc custom handler
const customHandlers = createFormSubmissionHandler(
  (data) => console.log('Success:', data),
  (error) => console.error('Error:', error),
  'Form submitted successfully!',
  'Form submission failed!'
);
```

## OTP Utils (`otp.ts`)

Các hàm utility để tạo và xử lý OTP (One-Time Password) codes.

### Các hàm OTP có sẵn:

#### `generateOTP(length?)`
- Tạo OTP code ngẫu nhiên với độ dài chỉ định
- Mặc định 6 chữ số
- Sử dụng cho forgot password, 2FA

#### `generateSecureOTP(length?, charset?)`
- Tạo OTP code với character set tùy chỉnh
- Mặc định chỉ số (0-9)
- Có thể dùng chữ cái, ký tự đặc biệt

#### `generateAlphanumericOTP(length?)`
- Tạo OTP code chữ và số
- Mặc định 6 ký tự
- Bao gồm 0-9 và A-Z

#### `validateOTPFormat(otp, length?)`
- Kiểm tra format OTP có hợp lệ không
- Mặc định 6 chữ số
- Trả về boolean

#### `generateOTPWithExpiration(length?, expirationMinutes?)`
- Tạo OTP với thời gian hết hạn
- Mặc định 6 chữ số, hết hạn sau 5 phút
- Trả về object { code, expiresAt }

#### `isOTPExpired(expiresAt)`
- Kiểm tra OTP đã hết hạn chưa
- Nhận timestamp hết hạn
- Trả về boolean

### Cách sử dụng:

```typescript
import { generateOTP, generateOTPWithExpiration, validateOTPFormat } from '../utils/otp';

// Tạo OTP 6 chữ số
const otp = generateOTP(6);

// Tạo OTP với thời gian hết hạn
const { code, expiresAt } = generateOTPWithExpiration(6, 10); // 10 phút

// Kiểm tra format OTP
const isValid = validateOTPFormat("123456", 6);

// Trong forgot password
const code = generateOTP(6);
setGeneratedOtp(code);
```

## Services (`services/`)

Service layer để xử lý các tương tác với database và business logic.

### AuthService (`authService.ts`)

Xử lý các operations liên quan đến authentication.

#### Các methods có sẵn:

- `findUserByEmail(email)` - Tìm user theo email
- `generateOTPForPasswordReset(email, length)` - Tạo OTP cho reset password
- `verifyOTP(providedOTP, expectedOTP)` - Verify OTP
- `resetPassword(userId, newPassword)` - Reset password
- `completePasswordReset(email, otp, expectedOTP, newPassword)` - Complete password reset flow
- `validateEmail(email)` - Validate email format
- `validateOTPFormat(otp, length)` - Validate OTP format

### UserService (`userService.ts`)

Xử lý các operations liên quan đến user management.

#### Các methods có sẵn:

- `getUserById(userId)` - Lấy user theo ID
- `getUserByEmail(email)` - Lấy user theo email
- `createUser(userData)` - Tạo user mới
- `updateUser(userId, userData)` - Cập nhật user
- `deleteUser(userId)` - Xóa user
- `getUsers(page, limit)` - Lấy danh sách users với pagination
- `searchUsers(query, filters)` - Tìm kiếm users
- `checkEmailExists(email)` - Kiểm tra email đã tồn tại
- `updatePassword(userId, newPassword)` - Cập nhật password

### Cách sử dụng:

```typescript
import { createAuthService, createUserService } from '../utils/services';

// Trong component
const authService = createAuthService(dataProvider);
const userService = createUserService(dataProvider);

// Sử dụng auth service
const userResult = await authService.findUserByEmail(email);
if (userResult.success) {
  // Handle success
} else {
  // Handle error
}

// Sử dụng user service
const usersResult = await userService.getUsers(1, 10);
```

## Best Practices

1. **Tách logic ra khỏi component**: Không đặt logic phức tạp trong phần render
2. **Tái sử dụng**: Sử dụng các utility functions thay vì viết lại
3. **Type safety**: Sử dụng TypeScript types cho các parameters
4. **Error handling**: Luôn xử lý lỗi một cách graceful
5. **Testing**: Các utility functions dễ test hơn so với logic trong component
6. **Maintainability**: Code dễ bảo trì và mở rộng hơn
7. **Security**: Sử dụng OTP có thời gian hết hạn cho bảo mật
8. **Service Layer**: Tách business logic ra khỏi UI components
9. **Single Responsibility**: Mỗi service chỉ xử lý một domain cụ thể
10. **Dependency Injection**: Inject dependencies thay vì hardcode

## Examples

### Form với validation và handlers:

```typescript
import { validateEmailExists, validatePassword } from '../utils/validation';
import { createFormSubmissionHandler, commonTransformations } from '../utils/formHandlers';

export default function MyForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const handlers = createFormSubmissionHandler(
    (data) => {
      // Transform data before submit
      const transformedData = transformFormData(data, {
        email: commonTransformations.toLowerCase,
        name: commonTransformations.trim,
      });
      
      // Submit logic
      console.log('Submitting:', transformedData);
    },
    (error) => console.error('Error:', error),
    'Form submitted successfully!'
  );
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await handlers.onSuccess(values);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Invalid email' },
          { validator: async (_, value) => validateEmailExists(getDataProvider, value) },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Password is required' },
          { validator: (_, value) => validatePassword(value) },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
}
```
