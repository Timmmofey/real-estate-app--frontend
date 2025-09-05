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
        signInUp: "Sign in/up"
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
        toastErrorDescription: "Check your credentials"
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

    /////////////
    //Pages
    /////////////

    homePage: {
        welcome: "Welcome",
        homeMessage: "Some very cool features that will be created here but later :)"
    },  
    resetPasswordPage: {
        title: "Reset Password",
        emailLabel: "Email",
        sendButton: "Send Reset Code",
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
        toastResetError: "Failed to reset password",
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
        unexpectedErrorToast: "Registration failed"
    }
} as const