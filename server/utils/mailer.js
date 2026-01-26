/**
 * Simplified OTP utility for development.
 * This service only logs OTP codes to the server console and does not send any emails.
 */

/**
 * Logs the verification OTP to the console.
 * @param {string} to - The recipient's email address (for logging purposes).
 * @param {string} otp - The 6-digit one-time password.
 */
export const sendVerificationEmail = async (to, otp) => {
    console.log('\n✅ [OTP Service] Verification Code');
    console.log(`   - To: ${to}`);
    console.log(`   - Code: ${otp}`);
    console.log('-------------------------------------\n');
    return Promise.resolve();
};

/**
 * Logs the password reset OTP to the console.
 * @param {string} to - The recipient's email address (for logging purposes).
 * @param {string} otp - The 6-digit one-time password.
 */
export const sendPasswordResetEmail = async (to, otp) => {
    console.log('\n✅ [OTP Service] Password Reset Code');
    console.log(`   - To: ${to}`);
    console.log(`   - Code: ${otp}`);
    console.log('-------------------------------------\n');
    return Promise.resolve();
};