export const ru = {
    tabTitle: {
        classified: "Classified App"
    },

    /////////////
    //Components
    /////////////

    header: {
        buyPage: "Покупка",
        rentPage: "Аренда",
        salePage: "Продажа",
        listingsPage: "Мои объявления",
        signInUp: "Вход/Регистрация"
    },
    footer: {
        allRightsReserved: "Все права защищены"
    },
    loginForm: {
        title: "Вход в аккаунт",
        description: "Введите свой email или телефон для входа в аккаунт",
        emailLabel: "Телефон или Email",
        emailPlaceholder: "m@example.com или 12345...",
        passwordLabel: "Пароль",
        forgotPassword: "Забыли пароль?",
        loginButton: "Войти",
        loginButtonLoading: "Вход...",
        loginGoogle: "Войти через Google",
        signupPrompt: "Нет аккаунта?",
        signupLink: "Зарегистрироваться",
        toastSuccess: "Вы успешно вошли!",
        toastErrorTitle: "Ошибка входа",
        toastErrorDescription: "Проверьте правильность данных"
    }, 
    editPersonProfileForm: {
        notPersonProfile: "Не профиль пользователя",
        firstNameLabel: "Имя",
        firstNamePlaceholder: "Введите имя",
        lastNameLabel: "Фамилия",
        lastNamePlaceholder: "Введите фамилию",
        profilePhotoLabel: "Фото профиля",
        avatarPreviewAlt: "Превью аватара",
        choosePhoto: "Выбрать новое фото",
        deletePhoto: "Удалить фото",
        save: "Сохранить изменения",
        saving: "Сохранение...",
        successToast: "Изменения успешно сохранены"
    },
    editCompanyProfileForm: {
        nameLabel: "Название компании",
        namePlaceholder: "Введите название компании",
        registrationAddressLabel: "Улица, здание, офис",
        companyRegNumLabel: "Регистрационный номер компании",
        estimatedAtLabel: "Дата основания",
        descriptionLabel: "Описание",
        companyPhotoLabel: "Фотография компании",
        companyPhotoAlt: "Фото компании",
        choosePhoto: "Выбрать новую фотографию",
        deletePhoto: "Удалить фотографию",
        save: "Сохранить изменения",
        saving: "Сохранение...",
        successToast: "Изменения успешно сохранены"
    },
    addressFields:{
        countryLabel: "Страна",
        countryPlaceholder: "Выберите страну",
        regionLabel: "Регион",
        regionPlaceholder: "Выберите регион",
        settlementPlaceholder: "Введите населённый пункт",
        streetLabel: "Улица, здание, офис",
        streetPlaceholder: "10 Main st.",
        zipLabel: "Почтовый индекс",
        zipPlaceholder: "Индекс",
        zipRequired: "Обязательно",
        zipFormat: "Формат:",
        none: "Нет",
    },
    settlementAutocomplete:{
        settlement: "Населённый пункт",
        loading: "Загрузка...",
        error: "Не удалось загрузить список",
        noResults: "Населённых пунктов не найдено",
    },
    userSideBar:{
        profileLink: "Профиль",
        settingsLink: "Настройки",
        myListings: "Мои объявления",
        favorites: "Избранное",
        messages: "Сообщения",
        support: "Поддержка",
        logInError: "Пользователь не найден",
        logout: "Выйти"
    },
    languageSelector: {
        toggleTheme: "Переключить тему",
        light:"Светлая",
        dark: "Темная",
        system: "Системная"
    },
    mobileMenu:{
        Home: "Главная"
    },

    /////////////
    //Constants
    /////////////
    
    countries: {
        US: "США",
        CA: "Канада",
    },
    regions: {
        US: {
            AL: "Алабама",
            AK: "Аляска",
            AZ: "Аризона",
            AR: "Арканзас",
            CA: "Калифорния",
            CO: "Колорадо",
            CT: "Коннектикут",
            DE: "Делавэр",
            FL: "Флорида",
            GA: "Джорджия",
            HI: "Гавайи",
            ID: "Айдахо",
            IL: "Иллинойс",
            IN: "Индиана",
            IA: "Айова",
            KS: "Канзас",
            KY: "Кентукки",
            LA: "Луизиана",
            ME: "Мэн",
            MD: "Мэриленд",
            MA: "Массачусетс",
            MI: "Мичиган",
            MN: "Миннесота",
            MS: "Миссисипи",
            MO: "Миссури",
            MT: "Монтана",
            NE: "Небраска",
            NV: "Невада",
            NH: "Нью-Гэмпшир",
            NJ: "Нью-Джерси",
            NM: "Нью-Мексико",
            NY: "Нью-Йорк",
            NC: "Северная Каролина",
            ND: "Северная Дакота",
            OH: "Огайо",
            OK: "Оклахома",
            OR: "Орегон",
            PA: "Пенсильвания",
            RI: "Род-Айленд",
            SC: "Южная Каролина",
            SD: "Южная Дакота",
            TN: "Теннесси",
            TX: "Техас",
            UT: "Юта",
            VT: "Вермонт",
            VA: "Вирджиния",
            WA: "Вашингтон",
            WV: "Западная Вирджиния",
            WI: "Висконсин",
            WY: "Вайоминг",
        },
        CA: {
            AB: "Альберта",
            BC: "Британская Колумбия",
            MB: "Манитоба",
            NB: "Нью-Брансуик",
            NL: "Ньюфаундленд и Лабрадор",
            NS: "Новая Шотландия",
            ON: "Онтарио",
            PE: "Остров Принца Эдуарда",
            QC: "Квебек",
            SK: "Саскачеван",
            NT: "Северо-Западные территории",
            NU: "Нунавут",
            YT: "Юкон",
        }
    },

    /////////////
    //Pages
    /////////////
    homePage : {
        welcome: "Добро пожаловать",
        homeMessage: "Сюда будет добавлен классный контетнет, но позже :)"
    },
    resetPasswordPage: {
        title: "Сброс пароля",
        emailLabel: "Эл. почта",
        sendButton: "Отправить код",
        sendButtonLoading: "Отправка...",
        codeLabel: "Код подтверждения",
        codeDescription: "Введите код подтверждения, отправленный на вашу почту.",
        verifyButton: "Подтвердить код",
        verifyButtonLoading: "Проверка...",
        newPasswordLabel: "Новый пароль",
        resetButton: "Сбросить пароль",
        resetButtonLoading: "Сброс...",
        toastSendSuccess: "Код подтверждения отправлен на почту",
        toastSendError: "Не удалось отправить код",
        toastVerifySuccess: "Код подтверждён",
        toastVerifyError: "Не удалось подтвердить код",
        toastResetSuccess: "Пароль успешно сброшен!",
        toastResetError: "Не удалось сбросить пароль",
    },
    profilePage:{
        notAuthorized: "Вы не авторизованы",
        verifiedUser: "Подтверждённый пользователь",
        verifiedCompany: "Подтверждённая компания",
        edit: "Редактировать",
        someContent: "Здесь позже появится контент",
    },
    editProfilePage:{
        title: "Редактирование профиля"
    },
    signUpPage:{
        registerAs: "Зарегисроваться как",
        person: "Пользователь",
        company: "Компания",
        email: "Email",
        password: "Пароль",
        phoneNumber: "Телефон",
        firstName: "Имя",
        lastName: "Фамилия",
        companyName: "Название компании",
        companyRegistrationNumber: "Регистрационный номер",
        establishedAt: "Основана",
        description: "Описание (опционально)",
        profilePhoto: "Фото",
        choosePhoto: "Выбрать фото",
        remove: "Удалить",
        register: "Зарегистрироваться",
        registering: "Регистрация...",
        personRegisteredToast: "Пользователь зарегистрирован",
        companyRegisteredToast: "Компания заргистрирована",
        unexpectedErrorToast: "Регистрация не удалась"
    }
}as const