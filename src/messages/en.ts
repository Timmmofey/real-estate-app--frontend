export const en = {
    tabTitle: {
        classified: "Classified App"
    },

    /////////////
    //Components
    /////////////

    header: {
        buyPage: "Buy",
        rentPage: "Rent",
        salePage: "Sale",
        listingsPage: "My listings",
        signInUp: "Sign in"
    },
    footer: {
        allRightsReserved: "All rights reserved"
    },
    loginForm: {
        title: "Login to your account",
        description: "Enter your email below to login to your account",
        emailLabel: "Phone or Email",
        emailPlaceholder: "m@example.com or 12345...",
        passwordLabel: "Password",
        forgotPassword: "Forgot your password?",
        loginButton: "Login",
        loginButtonLoading: "Logging in...",
        loginGoogle: "Login with Google",
        signupPrompt: "Don't have an account?",
        signupLink: "Sign up",
        toastSuccess: "Logged in successfully!",
        toastErrorTitle: "Login error",
        toastErrorDescription: "Check your credentials",
        toast2FA: "Two factor authentication is required",
        toastLoginSuccess: "Logged in successfully!",
        toastResorationMode: "Account in resotoration mode",
        toastNoReasponse: "No response from login"
    },
    editPersonProfileForm: {
        notPersonProfile: "Not a person profile",
        firstNameLabel: "First Name",
        firstNamePlaceholder: "Enter first name",
        lastNameLabel: "Last Name",
        lastNamePlaceholder: "Enter last name",
        profilePhotoLabel: "Profile Photo",
        avatarPreviewAlt: "Avatar preview",
        choosePhoto: "Choose new main photo",
        deletePhoto: "Delete main photo",
        save: "Save Changes",
        saving: "Saving...",
        successToast: "All changes succesfully apllied"
    },
    editCompanyProfileForm: {
        nameLabel: "Company Name",
        namePlaceholder: "Company Name",
        registrationAddressLabel: "Street, building, unit",
        companyRegNumLabel: "Company Registration Number",
        estimatedAtLabel: "Estimated At",
        descriptionLabel: "Description",
        companyPhotoLabel: "Company Photo",
        companyPhotoAlt: "Company Photo",
        choosePhoto: "Choose new main photo",
        deletePhoto: "Delete main photo",
        save: "Save Changes",
        saving: "Saving...",
        successToast: "All changes succesfully apllied"
    },
    addressFields: {
        countryLabel: "Country",
        countryPlaceholder: "Country",
        regionLabel: "Region",
        regionPlaceholder: "Region",
        settlementPlaceholder: "Enter settlement",
        streetLabel: "Street, building, unit",
        streetPlaceholder: "10 Main st.",
        zipLabel: "ZIP Code",
        zipPlaceholder: "ZIP Code",
        zipRequired: "Required",
        zipFormat: "Format: {hint}",
        none: "None",
    },
    settlementAutocomplete:{
        settlement: "Settlement",
        clear: "Clear",
        chooseFromTheList: "Or choose from the list",
        loading: "Loading...",
        error: "Failed to load settlements",
        noResults: "No settlements found.",
    },
    userSideBar:{
        profileLink: "Profile",
        settingsLink: "Settings",
        myListings: "My Listings",
        favorites: "Favorites",
        messages: "Messages",
        support: "Support",
        logInError: "User not logged in",
        logout: "Logout"
    },
    languageSelector: {
        toggleTheme: "Toggle theme",
        light:"Light",
        dark: "Dark",
        system: "System"
    },
    mobileMenu:{
        Home: "Home"
    },
    deviceAndActivitySection: {
        currentSession: "Current session",
        activeNow: "Active right now on this device",
        otherSessions: "Other sessions",
        noOtherSessions: "There are no other sessions",
        activeAt: "Active at ",
        showMore: "Show the rest sessions",
        hide: "Hide",
        totalSessions: "Total sessions",
        deviceUsage: "Device usage",
        locations: "Locations",
        logoutAll: "Log out all sessions",
        logoutConfirmTitle: "Are you sure you want to log out all sessions?",
        logoutConfirmDescription: "This action cannot be undone. For further sessions you will need to log in again.",
        logoutCancel: "Cancel",
        logoutContinue: "Continue",
        toastFailedToLogOutAllSessions: "Failer to logout all sessions",
        toastSuccesLogOutAllSessions: "All sessions have been logged out"
    },
    contactCard: {
        clipboard: "copied to clipboard",
        edit: "Edit"
    },
    deleteAccountSection: {
        succesToast: "Account has been deleted successfully",
        errorToast: "Error occured while deleting account",
        deleteAccount: "Delete account",
        deleteAccountConfirmTitle: "Are you sure you want to delete your account?",
        deleteAccountConfirmDescription: "You will have 6 month to restore your account via login or you can delete it permanantly",
        cancelDelete: "Cancel",
        submitDelete: "Delete account"
    },
    twoFactorAuthSection: {
        currentStatus: "Current status",
        enabled: "Enabled",
        disabled: "Disabled",
        enable: "Enable",
        disable: "Disable",
        infoText: "Two-factor authentication (2FA) increases your account security by requiring confirmation via a code sent to your email or phone. Enabling 2FA helps protect your data from unauthorized access.",
        enableTitle: "Enable 2FA",
        disableTitle: "Disable 2FA",
        enableDescription: "You are about to enable two-factor authentication. This will enhance your account's security.",
        disableDescription: "You are about to disable two-factor authentication. Your account will become less protected.",
        requestCode: "Request code",
        requesting: "Requesting...",
        cancel: "Cancel",
        codeLabel: "Verification code",
        enterCodePlaceholder: "Enter the code",
        confirm: "Confirm",
        confirming: "Confirming...",
        back: "Back",
        codeSentToast: "Code has been sent. Enter it below.",
        requestErrorToast: "Error requesting code.",
        emptyCodeToast: "Please enter the code.",
        enabledSuccessToast: "Two-factor authentication has been enabled.",
        disabledSuccessToast: "Two-factor authentication has been disabled.",
        confirmErrorToast: "Error confirming code."
    },
    changePasswordSection: {
        changePasswordTitle: "Change password",
        changePassword: "Change password",
        changePasswordHint: "Use a strong password and don't share it with anyone.",
        oldPasswordLabel: "Current password",
        oldPasswordPlaceholder: "Enter your current password",
        newPasswordLabel: "New password",
        newPasswordPlaceholder: "Enter a new password",
        confirmPasswordLabel: "Confirm new password",
        confirmPasswordPlaceholder: "Repeat new password",
        cancel: "Cancel",
        changing: "Changing...",
        successToast: "Password has been changed successfully",
        errorToast: "Error while changing password",
        emptyFieldsToast: "Please fill in all fields",
        passwordMismatchToast: "Passwords do not match",
        forgotPassword: "Forgot password"
    },
    createPasswordSection: {
        createPasswordHint: "You can create additional way to sign in via password",
        createPassword: "Create password"
    },
    oAuthSection: {
        loadError: "Failed to load OAuth accounts",
        authServiceUrlNotConfigured: "Auth service URL is not configured",
        linkError: "Failed to link account",

        connectWithGoogle: "Connect with Google",
        connectWithApple: "Connect with Apple",

        disconnectGoogle: "Disconnect Google",
        disconnectApple: "Disconnect Apple",

        disconnectGoogleTitle: "Disconnect Google account?",
        disconnectAppleTitle: "Disconnect Apple account?",

        disconnectGoogleDescription: "Are you sure you want to disconnect your Google account?",
        disconnectAppleDescription: "Are you sure you want to disconnect your Apple account?",

        connectedGoogleDescription: "Your Google account is connected. You can login your account via Google",
        connectGoogleDescription: "Connect your Google account to simplify login in the future.",

        connectedAppleDescription: "Your Apple account is connected.",
        connectAppleDescription: "Connect your Apple account to simplify login in the future.",

        cancel: "Cancel"
    },

    /////////////
    //Constants
    /////////////

    countries: {
        US: "USA",
        CA: "Canada",
    },
    regions: {
        US: {
            AL: "Alabama",
            AK: "Alaska",
            AZ: "Arizona",
            AR: "Arkansas",
            CA: "California",
            CO: "Colorado",
            CT: "Connecticut",
            DE: "Delaware",
            FL: "Florida",
            GA: "Georgia",
            HI: "Hawaii",
            ID: "Idaho",
            IL: "Illinois",
            IN: "Indiana",
            IA: "Iowa",
            KS: "Kansas",
            KY: "Kentucky",
            LA: "Louisiana",
            ME: "Maine",
            MD: "Maryland",
            MA: "Massachusetts",
            MI: "Michigan",
            MN: "Minnesota",
            MS: "Mississippi",
            MO: "Missouri",
            MT: "Montana",
            NE: "Nebraska",
            NV: "Nevada",
            NH: "New Hampshire",
            NJ: "New Jersey",
            NM: "New Mexico",
            NY: "New York",
            NC: "North Carolina",
            ND: "North Dakota",
            OH: "Ohio",
            OK: "Oklahoma",
            OR: "Oregon",
            PA: "Pennsylvania",
            RI: "Rhode Island",
            SC: "South Carolina",
            SD: "South Dakota",
            TN: "Tennessee",
            TX: "Texas",
            UT: "Utah",
            VT: "Vermont",
            VA: "Virginia",
            WA: "Washington",
            WV: "West Virginia",
            WI: "Wisconsin",
            WY: "Wyoming",
        },
        CA: {
            AB: "Alberta",
            BC: "British Columbia",
            MB: "Manitoba",
            NB: "New Brunswick",
            NL: "Newfoundland and Labrador",
            NS: "Nova Scotia",
            ON: "Ontario",
            PE: "Prince Edward Island",
            QC: "Quebec",
            SK: "Saskatchewan",
            NT: "Northwest Territories",
            NU: "Nunavut",
            YT: "Yukon",
        }
    },
    deviceTypes: {
        Bot: "Bot",
        Mobile: "Mobile",
        Tablet: "Tablet",
        Desktop: "Desktop",
        SmartTv: "Smart Tv",
    },

    /////////////
    //Pages
    /////////////

    logInPage: {
        thisGoogleAccountEmailIsAlredyConnected: "To link this Google account you need to login with it`s email via password" 
    },
    homePage: {
        welcome: "Welcome",
        homeMessage: "Some very cool features that will be created here but later :)"
    },  
    setPasswordMultiStepFormwordPage: {
        resetPasswordTitle: "Reset Password",
        createPasswordTitle: "Create Password",
        sendVerificationCodeHint: "To cofirm you are the account owner verification code will be sent to your email",
        emailLabel: "Email",
        sendButton: "Send Verification Code",
        sendButtonLoading: "Sending...",
        codeLabel: "Verification Code",
        codeDescription: "Enter the verification code sent to your email.",
        verifyButton: "Verify Code",
        verifyButtonLoading: "Verifying...",
        newPasswordLabel: "New Password",
        resetButton: "Reset Password",
        resetButtonLoading: "Resetting...",
        toastSendSuccess: "Verification code sent to email",
        toastSendError: "Failed to send reset code",
        toastVerifySuccess: "Verification successful",
        toastVerifyError: "Failed to verify code",
        toastResetSuccess: "Password reset successfully!",
        toastCreationSuccess: "Password created successfully!",
        toastResetError: "Failed to reset password",
        toastCreationError: "Failed to create password",
    },
    profilePage:{
        notAuthorized: "You are not authorized",
        verifiedUser: "Verified user",
        verifiedCompany: "Verified company",
        edit: "Edit",
        someContent: "Some content will be added later",
    },
    editProfilePage:{
        title: "Edit profile"
    },
    signUpPage:{
        registerAs: "Register as",
        person: "Person",
        company: "Company",
        email: "Email",
        password: "Password",
        phoneNumber: "Phone Number",
        firstName: "First Name",
        lastName: "Last Name",
        companyName: "Company Name",
        companyRegistrationNumber: "Company Registration Number",
        establishedAt: "Established At",
        description: "Description (optional)",
        profilePhoto: "Profile Photo",
        choosePhoto: "Choose Photo",
        remove: "Remove",
        register: "Register",
        registering: "Registering...",
        
        personRegisteredToast: "Person registered",
        companyRegisteredToast: "Person registered",
        unexpectedErrorToast: "Registration failed",

    },
    changeEmailPage: {
        title: "Change Email",
        step: "Step",
        of: "of",

        step1_description: "We will send a confirmation code to your current email. Enter it in the next step to confirm that you are the account owner.",
        step1_button: "Send code to current email",

        step2_description: "Enter the code that was sent to your current email. This is required to confirm that you have access to it.",
        step2_label: "Confirmation code",
        step2_button: "Confirm",
        step2_button_loading: "Checking...",

        step3_description: "Now enter your new email, and we will send a confirmation code to it.",
        step3_label: "New email",
        step3_button: "Send code to new email",
        step3_button_loading: "Sending...",

        step4_description: "Enter the code that was sent to your new email so we can verify it belongs to you.",
        step4_label: "New email confirmation code",
        step4_button: "Confirm",
        step4_button_loading: "Checking...",

        step5_description: "All checks are complete. Now you can finish changing your email.",
        step5_button: "Complete email change",

        step1_success: "Code sent to your current email",
        step1_error: "Failed to send code to current email",

        step2_success: "Current email confirmed",
        step2_error: "Invalid code for current email",

        step3_success: "Code sent to your new email",
        step3_error: "Failed to send code to new email",

        step4_success: "New email confirmed",
        step4_error: "Invalid code for new email",

        step5_success: "Email successfully changed",
        step5_error: "Failed to complete email change"
    },
    settingsPage: {
        title: "Settings",
        account: "Account",
        contacts: "Contacts",
        security: "Security",
        payments: "Payments",
        subscriptions: "Subscriptions",
        profileInfo: "Profile info",
        contactInfo: "Contact info",
        devicesAndActivity: "Devices and activity",
        phone: "Phone",
        edit: "Edit",
        twoFactorAuth: "Two-Factor Authentication",
        deleteAccount: "Delete account",
        changePassword: "Change password",
        createPassword: "Create password",
        externalAuthMethods: "External Auth Methods",

        toastGoogleAccountConnectedSuccessfully: "Google account connected suceesfully!",
        toastGoogleAccountConnectedToOtherUser: "This Google account is connected to other user",

        toastAppleAccountConnectedSuccessfully: "Apple account connected suceesfully!",
        toastAppleAccountConnectedToOtherUser: "This Apple account is connected to other user",

        toastUnkownError: "Uknown error occured",
    },
    restoreAccountPage: {
        title: "Account Recovery",
        description: "You can restore your account or permanently delete it.",
        restoreButton: "Restore Account",
        restoreLoading: "Restoring...",
        restoreSuccess: "Account successfully restored",
        restoreError: "Failed to restore account",

        deleteButton: "Delete Account Permanently",
        deleteConfirmTitle: "Confirm Deletion",
        deleteConfirmDescription: "Are you sure you want to delete your account? This action cannot be undone.",
        deleteConfirmButton: "Delete Account",
        deleteLoading: "Deleting...",
        deleteSuccess: "Account successfully deleted",
        deleteError: "Failed to delete account",
        cancel: "External login methods"
    },
    twoFactorAuthPage: {
      title: "Two factor authentication",
      description: "Enter verification code sent to your Email",
      formLabel: "Verification code",
      button: "Send",
      buttonLoading: "Sending",
      emptyCodeError: "Please enter the verification code.",
      successMessage: "Verification successful!",
      invalidCodeMessage: "Invalid verification code.",
      genericError: "Something went wrong. Please try again."
    }
} as const

type RecursiveStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : RecursiveStringify<T[K]>;
};

export type TranslationKeys = RecursiveStringify<typeof en>;